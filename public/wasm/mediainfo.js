function isError(error) {
  return error !== null && typeof error === 'object' && Object.prototype.hasOwnProperty.call(error, 'message');
}
function unknownToError(error) {
  return isError(error) ? error : new Error(typeof error === 'string' ? error : 'Unknown error');
}

// DO NOT EDIT! File generated using `generate-types` script.

const INT_FIELDS = ['Active_Height', 'Active_Width', 'AudioCount', 'Audio_Channels_Total', 'BitDepth_Detected', 'BitDepth', 'BitDepth_Stored', 'Channels', 'Channels_Original', 'Chapters_Pos_Begin', 'Chapters_Pos_End', 'Comic_Position_Total', 'Count', 'DataSize', 'ElementCount', 'EPG_Positions_Begin', 'EPG_Positions_End', 'FirstPacketOrder', 'FooterSize', 'Format_Settings_GMC', 'Format_Settings_RefFrames', 'Format_Settings_SliceCount', 'FrameCount', 'FrameRate_Den', 'FrameRate_Num', 'GeneralCount', 'HeaderSize', 'Height_CleanAperture', 'Height', 'Height_Offset', 'Height_Original', 'ImageCount', 'Lines_MaxCharacterCount', 'Lines_MaxCountPerEvent', 'Matrix_Channels', 'MenuCount', 'OtherCount', 'Part_Position', 'Part_Position_Total', 'Played_Count', 'Reel_Position', 'Reel_Position_Total', 'Resolution', 'Sampled_Height', 'Sampled_Width', 'SamplingCount', 'Season_Position', 'Season_Position_Total', 'Source_FrameCount', 'Source_SamplingCount', 'Source_StreamSize_Encoded', 'Source_StreamSize', 'Status', 'Stored_Height', 'Stored_Width', 'StreamCount', 'StreamKindID', 'StreamKindPos', 'StreamSize_Demuxed', 'StreamSize_Encoded', 'StreamSize', 'TextCount', 'Track_Position', 'Track_Position_Total', 'Video0_Delay', 'VideoCount', 'Width_CleanAperture', 'Width', 'Width_Offset', 'Width_Original'];
const FLOAT_FIELDS = ['Active_DisplayAspectRatio', 'BitRate_Encoded', 'BitRate_Maximum', 'BitRate_Minimum', 'BitRate', 'BitRate_Nominal', 'Bits-Pixel_Frame', 'BitsPixel_Frame', 'Compression_Ratio', 'Delay', 'Delay_Original', 'DisplayAspectRatio_CleanAperture', 'DisplayAspectRatio', 'DisplayAspectRatio_Original', 'Duration_End_Command', 'Duration_End', 'Duration_FirstFrame', 'Duration_LastFrame', 'Duration', 'Duration_Start2End', 'Duration_Start_Command', 'Duration_Start', 'Events_MinDuration', 'FrameRate_Maximum', 'FrameRate_Minimum', 'FrameRate', 'FrameRate_Nominal', 'FrameRate_Original_Den', 'FrameRate_Original', 'FrameRate_Original_Num', 'FrameRate_Real', 'Interleave_Duration', 'Interleave_Preload', 'Interleave_VideoFrames', 'MasteringDisplay_Luminance_Max', 'MasteringDisplay_Luminance_Min', 'MaxCLL', 'MaxCLL_Original', 'MaxFALL', 'MaxFALL_Original', 'OverallBitRate_Maximum', 'OverallBitRate_Minimum', 'OverallBitRate', 'OverallBitRate_Nominal', 'PixelAspectRatio_CleanAperture', 'PixelAspectRatio', 'PixelAspectRatio_Original', 'SamplesPerFrame', 'SamplingRate', 'Source_Duration_FirstFrame', 'Source_Duration_LastFrame', 'Source_Duration', 'TimeStamp_FirstFrame', 'Video_Delay'];

/**
 * MediaInfoLib's `(int64u)-1` file size: `Open_Buffer_Init()` then only moves the read position
 * instead of re-initializing the parser. The native file reader uses it for every seek.
 */
const POSITION_ONLY = -1;

/**
 * Status bits for `Open_Buffer_Continue()`.
 * Bit 0: container format recognized.
 * Bit 3: parser finished.
 */
const STATUS_IS_ACCEPTED = 0x01;
const STATUS_IS_FINISHED = 0x08;
const DEFAULT_OPTIONS = {
  coverData: false,
  chunkSize: 256 * 1024,
  format: 'object',
  full: false
};
/**
 * Wrapper for the MediaInfoLib WASM module.
 *
 * This class should not be instantiated directly. Use the {@link mediaInfoFactory} function
 * to create instances of `MediaInfo`.
 *
 * @typeParam TFormat - The format type, defaults to `object`.
 */
class MediaInfo {
  mediainfoModule;
  ptr;
  isAnalyzing = false;

  /** True if container format is recognized. */
  isFormatAccepted = false;

  /** @group General Use */
  options;

  /**
   * The constructor should not be called directly, instead use {@link mediaInfoFactory}.
   *
   * @hidden
   * @param mediainfoModule WASM module
   * @param options User options
   */
  constructor(mediainfoModule, options) {
    this.mediainfoModule = mediainfoModule;
    this.options = options;
    this.ptr = this.instantiateModuleInstance();
  }

  /**
   * Convenience method for analyzing a buffer chunk by chunk.
   *
   * @param size Return total buffer size in bytes.
   * @param readChunk Read chunk of data and return an {@link Uint8Array}.
   * @group General Use
   */

  /**
   * Convenience method for analyzing a buffer chunk by chunk.
   *
   * @param size Return total buffer size in bytes.
   * @param readChunk Read chunk of data and return an {@link Uint8Array}.
   * @param callback Function that is called once the processing is done
   * @group General Use
   */

  analyzeData(size, readChunk, callback) {
    // Support promise signature
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        const resultCb = (result, error) => {
          this.isAnalyzing = false;
          if (error || !result) {
            reject(unknownToError(error));
          } else {
            resolve(result);
          }
        };
        this.analyzeData(size, readChunk, resultCb);
      });
    }
    if (this.isAnalyzing) {
      callback(null, new Error('cannot start a new analysis while another is in progress'));
      return;
    }
    this.reset();
    this.isAnalyzing = true;
    const finalize = () => {
      try {
        this.openBufferFinalize();
        const result = this.inform();
        callback(this.options.format === 'object' ? this.parseResultJson(result) : result);
      } finally {
        this.isAnalyzing = false;
      }
    };
    const fail = error => {
      this.isAnalyzing = false;
      callback(null, unknownToError(error));
    };
    let offset = 0;
    let lastSeekTo = -1;
    const runReadDataLoop = async fileSize => {
      /**
       * Hand one chunk to MediaInfoLib and update the read position.
       *
       * @returns `true` when more data has to be read
       */
      const shouldReadMore = data => {
        if (data.length === 0) {
          return false;
        }
        const isFinished = this.openBufferContinue(data, data.length);
        const seekTo = this.openBufferContinueGotoGet();

        // A pending seek wins over the "finished" flag: MediaInfoLib can raise both in the same
        // call, e.g. when the MP4 parser jumps back to a codec config box after having been given
        // the whole file at once (issue #188). Skipping the seek loses the fields it would fill.
        if (seekTo !== -1) {
          // Past the end of the file, or asked for a second time without any progress in between:
          // the parser can not be satisfied, so let the finalizer wrap it up. Only catches a parser
          // stuck on one target, not an alternating X->Y->X cycle.
          if (seekTo === lastSeekTo || seekTo >= fileSize) {
            return false;
          }
          offset = seekTo;
          lastSeekTo = seekTo;
          // While the parser still expects data, a seek is just a reposition: passing the known
          // file size runs a full re-init, which clears the durations collected so far and aborts
          // the walk FLV does backwards from end of file to find them (issue #164). Only a parser
          // that already reported "finished" needs the full re-init, to get that flag cleared
          // (issue #188).
          // Known limit: if format is only recognized from the whole file, MediaInfoLib
          // triggers the seek and "finished" together, making re-init unavoidable.
          // nextReadSize() avoids this for header-recognized formats.
          this.openBufferInit(isFinished ? fileSize : POSITION_ONLY, seekTo);
          return true;
        }
        lastSeekTo = -1;
        offset += data.length;
        return offset < fileSize && !isFinished;
      };

      /**
       * Number of bytes to request for the read at `offset`.
       *
       * MediaInfoLib ends format detection when a read reaches EOF. If the whole file is read,
       * it may hand the container to a parser that already finished. Re-initializing
       * that parser later can cause duplicate header values (issue #190) or missing fields
       * if no seek is possible (e.g. MPEG-TS).
       *
       * Halving the read during detection prevents premature EOF, mimicking a streaming
       * reader. Truncating the tail (all but the last byte) is avoided as some parsers
       * (e.g. Matroska) stop analysis upon detecting a truncated container.
       */
      const nextReadSize = () => {
        const remaining = fileSize - offset;
        const size = Math.min(this.options.chunkSize, remaining);
        const shouldStopBeforeEndOfFile = !this.isFormatAccepted && size > 1 && size === remaining;
        return shouldStopBeforeEndOfFile ? Math.ceil(size / 2) : size;
      };
      try {
        this.openBufferInit(fileSize, offset);
        for (;;) {
          // await keeps this iterative; mutual recursion with shouldReadMore() would add stack frames per chunk.
          const data = await readChunk(nextReadSize(), offset);
          if (!shouldReadMore(data)) {
            break;
          }
        }
        finalize();
      } catch (error) {
        fail(error);
      }
    };
    const fileSizeValue = typeof size === 'function' ? size() : size;
    if (fileSizeValue instanceof Promise) {
      fileSizeValue.then(runReadDataLoop).catch(fail);
    } else {
      void runReadDataLoop(fileSizeValue);
    }
  }

  /**
   * Close the MediaInfoLib WASM instance.
   *
   * @group General Use
   */
  close() {
    if (this.ptr) {
      this.mediainfoModule._mi_close(this.ptr);
    }
  }

  /**
   * Reset the MediaInfoLib WASM instance to its initial state.
   *
   * This method ensures that the instance is ready for a new parse.
   * @group General Use
   */
  reset() {
    if (this.ptr) {
      this.mediainfoModule._mi_delete(this.ptr);
    }
    this.isFormatAccepted = false;
    this.ptr = this.instantiateModuleInstance();
  }

  /**
   * Receive result data from the WASM instance.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @returns Result data (format can be configured in options)
   * @group Low-level
   */
  inform() {
    const resPtr = this.mediainfoModule._mi_inform(this.ptr);
    return this.mediainfoModule.UTF8ToString(resPtr);
  }

  /**
   * Send more data to the WASM instance.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @param data Data buffer
   * @param size Buffer size
   * @returns Processing state: `0` (no bits set) = not finished, Bit `0` set = enough data read for providing information
   * @group Low-level
   */
  openBufferContinue(data, size) {
    // Copy data to Wasm heap
    const dataPtr = this.mediainfoModule._malloc(size);
    this.mediainfoModule.HEAPU8.set(data, dataPtr);
    const result = this.mediainfoModule._mi_open_buffer_continue(this.ptr, dataPtr, size);
    this.mediainfoModule._free(dataPtr);
    if (result & STATUS_IS_ACCEPTED) {
      this.isFormatAccepted = true;
    }
    return !!(result & STATUS_IS_FINISHED);
  }

  /**
   * Retrieve seek position from WASM instance.
   * The MediaInfoLib function `Open_Buffer_GoTo` returns an integer with 64 bit precision.
   * It would be cut at 32 bit due to the JavaScript bindings. Here we transport the low and high
   * parts separately and put them together.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @returns Seek position (where MediaInfoLib wants go in the data buffer)
   * @group Low-level
   */
  openBufferContinueGotoGet() {
    // BigInt return value converted to standard JS number
    const seekTo = this.mediainfoModule._mi_open_buffer_continue_goto_get(this.ptr);
    return Number(seekTo);
  }

  /**
   * Inform MediaInfoLib that no more data is being read.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @group Low-level
   */
  openBufferFinalize() {
    this.mediainfoModule._mi_open_buffer_finalize(this.ptr);
  }

  /**
   * Prepare MediaInfoLib to process a data buffer.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @param size Expected buffer size, or -1 to keep the parser state and only move the read
   * position
   * @param offset Buffer offset
   * @group Low-level
   */
  openBufferInit(size, offset) {
    // Use BigInt for 64-bit compatibility
    this.mediainfoModule._mi_open_buffer_init(this.ptr, BigInt(size), BigInt(offset));
  }

  /**
   * Parse result JSON. Convert integer/float fields.
   *
   * @param result Serialized JSON from MediaInfo
   * @returns Parsed JSON object
   */
  parseResultJson(resultString) {
    const intFields = INT_FIELDS;
    const floatFields = FLOAT_FIELDS;

    // Parse JSON
    const result = JSON.parse(resultString);
    if (result.media) {
      const newMedia = {
        ...result.media,
        track: []
      };
      if (Array.isArray(result.media.track)) {
        for (const track of result.media.track) {
          let newTrack = {
            '@type': track['@type']
          };
          for (const [key, val] of Object.entries(track)) {
            if (typeof val === 'string' && intFields.includes(key)) {
              newTrack = {
                ...newTrack,
                [key]: Number.parseInt(val, 10)
              };
            } else if (typeof val === 'string' && floatFields.includes(key)) {
              newTrack = {
                ...newTrack,
                [key]: Number.parseFloat(val)
              };
            } else {
              newTrack = {
                ...newTrack,
                [key]: val
              };
            }
          }
          newMedia.track.push(newTrack);
        }
      }
      return {
        ...result,
        media: newMedia
      };
    }
    return result;
  }

  /**
   * Instantiate a new WASM module instance.
   *
   * @returns MediaInfo module instance
   */
  instantiateModuleInstance() {
    const format = this.options.format === 'object' ? 'JSON' : this.options.format;
    const bytesNeeded = this.mediainfoModule.lengthBytesUTF8(format) + 1;
    const formatPtr = this.mediainfoModule._malloc(bytesNeeded);
    try {
      this.mediainfoModule.stringToUTF8(format, formatPtr, bytesNeeded);
      return this.mediainfoModule._mi_new(formatPtr, this.options.coverData ? 1 : 0, this.options.full ? 1 : 0);
    } finally {
      this.mediainfoModule._free(formatPtr);
    }
  }
}

async function Module(moduleArg = {}) {
  var Module = moduleArg;
  var quit_ = (status, toThrow) => {
    throw toThrow
  };
  var _scriptName = import.meta.url;
  var scriptDirectory = '';
  function locateFile(path) {
    if (Module['locateFile']) return Module['locateFile'](path, scriptDirectory)
    return scriptDirectory + path
  }
  var readAsync;
  {
    try {
      scriptDirectory = new URL('.', _scriptName).href;
    } catch {}
    readAsync = async (url) => {
      var response = await fetch(url, { credentials: 'same-origin' });
      if (response.ok) return response.arrayBuffer()
      throw new Error(response.status + ' : ' + response.url)
    };
  }
  var out = console.log.bind(console);
  var err = console.error.bind(console);
  var ABORT = false;
  var EXITSTATUS;
  function getMemoryBuffer() {
    return wasmMemory.buffer
  }
  function updateMemoryViews() {
    if (HEAP8?.buffer?.resizable) return
    var b = getMemoryBuffer();
    HEAP8 = new Int8Array(b);
    Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
    HEAP32 = new Int32Array(b);
    HEAPU32 = new Uint32Array(b);
  }
  function initRuntime() {
    wasmExports['n']();
  }
  function abort(what) {
    Module['onAbort']?.(what);
    what = `Aborted(${what})`;
    err(what);
    ABORT = true;
    what += '. Build with -sASSERTIONS for more info.';
    throw new WebAssembly.RuntimeError(what)
  }
  var wasmBinaryFile;
  function findWasmBinary() {
    if (Module['locateFile']) return locateFile('MediaInfoModule.wasm')
    return new URL('MediaInfoModule.wasm', import.meta.url).href
  }
  function getBinarySync(file) {
    throw 'both async and sync fetching of the wasm failed'
  }
  async function getWasmBinary(binaryFile) {
    try {
        return await readAsync(binaryFile)
      } catch {}
    return getBinarySync()
  }
  async function instantiateArrayBuffer(binaryFile, imports) {
    try {
      var binary = await getWasmBinary(binaryFile);
      var instance = await WebAssembly.instantiate(binary, imports);
      return instance
    } catch (reason) {
      err(`failed to asynchronously prepare wasm: ${reason}`);
      abort(reason);
    }
  }
  async function instantiateAsync(binary, binaryFile, imports) {
    try {
        var response = fetch(binaryFile, { credentials: 'same-origin' });
        var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
        return instantiationResult
      } catch (reason) {
        err(`wasm streaming compile failed: ${reason}`);
        err('falling back to ArrayBuffer instantiation');
      }
    return instantiateArrayBuffer(binaryFile, imports)
  }
  function getWasmImports() {
    var imports = { a: wasmImports };
    return imports
  }
  class ExitStatus {
    name = 'ExitStatus'
    constructor(status) {
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
  }
  var HEAP8;
  var HEAP32;
  var bigintToI53Checked = (num) =>
    num < -9007199254740992 || num > 9007199254740992 ? NaN : Number(num);
  var handleException = (e) => {
    if (e instanceof ExitStatus || e == 'unwind') return EXITSTATUS
    quit_(0, e);
  };
  var _proc_exit = (code) => {
    EXITSTATUS = code;
    quit_(0, new ExitStatus(code));
  };
  var callUserCallback = (func, ...args) => {
    if (ABORT) return
    try {
      return func(...args)
    } catch (e) {
      handleException(e);
    } finally {
    }
  };
  var timers = {};
  var _emscripten_get_now = () => performance.now();
  var HEAPU32;
  var HEAPU8;
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
    if (!(maxBytesToWrite > 0)) return 0
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i = 0; i < str.length; ++i) {
      var u = str.codePointAt(i);
      if (u <= 127) {
        if (outIdx >= endIdx) break
        heap[outIdx++] = u;
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break
        heap[outIdx++] = 192 | (u >> 6);
        heap[outIdx++] = 128 | (u & 63);
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break
        heap[outIdx++] = 224 | (u >> 12);
        heap[outIdx++] = 128 | ((u >> 6) & 63);
        heap[outIdx++] = 128 | (u & 63);
      } else {
        if (outIdx + 3 >= endIdx) break
        heap[outIdx++] = 240 | (u >> 18);
        heap[outIdx++] = 128 | ((u >> 12) & 63);
        heap[outIdx++] = 128 | ((u >> 6) & 63);
        heap[outIdx++] = 128 | (u & 63);
        i++;
      }
    }
    heap[outIdx] = 0;
    return outIdx - startIdx
  };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) =>
    stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
  var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
  var getHeapMax = () => 2147483648;
  var growMemory = (size) => {
    var oldHeapSize = wasmMemory.buffer.byteLength;
    var pages = ((size - oldHeapSize + 65535) / 65536) | 0;
    try {
      wasmMemory.grow(pages);
      updateMemoryViews();
      return 1
    } catch (e) {}
  };
  var ENV = {};
  var getExecutableName = () => './this.program';
  var getEnvStrings = () => {
    if (!getEnvStrings.strings) {
      var lang = (globalThis.navigator?.language ?? 'C').replace('-', '_') + '.UTF-8';
      var env = {
        USER: 'web_user',
        LOGNAME: 'web_user',
        PATH: '/',
        PWD: '/',
        HOME: '/home/web_user',
        LANG: lang,
        _: getExecutableName(),
      };
      for (var x in ENV)
        if (ENV[x] === void 0) delete env[x];
        else env[x] = ENV[x];
      var strings = [];
      for (var x in env) strings.push(`${x}=${env[x]}`);
      getEnvStrings.strings = strings;
    }
    return getEnvStrings.strings
  };
  var lengthBytesUTF8 = (str) => {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      var u = str.codePointAt(i);
      if (u <= 127) len++;
      else if (u <= 2047) len += 2;
      else if (u <= 65535) len += 3;
      else {
        len += 4;
        i++;
      }
    }
    return len
  };
  var UTF8Decoder = new TextDecoder();
  var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
    var maxIdx = idx + maxBytesToRead;
    if (ignoreNul) return maxIdx
    while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
    return idx
  };
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
    var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
    return UTF8Decoder.decode(
      heapOrArray.buffer
        ? heapOrArray.subarray(idx, endPtr)
        : new Uint8Array(heapOrArray.slice(idx, endPtr))
    )
  };
  var printCharBuffers = [null, [], []];
  var printChar = (stream, curr) => {
    var buffer = printCharBuffers[stream];
    if (!curr || curr === 10) {
(stream === 1 ? out : err)(UTF8ArrayToString(buffer));
      buffer.length = 0;
    } else buffer.push(curr);
  };
  if (Module['print']) out = Module['print'];
  if (Module['printErr']) err = Module['printErr'];
  Module['UTF8ToString'] = (ptr, maxBytesToRead, ignoreNul) => {
    if (!ptr) return ''
    var end = findStringEnd(HEAPU8, ptr, maxBytesToRead, ignoreNul);
    return UTF8Decoder.decode(HEAPU8.subarray(ptr, end))
  };
  Module['stringToUTF8'] = stringToUTF8;
  Module['lengthBytesUTF8'] = lengthBytesUTF8;
  var __emscripten_timeout, wasmMemory;
  function assignWasmExports(wasmExports) {
    Module['_mi_new'] = wasmExports['o'];
    Module['_mi_delete'] = wasmExports['p'];
    Module['_mi_open_buffer_init'] = wasmExports['q'];
    Module['_mi_open_buffer_continue'] = wasmExports['r'];
    Module['_mi_open_buffer_continue_goto_get'] = wasmExports['s'];
    Module['_mi_open_buffer_finalize'] = wasmExports['t'];
    Module['_mi_inform'] = wasmExports['u'];
    Module['_mi_close'] = wasmExports['v'];
    Module['_malloc'] = wasmExports['w'];
    Module['_free'] = wasmExports['x'];
    __emscripten_timeout = wasmExports['y'];
    wasmMemory = wasmExports['m'];
    wasmExports['__indirect_function_table'];
  }
  var wasmImports = {
    l: () => abort(''),
    c: () => {
    },
    d: function (time, tmPtr) {
      time = bigintToI53Checked(time);
      var date = new Date(time * 1e3);
      if (isNaN(date.getTime())) return 1
      HEAP32[tmPtr >> 2] = date.getUTCSeconds();
      HEAP32[(tmPtr + 4) >> 2] = date.getUTCMinutes();
      HEAP32[(tmPtr + 8) >> 2] = date.getUTCHours();
      HEAP32[(tmPtr + 12) >> 2] = date.getUTCDate();
      HEAP32[(tmPtr + 16) >> 2] = date.getUTCMonth();
      HEAP32[(tmPtr + 20) >> 2] = date.getUTCFullYear() - 1900;
      HEAP32[(tmPtr + 24) >> 2] = date.getUTCDay();
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = ((date.getTime() - start) / 864e5) | 0;
      HEAP32[(tmPtr + 28) >> 2] = yday;
      return 0
    },
    h: (which, timeout_ms) => {
      if (timers[which]) {
        clearTimeout(timers[which].id);
        delete timers[which];
      }
      if (!timeout_ms) return 0
      var id = setTimeout(() => {
        delete timers[which];
        callUserCallback(__emscripten_timeout, which, _emscripten_get_now());
      }, timeout_ms);
      timers[which] = { id, timeout_ms };
      return 0
    },
    e: (timezone, daylight, std_name, dst_name) => {
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
      HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
      HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
      var extractZone = (timezoneOffset) => {
        var sign = timezoneOffset >= 0 ? '-' : '+';
        var absOffset = Math.abs(timezoneOffset);
        var hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
        var minutes = String(absOffset % 60).padStart(2, '0');
        return `UTC${sign}${hours}${minutes}`
      };
      var winterName = extractZone(winterOffset);
      var summerName = extractZone(summerOffset);
      if (summerOffset < winterOffset) {
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    },
    k: () => Date.now(),
    i: (requestedSize) => {
      var oldSize = HEAPU8.length;
      requestedSize >>>= 0;
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) return false
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(
          maxHeapSize,
          alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536)
        );
        var replacement = growMemory(newSize);
        if (replacement) return true
      }
      return false
    },
    j: (__environ, environ_buf) => {
      var bufSize = 0;
      var envp = 0;
      for (var string of getEnvStrings()) {
        var ptr = environ_buf + bufSize;
        HEAPU32[(__environ + envp) >> 2] = ptr;
        bufSize += stringToUTF8(string, ptr, 1 / 0) + 1;
        envp += 4;
      }
      return 0
    },
    a: (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[penviron_count >> 2] = strings.length;
      var bufSize = 0;
      for (var string of strings) bufSize += lengthBytesUTF8(string) + 1;
      HEAPU32[penviron_buf_size >> 2] = bufSize;
      return 0
    },
    f: () => 52,
    g: (fd, iov, iovcnt, pnum) => {
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[(iov + 4) >> 2];
        iov += 8;
        for (var j = 0; j < len; j++) printChar(fd, HEAPU8[ptr + j]);
        num += len;
      }
      HEAPU32[pnum >> 2] = num;
      return 0
    },
    b: _proc_exit,
  };
  var wasmExports;
  wasmExports = await (async function () {
    function receiveInstance(instance) {
      wasmExports = instance.exports;
      assignWasmExports(wasmExports);
      updateMemoryViews();
      return wasmExports
    }
    var info = getWasmImports();
    wasmBinaryFile ??= findWasmBinary();
    var result = await instantiateAsync(void 0, wasmBinaryFile, info);
    var exports = (function (result) {
      return receiveInstance(result['instance'])
    })(result);
    return exports
  })();
  await (async function () {
    if (ABORT) return
    initRuntime();
  })();
  return Module
}

const noopPrint = () => {
  // No-op
};
function defaultLocateFile(path, prefix) {
  try {
    const url = new URL(prefix);
    if (url.pathname === '/') {
      return `${prefix}mediainfo.js/dist/${path}`;
    }
  } catch {
    // empty
  }
  return `${prefix}../${path}`;
}

/**
 * Creates a {@link MediaInfo} instance with the specified options.
 *
 * @typeParam TFormat - The format type, defaults to `object`.
 * @param options - Configuration options for creating the {@link MediaInfo} instance.
 * @returns A promise that resolves to a {@link MediaInfo} instance when no callback is provided.
 */

/**
 * Creates a {@link MediaInfo} instance with the specified options and executes the callback.
 *
 * @typeParam TFormat - The format type, defaults to `object`.
 * @param options - Configuration options for creating the {@link MediaInfo} instance.
 * @param callback - Function to call with the {@link MediaInfo} instance.
 * @param errCallback - Optional function to call on error.
 */

function mediaInfoFactory(options = {}, callback, errCallback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      mediaInfoFactory(options, resolve, reject);
    });
  }
  const {
    locateFile,
    ...mergedOptions
  } = {
    ...DEFAULT_OPTIONS,
    ...options,
    format: options.format ?? DEFAULT_OPTIONS.format
  };

  // Options passed to the Emscripten module loader
  const mediaInfoModuleFactoryOpts = {
    // Silence all print in module
    print: noopPrint,
    printErr: noopPrint,
    locateFile: locateFile ?? defaultLocateFile,
    onAbort: err => {
      if (errCallback) {
        errCallback(err);
      }
    }
  };

  // Fetch and load WASM module
  Module(mediaInfoModuleFactoryOpts).then(wasmModule => {
    callback(new MediaInfo(wasmModule, mergedOptions));
  }).catch(error => {
    if (errCallback) {
      errCallback(error);
    }
  });
}

/**
 * Checks if a given object is of a specified track type.
 *
 * @template T - The type of track to check for.
 * @param thing - The object to check.
 * @param type - The track type to check against.
 * @returns A boolean indicating whether the object is of the specified track type.
 */
function isTrackType(thing, type) {
  return thing !== null && typeof thing === 'object' && thing['@type'] === type;
}

export { mediaInfoFactory as default, isTrackType, mediaInfoFactory };
//# sourceMappingURL=index.js.map
