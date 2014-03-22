
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    }
    var PACKAGE_NAME = 'tyranoforce.data';
    var REMOTE_PACKAGE_NAME = (Module['filePackagePrefixURL'] || '') + 'tyranoforce.data';
    var REMOTE_PACKAGE_SIZE = 864984;
    var PACKAGE_UUID = 'ae41334e-8968-4eb2-8adf-e2e8b0640d86';
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

function assert(check, msg) {
  if (!check) throw msg + new Error().stack;
}

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };
      new DataRequest(0, 864984, 0, 0).open('GET', '/assets.bin');

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
      // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though.
      var ptr = Module['_malloc'](byteArray.length);
      Module['HEAPU8'].set(byteArray, ptr);
      DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
          DataRequest.prototype.requests["/assets.bin"].onload();
          Module['removeRunDependency']('datafile_tyranoforce.data');

    };
    Module['addRunDependency']('datafile_tyranoforce.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

})();

// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  if (!Module['printErr']) Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };

  var nodeFS = require('fs');
  var nodePath = require('path');

  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };

  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };

  Module['load'] = function load(f) {
    globalEval(read(f));
  };

  Module['arguments'] = process['argv'].slice(2);

  module['exports'] = Module;
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }

  Module['readBinary'] = function readBinary(f) {
    return read(f, 'binary');
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  this['Module'] = Module;

  eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined"); // wipe out the SpiderMonkey shell 'gc' function, which can confuse closure (uses it as a minified name, and it is then initted to a non-falsey value unexpectedly)
}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WEB) {
    this['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}



// === Auto-generated preamble library stuff ===

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      return '(((' +target + ')+' + (quantum-1) + ')&' + -quantum + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?\{ ?[^}]* ?\}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    var index = 0;
    type.flatIndexes = type.fields.map(function(field) {
      index++;
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        if (field[1] === '0') {
          // this is [0 x something]. When inside another structure like here, it must be at the end,
          // and it adds no size
          // XXX this happens in java-nbody for example... assert(index === type.fields.length, 'zero-length in the middle!');
          size = 0;
          if (Types.types[field]) {
            alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
          } else {
            alignSize = type.alignSize || QUANTUM_SIZE;
          }
        } else {
          size = Types.types[field].flatSize;
          alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
        }
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else if (field[0] === '<') {
        // vector type
        size = alignSize = Types.types[field].flatSize; // fully aligned
      } else if (field[0] === 'i') {
        // illegal integer field, that could not be legalized because it is an internal structure field
        // it is ok to have such fields, if we just use them as markers of field size and nothing more complex
        size = alignSize = parseInt(field.substr(1))/8;
        assert(size % 1 === 0, 'cannot handle non-byte-size field ' + field);
      } else {
        assert(false, 'invalid type for calculateStructAlignment');
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    if (type.name_ && type.name_[0] === '[') {
      // arrays have 2 elements, so we get the proper difference. then we scale here. that way we avoid
      // allocating a potentially huge array for [999999 x i8] etc.
      type.flatSize = parseInt(type.name_.substr(1))*type.flatSize/2;
    }
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    code = Pointer_stringify(code);
    if (code[0] === '"') {
      // tolerate EM_ASM("..code..") even though EM_ASM(..code..) is correct
      if (code.indexOf('"', 1) === code.length-1) {
        code = code.substr(1, code.length-2);
      } else {
        // something invalid happened, e.g. EM_ASM("..code($0)..", input)
        abort('invalid EM_ASM input |' + code + '|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)');
      }
    }
    return Runtime.asmConstCache[code] = eval('(function(' + args.join(',') + '){ ' + code + ' })'); // new Function does not allow upvars in node
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;

      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }

      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }

      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          Math.floor((codePoint - 0x10000) / 0x400) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  getCompilerSetting: function (name) {
    throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+7)&-8); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = (((STATICTOP)+7)&-8); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + size)|0;DYNAMICTOP = (((DYNAMICTOP)+7)&-8); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*(+4294967296))) : ((+((low>>>0)))+((+((high|0)))*(+4294967296)))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}


Module['Runtime'] = Runtime;









//========================================
// Runtime essentials
//========================================

var __THREW__ = 0; // Used in checking for thrown exceptions.

var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays; note that arrays are 8-bit).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = Module['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      value = intArrayFromString(value);
      type = 'array';
    }
    if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}

// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;

// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;

// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module['allocate'] = allocate;

function Pointer_stringify(ptr, /* optional */ length) {
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }

  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF16ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16LE form. The copy will require at most (str.length*2+1)*2 bytes of space in the HEAP.
function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0;
}
Module['stringToUTF16'] = stringToUTF16;

// Given a pointer 'ptr' to a null-terminated UTF32LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32LE form. The copy will require at most (str.length+1)*4 bytes of space in the HEAP,
// but can use less, since str.length does not return the number of characters in the string, but the number of UTF-16 code units in the string.
function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit;
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0;
}
Module['stringToUTF32'] = stringToUTF32;

function demangle(func) {
  var i = 3;
  // params, etc.
  var basicTypes = {
    'v': 'void',
    'b': 'bool',
    'c': 'char',
    's': 'short',
    'i': 'int',
    'l': 'long',
    'f': 'float',
    'd': 'double',
    'w': 'wchar_t',
    'a': 'signed char',
    'h': 'unsigned char',
    't': 'unsigned short',
    'j': 'unsigned int',
    'm': 'unsigned long',
    'x': 'long long',
    'y': 'unsigned long long',
    'z': '...'
  };
  var subs = [];
  var first = true;
  function dump(x) {
    //return;
    if (x) Module.print(x);
    Module.print(func);
    var pre = '';
    for (var a = 0; a < i; a++) pre += ' ';
    Module.print (pre + '^');
  }
  function parseNested() {
    i++;
    if (func[i] === 'K') i++; // ignore const
    var parts = [];
    while (func[i] !== 'E') {
      if (func[i] === 'S') { // substitution
        i++;
        var next = func.indexOf('_', i);
        var num = func.substring(i, next) || 0;
        parts.push(subs[num] || '?');
        i = next+1;
        continue;
      }
      if (func[i] === 'C') { // constructor
        parts.push(parts[parts.length-1]);
        i += 2;
        continue;
      }
      var size = parseInt(func.substr(i));
      var pre = size.toString().length;
      if (!size || !pre) { i--; break; } // counter i++ below us
      var curr = func.substr(i + pre, size);
      parts.push(curr);
      subs.push(curr);
      i += pre + size;
    }
    i++; // skip E
    return parts;
  }
  function parse(rawList, limit, allowVoid) { // main parser
    limit = limit || Infinity;
    var ret = '', list = [];
    function flushList() {
      return '(' + list.join(', ') + ')';
    }
    var name;
    if (func[i] === 'N') {
      // namespaced N-E
      name = parseNested().join('::');
      limit--;
      if (limit === 0) return rawList ? [name] : name;
    } else {
      // not namespaced
      if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
      var size = parseInt(func.substr(i));
      if (size) {
        var pre = size.toString().length;
        name = func.substr(i + pre, size);
        i += pre + size;
      }
    }
    first = false;
    if (func[i] === 'I') {
      i++;
      var iList = parse(true);
      var iRet = parse(true, 1, true);
      ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
    } else {
      ret = name;
    }
    paramLoop: while (i < func.length && limit-- > 0) {
      //dump('paramLoop');
      var c = func[i++];
      if (c in basicTypes) {
        list.push(basicTypes[c]);
      } else {
        switch (c) {
          case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
          case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
          case 'L': { // literal
            i++; // skip basic type
            var end = func.indexOf('E', i);
            var size = end - i;
            list.push(func.substr(i, size));
            i += size + 2; // size + 'EE'
            break;
          }
          case 'A': { // array
            var size = parseInt(func.substr(i));
            i += size.toString().length;
            if (func[i] !== '_') throw '?';
            i++; // skip _
            list.push(parse(true, 1, true)[0] + ' [' + size + ']');
            break;
          }
          case 'E': break paramLoop;
          default: ret += '?' + c; break paramLoop;
        }
      }
    }
    if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
    return rawList ? list : ret + flushList();
  }
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    return parse();
  } catch(e) {
    return func;
  }
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}

function stackTrace() {
  var stack = new Error().stack;
  return stack ? demangleAll(stack) : '(no stack trace available)'; // Stack trace is not available at least on IE10 and Safari 6.
}

// Memory management

var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk

function enlargeMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.');
}

var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;

var totalMemory = 4096;
while (totalMemory < TOTAL_MEMORY || totalMemory < 2*TOTAL_STACK) {
  if (totalMemory < 16*1024*1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16*1024*1024
  }
}
if (totalMemory !== TOTAL_MEMORY) {
  Module.printErr('increasing TOTAL_MEMORY to ' + totalMemory + ' to be more reasonable');
  TOTAL_MEMORY = totalMemory;
}

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'JS engine does not provide full typed array support');

var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);

// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');

Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;

function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}

function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;

// Tools

// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;

// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))|0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}

// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


var memoryInitializer = null;

// === Body ===
var __ZTVN10__cxxabiv117__class_type_infoE = 25552;
var __ZTVN10__cxxabiv120__si_class_type_infoE = 25592;




STATIC_BASE = 8;

STATICTOP = STATIC_BASE + Runtime.alignMemory(26419);
/* global initializers */ __ATINIT__.push({ func: function() { __GLOBAL__I_a() } });


/* memory initializer */ allocate([0,0,0,0,150,48,7,119,44,97,14,238,186,81,9,153,25,196,109,7,143,244,106,112,53,165,99,233,163,149,100,158,50,136,219,14,164,184,220,121,30,233,213,224,136,217,210,151,43,76,182,9,189,124,177,126,7,45,184,231,145,29,191,144,100,16,183,29,242,32,176,106,72,113,185,243,222,65,190,132,125,212,218,26,235,228,221,109,81,181,212,244,199,133,211,131,86,152,108,19,192,168,107,100,122,249,98,253,236,201,101,138,79,92,1,20,217,108,6,99,99,61,15,250,245,13,8,141,200,32,110,59,94,16,105,76,228,65,96,213,114,113,103,162,209,228,3,60,71,212,4,75,253,133,13,210,107,181,10,165,250,168,181,53,108,152,178,66,214,201,187,219,64,249,188,172,227,108,216,50,117,92,223,69,207,13,214,220,89,61,209,171,172,48,217,38,58,0,222,81,128,81,215,200,22,97,208,191,181,244,180,33,35,196,179,86,153,149,186,207,15,165,189,184,158,184,2,40,8,136,5,95,178,217,12,198,36,233,11,177,135,124,111,47,17,76,104,88,171,29,97,193,61,45,102,182,144,65,220,118,6,113,219,1,188,32,210,152,42,16,213,239,137,133,177,113,31,181,182,6,165,228,191,159,51,212,184,232,162,201,7,120,52,249,0,15,142,168,9,150,24,152,14,225,187,13,106,127,45,61,109,8,151,108,100,145,1,92,99,230,244,81,107,107,98,97,108,28,216,48,101,133,78,0,98,242,237,149,6,108,123,165,1,27,193,244,8,130,87,196,15,245,198,217,176,101,80,233,183,18,234,184,190,139,124,136,185,252,223,29,221,98,73,45,218,21,243,124,211,140,101,76,212,251,88,97,178,77,206,81,181,58,116,0,188,163,226,48,187,212,65,165,223,74,215,149,216,61,109,196,209,164,251,244,214,211,106,233,105,67,252,217,110,52,70,136,103,173,208,184,96,218,115,45,4,68,229,29,3,51,95,76,10,170,201,124,13,221,60,113,5,80,170,65,2,39,16,16,11,190,134,32,12,201,37,181,104,87,179,133,111,32,9,212,102,185,159,228,97,206,14,249,222,94,152,201,217,41,34,152,208,176,180,168,215,199,23,61,179,89,129,13,180,46,59,92,189,183,173,108,186,192,32,131,184,237,182,179,191,154,12,226,182,3,154,210,177,116,57,71,213,234,175,119,210,157,21,38,219,4,131,22,220,115,18,11,99,227,132,59,100,148,62,106,109,13,168,90,106,122,11,207,14,228,157,255,9,147,39,174,0,10,177,158,7,125,68,147,15,240,210,163,8,135,104,242,1,30,254,194,6,105,93,87,98,247,203,103,101,128,113,54,108,25,231,6,107,110,118,27,212,254,224,43,211,137,90,122,218,16,204,74,221,103,111,223,185,249,249,239,190,142,67,190,183,23,213,142,176,96,232,163,214,214,126,147,209,161,196,194,216,56,82,242,223,79,241,103,187,209,103,87,188,166,221,6,181,63,75,54,178,72,218,43,13,216,76,27,10,175,246,74,3,54,96,122,4,65,195,239,96,223,85,223,103,168,239,142,110,49,121,190,105,70,140,179,97,203,26,131,102,188,160,210,111,37,54,226,104,82,149,119,12,204,3,71,11,187,185,22,2,34,47,38,5,85,190,59,186,197,40,11,189,178,146,90,180,43,4,106,179,92,167,255,215,194,49,207,208,181,139,158,217,44,29,174,222,91,176,194,100,155,38,242,99,236,156,163,106,117,10,147,109,2,169,6,9,156,63,54,14,235,133,103,7,114,19,87,0,5,130,74,191,149,20,122,184,226,174,43,177,123,56,27,182,12,155,142,210,146,13,190,213,229,183,239,220,124,33,223,219,11,212,210,211,134,66,226,212,241,248,179,221,104,110,131,218,31,205,22,190,129,91,38,185,246,225,119,176,111,119,71,183,24,230,90,8,136,112,106,15,255,202,59,6,102,92,11,1,17,255,158,101,143,105,174,98,248,211,255,107,97,69,207,108,22,120,226,10,160,238,210,13,215,84,131,4,78,194,179,3,57,97,38,103,167,247,22,96,208,77,71,105,73,219,119,110,62,74,106,209,174,220,90,214,217,102,11,223,64,240,59,216,55,83,174,188,169,197,158,187,222,127,207,178,71,233,255,181,48,28,242,189,189,138,194,186,202,48,147,179,83,166,163,180,36,5,54,208,186,147,6,215,205,41,87,222,84,191,103,217,35,46,122,102,179,184,74,97,196,2,27,104,93,148,43,111,42,55,190,11,180,161,142,12,195,27,223,5,90,141,239,2,45,0,0,0,0,65,49,27,25,130,98,54,50,195,83,45,43,4,197,108,100,69,244,119,125,134,167,90,86,199,150,65,79,8,138,217,200,73,187,194,209,138,232,239,250,203,217,244,227,12,79,181,172,77,126,174,181,142,45,131,158,207,28,152,135,81,18,194,74,16,35,217,83,211,112,244,120,146,65,239,97,85,215,174,46,20,230,181,55,215,181,152,28,150,132,131,5,89,152,27,130,24,169,0,155,219,250,45,176,154,203,54,169,93,93,119,230,28,108,108,255,223,63,65,212,158,14,90,205,162,36,132,149,227,21,159,140,32,70,178,167,97,119,169,190,166,225,232,241,231,208,243,232,36,131,222,195,101,178,197,218,170,174,93,93,235,159,70,68,40,204,107,111,105,253,112,118,174,107,49,57,239,90,42,32,44,9,7,11,109,56,28,18,243,54,70,223,178,7,93,198,113,84,112,237,48,101,107,244,247,243,42,187,182,194,49,162,117,145,28,137,52,160,7,144,251,188,159,23,186,141,132,14,121,222,169,37,56,239,178,60,255,121,243,115,190,72,232,106,125,27,197,65,60,42,222,88,5,79,121,240,68,126,98,233,135,45,79,194,198,28,84,219,1,138,21,148,64,187,14,141,131,232,35,166,194,217,56,191,13,197,160,56,76,244,187,33,143,167,150,10,206,150,141,19,9,0,204,92,72,49,215,69,139,98,250,110,202,83,225,119,84,93,187,186,21,108,160,163,214,63,141,136,151,14,150,145,80,152,215,222,17,169,204,199,210,250,225,236,147,203,250,245,92,215,98,114,29,230,121,107,222,181,84,64,159,132,79,89,88,18,14,22,25,35,21,15,218,112,56,36,155,65,35,61,167,107,253,101,230,90,230,124,37,9,203,87,100,56,208,78,163,174,145,1,226,159,138,24,33,204,167,51,96,253,188,42,175,225,36,173,238,208,63,180,45,131,18,159,108,178,9,134,171,36,72,201,234,21,83,208,41,70,126,251,104,119,101,226,246,121,63,47,183,72,36,54,116,27,9,29,53,42,18,4,242,188,83,75,179,141,72,82,112,222,101,121,49,239,126,96,254,243,230,231,191,194,253,254,124,145,208,213,61,160,203,204,250,54,138,131,187,7,145,154,120,84,188,177,57,101,167,168,75,152,131,59,10,169,152,34,201,250,181,9,136,203,174,16,79,93,239,95,14,108,244,70,205,63,217,109,140,14,194,116,67,18,90,243,2,35,65,234,193,112,108,193,128,65,119,216,71,215,54,151,6,230,45,142,197,181,0,165,132,132,27,188,26,138,65,113,91,187,90,104,152,232,119,67,217,217,108,90,30,79,45,21,95,126,54,12,156,45,27,39,221,28,0,62,18,0,152,185,83,49,131,160,144,98,174,139,209,83,181,146,22,197,244,221,87,244,239,196,148,167,194,239,213,150,217,246,233,188,7,174,168,141,28,183,107,222,49,156,42,239,42,133,237,121,107,202,172,72,112,211,111,27,93,248,46,42,70,225,225,54,222,102,160,7,197,127,99,84,232,84,34,101,243,77,229,243,178,2,164,194,169,27,103,145,132,48,38,160,159,41,184,174,197,228,249,159,222,253,58,204,243,214,123,253,232,207,188,107,169,128,253,90,178,153,62,9,159,178,127,56,132,171,176,36,28,44,241,21,7,53,50,70,42,30,115,119,49,7,180,225,112,72,245,208,107,81,54,131,70,122,119,178,93,99,78,215,250,203,15,230,225,210,204,181,204,249,141,132,215,224,74,18,150,175,11,35,141,182,200,112,160,157,137,65,187,132,70,93,35,3,7,108,56,26,196,63,21,49,133,14,14,40,66,152,79,103,3,169,84,126,192,250,121,85,129,203,98,76,31,197,56,129,94,244,35,152,157,167,14,179,220,150,21,170,27,0,84,229,90,49,79,252,153,98,98,215,216,83,121,206,23,79,225,73,86,126,250,80,149,45,215,123,212,28,204,98,19,138,141,45,82,187,150,52,145,232,187,31,208,217,160,6,236,243,126,94,173,194,101,71,110,145,72,108,47,160,83,117,232,54,18,58,169,7,9,35,106,84,36,8,43,101,63,17,228,121,167,150,165,72,188,143,102,27,145,164,39,42,138,189,224,188,203,242,161,141,208,235,98,222,253,192,35,239,230,217,189,225,188,20,252,208,167,13,63,131,138,38,126,178,145,63,185,36,208,112,248,21,203,105,59,70,230,66,122,119,253,91,181,107,101,220,244,90,126,197,55,9,83,238,118,56,72,247,177,174,9,184,240,159,18,161,51,204,63,138,114,253,36,147,0,0,0,0,55,106,194,1,110,212,132,3,89,190,70,2,220,168,9,7,235,194,203,6,178,124,141,4,133,22,79,5,184,81,19,14,143,59,209,15,214,133,151,13,225,239,85,12,100,249,26,9,83,147,216,8,10,45,158,10,61,71,92,11,112,163,38,28,71,201,228,29,30,119,162,31,41,29,96,30,172,11,47,27,155,97,237,26,194,223,171,24,245,181,105,25,200,242,53,18,255,152,247,19,166,38,177,17,145,76,115,16,20,90,60,21,35,48,254,20,122,142,184,22,77,228,122,23,224,70,77,56,215,44,143,57,142,146,201,59,185,248,11,58,60,238,68,63,11,132,134,62,82,58,192,60,101,80,2,61,88,23,94,54,111,125,156,55,54,195,218,53,1,169,24,52,132,191,87,49,179,213,149,48,234,107,211,50,221,1,17,51,144,229,107,36,167,143,169,37,254,49,239,39,201,91,45,38,76,77,98,35,123,39,160,34,34,153,230,32,21,243,36,33,40,180,120,42,31,222,186,43,70,96,252,41,113,10,62,40,244,28,113,45,195,118,179,44,154,200,245,46,173,162,55,47,192,141,154,112,247,231,88,113,174,89,30,115,153,51,220,114,28,37,147,119,43,79,81,118,114,241,23,116,69,155,213,117,120,220,137,126,79,182,75,127,22,8,13,125,33,98,207,124,164,116,128,121,147,30,66,120,202,160,4,122,253,202,198,123,176,46,188,108,135,68,126,109,222,250,56,111,233,144,250,110,108,134,181,107,91,236,119,106,2,82,49,104,53,56,243,105,8,127,175,98,63,21,109,99,102,171,43,97,81,193,233,96,212,215,166,101,227,189,100,100,186,3,34,102,141,105,224,103,32,203,215,72,23,161,21,73,78,31,83,75,121,117,145,74,252,99,222,79,203,9,28,78,146,183,90,76,165,221,152,77,152,154,196,70,175,240,6,71,246,78,64,69,193,36,130,68,68,50,205,65,115,88,15,64,42,230,73,66,29,140,139,67,80,104,241,84,103,2,51,85,62,188,117,87,9,214,183,86,140,192,248,83,187,170,58,82,226,20,124,80,213,126,190,81,232,57,226,90,223,83,32,91,134,237,102,89,177,135,164,88,52,145,235,93,3,251,41,92,90,69,111,94,109,47,173,95,128,27,53,225,183,113,247,224,238,207,177,226,217,165,115,227,92,179,60,230,107,217,254,231,50,103,184,229,5,13,122,228,56,74,38,239,15,32,228,238,86,158,162,236,97,244,96,237,228,226,47,232,211,136,237,233,138,54,171,235,189,92,105,234,240,184,19,253,199,210,209,252,158,108,151,254,169,6,85,255,44,16,26,250,27,122,216,251,66,196,158,249,117,174,92,248,72,233,0,243,127,131,194,242,38,61,132,240,17,87,70,241,148,65,9,244,163,43,203,245,250,149,141,247,205,255,79,246,96,93,120,217,87,55,186,216,14,137,252,218,57,227,62,219,188,245,113,222,139,159,179,223,210,33,245,221,229,75,55,220,216,12,107,215,239,102,169,214,182,216,239,212,129,178,45,213,4,164,98,208,51,206,160,209,106,112,230,211,93,26,36,210,16,254,94,197,39,148,156,196,126,42,218,198,73,64,24,199,204,86,87,194,251,60,149,195,162,130,211,193,149,232,17,192,168,175,77,203,159,197,143,202,198,123,201,200,241,17,11,201,116,7,68,204,67,109,134,205,26,211,192,207,45,185,2,206,64,150,175,145,119,252,109,144,46,66,43,146,25,40,233,147,156,62,166,150,171,84,100,151,242,234,34,149,197,128,224,148,248,199,188,159,207,173,126,158,150,19,56,156,161,121,250,157,36,111,181,152,19,5,119,153,74,187,49,155,125,209,243,154,48,53,137,141,7,95,75,140,94,225,13,142,105,139,207,143,236,157,128,138,219,247,66,139,130,73,4,137,181,35,198,136,136,100,154,131,191,14,88,130,230,176,30,128,209,218,220,129,84,204,147,132,99,166,81,133,58,24,23,135,13,114,213,134,160,208,226,169,151,186,32,168,206,4,102,170,249,110,164,171,124,120,235,174,75,18,41,175,18,172,111,173,37,198,173,172,24,129,241,167,47,235,51,166,118,85,117,164,65,63,183,165,196,41,248,160,243,67,58,161,170,253,124,163,157,151,190,162,208,115,196,181,231,25,6,180,190,167,64,182,137,205,130,183,12,219,205,178,59,177,15,179,98,15,73,177,85,101,139,176,104,34,215,187,95,72,21,186,6,246,83,184,49,156,145,185,180,138,222,188,131,224,28,189,218,94,90,191,237,52,152,190,0,0,0,0,101,103,188,184,139,200,9,170,238,175,181,18,87,151,98,143,50,240,222,55,220,95,107,37,185,56,215,157,239,40,180,197,138,79,8,125,100,224,189,111,1,135,1,215,184,191,214,74,221,216,106,242,51,119,223,224,86,16,99,88,159,87,25,80,250,48,165,232,20,159,16,250,113,248,172,66,200,192,123,223,173,167,199,103,67,8,114,117,38,111,206,205,112,127,173,149,21,24,17,45,251,183,164,63,158,208,24,135,39,232,207,26,66,143,115,162,172,32,198,176,201,71,122,8,62,175,50,160,91,200,142,24,181,103,59,10,208,0,135,178,105,56,80,47,12,95,236,151,226,240,89,133,135,151,229,61,209,135,134,101,180,224,58,221,90,79,143,207,63,40,51,119,134,16,228,234,227,119,88,82,13,216,237,64,104,191,81,248,161,248,43,240,196,159,151,72,42,48,34,90,79,87,158,226,246,111,73,127,147,8,245,199,125,167,64,213,24,192,252,109,78,208,159,53,43,183,35,141,197,24,150,159,160,127,42,39,25,71,253,186,124,32,65,2,146,143,244,16,247,232,72,168,61,88,20,155,88,63,168,35,182,144,29,49,211,247,161,137,106,207,118,20,15,168,202,172,225,7,127,190,132,96,195,6,210,112,160,94,183,23,28,230,89,184,169,244,60,223,21,76,133,231,194,209,224,128,126,105,14,47,203,123,107,72,119,195,162,15,13,203,199,104,177,115,41,199,4,97,76,160,184,217,245,152,111,68,144,255,211,252,126,80,102,238,27,55,218,86,77,39,185,14,40,64,5,182,198,239,176,164,163,136,12,28,26,176,219,129,127,215,103,57,145,120,210,43,244,31,110,147,3,247,38,59,102,144,154,131,136,63,47,145,237,88,147,41,84,96,68,180,49,7,248,12,223,168,77,30,186,207,241,166,236,223,146,254,137,184,46,70,103,23,155,84,2,112,39,236,187,72,240,113,222,47,76,201,48,128,249,219,85,231,69,99,156,160,63,107,249,199,131,211,23,104,54,193,114,15,138,121,203,55,93,228,174,80,225,92,64,255,84,78,37,152,232,246,115,136,139,174,22,239,55,22,248,64,130,4,157,39,62,188,36,31,233,33,65,120,85,153,175,215,224,139,202,176,92,51,59,182,89,237,94,209,229,85,176,126,80,71,213,25,236,255,108,33,59,98,9,70,135,218,231,233,50,200,130,142,142,112,212,158,237,40,177,249,81,144,95,86,228,130,58,49,88,58,131,9,143,167,230,110,51,31,8,193,134,13,109,166,58,181,164,225,64,189,193,134,252,5,47,41,73,23,74,78,245,175,243,118,34,50,150,17,158,138,120,190,43,152,29,217,151,32,75,201,244,120,46,174,72,192,192,1,253,210,165,102,65,106,28,94,150,247,121,57,42,79,151,150,159,93,242,241,35,229,5,25,107,77,96,126,215,245,142,209,98,231,235,182,222,95,82,142,9,194,55,233,181,122,217,70,0,104,188,33,188,208,234,49,223,136,143,86,99,48,97,249,214,34,4,158,106,154,189,166,189,7,216,193,1,191,54,110,180,173,83,9,8,21,154,78,114,29,255,41,206,165,17,134,123,183,116,225,199,15,205,217,16,146,168,190,172,42,70,17,25,56,35,118,165,128,117,102,198,216,16,1,122,96,254,174,207,114,155,201,115,202,34,241,164,87,71,150,24,239,169,57,173,253,204,94,17,69,6,238,77,118,99,137,241,206,141,38,68,220,232,65,248,100,81,121,47,249,52,30,147,65,218,177,38,83,191,214,154,235,233,198,249,179,140,161,69,11,98,14,240,25,7,105,76,161,190,81,155,60,219,54,39,132,53,153,146,150,80,254,46,46,153,185,84,38,252,222,232,158,18,113,93,140,119,22,225,52,206,46,54,169,171,73,138,17,69,230,63,3,32,129,131,187,118,145,224,227,19,246,92,91,253,89,233,73,152,62,85,241,33,6,130,108,68,97,62,212,170,206,139,198,207,169,55,126,56,65,127,214,93,38,195,110,179,137,118,124,214,238,202,196,111,214,29,89,10,177,161,225,228,30,20,243,129,121,168,75,215,105,203,19,178,14,119,171,92,161,194,185,57,198,126,1,128,254,169,156,229,153,21,36,11,54,160,54,110,81,28,142,167,22,102,134,194,113,218,62,44,222,111,44,73,185,211,148,240,129,4,9,149,230,184,177,123,73,13,163,30,46,177,27,72,62,210,67,45,89,110,251,195,246,219,233,166,145,103,81,31,169,176,204,122,206,12,116,148,97,185,102,241,6,5,222,0,0,0,0,119,7,48,150,238,14,97,44,153,9,81,186,7,109,196,25,112,106,244,143,233,99,165,53,158,100,149,163,14,219,136,50,121,220,184,164,224,213,233,30,151,210,217,136,9,182,76,43,126,177,124,189,231,184,45,7,144,191,29,145,29,183,16,100,106,176,32,242,243,185,113,72,132,190,65,222,26,218,212,125,109,221,228,235,244,212,181,81,131,211,133,199,19,108,152,86,100,107,168,192,253,98,249,122,138,101,201,236,20,1,92,79,99,6,108,217,250,15,61,99,141,8,13,245,59,110,32,200,76,105,16,94,213,96,65,228,162,103,113,114,60,3,228,209,75,4,212,71,210,13,133,253,165,10,181,107,53,181,168,250,66,178,152,108,219,187,201,214,172,188,249,64,50,216,108,227,69,223,92,117,220,214,13,207,171,209,61,89,38,217,48,172,81,222,0,58,200,215,81,128,191,208,97,22,33,180,244,181,86,179,196,35,207,186,149,153,184,189,165,15,40,2,184,158,95,5,136,8,198,12,217,178,177,11,233,36,47,111,124,135,88,104,76,17,193,97,29,171,182,102,45,61,118,220,65,144,1,219,113,6,152,210,32,188,239,213,16,42,113,177,133,137,6,182,181,31,159,191,228,165,232,184,212,51,120,7,201,162,15,0,249,52,150,9,168,142,225,14,152,24,127,106,13,187,8,109,61,45,145,100,108,151,230,99,92,1,107,107,81,244,28,108,97,98,133,101,48,216,242,98,0,78,108,6,149,237,27,1,165,123,130,8,244,193,245,15,196,87,101,176,217,198,18,183,233,80,139,190,184,234,252,185,136,124,98,221,29,223,21,218,45,73,140,211,124,243,251,212,76,101,77,178,97,88,58,181,81,206,163,188,0,116,212,187,48,226,74,223,165,65,61,216,149,215,164,209,196,109,211,214,244,251,67,105,233,106,52,110,217,252,173,103,136,70,218,96,184,208,68,4,45,115,51,3,29,229,170,10,76,95,221,13,124,201,80,5,113,60,39,2,65,170,190,11,16,16,201,12,32,134,87,104,181,37,32,111,133,179,185,102,212,9,206,97,228,159,94,222,249,14,41,217,201,152,176,208,152,34,199,215,168,180,89,179,61,23,46,180,13,129,183,189,92,59,192,186,108,173,237,184,131,32,154,191,179,182,3,182,226,12,116,177,210,154,234,213,71,57,157,210,119,175,4,219,38,21,115,220,22,131,227,99,11,18,148,100,59,132,13,109,106,62,122,106,90,168,228,14,207,11,147,9,255,157,10,0,174,39,125,7,158,177,240,15,147,68,135,8,163,210,30,1,242,104,105,6,194,254,247,98,87,93,128,101,103,203,25,108,54,113,110,107,6,231,254,212,27,118,137,211,43,224,16,218,122,90,103,221,74,204,249,185,223,111,142,190,239,249,23,183,190,67,96,176,142,213,214,214,163,232,161,209,147,126,56,216,194,196,79,223,242,82,209,187,103,241,166,188,87,103,63,181,6,221,72,178,54,75,216,13,43,218,175,10,27,76,54,3,74,246,65,4,122,96,223,96,239,195,168,103,223,85,49,110,142,239,70,105,190,121,203,97,179,140,188,102,131,26,37,111,210,160,82,104,226,54,204,12,119,149,187,11,71,3,34,2,22,185,85,5,38,47,197,186,59,190,178,189,11,40,43,180,90,146,92,179,106,4,194,215,255,167,181,208,207,49,44,217,158,139,91,222,174,29,155,100,194,176,236,99,242,38,117,106,163,156,2,109,147,10,156,9,6,169,235,14,54,63,114,7,103,133,5,0,87,19,149,191,74,130,226,184,122,20,123,177,43,174,12,182,27,56,146,210,142,155,229,213,190,13,124,220,239,183,11,219,223,33,134,211,210,212,241,212,226,66,104,221,179,248,31,218,131,110,129,190,22,205,246,185,38,91,111,176,119,225,24,183,71,119,136,8,90,230,255,15,106,112,102,6,59,202,17,1,11,92,143,101,158,255,248,98,174,105,97,107,255,211,22,108,207,69,160,10,226,120,215,13,210,238,78,4,131,84,57,3,179,194,167,103,38,97,208,96,22,247,73,105,71,77,62,110,119,219,174,209,106,74,217,214,90,220,64,223,11,102,55,216,59,240,169,188,174,83,222,187,158,197,71,178,207,127,48,181,255,233,189,189,242,28,202,186,194,138,83,179,147,48,36,180,163,166,186,208,54,5,205,215,6,147,84,222,87,41,35,217,103,191,179,102,122,46,196,97,74,184,93,104,27,2,42,111,43,148,180,11,190,55,195,12,142,161,90,5,223,27,45,2,239,141,0,0,0,0,25,27,49,65,50,54,98,130,43,45,83,195,100,108,197,4,125,119,244,69,86,90,167,134,79,65,150,199,200,217,138,8,209,194,187,73,250,239,232,138,227,244,217,203,172,181,79,12,181,174,126,77,158,131,45,142,135,152,28,207,74,194,18,81,83,217,35,16,120,244,112,211,97,239,65,146,46,174,215,85,55,181,230,20,28,152,181,215,5,131,132,150,130,27,152,89,155,0,169,24,176,45,250,219,169,54,203,154,230,119,93,93,255,108,108,28,212,65,63,223,205,90,14,158,149,132,36,162,140,159,21,227,167,178,70,32,190,169,119,97,241,232,225,166,232,243,208,231,195,222,131,36,218,197,178,101,93,93,174,170,68,70,159,235,111,107,204,40,118,112,253,105,57,49,107,174,32,42,90,239,11,7,9,44,18,28,56,109,223,70,54,243,198,93,7,178,237,112,84,113,244,107,101,48,187,42,243,247,162,49,194,182,137,28,145,117,144,7,160,52,23,159,188,251,14,132,141,186,37,169,222,121,60,178,239,56,115,243,121,255,106,232,72,190,65,197,27,125,88,222,42,60,240,121,79,5,233,98,126,68,194,79,45,135,219,84,28,198,148,21,138,1,141,14,187,64,166,35,232,131,191,56,217,194,56,160,197,13,33,187,244,76,10,150,167,143,19,141,150,206,92,204,0,9,69,215,49,72,110,250,98,139,119,225,83,202,186,187,93,84,163,160,108,21,136,141,63,214,145,150,14,151,222,215,152,80,199,204,169,17,236,225,250,210,245,250,203,147,114,98,215,92,107,121,230,29,64,84,181,222,89,79,132,159,22,14,18,88,15,21,35,25,36,56,112,218,61,35,65,155,101,253,107,167,124,230,90,230,87,203,9,37,78,208,56,100,1,145,174,163,24,138,159,226,51,167,204,33,42,188,253,96,173,36,225,175,180,63,208,238,159,18,131,45,134,9,178,108,201,72,36,171,208,83,21,234,251,126,70,41,226,101,119,104,47,63,121,246,54,36,72,183,29,9,27,116,4,18,42,53,75,83,188,242,82,72,141,179,121,101,222,112,96,126,239,49,231,230,243,254,254,253,194,191,213,208,145,124,204,203,160,61,131,138,54,250,154,145,7,187,177,188,84,120,168,167,101,57,59,131,152,75,34,152,169,10,9,181,250,201,16,174,203,136,95,239,93,79,70,244,108,14,109,217,63,205,116,194,14,140,243,90,18,67,234,65,35,2,193,108,112,193,216,119,65,128,151,54,215,71,142,45,230,6,165,0,181,197,188,27,132,132,113,65,138,26,104,90,187,91,67,119,232,152,90,108,217,217,21,45,79,30,12,54,126,95,39,27,45,156,62,0,28,221,185,152,0,18,160,131,49,83,139,174,98,144,146,181,83,209,221,244,197,22,196,239,244,87,239,194,167,148,246,217,150,213,174,7,188,233,183,28,141,168,156,49,222,107,133,42,239,42,202,107,121,237,211,112,72,172,248,93,27,111,225,70,42,46,102,222,54,225,127,197,7,160,84,232,84,99,77,243,101,34,2,178,243,229,27,169,194,164,48,132,145,103,41,159,160,38,228,197,174,184,253,222,159,249,214,243,204,58,207,232,253,123,128,169,107,188,153,178,90,253,178,159,9,62,171,132,56,127,44,28,36,176,53,7,21,241,30,42,70,50,7,49,119,115,72,112,225,180,81,107,208,245,122,70,131,54,99,93,178,119,203,250,215,78,210,225,230,15,249,204,181,204,224,215,132,141,175,150,18,74,182,141,35,11,157,160,112,200,132,187,65,137,3,35,93,70,26,56,108,7,49,21,63,196,40,14,14,133,103,79,152,66,126,84,169,3,85,121,250,192,76,98,203,129,129,56,197,31,152,35,244,94,179,14,167,157,170,21,150,220,229,84,0,27,252,79,49,90,215,98,98,153,206,121,83,216,73,225,79,23,80,250,126,86,123,215,45,149,98,204,28,212,45,141,138,19,52,150,187,82,31,187,232,145,6,160,217,208,94,126,243,236,71,101,194,173,108,72,145,110,117,83,160,47,58,18,54,232,35,9,7,169,8,36,84,106,17,63,101,43,150,167,121,228,143,188,72,165,164,145,27,102,189,138,42,39,242,203,188,224,235,208,141,161,192,253,222,98,217,230,239,35,20,188,225,189,13,167,208,252,38,138,131,63,63,145,178,126,112,208,36,185,105,203,21,248,66,230,70,59,91,253,119,122,220,101,107,181,197,126,90,244,238,83,9,55,247,72,56,118,184,9,174,177,161,18,159,240,138,63,204,51,147,36,253,114,0,0,0,0,1,194,106,55,3,132,212,110,2,70,190,89,7,9,168,220,6,203,194,235,4,141,124,178,5,79,22,133,14,19,81,184,15,209,59,143,13,151,133,214,12,85,239,225,9,26,249,100,8,216,147,83,10,158,45,10,11,92,71,61,28,38,163,112,29,228,201,71,31,162,119,30,30,96,29,41,27,47,11,172,26,237,97,155,24,171,223,194,25,105,181,245,18,53,242,200,19,247,152,255,17,177,38,166,16,115,76,145,21,60,90,20,20,254,48,35,22,184,142,122,23,122,228,77,56,77,70,224,57,143,44,215,59,201,146,142,58,11,248,185,63,68,238,60,62,134,132,11,60,192,58,82,61,2,80,101,54,94,23,88,55,156,125,111,53,218,195,54,52,24,169,1,49,87,191,132,48,149,213,179,50,211,107,234,51,17,1,221,36,107,229,144,37,169,143,167,39,239,49,254,38,45,91,201,35,98,77,76,34,160,39,123,32,230,153,34,33,36,243,21,42,120,180,40,43,186,222,31,41,252,96,70,40,62,10,113,45,113,28,244,44,179,118,195,46,245,200,154,47,55,162,173,112,154,141,192,113,88,231,247,115,30,89,174,114,220,51,153,119,147,37,28,118,81,79,43,116,23,241,114,117,213,155,69,126,137,220,120,127,75,182,79,125,13,8,22,124,207,98,33,121,128,116,164,120,66,30,147,122,4,160,202,123,198,202,253,108,188,46,176,109,126,68,135,111,56,250,222,110,250,144,233,107,181,134,108,106,119,236,91,104,49,82,2,105,243,56,53,98,175,127,8,99,109,21,63,97,43,171,102,96,233,193,81,101,166,215,212,100,100,189,227,102,34,3,186,103,224,105,141,72,215,203,32,73,21,161,23,75,83,31,78,74,145,117,121,79,222,99,252,78,28,9,203,76,90,183,146,77,152,221,165,70,196,154,152,71,6,240,175,69,64,78,246,68,130,36,193,65,205,50,68,64,15,88,115,66,73,230,42,67,139,140,29,84,241,104,80,85,51,2,103,87,117,188,62,86,183,214,9,83,248,192,140,82,58,170,187,80,124,20,226,81,190,126,213,90,226,57,232,91,32,83,223,89,102,237,134,88,164,135,177,93,235,145,52,92,41,251,3,94,111,69,90,95,173,47,109,225,53,27,128,224,247,113,183,226,177,207,238,227,115,165,217,230,60,179,92,231,254,217,107,229,184,103,50,228,122,13,5,239,38,74,56,238,228,32,15,236,162,158,86,237,96,244,97,232,47,226,228,233,237,136,211,235,171,54,138,234,105,92,189,253,19,184,240,252,209,210,199,254,151,108,158,255,85,6,169,250,26,16,44,251,216,122,27,249,158,196,66,248,92,174,117,243,0,233,72,242,194,131,127,240,132,61,38,241,70,87,17,244,9,65,148,245,203,43,163,247,141,149,250,246,79,255,205,217,120,93,96,216,186,55,87,218,252,137,14,219,62,227,57,222,113,245,188,223,179,159,139,221,245,33,210,220,55,75,229,215,107,12,216,214,169,102,239,212,239,216,182,213,45,178,129,208,98,164,4,209,160,206,51,211,230,112,106,210,36,26,93,197,94,254,16,196,156,148,39,198,218,42,126,199,24,64,73,194,87,86,204,195,149,60,251,193,211,130,162,192,17,232,149,203,77,175,168,202,143,197,159,200,201,123,198,201,11,17,241,204,68,7,116,205,134,109,67,207,192,211,26,206,2,185,45,145,175,150,64,144,109,252,119,146,43,66,46,147,233,40,25,150,166,62,156,151,100,84,171,149,34,234,242,148,224,128,197,159,188,199,248,158,126,173,207,156,56,19,150,157,250,121,161,152,181,111,36,153,119,5,19,155,49,187,74,154,243,209,125,141,137,53,48,140,75,95,7,142,13,225,94,143,207,139,105,138,128,157,236,139,66,247,219,137,4,73,130,136,198,35,181,131,154,100,136,130,88,14,191,128,30,176,230,129,220,218,209,132,147,204,84,133,81,166,99,135,23,24,58,134,213,114,13,169,226,208,160,168,32,186,151,170,102,4,206,171,164,110,249,174,235,120,124,175,41,18,75,173,111,172,18,172,173,198,37,167,241,129,24,166,51,235,47,164,117,85,118,165,183,63,65,160,248,41,196,161,58,67,243,163,124,253,170,162,190,151,157,181,196,115,208,180,6,25,231,182,64,167,190,183,130,205,137,178,205,219,12,179,15,177,59,177,73,15,98,176,139,101,85,187,215,34,104,186,21,72,95,184,83,246,6,185,145,156,49,188,222,138,180,189,28,224,131,191,90,94,218,190,152,52,237,0,0,0,0,184,188,103,101,170,9,200,139,18,181,175,238,143,98,151,87,55,222,240,50,37,107,95,220,157,215,56,185,197,180,40,239,125,8,79,138,111,189,224,100,215,1,135,1,74,214,191,184,242,106,216,221,224,223,119,51,88,99,16,86,80,25,87,159,232,165,48,250,250,16,159,20,66,172,248,113,223,123,192,200,103,199,167,173,117,114,8,67,205,206,111,38,149,173,127,112,45,17,24,21,63,164,183,251,135,24,208,158,26,207,232,39,162,115,143,66,176,198,32,172,8,122,71,201,160,50,175,62,24,142,200,91,10,59,103,181,178,135,0,208,47,80,56,105,151,236,95,12,133,89,240,226,61,229,151,135,101,134,135,209,221,58,224,180,207,143,79,90,119,51,40,63,234,228,16,134,82,88,119,227,64,237,216,13,248,81,191,104,240,43,248,161,72,151,159,196,90,34,48,42,226,158,87,79,127,73,111,246,199,245,8,147,213,64,167,125,109,252,192,24,53,159,208,78,141,35,183,43,159,150,24,197,39,42,127,160,186,253,71,25,2,65,32,124,16,244,143,146,168,72,232,247,155,20,88,61,35,168,63,88,49,29,144,182,137,161,247,211,20,118,207,106,172,202,168,15,190,127,7,225,6,195,96,132,94,160,112,210,230,28,23,183,244,169,184,89,76,21,223,60,209,194,231,133,105,126,128,224,123,203,47,14,195,119,72,107,203,13,15,162,115,177,104,199,97,4,199,41,217,184,160,76,68,111,152,245,252,211,255,144,238,102,80,126,86,218,55,27,14,185,39,77,182,5,64,40,164,176,239,198,28,12,136,163,129,219,176,26,57,103,215,127,43,210,120,145,147,110,31,244,59,38,247,3,131,154,144,102,145,47,63,136,41,147,88,237,180,68,96,84,12,248,7,49,30,77,168,223,166,241,207,186,254,146,223,236,70,46,184,137,84,155,23,103,236,39,112,2,113,240,72,187,201,76,47,222,219,249,128,48,99,69,231,85,107,63,160,156,211,131,199,249,193,54,104,23,121,138,15,114,228,93,55,203,92,225,80,174,78,84,255,64,246,232,152,37,174,139,136,115,22,55,239,22,4,130,64,248,188,62,39,157,33,233,31,36,153,85,120,65,139,224,215,175,51,92,176,202,237,89,182,59,85,229,209,94,71,80,126,176,255,236,25,213,98,59,33,108,218,135,70,9,200,50,233,231,112,142,142,130,40,237,158,212,144,81,249,177,130,228,86,95,58,88,49,58,167,143,9,131,31,51,110,230,13,134,193,8,181,58,166,109,189,64,225,164,5,252,134,193,23,73,41,47,175,245,78,74,50,34,118,243,138,158,17,150,152,43,190,120,32,151,217,29,120,244,201,75,192,72,174,46,210,253,1,192,106,65,102,165,247,150,94,28,79,42,57,121,93,159,150,151,229,35,241,242,77,107,25,5,245,215,126,96,231,98,209,142,95,222,182,235,194,9,142,82,122,181,233,55,104,0,70,217,208,188,33,188,136,223,49,234,48,99,86,143,34,214,249,97,154,106,158,4,7,189,166,189,191,1,193,216,173,180,110,54,21,8,9,83,29,114,78,154,165,206,41,255,183,123,134,17,15,199,225,116,146,16,217,205,42,172,190,168,56,25,17,70,128,165,118,35,216,198,102,117,96,122,1,16,114,207,174,254,202,115,201,155,87,164,241,34,239,24,150,71,253,173,57,169,69,17,94,204,118,77,238,6,206,241,137,99,220,68,38,141,100,248,65,232,249,47,121,81,65,147,30,52,83,38,177,218,235,154,214,191,179,249,198,233,11,69,161,140,25,240,14,98,161,76,105,7,60,155,81,190,132,39,54,219,150,146,153,53,46,46,254,80,38,84,185,153,158,232,222,252,140,93,113,18,52,225,22,119,169,54,46,206,17,138,73,171,3,63,230,69,187,131,129,32,227,224,145,118,91,92,246,19,73,233,89,253,241,85,62,152,108,130,6,33,212,62,97,68,198,139,206,170,126,55,169,207,214,127,65,56,110,195,38,93,124,118,137,179,196,202,238,214,89,29,214,111,225,161,177,10,243,20,30,228,75,168,121,129,19,203,105,215,171,119,14,178,185,194,161,92,1,126,198,57,156,169,254,128,36,21,153,229,54,160,54,11,142,28,81,110,134,102,22,167,62,218,113,194,44,111,222,44,148,211,185,73,9,4,129,240,177,184,230,149,163,13,73,123,27,177,46,30,67,210,62,72,251,110,89,45,233,219,246,195,81,103,145,166,204,176,169,31,116,12,206,122,102,185,97,148,222,5,6,241,16,0,17,0,18,0,0,0,8,0,7,0,9,0,6,0,10,0,5,0,11,0,4,0,12,0,3,0,13,0,2,0,14,0,1,0,15,0,0,0,105,110,99,111,114,114,101,99,116,32,104,101,97,100,101,114,32,99,104,101,99,107,0,0,117,110,107,110,111,119,110,32,99,111,109,112,114,101,115,115,105,111,110,32,109,101,116,104,111,100,0,0,0,0,0,0,105,110,118,97,108,105,100,32,119,105,110,100,111,119,32,115,105,122,101,0,0,0,0,0,117,110,107,110,111,119,110,32,104,101,97,100,101,114,32,102,108,97,103,115,32,115,101,116,0,0,0,0,0,0,0,0,104,101,97,100,101,114,32,99,114,99,32,109,105,115,109,97,116,99,104,0,0,0,0,0,105,110,118,97,108,105,100,32,98,108,111,99,107,32,116,121,112,101,0,0,0,0,0,0,105,110,118,97,108,105,100,32,115,116,111,114,101,100,32,98,108,111,99,107,32,108,101,110,103,116,104,115,0,0,0,0,116,111,111,32,109,97,110,121,32,108,101,110,103,116,104,32,111,114,32,100,105,115,116,97,110,99,101,32,115,121,109,98,111,108,115,0,0,0,0,0,105,110,118,97,108,105,100,32,99,111,100,101,32,108,101,110,103,116,104,115,32,115,101,116,0,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,98,105,116,32,108,101,110,103,116,104,32,114,101,112,101,97,116,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,99,111,100,101,32,45,45,32,109,105,115,115,105,110,103,32,101,110,100,45,111,102,45,98,108,111,99,107,0,0,0,0,105,110,118,97,108,105,100,32,108,105,116,101,114,97,108,47,108,101,110,103,116,104,115,32,115,101,116,0,0,0,0,0,105,110,118,97,108,105,100,32,100,105,115,116,97,110,99,101,115,32,115,101,116,0,0,0,105,110,118,97,108,105,100,32,108,105,116,101,114,97,108,47,108,101,110,103,116,104,32,99,111,100,101,0,0,0,0,0,105,110,118,97,108,105,100,32,100,105,115,116,97,110,99,101,32,99,111,100,101,0,0,0,105,110,118,97,108,105,100,32,100,105,115,116,97,110,99,101,32,116,111,111,32,102,97,114,32,98,97,99,107,0,0,0,105,110,99,111,114,114,101,99,116,32,100,97,116,97,32,99,104,101,99,107,0,0,0,0,105,110,99,111,114,114,101,99,116,32,108,101,110,103,116,104,32,99,104,101,99,107,0,0,96,7,0,0,0,8,80,0,0,8,16,0,20,8,115,0,18,7,31,0,0,8,112,0,0,8,48,0,0,9,192,0,16,7,10,0,0,8,96,0,0,8,32,0,0,9,160,0,0,8,0,0,0,8,128,0,0,8,64,0,0,9,224,0,16,7,6,0,0,8,88,0,0,8,24,0,0,9,144,0,19,7,59,0,0,8,120,0,0,8,56,0,0,9,208,0,17,7,17,0,0,8,104,0,0,8,40,0,0,9,176,0,0,8,8,0,0,8,136,0,0,8,72,0,0,9,240,0,16,7,4,0,0,8,84,0,0,8,20,0,21,8,227,0,19,7,43,0,0,8,116,0,0,8,52,0,0,9,200,0,17,7,13,0,0,8,100,0,0,8,36,0,0,9,168,0,0,8,4,0,0,8,132,0,0,8,68,0,0,9,232,0,16,7,8,0,0,8,92,0,0,8,28,0,0,9,152,0,20,7,83,0,0,8,124,0,0,8,60,0,0,9,216,0,18,7,23,0,0,8,108,0,0,8,44,0,0,9,184,0,0,8,12,0,0,8,140,0,0,8,76,0,0,9,248,0,16,7,3,0,0,8,82,0,0,8,18,0,21,8,163,0,19,7,35,0,0,8,114,0,0,8,50,0,0,9,196,0,17,7,11,0,0,8,98,0,0,8,34,0,0,9,164,0,0,8,2,0,0,8,130,0,0,8,66,0,0,9,228,0,16,7,7,0,0,8,90,0,0,8,26,0,0,9,148,0,20,7,67,0,0,8,122,0,0,8,58,0,0,9,212,0,18,7,19,0,0,8,106,0,0,8,42,0,0,9,180,0,0,8,10,0,0,8,138,0,0,8,74,0,0,9,244,0,16,7,5,0,0,8,86,0,0,8,22,0,64,8,0,0,19,7,51,0,0,8,118,0,0,8,54,0,0,9,204,0,17,7,15,0,0,8,102,0,0,8,38,0,0,9,172,0,0,8,6,0,0,8,134,0,0,8,70,0,0,9,236,0,16,7,9,0,0,8,94,0,0,8,30,0,0,9,156,0,20,7,99,0,0,8,126,0,0,8,62,0,0,9,220,0,18,7,27,0,0,8,110,0,0,8,46,0,0,9,188,0,0,8,14,0,0,8,142,0,0,8,78,0,0,9,252,0,96,7,0,0,0,8,81,0,0,8,17,0,21,8,131,0,18,7,31,0,0,8,113,0,0,8,49,0,0,9,194,0,16,7,10,0,0,8,97,0,0,8,33,0,0,9,162,0,0,8,1,0,0,8,129,0,0,8,65,0,0,9,226,0,16,7,6,0,0,8,89,0,0,8,25,0,0,9,146,0,19,7,59,0,0,8,121,0,0,8,57,0,0,9,210,0,17,7,17,0,0,8,105,0,0,8,41,0,0,9,178,0,0,8,9,0,0,8,137,0,0,8,73,0,0,9,242,0,16,7,4,0,0,8,85,0,0,8,21,0,16,8,2,1,19,7,43,0,0,8,117,0,0,8,53,0,0,9,202,0,17,7,13,0,0,8,101,0,0,8,37,0,0,9,170,0,0,8,5,0,0,8,133,0,0,8,69,0,0,9,234,0,16,7,8,0,0,8,93,0,0,8,29,0,0,9,154,0,20,7,83,0,0,8,125,0,0,8,61,0,0,9,218,0,18,7,23,0,0,8,109,0,0,8,45,0,0,9,186,0,0,8,13,0,0,8,141,0,0,8,77,0,0,9,250,0,16,7,3,0,0,8,83,0,0,8,19,0,21,8,195,0,19,7,35,0,0,8,115,0,0,8,51,0,0,9,198,0,17,7,11,0,0,8,99,0,0,8,35,0,0,9,166,0,0,8,3,0,0,8,131,0,0,8,67,0,0,9,230,0,16,7,7,0,0,8,91,0,0,8,27,0,0,9,150,0,20,7,67,0,0,8,123,0,0,8,59,0,0,9,214,0,18,7,19,0,0,8,107,0,0,8,43,0,0,9,182,0,0,8,11,0,0,8,139,0,0,8,75,0,0,9,246,0,16,7,5,0,0,8,87,0,0,8,23,0,64,8,0,0,19,7,51,0,0,8,119,0,0,8,55,0,0,9,206,0,17,7,15,0,0,8,103,0,0,8,39,0,0,9,174,0,0,8,7,0,0,8,135,0,0,8,71,0,0,9,238,0,16,7,9,0,0,8,95,0,0,8,31,0,0,9,158,0,20,7,99,0,0,8,127,0,0,8,63,0,0,9,222,0,18,7,27,0,0,8,111,0,0,8,47,0,0,9,190,0,0,8,15,0,0,8,143,0,0,8,79,0,0,9,254,0,96,7,0,0,0,8,80,0,0,8,16,0,20,8,115,0,18,7,31,0,0,8,112,0,0,8,48,0,0,9,193,0,16,7,10,0,0,8,96,0,0,8,32,0,0,9,161,0,0,8,0,0,0,8,128,0,0,8,64,0,0,9,225,0,16,7,6,0,0,8,88,0,0,8,24,0,0,9,145,0,19,7,59,0,0,8,120,0,0,8,56,0,0,9,209,0,17,7,17,0,0,8,104,0,0,8,40,0,0,9,177,0,0,8,8,0,0,8,136,0,0,8,72,0,0,9,241,0,16,7,4,0,0,8,84,0,0,8,20,0,21,8,227,0,19,7,43,0,0,8,116,0,0,8,52,0,0,9,201,0,17,7,13,0,0,8,100,0,0,8,36,0,0,9,169,0,0,8,4,0,0,8,132,0,0,8,68,0,0,9,233,0,16,7,8,0,0,8,92,0,0,8,28,0,0,9,153,0,20,7,83,0,0,8,124,0,0,8,60,0,0,9,217,0,18,7,23,0,0,8,108,0,0,8,44,0,0,9,185,0,0,8,12,0,0,8,140,0,0,8,76,0,0,9,249,0,16,7,3,0,0,8,82,0,0,8,18,0,21,8,163,0,19,7,35,0,0,8,114,0,0,8,50,0,0,9,197,0,17,7,11,0,0,8,98,0,0,8,34,0,0,9,165,0,0,8,2,0,0,8,130,0,0,8,66,0,0,9,229,0,16,7,7,0,0,8,90,0,0,8,26,0,0,9,149,0,20,7,67,0,0,8,122,0,0,8,58,0,0,9,213,0,18,7,19,0,0,8,106,0,0,8,42,0,0,9,181,0,0,8,10,0,0,8,138,0,0,8,74,0,0,9,245,0,16,7,5,0,0,8,86,0,0,8,22,0,64,8,0,0,19,7,51,0,0,8,118,0,0,8,54,0,0,9,205,0,17,7,15,0,0,8,102,0,0,8,38,0,0,9,173,0,0,8,6,0,0,8,134,0,0,8,70,0,0,9,237,0,16,7,9,0,0,8,94], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);
/* memory initializer */ allocate([8,30,0,0,9,157,0,20,7,99,0,0,8,126,0,0,8,62,0,0,9,221,0,18,7,27,0,0,8,110,0,0,8,46,0,0,9,189,0,0,8,14,0,0,8,142,0,0,8,78,0,0,9,253,0,96,7,0,0,0,8,81,0,0,8,17,0,21,8,131,0,18,7,31,0,0,8,113,0,0,8,49,0,0,9,195,0,16,7,10,0,0,8,97,0,0,8,33,0,0,9,163,0,0,8,1,0,0,8,129,0,0,8,65,0,0,9,227,0,16,7,6,0,0,8,89,0,0,8,25,0,0,9,147,0,19,7,59,0,0,8,121,0,0,8,57,0,0,9,211,0,17,7,17,0,0,8,105,0,0,8,41,0,0,9,179,0,0,8,9,0,0,8,137,0,0,8,73,0,0,9,243,0,16,7,4,0,0,8,85,0,0,8,21,0,16,8,2,1,19,7,43,0,0,8,117,0,0,8,53,0,0,9,203,0,17,7,13,0,0,8,101,0,0,8,37,0,0,9,171,0,0,8,5,0,0,8,133,0,0,8,69,0,0,9,235,0,16,7,8,0,0,8,93,0,0,8,29,0,0,9,155,0,20,7,83,0,0,8,125,0,0,8,61,0,0,9,219,0,18,7,23,0,0,8,109,0,0,8,45,0,0,9,187,0,0,8,13,0,0,8,141,0,0,8,77,0,0,9,251,0,16,7,3,0,0,8,83,0,0,8,19,0,21,8,195,0,19,7,35,0,0,8,115,0,0,8,51,0,0,9,199,0,17,7,11,0,0,8,99,0,0,8,35,0,0,9,167,0,0,8,3,0,0,8,131,0,0,8,67,0,0,9,231,0,16,7,7,0,0,8,91,0,0,8,27,0,0,9,151,0,20,7,67,0,0,8,123,0,0,8,59,0,0,9,215,0,18,7,19,0,0,8,107,0,0,8,43,0,0,9,183,0,0,8,11,0,0,8,139,0,0,8,75,0,0,9,247,0,16,7,5,0,0,8,87,0,0,8,23,0,64,8,0,0,19,7,51,0,0,8,119,0,0,8,55,0,0,9,207,0,17,7,15,0,0,8,103,0,0,8,39,0,0,9,175,0,0,8,7,0,0,8,135,0,0,8,71,0,0,9,239,0,16,7,9,0,0,8,95,0,0,8,31,0,0,9,159,0,20,7,99,0,0,8,127,0,0,8,63,0,0,9,223,0,18,7,27,0,0,8,111,0,0,8,47,0,0,9,191,0,0,8,15,0,0,8,143,0,0,8,79,0,0,9,255,0,16,5,1,0,23,5,1,1,19,5,17,0,27,5,1,16,17,5,5,0,25,5,1,4,21,5,65,0,29,5,1,64,16,5,3,0,24,5,1,2,20,5,33,0,28,5,1,32,18,5,9,0,26,5,1,8,22,5,129,0,64,5,0,0,16,5,2,0,23,5,129,1,19,5,25,0,27,5,1,24,17,5,7,0,25,5,1,6,21,5,97,0,29,5,1,96,16,5,4,0,24,5,1,3,20,5,49,0,28,5,1,48,18,5,13,0,26,5,1,12,22,5,193,0,64,5,0,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,13,0,15,0,17,0,19,0,23,0,27,0,31,0,35,0,43,0,51,0,59,0,67,0,83,0,99,0,115,0,131,0,163,0,195,0,227,0,2,1,0,0,0,0,0,0,16,0,16,0,16,0,16,0,16,0,16,0,16,0,16,0,17,0,17,0,17,0,17,0,18,0,18,0,18,0,18,0,19,0,19,0,19,0,19,0,20,0,20,0,20,0,20,0,21,0,21,0,21,0,21,0,16,0,73,0,195,0,0,0,1,0,2,0,3,0,4,0,5,0,7,0,9,0,13,0,17,0,25,0,33,0,49,0,65,0,97,0,129,0,193,0,1,1,129,1,1,2,1,3,1,4,1,6,1,8,1,12,1,16,1,24,1,32,1,48,1,64,1,96,0,0,0,0,16,0,16,0,16,0,16,0,17,0,17,0,18,0,18,0,19,0,19,0,20,0,20,0,21,0,21,0,22,0,22,0,23,0,23,0,24,0,24,0,25,0,25,0,26,0,26,0,27,0,27,0,28,0,28,0,29,0,29,0,64,0,64,0,105,110,118,97,108,105,100,32,100,105,115,116,97,110,99,101,32,116,111,111,32,102,97,114,32,98,97,99,107,0,0,0,105,110,118,97,108,105,100,32,100,105,115,116,97,110,99,101,32,99,111,100,101,0,0,0,105,110,118,97,108,105,100,32,108,105,116,101,114,97,108,47,108,101,110,103,116,104,32,99,111,100,101,0,0,0,0,0,49,46,50,46,53,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,84,121,114,97,110,111,70,111,114,99,101,0,0,0,0,0,97,115,115,101,116,115,46,98,105,110,0,0,0,0,0,0,114,98,0,0,0,0,0,0,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,50,32,117,118,59,10,118,97,114,121,105,110,103,32,108,111,119,112,32,118,101,99,52,32,99,111,108,111,114,59,10,10,35,105,102,32,86,69,82,84,69,88,10,10,117,110,105,102,111,114,109,32,104,105,103,104,112,32,109,97,116,52,32,109,118,112,59,10,97,116,116,114,105,98,117,116,101,32,109,101,100,105,117,109,112,32,118,101,99,51,32,97,80,111,115,105,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,109,101,100,105,117,109,112,32,118,101,99,50,32,97,85,118,59,10,97,116,116,114,105,98,117,116,101,32,109,101,100,105,117,109,112,32,118,101,99,52,32,97,67,111,108,111,114,59,10,10,118,111,105,100,32,109,97,105,110,40,41,32,123,10,9,103,108,95,80,111,115,105,116,105,111,110,32,61,32,109,118,112,32,42,32,118,101,99,52,40,97,80,111,115,105,116,105,111,110,44,32,49,46,48,41,59,10,9,99,111,108,111,114,32,61,32,97,67,111,108,111,114,59,10,9,117,118,32,61,32,97,85,118,59,10,125,10,10,35,101,108,115,101,10,10,117,110,105,102,111,114,109,32,108,111,119,112,32,115,97,109,112,108,101,114,50,68,32,97,116,108,97,115,59,10,10,118,111,105,100,32,109,97,105,110,40,41,32,123,10,9,108,111,119,112,32,118,101,99,52,32,98,97,115,101,67,111,108,111,114,32,61,32,116,101,120,116,117,114,101,50,68,40,97,116,108,97,115,44,32,117,118,41,59,10,9,47,47,32,112,114,101,109,117,108,116,105,112,108,105,101,100,32,97,108,112,104,97,32,118,101,114,115,105,111,110,10,9,47,47,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,118,101,99,52,40,109,105,120,40,98,97,115,101,67,111,108,111,114,46,114,103,98,44,32,98,97,115,101,67,111,108,111,114,46,97,32,42,32,99,111,108,111,114,46,114,103,98,44,32,99,111,108,111,114,46,97,41,44,32,98,97,115,101,67,111,108,111,114,46,97,41,59,10,9,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,118,101,99,52,40,109,105,120,40,98,97,115,101,67,111,108,111,114,46,114,103,98,44,32,99,111,108,111,114,46,114,103,98,44,32,99,111,108,111,114,46,97,41,44,32,98,97,115,101,67,111,108,111,114,46,97,41,59,10,125,10,10,35,101,110,100,105,102,10,0,96,46,0,0,0,0,0,0,70,65,84,65,76,58,32,35,35,99,111,110,100,0,0,0,109,118,112,0,0,0,0,0,97,116,108,97,115,0,0,0,97,80,111,115,105,116,105,111,110,0,0,0,0,0,0,0,97,85,118,0,0,0,0,0,97,67,111,108,111,114,0,0,82,73,70,70,0,0,0,0,87,65,86,69,102,109,116,32,16,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,100,97,116,97,0,0,0,0,0,0,0,0,70,65,84,65,76,58,32,35,35,99,111,110,100,0,0,0,0,0,0,0,0,0,0,0,76,105,116,116,108,101,32,80,111,108,121,103,111,110,32,67,111,110,116,101,120,116,0,0,35,100,101,102,105,110,101,32,86,69,82,84,69,88,32,49,10,0,0,0,0,0,0,0,35,100,101,102,105,110,101,32,86,69,82,84,69,88,32,48,10,0,0,0,0,0,0,0,35,118,101,114,115,105,111,110,32,49,50,48,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,32,32,10,35,100,101,102,105,110,101,32,104,105,103,104,112,32,32,10,35,100,101,102,105,110,101,32,108,111,119,112,32,32,10], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE+10241);
/* memory initializer */ allocate([64,54,0,0,1,0,0,0,2,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,1,0,0,0,3,0,0,0,2,0,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,119,69,69,0,0,0,0,0,0,0,0,0,100,0,0,32,54,0,0,112,60,0,0,0,0,0,0,0,0,0,0,168,54,0,0,3,0,0,0,4,0,0,0,2,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,5,0,0,0,2,0,0,0,2,0,0,0,6,0,0,0,7,0,0,0,3,0,0,0,4,0,0,0,4,0,0,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,119,69,69,0,0,100,0,0,144,54,0,0,112,60,0,0,0,0,0,0,117,110,115,117,112,112,111,114,116,101,100,32,108,111,99,97,108,101,32,102,111,114,32,115,116,97,110,100,97,114,100,32,105,110,112,117,116,0,0,0,0,0,0,0,64,55,0,0,5,0,0,0,6,0,0,0,3,0,0,0,5,0,0,0,2,0,0,0,2,0,0,0,8,0,0,0,9,0,0,0,6,0,0,0,10,0,0,0,11,0,0,0,5,0,0,0,7,0,0,0,6,0,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,99,69,69,0,0,0,0,0,0,0,0,0,100,0,0,32,55,0,0,48,60,0,0,0,0,0,0,0,0,0,0,168,55,0,0,7,0,0,0,8,0,0,0,4,0,0,0,5,0,0,0,2,0,0,0,2,0,0,0,12,0,0,0,9,0,0,0,6,0,0,0,13,0,0,0,14,0,0,0,7,0,0,0,8,0,0,0,8,0,0,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,99,69,69,0,0,100,0,0,144,55,0,0,48,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,115,104,97,114,101,100,95,99,111,117,110,116,69,0,0,0,0,0,0,0,0,216,99,0,0,184,55,0,0,0,0,0,0,32,56,0,0,9,0,0,0,10,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,136,56,0,0,11,0,0,0,12,0,0,0,16,0,0,0,0,0,0,0,83,116,49,49,108,111,103,105,99,95,101,114,114,111,114,0,0,100,0,0,16,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,56,0,0,9,0,0,0,13,0,0,0,15,0,0,0,0,0,0,0,83,116,49,50,108,101,110,103,116,104,95,101,114,114,111,114,0,0,0,0,0,0,0,0,0,100,0,0,72,56,0,0,32,56,0,0,0,0,0,0,83,116,49,51,114,117,110,116,105,109,101,95,101,114,114,111,114,0,0,0,0,0,0,0,0,100,0,0,112,56,0,0,0,0,0,0,0,0,0,0,58,32,0,0,0,0,0,0,0,0,0,0,208,56,0,0,14,0,0,0,15,0,0,0,16,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,50,115,121,115,116,101,109,95,101,114,114,111,114,69,0,0,0,100,0,0,184,56,0,0,136,56,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,101,114,114,111,114,95,99,97,116,101,103,111,114,121,69,0,0,0,0,0,0,0,0,216,99,0,0,224,56,0,0,78,83,116,51,95,95,49,49,50,95,95,100,111,95,109,101,115,115,97,103,101,69,0,0,0,100,0,0,8,57,0,0,0,57,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,98,97,115,105,99,95,115,116,114,105,110,103,0,0,0,0,0,0,0,0,48,60,0,0,16,0,0,0,17,0,0,0,5,0,0,0,5,0,0,0,2,0,0,0,2,0,0,0,12,0,0,0,9,0,0,0,6,0,0,0,10,0,0,0,11,0,0,0,5,0,0,0,8,0,0,0,8,0,0,0,0,0,0,0,112,60,0,0,18,0,0,0,19,0,0,0,6,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,5,0,0,0,2,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,1,0,0,0,4,0,0,0,4,0,0,0,8,0,0,0,0,0,0,0,168,60,0,0,20,0,0,0,21,0,0,0,248,255,255,255,248,255,255,255,168,60,0,0,22,0,0,0,23,0,0,0,8,0,0,0,0,0,0,0,240,60,0,0,24,0,0,0,25,0,0,0,248,255,255,255,248,255,255,255,240,60,0,0,26,0,0,0,27,0,0,0,4,0,0,0,0,0,0,0,56,61,0,0,28,0,0,0,29,0,0,0,252,255,255,255,252,255,255,255,56,61,0,0,30,0,0,0,31,0,0,0,4,0,0,0,0,0,0,0,128,61,0,0,32,0,0,0,33,0,0,0,252,255,255,255,252,255,255,255,128,61,0,0,34,0,0,0,35,0,0,0,105,111,115,116,114,101,97,109,0,0,0,0,0,0,0,0,117,110,115,112,101,99,105,102,105,101,100,32,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,32,101,114,114,111,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,59,0,0,36,0,0,0,37,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,112,59,0,0,38,0,0,0,39,0,0,0,105,111,115,95,98,97,115,101,58,58,99,108,101,97,114,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,55,102,97,105,108,117,114,101,69,0,0,0,0,0,0,0,0,100,0,0,40,59,0,0,208,56,0,0,0,0,0,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,69,0,0,0,0,0,0,0,216,99,0,0,88,59,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,0,0,0,0,0,100,0,0,120,59,0,0,112,59,0,0,0,0,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,0,0,0,0,0,100,0,0,184,59,0,0,112,59,0,0,0,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,0,0,0,0,0,216,99,0,0,248,59,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,0,0,0,0,0,216,99,0,0,56,60,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,96,100,0,0,120,60,0,0,0,0,0,0,1,0,0,0,168,59,0,0,3,244,255,255,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,96,100,0,0,192,60,0,0,0,0,0,0,1,0,0,0,232,59,0,0,3,244,255,255,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,96,100,0,0,8,61,0,0,0,0,0,0,1,0,0,0,168,59,0,0,3,244,255,255,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,96,100,0,0,80,61,0,0,0,0,0,0,1,0,0,0,232,59,0,0,3,244,255,255,0,0,0,0,224,61,0,0,40,0,0,0,41,0,0,0,17,0,0,0,1,0,0,0,9,0,0,0,10,0,0,0,2,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,57,95,95,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,69,0,0,0,0,100,0,0,192,61,0,0,32,57,0,0,0,0,0,0,0,0,0,0,8,76,0,0,42,0,0,0,43,0,0,0,44,0,0,0,1,0,0,0,3,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,76,0,0,45,0,0,0,46,0,0,0,44,0,0,0,2,0,0,0,4,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,80,0,0,47,0,0,0,48,0,0,0,44,0,0,0,1,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,5,0,0,0,6,0,0,0,7,0,0,0,8,0,0,0,9,0,0,0,10,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,65,66,67,68,69,70,120,88,43,45,112,80,105,73,110,78,0,0,0,0,0,0,0,0,37,112,0,0,0,0,0,0,0,0,0,0,120,81,0,0,49,0,0,0,50,0,0,0,44,0,0,0,12,0,0,0,13,0,0,0,14,0,0,0,15,0,0,0,16,0,0,0,17,0,0,0,18,0,0,0,19,0,0,0,20,0,0,0,21,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,82,0,0,51,0,0,0,52,0,0,0,44,0,0,0,3,0,0,0,4,0,0,0,23,0,0,0,5,0,0,0,24,0,0,0,1,0,0,0,2,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,208,82,0,0,53,0,0,0,54,0,0,0,44,0,0,0,7,0,0,0,8,0,0,0,25,0,0,0,9,0,0,0,26,0,0,0,3,0,0,0,4,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,0,0,0,0,37,112,0,0,0,0,0,0,0,0,0,0,248,77,0,0,55,0,0,0,56,0,0,0,44,0,0,0,18,0,0,0,27,0,0,0,28,0,0,0,29,0,0,0,30,0,0,0,31,0,0,0,1,0,0,0,248,255,255,255,248,77,0,0,19,0,0,0,20,0,0,0,21,0,0,0,22,0,0,0,23,0,0,0,24,0,0,0,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,72,58,37,77,58,37,83,37,109,47,37,100,47,37,121,37,89,45,37,109,45,37,100,37,73,58,37,77,58,37,83,32,37,112,0,0,0,0,0,37,72,58,37,77,0,0,0,37,72,58,37,77,58,37,83,0,0,0,0,152,78,0,0,57,0,0,0,58,0,0,0,44,0,0,0,26,0,0,0,32,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,2,0,0,0,248,255,255,255,152,78,0,0,27,0,0,0,28,0,0,0,29,0,0,0,30,0,0,0,31,0,0,0,32,0,0,0,33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,37,0,0,0,89,0,0,0,45,0,0,0,37,0,0,0,109,0,0,0,45,0,0,0,37,0,0,0,100,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,0,0,0,0,40,79,0,0,59,0,0,0,60,0,0,0,44,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,144,79,0,0,61,0,0,0,62,0,0,0,44,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,76,0,0,63,0,0,0,64,0,0,0,44,0,0,0,34,0,0,0,35,0,0,0,7,0,0,0,8,0,0,0,9,0,0,0,10,0,0,0,36,0,0,0,11,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,76,0,0,65,0,0,0,66,0,0,0,44,0,0,0,37,0,0,0,38,0,0,0,13,0,0,0,14,0,0,0,15,0,0,0,16,0,0,0,39,0,0,0,17,0,0,0,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,77,0,0,67,0,0,0,68,0,0,0,44,0,0,0,40,0,0,0,41,0,0,0,19,0,0,0,20,0,0,0,21,0,0,0,22,0,0,0,42,0,0,0,23,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,77,0,0,69,0,0,0,70,0,0,0,44,0,0,0,43,0,0,0,44,0,0,0,25,0,0,0,26,0,0,0,27,0,0,0,28,0,0,0,45,0,0,0,29,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,83,0,0,71,0,0,0,72,0,0,0,44,0,0,0,3,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,0,0,0,0,0,0,37,76,102,0,0,0,0,0,109,111,110,101,121,95,103,101,116,32,101,114,114,111,114,0,0,0,0,0,240,83,0,0,73,0,0,0,74,0,0,0,44,0,0,0,5,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,0,0,0,0,0,0,0,0,0,0,128,84,0,0,75,0,0,0,76,0,0,0,44,0,0,0,1,0,0,0,37,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,46,48,76,102,0,0,0,0,0,0,0,16,85,0,0,77,0,0,0,78,0,0,0,44,0,0,0,2,0,0,0,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,232,79,0,0,79,0,0,0,80,0,0,0,44,0,0,0,13,0,0,0,11,0,0,0,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,80,0,0,81,0,0,0,82,0,0,0,44,0,0,0,14,0,0,0,12,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0,118,101,99,116,111,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,67,0,0,0,0,0,0,0,0,0,0,0,224,75,0,0,83,0,0,0,84,0,0,0,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,72,0,0,85,0,0,0,86,0,0,0,44,0,0,0,9,0,0,0,15,0,0,0,10,0,0,0,16,0,0,0,11,0,0,0,1,0,0,0,17,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,73,0,0,87,0,0,0,88,0,0,0,44,0,0,0,1,0,0,0,2,0,0,0,4,0,0,0,46,0,0,0,47,0,0,0,5,0,0,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,144,75,0,0,89,0,0,0,90,0,0,0,44,0,0,0,49,0,0,0,50,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,0,0,0,0,184,75,0,0,91,0,0,0,92,0,0,0,44,0,0,0,51,0,0,0,52,0,0,0,36,0,0,0,37,0,0,0,38,0,0,0,116,114,117,101,0,0,0,0,116,0,0,0,114,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,102,97,108,115,101,0,0,0,102,0,0,0,97,0,0,0,108,0,0,0,115,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,109,47,37,100,47,37,121,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,72,58,37,77,58,37,83,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,97,32,37,98,32,37,100,32,37,72,58,37,77,58,37,83,32,37,89,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,97,0,0,0,32,0,0,0,37,0,0,0,98,0,0,0,32,0,0,0,37,0,0,0,100,0,0,0,32,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,89,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,73,58,37,77,58,37,83,32,37,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,0,0,0,0,108,111,99,97,108,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,0,0,0,0,0,0,0,240,71,0,0,93,0,0,0,94,0,0,0,44,0,0,0,0,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,102,97,99,101,116,69,0,0,0,0,100,0,0,216,71,0,0,216,55,0,0,0,0,0,0,0,0,0,0,128,72,0,0,93,0,0,0,95,0,0,0,44,0,0,0,18,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,12,0,0,0,19,0,0,0,13,0,0,0,20,0,0,0,14,0,0,0,5,0,0,0,21,0,0,0,6,0,0,0,0,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,119,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,48,99,116,121,112,101,95,98,97,115,101,69,0,0,0,0,216,99,0,0,96,72,0,0,96,100,0,0,72,72,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,120,72,0,0,2,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,99,69,69,0,0,0,0,0,0,0,96,100,0,0,160,72,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,120,72,0,0,2,0,0,0,0,0,0,0,80,73,0,0,93,0,0,0,96,0,0,0,44,0,0,0,3,0,0,0,4,0,0,0,7,0,0,0,53,0,0,0,54,0,0,0,8,0,0,0,55,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,99,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,50,99,111,100,101,99,118,116,95,98,97,115,101,69,0,0,216,99,0,0,48,73,0,0,96,100,0,0,8,73,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,72,73,0,0,2,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,119,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,96,100,0,0,112,73,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,72,73,0,0,2,0,0,0,0,0,0,0,16,74,0,0,93,0,0,0,97,0,0,0,44,0,0,0,5,0,0,0,6,0,0,0,9,0,0,0,56,0,0,0,57,0,0,0,10,0,0,0,58,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,115,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,96,100,0,0,232,73,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,72,73,0,0,2,0,0,0,0,0,0,0,136,74,0,0,93,0,0,0,98,0,0,0,44,0,0,0,7,0,0,0,8,0,0,0,11,0,0,0,59,0,0,0,60,0,0,0,12,0,0,0,61,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,105,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,96,100,0,0,96,74,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,72,73,0,0,2,0,0,0,0,0,0,0,0,75,0,0,93,0,0,0,99,0,0,0,44,0,0,0,7,0,0,0,8,0,0,0,11,0,0,0,59,0,0,0,60,0,0,0,12,0,0,0,61,0,0,0,78,83,116,51,95,95,49,49,54,95,95,110,97,114,114,111,119,95,116,111,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,0,0,0,0,0,0,100,0,0,216,74,0,0,136,74,0,0,0,0,0,0,0,0,0,0,104,75,0,0,93,0,0,0,100,0,0,0,44,0,0,0,7,0,0,0,8,0,0,0,11,0,0,0,59,0,0,0,60,0,0,0,12,0,0,0,61,0,0,0,78,83,116,51,95,95,49,49,55,95,95,119,105,100,101,110,95,102,114,111,109,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,0,0,0,0,0,100,0,0,64,75,0,0,136,74,0,0,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,99,69,69,0,0,0,0,0,100,0,0,120,75,0,0,240,71,0,0,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,119,69,69,0,0,0,0,0,100,0,0,160,75,0,0,240,71,0,0,0,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,95,95,105,109,112,69,0,0,0,0,100,0,0,200,75,0,0,240,71,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,99,69,69,0,0,0,0,0,0,100,0,0,240,75,0,0,240,71,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,119,69,69,0,0,0,0,0,0,100,0,0,24,76,0,0,240,71,0,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,48,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,95,98,97,115,101,69,0,0,0,0,216,99,0,0,96,76,0,0,96,100,0,0,64,76,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,120,76,0,0,2,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,49,69,69,69,0,0,0,0,0,96,100,0,0,160,76,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,120,76,0,0,2,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,119,76,98,48,69,69,69,0,0,0,0,0,96,100,0,0,224,76,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,120,76,0,0,2,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,119,76,98,49,69,69,69,0,0,0,0,0,96,100,0,0,32,77,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,120,76,0,0,2,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,57,116,105,109,101,95,98,97,115,101,69,0,0,0,0,0,0,216,99,0,0,168,77,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,99,69,69,0,0,0,0,0,0,0,216,99,0,0,200,77,0,0,96,100,0,0,96,77,0,0,0,0,0,0,3,0,0,0,240,71,0,0,2,0,0,0,192,77,0,0,2,0,0,0,240,77,0,0,0,8,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,119,69,69,0,0,0,0,0,0,0,216,99,0,0,104,78,0,0,96,100,0,0,32,78,0,0,0,0,0,0,3,0,0,0,240,71,0,0,2,0,0,0,192,77,0,0,2,0,0,0,144,78,0,0,0,8,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,116,105,109,101,95,112,117,116,69,0,0,0,0,216,99,0,0,8,79,0,0,96,100,0,0,192,78,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,32,79,0,0,0,8,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,96,100,0,0,72,79,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,32,79,0,0,0,8,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,49,51,109,101,115,115,97,103,101,115,95,98,97,115,101,69,0,216,99,0,0,200,79,0,0,96,100,0,0,176,79,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,224,79,0,0,2,0,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,119,69,69,0,0,0,0,96,100,0,0,8,80,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,224,79,0,0,2,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,103,101,116,95,98,97,115,101,69,0,0,0,0,0,0,0,0,216,99,0,0,160,80,0,0,96,100,0,0,136,80,0,0,0,0,0,0,1,0,0,0,192,80,0,0,0,0,0,0,96,100,0,0,64,80,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,200,80,0,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,119,69,69,0,0,0,96,100,0,0,72,81,0,0,0,0,0,0,1,0,0,0,192,80,0,0,0,0,0,0,96,100,0,0,0,81,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,96,81,0,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,112,117,116,95,98,97,115,101,69,0,0,0,0,0,0,0,0,216,99,0,0,248,81,0,0,96,100,0,0,224,81,0,0,0,0,0,0,1,0,0,0,24,82,0,0,0,0,0,0,96,100,0,0,152,81,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,32,82,0,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,119,69,69,0,0,0,96,100,0,0,160,82,0,0,0,0,0,0,1,0,0,0,24,82,0,0,0,0,0,0,96,100,0,0,88,82,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,184,82,0,0,0,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,99,69,69,0,0,0,0,0,0,0,0,216,99,0,0,56,83,0,0,96,100,0,0,240,82,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,88,83,0,0,0,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,119,69,69,0,0,0,0,0,0,0,0,216,99,0,0,200,83,0,0,96,100,0,0,128,83,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,232,83,0,0,0,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,99,69,69,0,0,0,0,0,0,0,0,216,99,0,0,88,84,0,0,96,100,0,0,16,84,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,120,84,0,0,0,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,119,69,69,0,0,0,0,0,0,0,0,216,99,0,0,232,84,0,0,96,100,0,0,160,84,0,0,0,0,0,0,2,0,0,0,240,71,0,0,2,0,0,0,8,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,65,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,80,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,65,77,0,0,0,0,0,0,80,77,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,97,0,0,0,110,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,114,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,99,0,0,0,104,0,0,0,0,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,105,0,0,0,108,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,110,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,108,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,65,0,0,0,117,0,0,0,103,0,0,0,117,0,0,0,115,0,0,0,116,0,0,0,0,0,0,0,0,0,0,0,83,0,0,0,101,0,0,0,112,0,0,0,116,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,111,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,78,0,0,0,111,0,0,0,118,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,0,0,0,0,68,0,0,0,101,0,0,0,99,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,97,0,0,0,110,0,0,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,0,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,108,0,0,0,0,0,0,0,65,0,0,0,117,0,0,0,103,0,0,0,0,0,0,0,83,0,0,0,101,0,0,0,112,0,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,0,0,0,0,78,0,0,0,111,0,0,0,118,0,0,0,0,0,0,0,68,0,0,0,101,0,0,0,99], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE+13788);
/* memory initializer */ allocate([74,97,110,117,97,114,121,0,70,101,98,114,117,97,114,121,0,0,0,0,0,0,0,0,77,97,114,99,104,0,0,0,65,112,114,105,108,0,0,0,77,97,121,0,0,0,0,0,74,117,110,101,0,0,0,0,74,117,108,121,0,0,0,0,65,117,103,117,115,116,0,0,83,101,112,116,101,109,98,101,114,0,0,0,0,0,0,0,79,99,116,111,98,101,114,0,78,111,118,101,109,98,101,114,0,0,0,0,0,0,0,0,68,101,99,101,109,98,101,114,0,0,0,0,0,0,0,0,74,97,110,0,0,0,0,0,70,101,98,0,0,0,0,0,77,97,114,0,0,0,0,0,65,112,114,0,0,0,0,0,74,117,110,0,0,0,0,0,74,117,108,0,0,0,0,0,65,117,103,0,0,0,0,0,83,101,112,0,0,0,0,0,79,99,116,0,0,0,0,0,78,111,118,0,0,0,0,0,68,101,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,83,0,0,0,117,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,84,0,0,0,117,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,110,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,114,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,83,0,0,0,97,0,0,0,116,0,0,0,117,0,0,0,114,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,83,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,0,0,0,0,84,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,0,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,0,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,0,0,0,0,83,0,0,0,97,0,0,0,116,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,83,117,110,100,97,121,0,0,77,111,110,100,97,121,0,0,84,117,101,115,100,97,121,0,87,101,100,110,101,115,100,97,121,0,0,0,0,0,0,0,84,104,117,114,115,100,97,121,0,0,0,0,0,0,0,0,70,114,105,100,97,121,0,0,83,97,116,117,114,100,97,121,0,0,0,0,0,0,0,0,83,117,110,0,0,0,0,0,77,111,110,0,0,0,0,0,84,117,101,0,0,0,0,0,87,101,100,0,0,0,0,0,84,104,117,0,0,0,0,0,70,114,105,0,0,0,0,0,83,97,116,0,0,0,0,0,2,0,0,192,3,0,0,192,4,0,0,192,5,0,0,192,6,0,0,192,7,0,0,192,8,0,0,192,9,0,0,192,10,0,0,192,11,0,0,192,12,0,0,192,13,0,0,192,14,0,0,192,15,0,0,192,16,0,0,192,17,0,0,192,18,0,0,192,19,0,0,192,20,0,0,192,21,0,0,192,22,0,0,192,23,0,0,192,24,0,0,192,25,0,0,192,26,0,0,192,27,0,0,192,28,0,0,192,29,0,0,192,30,0,0,192,31,0,0,192,0,0,0,179,1,0,0,195,2,0,0,195,3,0,0,195,4,0,0,195,5,0,0,195,6,0,0,195,7,0,0,195,8,0,0,195,9,0,0,195,10,0,0,195,11,0,0,195,12,0,0,195,13,0,0,211,14,0,0,195,15,0,0,195,0,0,12,187,1,0,12,195,2,0,12,195,3,0,12,195,4,0,12,211,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,99,0,0,101,0,0,0,102,0,0,0,62,0,0,0,0,0,0,0,115,116,100,58,58,98,97,100,95,99,97,115,116,0,0,0,83,116,57,116,121,112,101,95,105,110,102,111,0,0,0,0,216,99,0,0,40,99,0,0,83,116,56,98,97,100,95,99,97,115,116,0,0,0,0,0,0,100,0,0,64,99,0,0,0,0,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,0,0,100,0,0,96,99,0,0,56,99,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,0,100,0,0,152,99,0,0,136,99,0,0,0,0,0,0,0,0,0,0,192,99,0,0,103,0,0,0,104,0,0,0,105,0,0,0,106,0,0,0,22,0,0,0,13,0,0,0,1,0,0,0,5,0,0,0,0,0,0,0,72,100,0,0,103,0,0,0,107,0,0,0,105,0,0,0,106,0,0,0,22,0,0,0,14,0,0,0,2,0,0,0,6,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,100,0,0,32,100,0,0,192,99,0,0,0,0,0,0,0,0,0,0,168,100,0,0,103,0,0,0,108,0,0,0,105,0,0,0,106,0,0,0,22,0,0,0,15,0,0,0,3,0,0,0,7,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,49,95,95,118,109,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,100,0,0,128,100,0,0,192,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,232,102,0,0,109,0,0,0,110,0,0,0,63,0,0,0,0,0,0,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,0,83,116,57,98,97,100,95,97,108,108,111,99,0,0,0,0,0,100,0,0,216,102,0,0,0,0,0,0,0,0,0,0,105,110,102,105,110,105,116,121,0,0,0,0,0,0,0,0,110,97,110,0,0,0,0,0,95,112,137,0,255,9,47,15,10,0,0,0,100,0,0,0,232,3,0,0,16,39,0,0,160,134,1,0,64,66,15,0,128,150,152,0,0,225,245,5], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE+24048);




var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}


  function _llvm_lifetime_end() {}

  
  
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value;
      return value;
    }
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              result = process['stdin']['read']();
              if (!result) {
                if (process['stdin']['_readableState'] && process['stdin']['_readableState']['ended']) {
                  return null;  // EOF
                }
                return undefined;  // no data available
              }
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  
  var MEMFS={ops_table:null,CONTENT_OWNING:1,CONTENT_FLEXIBLE:2,CONTENT_FIXED:3,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.contents = [];
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },ensureFlexible:function (node) {
        if (node.contentMode !== MEMFS.CONTENT_FLEXIBLE) {
          var contents = node.contents;
          node.contents = Array.prototype.slice.call(contents);
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        }
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.contents.length;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.ensureFlexible(node);
            var contents = node.contents;
            if (attr.size < contents.length) contents.length = attr.size;
            else while (attr.size > contents.length) contents.push(0);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          var node = stream.node;
          node.timestamp = Date.now();
          var contents = node.contents;
          if (length && contents.length === 0 && position === 0 && buffer.subarray) {
            // just replace it with the new data
            if (canOwn && offset === 0) {
              node.contents = buffer; // this could be a subarray of Emscripten HEAP, or allocated from some other source.
              node.contentMode = (buffer.buffer === HEAP8.buffer) ? MEMFS.CONTENT_OWNING : MEMFS.CONTENT_FIXED;
            } else {
              node.contents = new Uint8Array(buffer.subarray(offset, offset+length));
              node.contentMode = MEMFS.CONTENT_FIXED;
            }
            return length;
          }
          MEMFS.ensureFlexible(node);
          var contents = node.contents;
          while (contents.length < position) contents.push(0);
          for (var i = 0; i < length; i++) {
            contents[position + i] = buffer[offset + i];
          }
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.contents.length;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.ungotten = [];
          stream.position = position;
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.ensureFlexible(stream.node);
          var contents = stream.node.contents;
          var limit = offset + length;
          while (limit > contents.length) contents.push(0);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },getDB:function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          fileStore.createIndex('timestamp', 'timestamp', { unique: false });
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function() {
          callback(this.error);
        };
      },getLocalSet:function (mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function (mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function() { callback(this.error); };
  
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          var index = store.index('timestamp');
  
          index.openKeyCursor().onsuccess = function(event) {
            var cursor = event.target.result;
  
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, entries: entries });
            }
  
            entries[cursor.primaryKey] = { timestamp: cursor.key };
  
            cursor.continue();
          };
        });
      },loadLocalEntry:function (path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { encoding: 'binary', canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function() { callback(this.error); };
      },storeRemoteEntry:function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },removeRemoteEntry:function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        transaction.onerror = function() { done(this.error); };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so 
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          stream.position = position;
          return position;
        }}};
  
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || {};
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return !!node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        return FS.nodePermissions(dir, 'x');
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        if (stream.__proto__) {
          // reuse the object
          stream.__proto__ = FS.FSStream.prototype;
        } else {
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
        }
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },getStreamFromPtr:function (ptr) {
        return FS.streams[ptr - 1];
      },getPtrForStream:function (stream) {
        return stream ? stream.fd + 1 : 0;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },getMounts:function (mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            callback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions
        var err = FS.mayOpen(node, flags);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        return stream.stream_ops.llseek(stream, offset, whence);
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0, opts.canOwn);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0, opts.canOwn);
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=FS.getPtrForStream(stdin);
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=FS.getPtrForStream(stdout);
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=FS.getPtrForStream(stderr);
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno) {
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
          this.message = ERRNO_MESSAGES[errno];
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = Math.floor(idx / this.chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          }
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
              // Find length
              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var chunkSize = 1024*1024; // Chunk size in bytes
  
              if (!hasByteServing) chunkSize = datalength;
  
              // Function to get a range from the remote URL.
              var doXHR = (function(from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
                // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
                // Some hints to the browser that we want binary data.
                if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
                if (xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
  
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                  return new Uint8Array(xhr.response || []);
                } else {
                  return intArrayFromString(xhr.responseText || '', true);
                }
              });
              var lazyArray = this;
              lazyArray.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum+1) * chunkSize - 1; // including this byte
                end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
                  lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
              });
  
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
          }
  
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};
  
  var Browser={mainLoop:{scheduler:null,method:"",shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted || ENVIRONMENT_IS_WORKER) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
        // Canvas event setup
  
        var canvas = Module['canvas'];
        
        // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
        // Module['forcedAspectRatio'] = 4 / 3;
        
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'] ||
                                    canvas['msRequestPointerLock'] ||
                                    function(){};
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'] ||
                                 document['msExitPointerLock'] ||
                                 function(){}; // no-op if function does not exist
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas ||
                                document['msPointerLockElement'] === canvas;
        }
  
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
        document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        var ctx;
        var errorInfo = '?';
        function onContextCreationError(event) {
          errorInfo = event.statusMessage || errorInfo;
        }
        try {
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false
            };
  
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
  
  
            canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
            try {
              ['experimental-webgl', 'webgl'].some(function(webglId) {
                return ctx = canvas.getContext(webglId, contextAttributes);
              });
            } finally {
              canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
            }
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas: ' + [errorInfo, e]);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
  
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          GLctx = Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        var canvasContainer = canvas.parentNode;
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement'] ||
               document['msFullScreenElement'] || document['msFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'] ||
                                      document['msExitFullscreen'] ||
                                      document['exitFullscreen'] ||
                                      function() {};
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else {
            
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            var canvasContainer = canvas.parentNode;
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
            
            if (Browser.resizeCanvas) Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
          Browser.updateCanvasDimensions(canvas);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
          document.addEventListener('MSFullscreenChange', fullScreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
        
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullScreen = canvasContainer['requestFullScreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullScreen'] ? function() { canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvasContainer.requestFullScreen();
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          setTimeout(func, 1000/60);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           window['setTimeout'];
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },getMouseWheelDelta:function (event) {
        return Math.max(-1, Math.min(1, event.type === 'DOMMouseScroll' ? event.detail : -event.wheelDelta));
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var x, y;
          
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
          if (event.type == 'touchstart' ||
              event.type == 'touchend' ||
              event.type == 'touchmove') {
            var t = event.touches.item(0);
            if (t) {
              x = t.pageX - (scrollX + rect.left);
              y = t.pageY - (scrollY + rect.top);
            } else {
              return;
            }
          } else {
            x = event.pageX - (scrollX + rect.left);
            y = event.pageY - (scrollY + rect.top);
          }
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },updateCanvasDimensions:function (canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
             document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
             document['fullScreenElement'] || document['fullscreenElement'] ||
             document['msFullScreenElement'] || document['msFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      }};var SDL={defaults:{width:320,height:200,copyOnLock:true},version:null,surfaces:{},canvasPool:[],events:[],fonts:[null],audios:[null],rwops:[null],music:{audio:null,volume:1},mixerFrequency:22050,mixerFormat:32784,mixerNumChannels:2,mixerChunkSize:1024,channelMinimumNumber:0,GL:false,glAttributes:{0:3,1:3,2:2,3:0,4:0,5:1,6:16,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:1,16:0,17:0,18:0},keyboardState:null,keyboardMap:{},canRequestFullscreen:false,isRequestingFullscreen:false,textInput:false,startTime:null,initFlags:0,buttonState:0,modState:0,DOMButtons:[0,0,0],DOMEventToSDLEvent:{},keyCodes:{16:1249,17:1248,18:1250,33:1099,34:1102,37:1104,38:1106,39:1103,40:1105,46:127,96:1112,97:1113,98:1114,99:1115,100:1116,101:1117,102:1118,103:1119,104:1120,105:1121,112:1082,113:1083,114:1084,115:1085,116:1086,117:1087,118:1088,119:1089,120:1090,121:1091,122:1092,123:1093,173:45,188:44,190:46,191:47,192:96},scanCodes:{8:42,9:43,13:40,27:41,32:44,44:54,46:55,47:56,48:39,49:30,50:31,51:32,52:33,53:34,54:35,55:36,56:37,57:38,59:51,61:46,91:47,92:49,93:48,96:52,97:4,98:5,99:6,100:7,101:8,102:9,103:10,104:11,105:12,106:13,107:14,108:15,109:16,110:17,111:18,112:19,113:20,114:21,115:22,116:23,117:24,118:25,119:26,120:27,121:28,122:29,305:224,308:226},loadRect:function (rect) {
        return {
          x: HEAP32[((rect + 0)>>2)],
          y: HEAP32[((rect + 4)>>2)],
          w: HEAP32[((rect + 8)>>2)],
          h: HEAP32[((rect + 12)>>2)]
        };
      },loadColorToCSSRGB:function (color) {
        var rgba = HEAP32[((color)>>2)];
        return 'rgb(' + (rgba&255) + ',' + ((rgba >> 8)&255) + ',' + ((rgba >> 16)&255) + ')';
      },loadColorToCSSRGBA:function (color) {
        var rgba = HEAP32[((color)>>2)];
        return 'rgba(' + (rgba&255) + ',' + ((rgba >> 8)&255) + ',' + ((rgba >> 16)&255) + ',' + (((rgba >> 24)&255)/255) + ')';
      },translateColorToCSSRGBA:function (rgba) {
        return 'rgba(' + (rgba&0xff) + ',' + (rgba>>8 & 0xff) + ',' + (rgba>>16 & 0xff) + ',' + (rgba>>>24)/0xff + ')';
      },translateRGBAToCSSRGBA:function (r, g, b, a) {
        return 'rgba(' + (r&0xff) + ',' + (g&0xff) + ',' + (b&0xff) + ',' + (a&0xff)/255 + ')';
      },translateRGBAToColor:function (r, g, b, a) {
        return r | g << 8 | b << 16 | a << 24;
      },makeSurface:function (width, height, flags, usePageCanvas, source, rmask, gmask, bmask, amask) {
        flags = flags || 0;
        var is_SDL_HWSURFACE = flags & 0x00000001;
        var is_SDL_HWPALETTE = flags & 0x00200000;
        var is_SDL_OPENGL = flags & 0x04000000;
  
        var surf = _malloc(60);
        var pixelFormat = _malloc(44);
        //surface with SDL_HWPALETTE flag is 8bpp surface (1 byte)
        var bpp = is_SDL_HWPALETTE ? 1 : 4;
        var buffer = 0;
  
        // preemptively initialize this for software surfaces,
        // otherwise it will be lazily initialized inside of SDL_LockSurface
        if (!is_SDL_HWSURFACE && !is_SDL_OPENGL) {
          buffer = _malloc(width * height * 4);
        }
  
        HEAP32[((surf)>>2)]=flags;
        HEAP32[(((surf)+(4))>>2)]=pixelFormat;
        HEAP32[(((surf)+(8))>>2)]=width;
        HEAP32[(((surf)+(12))>>2)]=height;
        HEAP32[(((surf)+(16))>>2)]=width * bpp;  // assuming RGBA or indexed for now,
                                                                                          // since that is what ImageData gives us in browsers
        HEAP32[(((surf)+(20))>>2)]=buffer;
        HEAP32[(((surf)+(36))>>2)]=0;
        HEAP32[(((surf)+(56))>>2)]=1;
  
        HEAP32[((pixelFormat)>>2)]=0 /* XXX missing C define SDL_PIXELFORMAT_RGBA8888 */;
        HEAP32[(((pixelFormat)+(4))>>2)]=0;// TODO
        HEAP8[(((pixelFormat)+(8))|0)]=bpp * 8;
        HEAP8[(((pixelFormat)+(9))|0)]=bpp;
  
        HEAP32[(((pixelFormat)+(12))>>2)]=rmask || 0x000000ff;
        HEAP32[(((pixelFormat)+(16))>>2)]=gmask || 0x0000ff00;
        HEAP32[(((pixelFormat)+(20))>>2)]=bmask || 0x00ff0000;
        HEAP32[(((pixelFormat)+(24))>>2)]=amask || 0xff000000;
  
        // Decide if we want to use WebGL or not
        SDL.GL = SDL.GL || is_SDL_OPENGL;
        var canvas;
        if (!usePageCanvas) {
          if (SDL.canvasPool.length > 0) {
            canvas = SDL.canvasPool.pop();
          } else {
            canvas = document.createElement('canvas');
          }
          canvas.width = width;
          canvas.height = height;
        } else {
          canvas = Module['canvas'];
        }
  
        var webGLContextAttributes = {
          antialias: ((SDL.glAttributes[13 /*SDL_GL_MULTISAMPLEBUFFERS*/] != 0) && (SDL.glAttributes[14 /*SDL_GL_MULTISAMPLESAMPLES*/] > 1)),
          depth: (SDL.glAttributes[6 /*SDL_GL_DEPTH_SIZE*/] > 0),
          stencil: (SDL.glAttributes[7 /*SDL_GL_STENCIL_SIZE*/] > 0)
        };
        
        var ctx = Browser.createContext(canvas, is_SDL_OPENGL, usePageCanvas, webGLContextAttributes);
              
        SDL.surfaces[surf] = {
          width: width,
          height: height,
          canvas: canvas,
          ctx: ctx,
          surf: surf,
          buffer: buffer,
          pixelFormat: pixelFormat,
          alpha: 255,
          flags: flags,
          locked: 0,
          usePageCanvas: usePageCanvas,
          source: source,
  
          isFlagSet: function(flag) {
            return flags & flag;
          }
        };
  
        return surf;
      },copyIndexedColorData:function (surfData, rX, rY, rW, rH) {
        // HWPALETTE works with palette
        // setted by SDL_SetColors
        if (!surfData.colors) {
          return;
        }
        
        var fullWidth  = Module['canvas'].width;
        var fullHeight = Module['canvas'].height;
  
        var startX  = rX || 0;
        var startY  = rY || 0;
        var endX    = (rW || (fullWidth - startX)) + startX;
        var endY    = (rH || (fullHeight - startY)) + startY;
        
        var buffer  = surfData.buffer;
        var data    = surfData.image.data;
        var colors  = surfData.colors;
  
        for (var y = startY; y < endY; ++y) {
          var indexBase = y * fullWidth;
          var colorBase = indexBase * 4;
          for (var x = startX; x < endX; ++x) {
            // HWPALETTE have only 256 colors (not rgba)
            var index = HEAPU8[((buffer + indexBase + x)|0)] * 3;
            var colorOffset = colorBase + x * 4;
  
            data[colorOffset   ] = colors[index   ];
            data[colorOffset +1] = colors[index +1];
            data[colorOffset +2] = colors[index +2];
            //unused: data[colorOffset +3] = color[index +3];
          }
        }
      },freeSurface:function (surf) {
        var refcountPointer = surf + 56;
        var refcount = HEAP32[((refcountPointer)>>2)];
        if (refcount > 1) {
          HEAP32[((refcountPointer)>>2)]=refcount - 1;
          return;
        }
  
        var info = SDL.surfaces[surf];
        if (!info.usePageCanvas && info.canvas) SDL.canvasPool.push(info.canvas);
        if (info.buffer) _free(info.buffer);
        _free(info.pixelFormat);
        _free(surf);
        SDL.surfaces[surf] = null;
      },touchX:0,touchY:0,savedKeydown:null,receiveEvent:function (event) {
        switch(event.type) {
          case 'touchstart':
            event.preventDefault();
            var touch = event.touches[0];
            touchX = touch.pageX;
            touchY = touch.pageY;
            var event = {
              type: 'mousedown',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.DOMButtons[0] = 1;
            SDL.events.push(event);
            break;
          case 'touchmove':
            event.preventDefault();
            var touch = event.touches[0];
            touchX = touch.pageX;
            touchY = touch.pageY;
            event = {
              type: 'mousemove',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.events.push(event);
            break;
          case 'touchend':
            event.preventDefault();
            event = {
              type: 'mouseup',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.DOMButtons[0] = 0;
            SDL.events.push(event);
            break;
          case 'mousemove':
            if (Browser.pointerLock) {
              // workaround for firefox bug 750111
              if ('mozMovementX' in event) {
                event['movementX'] = event['mozMovementX'];
                event['movementY'] = event['mozMovementY'];
              }
              // workaround for Firefox bug 782777
              if (event['movementX'] == 0 && event['movementY'] == 0) {
                // ignore a mousemove event if it doesn't contain any movement info
                // (without pointer lock, we infer movement from pageX/pageY, so this check is unnecessary)
                event.preventDefault();
                return;
              }
            }
            // fall through
          case 'keydown': case 'keyup': case 'keypress': case 'mousedown': case 'mouseup': case 'DOMMouseScroll': case 'mousewheel':
            // If we preventDefault on keydown events, the subsequent keypress events
            // won't fire. However, it's fine (and in some cases necessary) to
            // preventDefault for keys that don't generate a character. Otherwise,
            // preventDefault is the right thing to do in general.
            if (event.type !== 'keydown' || (!SDL.unicode && !SDL.textInput) || (event.keyCode === 8 /* backspace */ || event.keyCode === 9 /* tab */)) {
              event.preventDefault();
            }
  
            if (event.type == 'DOMMouseScroll' || event.type == 'mousewheel') {
              var button = Browser.getMouseWheelDelta(event) > 0 ? 4 : 3;
              var event2 = {
                type: 'mousedown',
                button: button,
                pageX: event.pageX,
                pageY: event.pageY
              };
              SDL.events.push(event2);
              event = {
                type: 'mouseup',
                button: button,
                pageX: event.pageX,
                pageY: event.pageY
              };
            } else if (event.type == 'mousedown') {
              SDL.DOMButtons[event.button] = 1;
            } else if (event.type == 'mouseup') {
              // ignore extra ups, can happen if we leave the canvas while pressing down, then return,
              // since we add a mouseup in that case
              if (!SDL.DOMButtons[event.button]) {
                return;
              }
  
              SDL.DOMButtons[event.button] = 0;
            }
  
            // We can only request fullscreen as the result of user input.
            // Due to this limitation, we toggle a boolean on keydown which
            // SDL_WM_ToggleFullScreen will check and subsequently set another
            // flag indicating for us to request fullscreen on the following
            // keyup. This isn't perfect, but it enables SDL_WM_ToggleFullScreen
            // to work as the result of a keypress (which is an extremely
            // common use case).
            if (event.type === 'keydown') {
              SDL.canRequestFullscreen = true;
            } else if (event.type === 'keyup') {
              if (SDL.isRequestingFullscreen) {
                Module['requestFullScreen'](true, true);
                SDL.isRequestingFullscreen = false;
              }
              SDL.canRequestFullscreen = false;
            }
  
            // SDL expects a unicode character to be passed to its keydown events.
            // Unfortunately, the browser APIs only provide a charCode property on
            // keypress events, so we must backfill in keydown events with their
            // subsequent keypress event's charCode.
            if (event.type === 'keypress' && SDL.savedKeydown) {
              // charCode is read-only
              SDL.savedKeydown.keypressCharCode = event.charCode;
              SDL.savedKeydown = null;
            } else if (event.type === 'keydown') {
              SDL.savedKeydown = event;
            }
  
            // Don't push keypress events unless SDL_StartTextInput has been called.
            if (event.type !== 'keypress' || SDL.textInput) {
              SDL.events.push(event);
            }
            break;
          case 'mouseout':
            // Un-press all pressed mouse buttons, because we might miss the release outside of the canvas
            for (var i = 0; i < 3; i++) {
              if (SDL.DOMButtons[i]) {
                SDL.events.push({
                  type: 'mouseup',
                  button: i,
                  pageX: event.pageX,
                  pageY: event.pageY
                });
                SDL.DOMButtons[i] = 0;
              }
            }
            event.preventDefault();
            break;
          case 'blur':
          case 'visibilitychange': {
            // Un-press all pressed keys: TODO
            for (var code in SDL.keyboardMap) {
              SDL.events.push({
                type: 'keyup',
                keyCode: SDL.keyboardMap[code]
              });
            }
            event.preventDefault();
            break;
          }
          case 'unload':
            if (Browser.mainLoop.runner) {
              SDL.events.push(event);
              // Force-run a main event loop, since otherwise this event will never be caught!
              Browser.mainLoop.runner();
            }
            return;
          case 'resize':
            SDL.events.push(event);
            // manually triggered resize event doesn't have a preventDefault member
            if (event.preventDefault) {
              event.preventDefault();
            }
            break;
        }
        if (SDL.events.length >= 10000) {
          Module.printErr('SDL event queue full, dropping events');
          SDL.events = SDL.events.slice(0, 10000);
        }
        return;
      },handleEvent:function (event) {
        if (event.handled) return;
        event.handled = true;
  
        switch (event.type) {
          case 'keydown': case 'keyup': {
            var down = event.type === 'keydown';
            var code = event.keyCode;
            if (code >= 65 && code <= 90) {
              code += 32; // make lowercase for SDL
            } else {
              code = SDL.keyCodes[event.keyCode] || event.keyCode;
            }
  
            HEAP8[(((SDL.keyboardState)+(code))|0)]=down;
            // TODO: lmeta, rmeta, numlock, capslock, KMOD_MODE, KMOD_RESERVED
            SDL.modState = (HEAP8[(((SDL.keyboardState)+(1248))|0)] ? 0x0040 | 0x0080 : 0) | // KMOD_LCTRL & KMOD_RCTRL
              (HEAP8[(((SDL.keyboardState)+(1249))|0)] ? 0x0001 | 0x0002 : 0) | // KMOD_LSHIFT & KMOD_RSHIFT
              (HEAP8[(((SDL.keyboardState)+(1250))|0)] ? 0x0100 | 0x0200 : 0); // KMOD_LALT & KMOD_RALT
  
            if (down) {
              SDL.keyboardMap[code] = event.keyCode; // save the DOM input, which we can use to unpress it during blur
            } else {
              delete SDL.keyboardMap[code];
            }
  
            break;
          }
          case 'mousedown': case 'mouseup':
            if (event.type == 'mousedown') {
              // SDL_BUTTON(x) is defined as (1 << ((x)-1)).  SDL buttons are 1-3,
              // and DOM buttons are 0-2, so this means that the below formula is
              // correct.
              SDL.buttonState |= 1 << event.button;
            } else if (event.type == 'mouseup') {
              SDL.buttonState &= ~(1 << event.button);
            }
            // fall through
          case 'mousemove': {
            Browser.calculateMouseEvent(event);
            break;
          }
        }
      },makeCEvent:function (event, ptr) {
        if (typeof event === 'number') {
          // This is a pointer to a native C event that was SDL_PushEvent'ed
          _memcpy(ptr, event, 28); // XXX
          return;
        }
  
        SDL.handleEvent(event);
  
        switch (event.type) {
          case 'keydown': case 'keyup': {
            var down = event.type === 'keydown';
            //Module.print('Received key event: ' + event.keyCode);
            var key = event.keyCode;
            if (key >= 65 && key <= 90) {
              key += 32; // make lowercase for SDL
            } else {
              key = SDL.keyCodes[event.keyCode] || event.keyCode;
            }
            var scan;
            if (key >= 1024) {
              scan = key - 1024;
            } else {
              scan = SDL.scanCodes[key] || key;
            }
  
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP8[(((ptr)+(8))|0)]=down ? 1 : 0;
            HEAP8[(((ptr)+(9))|0)]=0; // TODO
            HEAP32[(((ptr)+(12))>>2)]=scan;
            HEAP32[(((ptr)+(16))>>2)]=key;
            HEAP16[(((ptr)+(20))>>1)]=SDL.modState;
            // some non-character keys (e.g. backspace and tab) won't have keypressCharCode set, fill in with the keyCode.
            HEAP32[(((ptr)+(24))>>2)]=event.keypressCharCode || key;
  
            break;
          }
          case 'keypress': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            // Not filling in windowID for now
            var cStr = intArrayFromString(String.fromCharCode(event.charCode));
            for (var i = 0; i < cStr.length; ++i) {
              HEAP8[(((ptr)+(8 + i))|0)]=cStr[i];
            }
            break;
          }
          case 'mousedown': case 'mouseup': case 'mousemove': {
            if (event.type != 'mousemove') {
              var down = event.type === 'mousedown';
              HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
              HEAP8[(((ptr)+(8))|0)]=event.button+1; // DOM buttons are 0-2, SDL 1-3
              HEAP8[(((ptr)+(9))|0)]=down ? 1 : 0;
              HEAP32[(((ptr)+(12))>>2)]=Browser.mouseX;
              HEAP32[(((ptr)+(16))>>2)]=Browser.mouseY;
            } else {
              HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
              HEAP8[(((ptr)+(8))|0)]=SDL.buttonState;
              HEAP32[(((ptr)+(12))>>2)]=Browser.mouseX;
              HEAP32[(((ptr)+(16))>>2)]=Browser.mouseY;
              HEAP32[(((ptr)+(20))>>2)]=Browser.mouseMovementX;
              HEAP32[(((ptr)+(24))>>2)]=Browser.mouseMovementY;
            }
            break;
          }
          case 'unload': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            break;
          }
          case 'resize': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP32[(((ptr)+(4))>>2)]=event.w;
            HEAP32[(((ptr)+(8))>>2)]=event.h;
            break;
          }
          case 'joystick_button_up': case 'joystick_button_down': {
            var state = event.type === 'joystick_button_up' ? 0 : 1;
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP8[(((ptr)+(4))|0)]=event.index;
            HEAP8[(((ptr)+(5))|0)]=event.button;
            HEAP8[(((ptr)+(6))|0)]=state;
            break;
          }
          case 'joystick_axis_motion': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP8[(((ptr)+(4))|0)]=event.index;
            HEAP8[(((ptr)+(5))|0)]=event.axis;
            HEAP32[(((ptr)+(8))>>2)]=SDL.joystickAxisValueConversion(event.value);
            break;
          }
          default: throw 'Unhandled SDL event: ' + event.type;
        }
      },estimateTextWidth:function (fontData, text) {
        var h = fontData.size;
        var fontString = h + 'px ' + fontData.name;
        var tempCtx = SDL.ttfContext;
        tempCtx.save();
        tempCtx.font = fontString;
        var ret = tempCtx.measureText(text).width | 0;
        tempCtx.restore();
        return ret;
      },allocateChannels:function (num) { // called from Mix_AllocateChannels and init
        if (SDL.numChannels && SDL.numChannels >= num && num != 0) return;
        SDL.numChannels = num;
        SDL.channels = [];
        for (var i = 0; i < num; i++) {
          SDL.channels[i] = {
            audio: null,
            volume: 1.0
          };
        }
      },setGetVolume:function (info, volume) {
        if (!info) return 0;
        var ret = info.volume * 128; // MIX_MAX_VOLUME
        if (volume != -1) {
          info.volume = volume / 128;
          if (info.audio) info.audio.volume = info.volume;
        }
        return ret;
      },fillWebAudioBufferFromHeap:function (heapPtr, sizeSamplesPerChannel, dstAudioBuffer) {
        // The input audio data is interleaved across the channels, i.e. [L, R, L, R, L, R, ...] and is either 8-bit or 16-bit as
        // supported by the SDL API. The output audio wave data for Web Audio API must be in planar buffers of [-1,1]-normalized Float32 data,
        // so perform a buffer conversion for the data.
        var numChannels = SDL.audio.channels;
        for(var c = 0; c < numChannels; ++c) {
          var channelData = dstAudioBuffer['getChannelData'](c);
          if (channelData.length != sizeSamplesPerChannel) {
            throw 'Web Audio output buffer length mismatch! Destination size: ' + channelData.length + ' samples vs expected ' + sizeSamplesPerChannel + ' samples!';
          }
          if (SDL.audio.format == 0x8010 /*AUDIO_S16LSB*/) {
            for(var j = 0; j < sizeSamplesPerChannel; ++j) {
              channelData[j] = (HEAP16[(((heapPtr)+((j*numChannels + c)*2))>>1)]) / 0x8000;
            }
          } else if (SDL.audio.format == 0x0008 /*AUDIO_U8*/) {
            for(var j = 0; j < sizeSamplesPerChannel; ++j) {
              var v = (HEAP8[(((heapPtr)+(j*numChannels + c))|0)]);
              channelData[j] = ((v >= 0) ? v-128 : v+128) /128;
            }
          }
        }
      },debugSurface:function (surfData) {
        console.log('dumping surface ' + [surfData.surf, surfData.source, surfData.width, surfData.height]);
        var image = surfData.ctx.getImageData(0, 0, surfData.width, surfData.height);
        var data = image.data;
        var num = Math.min(surfData.width, surfData.height);
        for (var i = 0; i < num; i++) {
          console.log('   diagonal ' + i + ':' + [data[i*surfData.width*4 + i*4 + 0], data[i*surfData.width*4 + i*4 + 1], data[i*surfData.width*4 + i*4 + 2], data[i*surfData.width*4 + i*4 + 3]]);
        }
      },joystickEventState:1,lastJoystickState:{},joystickNamePool:{},recordJoystickState:function (joystick, state) {
        // Standardize button state.
        var buttons = new Array(state.buttons.length);
        for (var i = 0; i < state.buttons.length; i++) {
          buttons[i] = SDL.getJoystickButtonState(state.buttons[i]);
        }
  
        SDL.lastJoystickState[joystick] = {
          buttons: buttons,
          axes: state.axes.slice(0),
          timestamp: state.timestamp,
          index: state.index,
          id: state.id
        };
      },getJoystickButtonState:function (button) {
        if (typeof button === 'object') {
          // Current gamepad API editor's draft (Firefox Nightly)
          // https://dvcs.w3.org/hg/gamepad/raw-file/default/gamepad.html#idl-def-GamepadButton
          return button.pressed;
        } else {
          // Current gamepad API working draft (Firefox / Chrome Stable)
          // http://www.w3.org/TR/2012/WD-gamepad-20120529/#gamepad-interface
          return button > 0;
        }
      },queryJoysticks:function () {
        for (var joystick in SDL.lastJoystickState) {
          var state = SDL.getGamepad(joystick - 1);
          var prevState = SDL.lastJoystickState[joystick];
          // Check only if the timestamp has differed.
          // NOTE: Timestamp is not available in Firefox.
          if (typeof state.timestamp !== 'number' || state.timestamp !== prevState.timestamp) {
            var i;
            for (i = 0; i < state.buttons.length; i++) {
              var buttonState = SDL.getJoystickButtonState(state.buttons[i]);
              // NOTE: The previous state already has a boolean representation of
              //       its button, so no need to standardize its button state here.
              if (buttonState !== prevState.buttons[i]) {
                // Insert button-press event.
                SDL.events.push({
                  type: buttonState ? 'joystick_button_down' : 'joystick_button_up',
                  joystick: joystick,
                  index: joystick - 1,
                  button: i
                });
              }
            }
            for (i = 0; i < state.axes.length; i++) {
              if (state.axes[i] !== prevState.axes[i]) {
                // Insert axes-change event.
                SDL.events.push({
                  type: 'joystick_axis_motion',
                  joystick: joystick,
                  index: joystick - 1,
                  axis: i,
                  value: state.axes[i]
                });
              }
            }
  
            SDL.recordJoystickState(joystick, state);
          }
        }
      },joystickAxisValueConversion:function (value) {
        // Ensures that 0 is 0, 1 is 32767, and -1 is 32768.
        return Math.ceil(((value+1) * 32767.5) - 32768);
      },getGamepads:function () {
        var fcn = navigator.getGamepads || navigator.webkitGamepads || navigator.mozGamepads || navigator.gamepads || navigator.webkitGetGamepads;
        if (fcn !== undefined) {
          // The function must be applied on the navigator object.
          return fcn.apply(navigator);
        } else {
          return [];
        }
      },getGamepad:function (deviceIndex) {
        var gamepads = SDL.getGamepads();
        if (gamepads.length > deviceIndex && deviceIndex >= 0) {
          return gamepads[deviceIndex];
        }
        return null;
      }};function _Mix_OpenAudio(frequency, format, channels, chunksize) {
      SDL.allocateChannels(32);
      // Just record the values for a later call to Mix_QuickLoad_RAW
      SDL.mixerFrequency = frequency;
      SDL.mixerFormat = format;
      SDL.mixerNumChannels = channels;
      SDL.mixerChunkSize = chunksize;
      return 0;
    }

  function _pthread_mutex_lock() {}

  
  var GL={counter:1,lastError:0,buffers:[],programs:[],framebuffers:[],renderbuffers:[],textures:[],uniforms:[],shaders:[],vaos:[],byteSizeByTypeRoot:5120,byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],programInfos:{},stringCache:{},packAlignment:4,unpackAlignment:4,init:function () {
        GL.createLog2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        Browser.moduleContextCreatedCallbacks.push(GL.initExtensions);
      },recordError:function recordError(errorCode) {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },getNewId:function (table) {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },MINI_TEMP_BUFFER_SIZE:16,miniTempBuffer:null,miniTempBufferViews:[0],MAX_TEMP_BUFFER_SIZE:2097152,tempVertexBuffers1:[],tempVertexBufferCounters1:[],tempVertexBuffers2:[],tempVertexBufferCounters2:[],numTempVertexBuffersPerSize:64,tempIndexBuffers:[],tempQuadIndexBuffer:null,log2ceilLookup:null,createLog2ceilLookup:function (maxValue) {
        GL.log2ceilLookup = new Uint8Array(maxValue+1);
        var log2 = 0;
        var pow2 = 1;
        GL.log2ceilLookup[0] = 0;
        for(var i = 1; i <= maxValue; ++i) {
          if (i > pow2) {
            pow2 <<= 1;
            ++log2;
          }
          GL.log2ceilLookup[i] = log2;
        }
      },generateTempBuffers:function (quads) {
        var largestIndex = GL.log2ceilLookup[GL.MAX_TEMP_BUFFER_SIZE];
        GL.tempVertexBufferCounters1.length = GL.tempVertexBufferCounters2.length = largestIndex+1;
        GL.tempVertexBuffers1.length = GL.tempVertexBuffers2.length = largestIndex+1;
        GL.tempIndexBuffers.length = largestIndex+1;
        for(var i = 0; i <= largestIndex; ++i) {
          GL.tempIndexBuffers[i] = null; // Created on-demand
          GL.tempVertexBufferCounters1[i] = GL.tempVertexBufferCounters2[i] = 0;
          var ringbufferLength = GL.numTempVertexBuffersPerSize;
          GL.tempVertexBuffers1[i] = [];
          GL.tempVertexBuffers2[i] = [];
          var ringbuffer1 = GL.tempVertexBuffers1[i];
          var ringbuffer2 = GL.tempVertexBuffers2[i];
          ringbuffer1.length = ringbuffer2.length = ringbufferLength;
          for(var j = 0; j < ringbufferLength; ++j) {
            ringbuffer1[j] = ringbuffer2[j] = null; // Created on-demand
          }
        }
  
        if (quads) {
          // GL_QUAD indexes can be precalculated
          GL.tempQuadIndexBuffer = GLctx.createBuffer();
          GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, GL.tempQuadIndexBuffer);
          var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
          var quadIndexes = new Uint16Array(numIndexes);
          var i = 0, v = 0;
          while (1) {
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+1;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+3;
            if (i >= numIndexes) break;
            v += 4;
          }
          GLctx.bufferData(GLctx.ELEMENT_ARRAY_BUFFER, quadIndexes, GLctx.STATIC_DRAW);
          GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, null);
        }
      },getTempVertexBuffer:function getTempVertexBuffer(sizeBytes) {
        var idx = GL.log2ceilLookup[sizeBytes];
        var ringbuffer = GL.tempVertexBuffers1[idx];
        var nextFreeBufferIndex = GL.tempVertexBufferCounters1[idx];
        GL.tempVertexBufferCounters1[idx] = (GL.tempVertexBufferCounters1[idx]+1) & (GL.numTempVertexBuffersPerSize-1);
        var vbo = ringbuffer[nextFreeBufferIndex];
        if (vbo) {
          return vbo;
        }
        var prevVBO = GLctx.getParameter(GLctx.ARRAY_BUFFER_BINDING);
        ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
        GLctx.bindBuffer(GLctx.ARRAY_BUFFER, ringbuffer[nextFreeBufferIndex]);
        GLctx.bufferData(GLctx.ARRAY_BUFFER, 1 << idx, GLctx.DYNAMIC_DRAW);
        GLctx.bindBuffer(GLctx.ARRAY_BUFFER, prevVBO);
        return ringbuffer[nextFreeBufferIndex];
      },getTempIndexBuffer:function getTempIndexBuffer(sizeBytes) {
        var idx = GL.log2ceilLookup[sizeBytes];
        var ibo = GL.tempIndexBuffers[idx];
        if (ibo) {
          return ibo;
        }
        var prevIBO = GLctx.getParameter(GLctx.ELEMENT_ARRAY_BUFFER_BINDING);
        GL.tempIndexBuffers[idx] = GLctx.createBuffer();
        GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, GL.tempIndexBuffers[idx]);
        GLctx.bufferData(GLctx.ELEMENT_ARRAY_BUFFER, 1 << idx, GLctx.DYNAMIC_DRAW);
        GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, prevIBO);
        return GL.tempIndexBuffers[idx];
      },newRenderingFrameStarted:function newRenderingFrameStarted() {
        var vb = GL.tempVertexBuffers1;
        GL.tempVertexBuffers1 = GL.tempVertexBuffers2;
        GL.tempVertexBuffers2 = vb;
        vb = GL.tempVertexBufferCounters1;
        GL.tempVertexBufferCounters1 = GL.tempVertexBufferCounters2;
        GL.tempVertexBufferCounters2 = vb;
        var largestIndex = GL.log2ceilLookup[GL.MAX_TEMP_BUFFER_SIZE];
        for(var i = 0; i <= largestIndex; ++i) {
          GL.tempVertexBufferCounters1[i] = 0;
        }
      },getSource:function (shader, count, string, length) {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var frag;
          if (length) {
            var len = HEAP32[(((length)+(i*4))>>2)];
            if (len < 0) {
              frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)]);
            } else {
              frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)], len);
            }
          } else {
            frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)]);
          }
          source += frag;
        }
        return source;
      },computeImageSize:function (width, height, sizePerPixel, alignment) {
        function roundedToNextMultipleOf(x, y) {
          return Math.floor((x + y - 1) / y) * y
        }
        var plainRowSize = width * sizePerPixel;
        var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
        return (height <= 0) ? 0 :
                 ((height - 1) * alignedRowSize + plainRowSize);
      },get:function (name_, p, type) {
        // Guard against user passing a null pointer.
        // Note that GLES2 spec does not say anything about how passing a null pointer should be treated.
        // Testing on desktop core GL 3, the application crashes on glGetIntegerv to a null pointer, but
        // better to report an error instead of doing anything random.
        if (!p) {
          GL.recordError(0x0501 /* GL_INVALID_VALUE */);
          return;
        }
        var ret = undefined;
        switch(name_) { // Handle a few trivial GLES values
          case 0x8DFA: // GL_SHADER_COMPILER
            ret = 1;
            break;
          case 0x8DF8: // GL_SHADER_BINARY_FORMATS
            if (type !== 'Integer') {
              GL.recordError(0x0500); // GL_INVALID_ENUM
            }
            return; // Do not write anything to the out pointer, since no binary formats are supported.
          case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
            ret = 0;
            break;
          case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
            // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be queried for length),
            // so implement it ourselves to allow C++ GLES2 code get the length.
            var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
            ret = formats.length;
            break;
          case 0x8B9A: // GL_IMPLEMENTATION_COLOR_READ_TYPE
            ret = 0x1401; // GL_UNSIGNED_BYTE
            break;
          case 0x8B9B: // GL_IMPLEMENTATION_COLOR_READ_FORMAT
            ret = 0x1908; // GL_RGBA
            break;
        }
  
        if (ret === undefined) {
          var result = GLctx.getParameter(name_);
          switch (typeof(result)) {
            case "number":
              ret = result;
              break;
            case "boolean":
              ret = result ? 1 : 0;
              break;
            case "string":
              GL.recordError(0x0500); // GL_INVALID_ENUM
              return;
            case "object":
              if (result === null) {
                // null is a valid result for some (e.g., which buffer is bound - perhaps nothing is bound), but otherwise
                // can mean an invalid name_, which we need to report as an error
                switch(name_) {
                  case 0x8894: // ARRAY_BUFFER_BINDING
                  case 0x8B8D: // CURRENT_PROGRAM
                  case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                  case 0x8CA6: // FRAMEBUFFER_BINDING
                  case 0x8CA7: // RENDERBUFFER_BINDING
                  case 0x8069: // TEXTURE_BINDING_2D
                  case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                    ret = 0;
                    break;
                  }
                  default: {
                    GL.recordError(0x0500); // GL_INVALID_ENUM
                    return;
                  }
                }
              } else if (result instanceof Float32Array ||
                         result instanceof Uint32Array ||
                         result instanceof Int32Array ||
                         result instanceof Array) {
                for (var i = 0; i < result.length; ++i) {
                  switch (type) {
                    case 'Integer': HEAP32[(((p)+(i*4))>>2)]=result[i];   break;
                    case 'Float':   HEAPF32[(((p)+(i*4))>>2)]=result[i]; break;
                    case 'Boolean': HEAP8[(((p)+(i))|0)]=result[i] ? 1 : 0;    break;
                    default: throw 'internal glGet error, bad type: ' + type;
                  }
                }
                return;
              } else if (result instanceof WebGLBuffer ||
                         result instanceof WebGLProgram ||
                         result instanceof WebGLFramebuffer ||
                         result instanceof WebGLRenderbuffer ||
                         result instanceof WebGLTexture) {
                ret = result.name | 0;
              } else {
                GL.recordError(0x0500); // GL_INVALID_ENUM
                return;
              }
              break;
            default:
              GL.recordError(0x0500); // GL_INVALID_ENUM
              return;
          }
        }
  
        switch (type) {
          case 'Integer': HEAP32[((p)>>2)]=ret;    break;
          case 'Float':   HEAPF32[((p)>>2)]=ret;  break;
          case 'Boolean': HEAP8[(p)]=ret ? 1 : 0; break;
          default: throw 'internal glGet error, bad type: ' + type;
        }
      },getTexPixelData:function (type, format, width, height, pixels, internalFormat) {
        var sizePerPixel;
        switch (type) {
          case 0x1401 /* GL_UNSIGNED_BYTE */:
            switch (format) {
              case 0x1906 /* GL_ALPHA */:
              case 0x1909 /* GL_LUMINANCE */:
                sizePerPixel = 1;
                break;
              case 0x1907 /* GL_RGB */:
                sizePerPixel = 3;
                break;
              case 0x1908 /* GL_RGBA */:
                sizePerPixel = 4;
                break;
              case 0x190A /* GL_LUMINANCE_ALPHA */:
                sizePerPixel = 2;
                break;
              default:
                throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x1403 /* GL_UNSIGNED_SHORT */:
            if (format == 0x1902 /* GL_DEPTH_COMPONENT */) {
              sizePerPixel = 2;
            } else {
              throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x1405 /* GL_UNSIGNED_INT */:
            if (format == 0x1902 /* GL_DEPTH_COMPONENT */) {
              sizePerPixel = 4;
            } else {
              throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x84FA /* UNSIGNED_INT_24_8_WEBGL */:
            sizePerPixel = 4;
            break;
          case 0x8363 /* GL_UNSIGNED_SHORT_5_6_5 */:
          case 0x8033 /* GL_UNSIGNED_SHORT_4_4_4_4 */:
          case 0x8034 /* GL_UNSIGNED_SHORT_5_5_5_1 */:
            sizePerPixel = 2;
            break;
          case 0x1406 /* GL_FLOAT */:
            switch (format) {
              case 0x1907 /* GL_RGB */:
                sizePerPixel = 3*4;
                break;
              case 0x1908 /* GL_RGBA */:
                sizePerPixel = 4*4;
                break;
              default:
                throw 'Invalid format (' + format + ')';
            }
            internalFormat = GLctx.RGBA;
            break;
          default:
            throw 'Invalid type (' + type + ')';
        }
        var bytes = GL.computeImageSize(width, height, sizePerPixel, GL.unpackAlignment);
        if (type == 0x1401 /* GL_UNSIGNED_BYTE */) {
          pixels = HEAPU8.subarray((pixels),(pixels+bytes));
        } else if (type == 0x1406 /* GL_FLOAT */) {
          pixels = HEAPF32.subarray((pixels)>>2,(pixels+bytes)>>2);
        } else if (type == 0x1405 /* GL_UNSIGNED_INT */ || type == 0x84FA /* UNSIGNED_INT_24_8_WEBGL */) {
          pixels = HEAPU32.subarray((pixels)>>2,(pixels+bytes)>>2);
        } else {
          pixels = HEAPU16.subarray((pixels)>>1,(pixels+bytes)>>1);
        }
        return {
          pixels: pixels,
          internalFormat: internalFormat
        }
      },initExtensions:function () {
        if (GL.initExtensions.done) return;
        GL.initExtensions.done = true;
  
        if (!Module.useWebGL) return; // an app might link both gl and 2d backends
  
        GL.miniTempBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);
        for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
          GL.miniTempBufferViews[i] = GL.miniTempBuffer.subarray(0, i+1);
        }
  
        GL.maxVertexAttribs = GLctx.getParameter(GLctx.MAX_VERTEX_ATTRIBS);
  
        // Detect the presence of a few extensions manually, this GL interop layer itself will need to know if they exist. 
        GL.compressionExt = GLctx.getExtension('WEBGL_compressed_texture_s3tc') ||
                            GLctx.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
                            GLctx.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
  
        GL.anisotropicExt = GLctx.getExtension('EXT_texture_filter_anisotropic') ||
                            GLctx.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
                            GLctx.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
  
        GL.floatExt = GLctx.getExtension('OES_texture_float');
        
        // Extension available from Firefox 26 and Google Chrome 30
        GL.instancedArraysExt = GLctx.getExtension('ANGLE_instanced_arrays');
        
        // Extension available from Firefox 25 and WebKit
        GL.vaoExt = Module.ctx.getExtension('OES_vertex_array_object');
  
        // These are the 'safe' feature-enabling extensions that don't add any performance impact related to e.g. debugging, and
        // should be enabled by default so that client GLES2/GL code will not need to go through extra hoops to get its stuff working.
        // As new extensions are ratified at http://www.khronos.org/registry/webgl/extensions/ , feel free to add your new extensions
        // here, as long as they don't produce a performance impact for users that might not be using those extensions.
        // E.g. debugging-related extensions should probably be off by default.
        var automaticallyEnabledExtensions = [ "OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives",
                                               "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture",
                                               "OES_element_index_uint", "EXT_texture_filter_anisotropic", "ANGLE_instanced_arrays",
                                               "OES_texture_float_linear", "OES_texture_half_float_linear", "WEBGL_compressed_texture_atc",
                                               "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float",
                                               "EXT_frag_depth", "EXT_sRGB", "WEBGL_draw_buffers", "WEBGL_shared_resources" ];
  
        function shouldEnableAutomatically(extension) {
          for(var i in automaticallyEnabledExtensions) {
            var include = automaticallyEnabledExtensions[i];
            if (ext.indexOf(include) != -1) {
              return true;
            }
          }
          return false;
        }
  
        var extensions = GLctx.getSupportedExtensions();
        for(var e in extensions) {
          var ext = extensions[e].replace('MOZ_', '').replace('WEBKIT_', '');
          if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
            GLctx.getExtension(ext); // Calling .getExtension enables that extension permanently, no need to store the return value to be enabled.
          }
        }
      },populateUniformTable:function (program) {
        var p = GL.programs[program];
        GL.programInfos[program] = {
          uniforms: {},
          maxUniformLength: 0, // This is eagerly computed below, since we already enumerate all uniforms anyway.
          maxAttributeLength: -1 // This is lazily computed and cached, computed when/if first asked, "-1" meaning not computed yet.
        };
  
        var ptable = GL.programInfos[program];
        var utable = ptable.uniforms;
        // A program's uniform table maps the string name of an uniform to an integer location of that uniform.
        // The global GL.uniforms map maps integer locations to WebGLUniformLocations.
        var numUniforms = GLctx.getProgramParameter(p, GLctx.ACTIVE_UNIFORMS);
        for (var i = 0; i < numUniforms; ++i) {
          var u = GLctx.getActiveUniform(p, i);
  
          var name = u.name;
          ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length+1);
  
          // Strip off any trailing array specifier we might have got, e.g. "[0]".
          if (name.indexOf(']', name.length-1) !== -1) {
            var ls = name.lastIndexOf('[');
            name = name.slice(0, ls);
          }
  
          // Optimize memory usage slightly: If we have an array of uniforms, e.g. 'vec3 colors[3];', then 
          // only store the string 'colors' in utable, and 'colors[0]', 'colors[1]' and 'colors[2]' will be parsed as 'colors'+i.
          // Note that for the GL.uniforms table, we still need to fetch the all WebGLUniformLocations for all the indices.
          var loc = GLctx.getUniformLocation(p, name);
          var id = GL.getNewId(GL.uniforms);
          utable[name] = [u.size, id];
          GL.uniforms[id] = loc;
  
          for (var j = 1; j < u.size; ++j) {
            var n = name + '['+j+']';
            loc = GLctx.getUniformLocation(p, n);
            id = GL.getNewId(GL.uniforms);
  
            GL.uniforms[id] = loc;
          }
        }
      }};function _glLinkProgram(program) {
      GLctx.linkProgram(GL.programs[program]);
      GL.programInfos[program] = null; // uniforms no longer keep the same names after linking
      GL.populateUniformTable(program);
    }

  function _glBindTexture(target, texture) {
      GLctx.bindTexture(target, texture ? GL.textures[texture] : null);
    }

  function _SDL_ReadLE32() {
  Module['printErr']('missing function: SDL_ReadLE32'); abort(-1);
  }


  function _Mix_PlayChannel(channel, id, loops) {
      // TODO: handle loops
  
      // Get the audio element associated with the ID
      var info = SDL.audios[id];
      if (!info) return -1;
      var audio = info.audio;
      if (!audio) return -1;
  
      // If the user asks us to allocate a channel automatically, get the first
      // free one.
      if (channel == -1) {
        for (var i = SDL.channelMinimumNumber; i < SDL.numChannels; i++) {
          if (!SDL.channels[i].audio) {
            channel = i;
            break;
          }
        }
        if (channel == -1) {
          Module.printErr('All ' + SDL.numChannels + ' channels in use!');
          return -1;
        }
      }
      // We clone the audio node to utilize the preloaded audio buffer, since
      // the browser has already preloaded the audio file.
      var channelInfo = SDL.channels[channel];
      channelInfo.audio = audio = audio.cloneNode(true);
      audio.numChannels = info.audio.numChannels;
      audio.frequency = info.audio.frequency;
      // TODO: handle N loops. Behavior matches Mix_PlayMusic
      audio.loop = loops != 0; 
      audio['onended'] = function SDL_audio_onended() { // TODO: cache these
        channelInfo.audio = null;
        if (SDL.channelFinished) {
          Runtime.getFuncWrapper(SDL.channelFinished, 'vi')(channel);
        }
      }
      // Either play the element, or load the dynamic data into it
      if (info.buffer) {
        var contextCtor = null;
        if (audio && ('mozSetup' in audio)) { // Audio Data API
          try {
            audio['mozSetup'](audio.numChannels, audio.frequency);
            audio["mozWriteAudio"](info.buffer);
          } catch (e) {
            // Workaround for Firefox bug 783052
            // ignore this exception!
          }
        /*
        } else if (contextCtor = (window.AudioContext || // WebAudio API
                                  window.webkitAudioContext)) {
          var currentIndex = 0;
          var numChannels = parseInt(audio.numChannels);
          var context = new contextCtor();
          var source = context.createBufferSource();
          source.loop = false;
          source.buffer = context.createBuffer(numChannels, 1, audio.frequency);
          var jsNode = context.createJavaScriptNode(2048, numChannels, numChannels);
          jsNode.onaudioprocess = function jsNode_onaudioprocess(event) {
            var buffers = new Array(numChannels);
            for (var i = 0; i < numChannels; ++i) {
              buffers[i] = event.outputBuffer.getChannelData(i);
            }
            var remaining = info.buffer.length - currentIndex;
            if (remaining > 2048) {
              remaining = 2048;
            }
            for (var i = 0; i < remaining;) {
              for (var j = 0; j < numChannels; ++j) {
                buffers[j][i] = info.buffer[currentIndex + i + j] * audio.volume;
              }
              i += j;
            }
            currentIndex += remaining * numChannels;
            for (var i = remaining; i < 2048;) {
              for (var j = 0; j < numChannels; ++j) {
                buffers[j][i] = 0; // silence
              }
              i += j;
            }
          };
          source.connect(jsNode);
          jsNode.connect(context.destination);
          source.noteOn(0);
        */
        }
      } else {
        audio.play();
      }
      audio.volume = channelInfo.volume;
      return channel;
    }

  
  
  
  
  function _mkport() { throw 'TODO' }var SOCKFS={mount:function (mount) {
        return FS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
  
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
  
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
  
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
  
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
  
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
  
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
  
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              var url = 'ws://' + addr + ':' + port;
              // the node ws library API is slightly different than the browser's
              var opts = ENVIRONMENT_IS_NODE ? {headers: {'websocket-protocol': ['binary']}} : ['binary'];
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? require('ws') : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
  
  
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
  
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
  
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
  
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
  
          var handleOpen = function () {
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
  
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
  
  
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
  
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
          };
  
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('error', function() {
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
  
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
  
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
  
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
  
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
  
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODS.EOPNOTSUPP);
          }
  
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
  
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
  
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
  
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
  
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
  
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
  
              // push to queue for accept to pick up
              sock.pending.push(newsock);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
            }
          });
          sock.server.on('closed', function() {
            sock.server = null;
          });
          sock.server.on('error', function() {
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
  
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
  
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
  
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
  
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
  
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
  
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
  
  
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
  
          return res;
        }}};function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  
  function _fileno(stream) {
      // int fileno(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fileno.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) return -1;
      return stream.fd;
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var fd = _fileno(stream);
      var bytesWritten = _write(fd, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }

  var _llvm_pow_f32=Math_pow;


  function _glCompileShader(shader) {
      GLctx.compileShader(GL.shaders[shader]);
    }

  function _isspace(chr) {
      return (chr == 32) || (chr >= 9 && chr <= 13);
    }

  
  function _fmod(x, y) {
      return x % y;
    }var _fmodf=_fmod;

  
  function _isxdigit(chr) {
      return (chr >= 48 && chr <= 57) ||
             (chr >= 97 && chr <= 102) ||
             (chr >= 65 && chr <= 70);
    }function _isxdigit_l(chr) {
      return _isxdigit(chr); // no locale support yet
    }

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 
  Module["_memcpy"] = _memcpy;

   
  Module["_memmove"] = _memmove;

  function _glGenTextures(n, textures) {
      for (var i = 0; i < n; i++) {
        var id = GL.getNewId(GL.textures);
        var texture = GLctx.createTexture();
        texture.name = id;
        GL.textures[id] = texture;
        HEAP32[(((textures)+(i*4))>>2)]=id;
      }
    }

  
  function _malloc(bytes) {
      /* Over-allocate to make sure it is byte-aligned by 8.
       * This will leak memory, but this is only the dummy
       * implementation (replaced by dlmalloc normally) so
       * not an issue.
       */
      var ptr = Runtime.dynamicAlloc(bytes + 8);
      return (ptr+8) & 0xFFFFFFF8;
    }
  Module["_malloc"] = _malloc;function _newlocale(mask, locale, base) {
      return _malloc(4);
    }

  var _sin=Math_sin;

  function _pthread_cond_wait() {
      return 0;
    }


  function _glBlendFunc(x0, x1) { GLctx.blendFunc(x0, x1) }

  function _glCreateShader(shaderType) {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
      return id;
    }

  function _SDL_RWFromConstMem(mem, size) {
      var id = SDL.rwops.length; // TODO: recycle ids when they are null
      SDL.rwops.push({ bytes: mem, count: size });
      return id;
    }

  var _cosf=Math_cos;

  
  
  
  function __getFloat(text) {
      return /^[+-]?[0-9]*\.?[0-9]+([eE][+-]?[0-9]+)?/.exec(text);
    }function __scanString(format, get, unget, varargs) {
      if (!__scanString.whiteSpace) {
        __scanString.whiteSpace = {};
        __scanString.whiteSpace[32] = 1;
        __scanString.whiteSpace[9] = 1;
        __scanString.whiteSpace[10] = 1;
        __scanString.whiteSpace[11] = 1;
        __scanString.whiteSpace[12] = 1;
        __scanString.whiteSpace[13] = 1;
      }
      // Supports %x, %4x, %d.%d, %lld, %s, %f, %lf.
      // TODO: Support all format specifiers.
      format = Pointer_stringify(format);
      var soFar = 0;
      if (format.indexOf('%n') >= 0) {
        // need to track soFar
        var _get = get;
        get = function get() {
          soFar++;
          return _get();
        }
        var _unget = unget;
        unget = function unget() {
          soFar--;
          return _unget();
        }
      }
      var formatIndex = 0;
      var argsi = 0;
      var fields = 0;
      var argIndex = 0;
      var next;
  
      mainLoop:
      for (var formatIndex = 0; formatIndex < format.length;) {
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'n') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          HEAP32[((argPtr)>>2)]=soFar;
          formatIndex += 2;
          continue;
        }
  
        if (format[formatIndex] === '%') {
          var nextC = format.indexOf('c', formatIndex+1);
          if (nextC > 0) {
            var maxx = 1;
            if (nextC > formatIndex+1) {
              var sub = format.substring(formatIndex+1, nextC);
              maxx = parseInt(sub);
              if (maxx != sub) maxx = 0;
            }
            if (maxx) {
              var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
              argIndex += Runtime.getAlignSize('void*', null, true);
              fields++;
              for (var i = 0; i < maxx; i++) {
                next = get();
                HEAP8[((argPtr++)|0)]=next;
                if (next === 0) return i > 0 ? fields : fields-1; // we failed to read the full length of this field
              }
              formatIndex += nextC - formatIndex + 1;
              continue;
            }
          }
        }
  
        // handle %[...]
        if (format[formatIndex] === '%' && format.indexOf('[', formatIndex+1) > 0) {
          var match = /\%([0-9]*)\[(\^)?(\]?[^\]]*)\]/.exec(format.substring(formatIndex));
          if (match) {
            var maxNumCharacters = parseInt(match[1]) || Infinity;
            var negateScanList = (match[2] === '^');
            var scanList = match[3];
  
            // expand "middle" dashs into character sets
            var middleDashMatch;
            while ((middleDashMatch = /([^\-])\-([^\-])/.exec(scanList))) {
              var rangeStartCharCode = middleDashMatch[1].charCodeAt(0);
              var rangeEndCharCode = middleDashMatch[2].charCodeAt(0);
              for (var expanded = ''; rangeStartCharCode <= rangeEndCharCode; expanded += String.fromCharCode(rangeStartCharCode++));
              scanList = scanList.replace(middleDashMatch[1] + '-' + middleDashMatch[2], expanded);
            }
  
            var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
            argIndex += Runtime.getAlignSize('void*', null, true);
            fields++;
  
            for (var i = 0; i < maxNumCharacters; i++) {
              next = get();
              if (negateScanList) {
                if (scanList.indexOf(String.fromCharCode(next)) < 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              } else {
                if (scanList.indexOf(String.fromCharCode(next)) >= 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              }
            }
  
            // write out null-terminating character
            HEAP8[((argPtr++)|0)]=0;
            formatIndex += match[0].length;
            
            continue;
          }
        }      
        // remove whitespace
        while (1) {
          next = get();
          if (next == 0) return fields;
          if (!(next in __scanString.whiteSpace)) break;
        }
        unget();
  
        if (format[formatIndex] === '%') {
          formatIndex++;
          var suppressAssignment = false;
          if (format[formatIndex] == '*') {
            suppressAssignment = true;
            formatIndex++;
          }
          var maxSpecifierStart = formatIndex;
          while (format[formatIndex].charCodeAt(0) >= 48 &&
                 format[formatIndex].charCodeAt(0) <= 57) {
            formatIndex++;
          }
          var max_;
          if (formatIndex != maxSpecifierStart) {
            max_ = parseInt(format.slice(maxSpecifierStart, formatIndex), 10);
          }
          var long_ = false;
          var half = false;
          var longLong = false;
          if (format[formatIndex] == 'l') {
            long_ = true;
            formatIndex++;
            if (format[formatIndex] == 'l') {
              longLong = true;
              formatIndex++;
            }
          } else if (format[formatIndex] == 'h') {
            half = true;
            formatIndex++;
          }
          var type = format[formatIndex];
          formatIndex++;
          var curr = 0;
          var buffer = [];
          // Read characters according to the format. floats are trickier, they may be in an unfloat state in the middle, then be a valid float later
          if (type == 'f' || type == 'e' || type == 'g' ||
              type == 'F' || type == 'E' || type == 'G') {
            next = get();
            while (next > 0 && (!(next in __scanString.whiteSpace)))  {
              buffer.push(String.fromCharCode(next));
              next = get();
            }
            var m = __getFloat(buffer.join(''));
            var last = m ? m[0].length : 0;
            for (var i = 0; i < buffer.length - last + 1; i++) {
              unget();
            }
            buffer.length = last;
          } else {
            next = get();
            var first = true;
            
            // Strip the optional 0x prefix for %x.
            if ((type == 'x' || type == 'X') && (next == 48)) {
              var peek = get();
              if (peek == 120 || peek == 88) {
                next = get();
              } else {
                unget();
              }
            }
            
            while ((curr < max_ || isNaN(max_)) && next > 0) {
              if (!(next in __scanString.whiteSpace) && // stop on whitespace
                  (type == 's' ||
                   ((type === 'd' || type == 'u' || type == 'i') && ((next >= 48 && next <= 57) ||
                                                                     (first && next == 45))) ||
                   ((type === 'x' || type === 'X') && (next >= 48 && next <= 57 ||
                                     next >= 97 && next <= 102 ||
                                     next >= 65 && next <= 70))) &&
                  (formatIndex >= format.length || next !== format[formatIndex].charCodeAt(0))) { // Stop when we read something that is coming up
                buffer.push(String.fromCharCode(next));
                next = get();
                curr++;
                first = false;
              } else {
                break;
              }
            }
            unget();
          }
          if (buffer.length === 0) return 0;  // Failure.
          if (suppressAssignment) continue;
  
          var text = buffer.join('');
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          switch (type) {
            case 'd': case 'u': case 'i':
              if (half) {
                HEAP16[((argPtr)>>1)]=parseInt(text, 10);
              } else if (longLong) {
                (tempI64 = [parseInt(text, 10)>>>0,(tempDouble=parseInt(text, 10),(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((argPtr)>>2)]=tempI64[0],HEAP32[(((argPtr)+(4))>>2)]=tempI64[1]);
              } else {
                HEAP32[((argPtr)>>2)]=parseInt(text, 10);
              }
              break;
            case 'X':
            case 'x':
              HEAP32[((argPtr)>>2)]=parseInt(text, 16);
              break;
            case 'F':
            case 'f':
            case 'E':
            case 'e':
            case 'G':
            case 'g':
            case 'E':
              // fallthrough intended
              if (long_) {
                HEAPF64[((argPtr)>>3)]=parseFloat(text);
              } else {
                HEAPF32[((argPtr)>>2)]=parseFloat(text);
              }
              break;
            case 's':
              var array = intArrayFromString(text);
              for (var j = 0; j < array.length; j++) {
                HEAP8[(((argPtr)+(j))|0)]=array[j];
              }
              break;
          }
          fields++;
        } else if (format[formatIndex].charCodeAt(0) in __scanString.whiteSpace) {
          next = get();
          while (next in __scanString.whiteSpace) {
            if (next <= 0) break mainLoop;  // End of input.
            next = get();
          }
          unget(next);
          formatIndex++;
        } else {
          // Not a specifier.
          next = get();
          if (format[formatIndex].charCodeAt(0) !== next) {
            unget(next);
            break mainLoop;
          }
          formatIndex++;
        }
      }
      return fields;
    }function _sscanf(s, format, varargs) {
      // int sscanf(const char *restrict s, const char *restrict format, ... );
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/scanf.html
      var index = 0;
      function get() { return HEAP8[(((s)+(index++))|0)]; };
      function unget() { index--; };
      return __scanString(format, get, unget, varargs);
    }function _vsscanf(s, format, va_arg) {
      return _sscanf(s, format, HEAP32[((va_arg)>>2)]);
    }

  
  
   
  Module["_strlen"] = _strlen;
  
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = (HEAP32[((tempDoublePtr)>>2)]=HEAP32[(((varargs)+(argIndex))>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[(((varargs)+((argIndex)+(4)))>>2)],(+(HEAPF64[(tempDoublePtr)>>3])));
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+4))>>2)]];
  
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Runtime.getNativeFieldSize(type);
        return ret;
      }
  
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
  
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
  
          // Handle precision.
          var precisionSet = false, precision = -1;
          if (next == 46) {
            precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          }
          if (precision < 0) {
            precision = 6; // Standard default.
            precisionSet = false;
          }
  
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
  
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
  
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
  
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
  
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
  
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
  
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
  
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
  
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
  
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
  
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
  
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
  
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
  
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length;
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _snprintf(s, n, format, varargs) {
      // int snprintf(char *restrict s, size_t n, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var limit = (n === undefined) ? result.length
                                    : Math.min(result.length, Math.max(n - 1, 0));
      if (s < 0) {
        s = -s;
        var buf = _malloc(limit+1);
        HEAP32[((s)>>2)]=buf;
        s = buf;
      }
      for (var i = 0; i < limit; i++) {
        HEAP8[(((s)+(i))|0)]=result[i];
      }
      if (limit < n || (n === undefined)) HEAP8[(((s)+(i))|0)]=0;
      return result.length;
    }

  function _SDL_RWFromFile(_name, mode) {
      var id = SDL.rwops.length; // TODO: recycle ids when they are null
      var name = Pointer_stringify(_name)
      SDL.rwops.push({ filename: name, mimetype: Browser.getMimetype(name) });
      return id;
    }

  
  
  
  function _recv(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _read(fd, buf, len);
    }
  
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fread(ptr, size, nitems, stream) {
      // size_t fread(void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fread.html
      var bytesToRead = nitems * size;
      if (bytesToRead == 0) {
        return 0;
      }
      var bytesRead = 0;
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return 0;
      }
      while (streamObj.ungotten.length && bytesToRead > 0) {
        HEAP8[((ptr++)|0)]=streamObj.ungotten.pop();
        bytesToRead--;
        bytesRead++;
      }
      var err = _read(streamObj.fd, ptr, bytesToRead);
      if (err == -1) {
        if (streamObj) streamObj.error = true;
        return 0;
      }
      bytesRead += err;
      if (bytesRead < bytesToRead) streamObj.eof = true;
      return Math.floor(bytesRead / size);
    }function _fgetc(stream) {
      // int fgetc(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fgetc.html
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) return -1;
      if (streamObj.eof || streamObj.error) return -1;
      var ret = _fread(_fgetc.ret, 1, 1, stream);
      if (ret == 0) {
        return -1;
      } else if (ret == -1) {
        streamObj.error = true;
        return -1;
      } else {
        return HEAPU8[((_fgetc.ret)|0)];
      }
    }

   
  Module["_memset"] = _memset;

  function _glGetProgramiv(program, pname, p) {
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        HEAP32[((p)>>2)]=GLctx.getProgramInfoLog(GL.programs[program]).length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        var ptable = GL.programInfos[program];
        if (ptable) {
          HEAP32[((p)>>2)]=ptable.maxUniformLength;
          return;
        } else if (program < GL.counter) {
          GL.recordError(0x0502 /* GL_INVALID_OPERATION */);
        } else {
          GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        }
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        var ptable = GL.programInfos[program];
        if (ptable) {
          if (ptable.maxAttributeLength == -1) {
            var program = GL.programs[program];
            var numAttribs = GLctx.getProgramParameter(program, GLctx.ACTIVE_ATTRIBUTES);
            ptable.maxAttributeLength = 0; // Spec says if there are no active attribs, 0 must be returned.
            for(var i = 0; i < numAttribs; ++i) {
              var activeAttrib = GLctx.getActiveAttrib(program, i);
              ptable.maxAttributeLength = Math.max(ptable.maxAttributeLength, activeAttrib.name.length+1);
            }
          }
          HEAP32[((p)>>2)]=ptable.maxAttributeLength;
          return;
        } else if (program < GL.counter) {
          GL.recordError(0x0502 /* GL_INVALID_OPERATION */);
        } else {
          GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        }
      } else {
        HEAP32[((p)>>2)]=GLctx.getProgramParameter(GL.programs[program], pname);
      }
    }

  function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
      GLctx.vertexAttribPointer(index, size, type, normalized, stride, ptr);
    }

  function _atexit(func, arg) {
      __ATEXIT__.unshift({ func: func, arg: arg });
    }

  var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;

  function _glGetUniformLocation(program, name) {
      name = Pointer_stringify(name);
  
      var arrayOffset = 0;
      // If user passed an array accessor "[index]", parse the array index off the accessor.
      if (name.indexOf(']', name.length-1) !== -1) {
        var ls = name.lastIndexOf('[');
        var arrayIndex = name.slice(ls+1, -1);
        if (arrayIndex.length > 0) {
          arrayOffset = parseInt(arrayIndex);
          if (arrayOffset < 0) {
            return -1;
          }
        }
        name = name.slice(0, ls);
      }
  
      var ptable = GL.programInfos[program];
      if (!ptable) {
        return -1;
      }
      var utable = ptable.uniforms;
      var uniformInfo = utable[name]; // returns pair [ dimension_of_uniform_array, uniform_location ]
      if (uniformInfo && arrayOffset < uniformInfo[0]) { // Check if user asked for an out-of-bounds element, i.e. for 'vec4 colors[3];' user could ask for 'colors[10]' which should return -1.
        return uniformInfo[1]+arrayOffset;
      } else {
        return -1;
      }
    }

  function _Mix_LoadWAV_RW(rwopsID, freesrc) {
      var rwops = SDL.rwops[rwopsID];
  
      if (rwops === undefined)
        return 0;
  
      var filename = '';
      var audio;
      var bytes;
  
      if (rwops.filename !== undefined) {
        filename = PATH.resolve(rwops.filename);
        var raw = Module["preloadedAudios"][filename];
        if (!raw) {
          if (raw === null) Module.printErr('Trying to reuse preloaded audio, but freePreloadedMediaOnUse is set!');
          Runtime.warnOnce('Cannot find preloaded audio ' + filename);
  
          // see if we can read the file-contents from the in-memory FS
          try {
            bytes = FS.readFile(filename);
          } catch (e) {
            Module.printErr('Couldn\'t find file for: ' + filename);
            return 0;
          }
        }
        if (Module['freePreloadedMediaOnUse']) {
          Module["preloadedAudios"][filename] = null;
        }
        audio = raw;
      }
      else if (rwops.bytes !== undefined) {
        bytes = HEAPU8.subarray(rwops.bytes, rwops.bytes + rwops.count);
      }
      else {
        return 0;
      }
  
      // Here, we didn't find a preloaded audio but we either were passed a filepath for
      // which we loaded bytes, or we were passed some bytes
      if (audio === undefined && bytes) {
        var blob = new Blob([bytes], {type: rwops.mimetype});
        var url = URL.createObjectURL(blob);
        audio = new Audio();
        audio.src = url;
      }
  
      var id = SDL.audios.length;
      // Keep the loaded audio in the audio arrays, ready for playback
      SDL.audios.push({
        source: filename,
        audio: audio
      });
      return id;
    }

  
  
  function _SDL_PauseAudio(pauseOn) {
      if (!SDL.audio) {
        return;
      }
      if (pauseOn) {
        if (SDL.audio.timer !== undefined) {
          clearTimeout(SDL.audio.timer);
          SDL.audio.numAudioTimersPending = 0;
          SDL.audio.timer = undefined;
        }
        if (SDL.audio.scriptProcessorNode !== undefined) {
          SDL.audio.scriptProcessorNode['disconnect']();
          SDL.audio.scriptProcessorNode = undefined;
        }
      } else if (!SDL.audio.timer && !SDL.audio.scriptProcessorNode) {
        // If we are using the same sampling frequency as the native sampling rate of the Web Audio graph is using, we can feed our buffers via
        // Web Audio ScriptProcessorNode, which is a pull-mode API that calls back to our code to get audio data.
        if (SDL.audioContext !== undefined && SDL.audio.freq == SDL.audioContext['sampleRate']) {
          var sizeSamplesPerChannel = SDL.audio.bufferSize / SDL.audio.bytesPerSample / SDL.audio.channels; // How many samples per a single channel fit in the cb buffer?
          SDL.audio.scriptProcessorNode = SDL.audioContext['createScriptProcessor'](sizeSamplesPerChannel, 0, SDL.audio.channels);
          SDL.audio.scriptProcessorNode['onaudioprocess'] = function (e) {
            Runtime.dynCall('viii', SDL.audio.callback, [SDL.audio.userdata, SDL.audio.buffer, SDL.audio.bufferSize]);
            SDL.fillWebAudioBufferFromHeap(SDL.audio.buffer, sizeSamplesPerChannel, e['outputBuffer']);
          }
          SDL.audio.scriptProcessorNode['connect'](SDL.audioContext['destination']);
        } else { // If we are using a different sampling rate, must manually queue audio data to the graph via timers.
          // Start the audio playback timer callback loop.
          SDL.audio.numAudioTimersPending = 1;
          SDL.audio.timer = Browser.safeSetTimeout(SDL.audio.caller, 1);
          SDL.audio.startTime = Date.now() / 1000.0; // Only used for Mozilla Audio Data API. Not needed for Web Audio API.
        }
      }
      SDL.audio.paused = pauseOn;
    }
  
  function _free() {
  }
  Module["_free"] = _free;function _SDL_CloseAudio() {
      if (SDL.audio) {
        try{
          for(var i = 0; i < SDL.audio.soundSource.length; ++i) {
            if (!(typeof(SDL.audio.soundSource[i]==='undefined'))) {
              SDL.audio.soundSource[i].stop(0);
            }
          }
        } catch(e) {}
        SDL.audio.soundSource = null;
        _SDL_PauseAudio(1);
        _free(SDL.audio.buffer);
        SDL.audio = null;
        SDL.allocateChannels(0);
      }
    }var _Mix_CloseAudio=_SDL_CloseAudio;

  function _glDeleteProgram(program) {
      var program = GL.programs[program];
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[program] = null;
      GL.programInfos[program] = null;
    }

  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }

  var _Mix_PlayChannelTimed=_Mix_PlayChannel;

  function ___ctype_b_loc() {
      // http://refspecs.freestandards.org/LSB_3.0.0/LSB-Core-generic/LSB-Core-generic/baselib---ctype-b-loc.html
      var me = ___ctype_b_loc;
      if (!me.ret) {
        var values = [
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,8195,8194,8194,8194,8194,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,24577,49156,49156,49156,
          49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,55304,55304,55304,55304,55304,55304,55304,55304,
          55304,55304,49156,49156,49156,49156,49156,49156,49156,54536,54536,54536,54536,54536,54536,50440,50440,50440,50440,50440,
          50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,49156,49156,49156,49156,49156,
          49156,54792,54792,54792,54792,54792,54792,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,
          50696,50696,50696,50696,50696,50696,50696,49156,49156,49156,49156,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ];
        var i16size = 2;
        var arr = _malloc(values.length * i16size);
        for (var i = 0; i < values.length; i++) {
          HEAP16[(((arr)+(i * i16size))>>1)]=values[i];
        }
        me.ret = allocate([arr + 128 * i16size], 'i16*', ALLOC_NORMAL);
      }
      return me.ret;
    }

  function _freelocale(locale) {
      _free(locale);
    }

  function _glAttachShader(program, shader) {
      GLctx.attachShader(GL.programs[program],
                              GL.shaders[shader]);
    }

  var _atan2f=Math_atan2;

  function _catgets(catd, set_id, msg_id, s) {
      // char *catgets (nl_catd catd, int set_id, int msg_id, const char *s)
      return s;
    }

  function _SDL_GL_CreateContext() {
  Module['printErr']('missing function: SDL_GL_CreateContext'); abort(-1);
  }

  function _copysign(a, b) {
      return __reallyNegative(a) === __reallyNegative(b) ? a : -a;
    }

  function ___cxa_guard_acquire(variable) {
      if (!HEAP8[(variable)]) { // ignore SAFE_HEAP stuff because llvm mixes i64 and i8 here
        HEAP8[(variable)]=1;
        return 1;
      }
      return 0;
    }

  function _glDrawElements(mode, count, type, indices) {
  
      GLctx.drawElements(mode, count, type, indices);
  
    }

  
  function __ZSt18uncaught_exceptionv() { // std::uncaught_exception()
      return !!__ZSt18uncaught_exceptionv.uncaught_exception;
    }
  
  var ___cxa_caught_exceptions=[];
  
  var ___cxa_last_thrown_exception=0;function ___cxa_begin_catch(ptr) {
      __ZSt18uncaught_exceptionv.uncaught_exception--;
      ___cxa_caught_exceptions.push(___cxa_last_thrown_exception);
      return ptr;
    }

  var _sinf=Math_sin;

  function _SDL_GetTicks() {
      return Math.floor(Date.now() - SDL.startTime);
    }


  function _glBufferSubData(target, offset, size, data) {
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data+size));
    }

  
  function _fputs(s, stream) {
      // int fputs(const char *restrict s, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputs.html
      var fd = _fileno(stream);
      return _write(fd, s, _strlen(s));
    }
  
  function _fputc(c, stream) {
      // int fputc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputc.html
      var chr = unSign(c & 0xFF);
      HEAP8[((_fputc.ret)|0)]=chr;
      var fd = _fileno(stream);
      var ret = _write(fd, _fputc.ret, 1);
      if (ret == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (streamObj) streamObj.error = true;
        return -1;
      } else {
        return chr;
      }
    }function _puts(s) {
      // int puts(const char *s);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/puts.html
      // NOTE: puts() always writes an extra newline.
      var stdout = HEAP32[((_stdout)>>2)];
      var ret = _fputs(s, stdout);
      if (ret < 0) {
        return ret;
      } else {
        var newlineRet = _fputc(10, stdout);
        return (newlineRet < 0) ? -1 : ret + 1;
      }
    }

  function __ZNSt9exceptionD2Ev() {}

  function _glGetProgramInfoLog(program, maxLength, length, infoLog) {
      var log = GLctx.getProgramInfoLog(GL.programs[program]);
      // Work around a bug in Chromium which causes getProgramInfoLog to return null
      if (!log) {
        log = "";
      }
      log = log.substr(0, maxLength - 1);
      writeStringToMemory(log, infoLog);
      if (length) {
        HEAP32[((length)>>2)]=log.length
      }
    }

  function _SDL_Init(initFlags) {
      SDL.startTime = Date.now();
      SDL.initFlags = initFlags;
  
      // capture all key events. we just keep down and up, but also capture press to prevent default actions
      if (!Module['doNotCaptureKeyboard']) {
        document.addEventListener("keydown", SDL.receiveEvent);
        document.addEventListener("keyup", SDL.receiveEvent);
        document.addEventListener("keypress", SDL.receiveEvent);
        window.addEventListener("blur", SDL.receiveEvent);
        document.addEventListener("visibilitychange", SDL.receiveEvent);
      }
  
      if (initFlags & 0x200) {
        // SDL_INIT_JOYSTICK
        // Firefox will not give us Joystick data unless we register this NOP
        // callback.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=936104
        addEventListener("gamepadconnected", function() {});
      }
  
      window.addEventListener("unload", SDL.receiveEvent);
      SDL.keyboardState = _malloc(0x10000); // Our SDL needs 512, but 64K is safe for older SDLs
      _memset(SDL.keyboardState, 0, 0x10000);
      // Initialize this structure carefully for closure
      SDL.DOMEventToSDLEvent['keydown'] = 0x300 /* SDL_KEYDOWN */;
      SDL.DOMEventToSDLEvent['keyup'] = 0x301 /* SDL_KEYUP */;
      SDL.DOMEventToSDLEvent['keypress'] = 0x303 /* SDL_TEXTINPUT */;
      SDL.DOMEventToSDLEvent['mousedown'] = 0x401 /* SDL_MOUSEBUTTONDOWN */;
      SDL.DOMEventToSDLEvent['mouseup'] = 0x402 /* SDL_MOUSEBUTTONUP */;
      SDL.DOMEventToSDLEvent['mousemove'] = 0x400 /* SDL_MOUSEMOTION */;
      SDL.DOMEventToSDLEvent['unload'] = 0x100 /* SDL_QUIT */;
      SDL.DOMEventToSDLEvent['resize'] = 0x7001 /* SDL_VIDEORESIZE/SDL_EVENT_COMPAT2 */;
      // These are not technically DOM events; the HTML gamepad API is poll-based.
      // However, we define them here, as the rest of the SDL code assumes that
      // all SDL events originate as DOM events.
      SDL.DOMEventToSDLEvent['joystick_axis_motion'] = 0x600 /* SDL_JOYAXISMOTION */;
      SDL.DOMEventToSDLEvent['joystick_button_down'] = 0x603 /* SDL_JOYBUTTONDOWN */;
      SDL.DOMEventToSDLEvent['joystick_button_up'] = 0x604 /* SDL_JOYBUTTONUP */;
      return 0; // success
    }

  function _SDL_GL_SwapWindow(window) {}

  function _glGetShaderiv(shader, pname, p) {
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        // Work around a bug in Chromium which causes getShaderInfoLog to return null
        if (!log) log = '(unknown error)';
        HEAP32[((p)>>2)]=log.length + 1;
      } else {
        HEAP32[((p)>>2)]=GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    }

  var ___cxa_atexit=_atexit;

  
   
  Module["_rand_r"] = _rand_r;
  
  var ___rand_seed=allocate([0x0273459b, 0, 0, 0], "i32", ALLOC_STATIC); 
  Module["_rand"] = _rand;

  var _llvm_memset_p0i8_i32=_memset;

   
  Module["_i64Subtract"] = _i64Subtract;

   
  Module["_i64Add"] = _i64Add;

  
  
  
  function ___cxa_is_number_type(type) {
      var isNumber = false;
      try { if (type == __ZTIi) isNumber = true } catch(e){}
      try { if (type == __ZTIj) isNumber = true } catch(e){}
      try { if (type == __ZTIl) isNumber = true } catch(e){}
      try { if (type == __ZTIm) isNumber = true } catch(e){}
      try { if (type == __ZTIx) isNumber = true } catch(e){}
      try { if (type == __ZTIy) isNumber = true } catch(e){}
      try { if (type == __ZTIf) isNumber = true } catch(e){}
      try { if (type == __ZTId) isNumber = true } catch(e){}
      try { if (type == __ZTIe) isNumber = true } catch(e){}
      try { if (type == __ZTIc) isNumber = true } catch(e){}
      try { if (type == __ZTIa) isNumber = true } catch(e){}
      try { if (type == __ZTIh) isNumber = true } catch(e){}
      try { if (type == __ZTIs) isNumber = true } catch(e){}
      try { if (type == __ZTIt) isNumber = true } catch(e){}
      return isNumber;
    }function ___cxa_does_inherit(definiteType, possibilityType, possibility) {
      if (possibility == 0) return false;
      if (possibilityType == 0 || possibilityType == definiteType)
        return true;
      var possibility_type_info;
      if (___cxa_is_number_type(possibilityType)) {
        possibility_type_info = possibilityType;
      } else {
        var possibility_type_infoAddr = HEAP32[((possibilityType)>>2)] - 8;
        possibility_type_info = HEAP32[((possibility_type_infoAddr)>>2)];
      }
      switch (possibility_type_info) {
      case 0: // possibility is a pointer
        // See if definite type is a pointer
        var definite_type_infoAddr = HEAP32[((definiteType)>>2)] - 8;
        var definite_type_info = HEAP32[((definite_type_infoAddr)>>2)];
        if (definite_type_info == 0) {
          // Also a pointer; compare base types of pointers
          var defPointerBaseAddr = definiteType+8;
          var defPointerBaseType = HEAP32[((defPointerBaseAddr)>>2)];
          var possPointerBaseAddr = possibilityType+8;
          var possPointerBaseType = HEAP32[((possPointerBaseAddr)>>2)];
          return ___cxa_does_inherit(defPointerBaseType, possPointerBaseType, possibility);
        } else
          return false; // one pointer and one non-pointer
      case 1: // class with no base class
        return false;
      case 2: // class with base class
        var parentTypeAddr = possibilityType + 8;
        var parentType = HEAP32[((parentTypeAddr)>>2)];
        return ___cxa_does_inherit(definiteType, parentType, possibility);
      default:
        return false; // some unencountered type
      }
    }
  
  function ___resumeException(ptr) {
      if (!___cxa_last_thrown_exception) { ___cxa_last_thrown_exception = ptr; }
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    }
  
  var ___cxa_exception_header_size=8;function ___cxa_find_matching_catch(thrown, throwntype) {
      if (thrown == -1) thrown = ___cxa_last_thrown_exception;
      header = thrown - ___cxa_exception_header_size;
      if (throwntype == -1) throwntype = HEAP32[((header)>>2)];
      var typeArray = Array.prototype.slice.call(arguments, 2);
  
      // If throwntype is a pointer, this means a pointer has been
      // thrown. When a pointer is thrown, actually what's thrown
      // is a pointer to the pointer. We'll dereference it.
      if (throwntype != 0 && !___cxa_is_number_type(throwntype)) {
        var throwntypeInfoAddr= HEAP32[((throwntype)>>2)] - 8;
        var throwntypeInfo= HEAP32[((throwntypeInfoAddr)>>2)];
        if (throwntypeInfo == 0)
          thrown = HEAP32[((thrown)>>2)];
      }
      // The different catch blocks are denoted by different types.
      // Due to inheritance, those types may not precisely match the
      // type of the thrown object. Find one which matches, and
      // return the type of the catch block which should be called.
      for (var i = 0; i < typeArray.length; i++) {
        if (___cxa_does_inherit(typeArray[i], throwntype, thrown))
          return ((asm["setTempRet0"](typeArray[i]),thrown)|0);
      }
      // Shouldn't happen unless we have bogus data in typeArray
      // or encounter a type for which emscripten doesn't have suitable
      // typeinfo defined. Best-efforts match just in case.
      return ((asm["setTempRet0"](throwntype),thrown)|0);
    }function ___cxa_throw(ptr, type, destructor) {
      if (!___cxa_throw.initialized) {
        try {
          HEAP32[((__ZTVN10__cxxabiv119__pointer_type_infoE)>>2)]=0; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv117__class_type_infoE)>>2)]=1; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv120__si_class_type_infoE)>>2)]=2; // Workaround for libcxxabi integration bug
        } catch(e){}
        ___cxa_throw.initialized = true;
      }
      var header = ptr - ___cxa_exception_header_size;
      HEAP32[((header)>>2)]=type;
      HEAP32[(((header)+(4))>>2)]=destructor;
      ___cxa_last_thrown_exception = ptr;
      if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exception = 1;
      } else {
        __ZSt18uncaught_exceptionv.uncaught_exception++;
      }
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    }

  function _glUseProgram(program) {
      GLctx.useProgram(program ? GL.programs[program] : null);
    }

  function _glShaderSource(shader, count, string, length) {
      var source = GL.getSource(shader, count, string, length);
      GLctx.shaderSource(GL.shaders[shader], source);
    }

  var _sqrtf=Math_sqrt;

  
  
  function __parseInt64(str, endptr, base, min, max, unsign) {
      var isNegative = false;
      // Skip space.
      while (_isspace(HEAP8[(str)])) str++;
  
      // Check for a plus/minus sign.
      if (HEAP8[(str)] == 45) {
        str++;
        isNegative = true;
      } else if (HEAP8[(str)] == 43) {
        str++;
      }
  
      // Find base.
      var ok = false;
      var finalBase = base;
      if (!finalBase) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            finalBase = 16;
            str += 2;
          } else {
            finalBase = 8;
            ok = true; // we saw an initial zero, perhaps the entire thing is just "0"
          }
        }
      } else if (finalBase==16) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            str += 2;
          }
        }
      }
      if (!finalBase) finalBase = 10;
      var start = str;
  
      // Get digits.
      var chr;
      while ((chr = HEAP8[(str)]) != 0) {
        var digit = parseInt(String.fromCharCode(chr), finalBase);
        if (isNaN(digit)) {
          break;
        } else {
          str++;
          ok = true;
        }
      }
  
      if (!ok) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return ((asm["setTempRet0"](0),0)|0);
      }
  
      // Set end pointer.
      if (endptr) {
        HEAP32[((endptr)>>2)]=str;
      }
  
      try {
        var numberString = isNegative ? '-'+Pointer_stringify(start, str - start) : Pointer_stringify(start, str - start);
        i64Math.fromString(numberString, finalBase, min, max, unsign);
      } catch(e) {
        ___setErrNo(ERRNO_CODES.ERANGE); // not quite correct
      }
  
      return ((asm["setTempRet0"](((HEAP32[(((tempDoublePtr)+(4))>>2)])|0)),((HEAP32[((tempDoublePtr)>>2)])|0))|0);
    }function _strtoull(str, endptr, base) {
      return __parseInt64(str, endptr, base, 0, '18446744073709551615', true);  // ULONG_MAX.
    }function _strtoull_l(str, endptr, base) {
      return _strtoull(str, endptr, base); // no locale support yet
    }

  function _SDL_GL_SetAttribute(attr, value) {
      if (!(attr in SDL.glAttributes)) {
        abort('Unknown SDL GL attribute (' + attr + '). Please check if your SDL version is supported.');
      }
  
      SDL.glAttributes[attr] = value;
    }

  var _log=Math_log;

  function _SDL_PollEvent(ptr) {
      if (SDL.initFlags & 0x200 && SDL.joystickEventState) {
        // If SDL_INIT_JOYSTICK was supplied AND the joystick system is configured
        // to automatically query for events, query for joystick events.
        SDL.queryJoysticks();
      }
      if (SDL.events.length === 0) return 0;
      if (ptr) {
        SDL.makeCEvent(SDL.events.shift(), ptr);
      }
      return 1;
    }

  var _copysignl=_copysign;

  
  function _strtoll(str, endptr, base) {
      return __parseInt64(str, endptr, base, '-9223372036854775808', '9223372036854775807');  // LLONG_MIN, LLONG_MAX.
    }function _strtoll_l(str, endptr, base) {
      return _strtoll(str, endptr, base); // no locale support yet
    }

  function _glClear(x0) { GLctx.clear(x0) }

  function _glActiveTexture(x0) { GLctx.activeTexture(x0) }

  function _glEnableVertexAttribArray(index) {
      GLctx.enableVertexAttribArray(index);
    }

  function _glBindBuffer(target, buffer) {
      var bufferObj = buffer ? GL.buffers[buffer] : null;
  
  
      GLctx.bindBuffer(target, bufferObj);
    }

  function _SDL_GetWindowSize(window, width, height){
      var w = Module['canvas'].width;
      var h = Module['canvas'].height;
      if (width) HEAP32[((width)>>2)]=w;
      if (height) HEAP32[((height)>>2)]=h;
    }

  function _glBufferData(target, size, data, usage) {
      switch (usage) { // fix usages, WebGL only has *_DRAW
        case 0x88E1: // GL_STREAM_READ
        case 0x88E2: // GL_STREAM_COPY
          usage = 0x88E0; // GL_STREAM_DRAW
          break;
        case 0x88E5: // GL_STATIC_READ
        case 0x88E6: // GL_STATIC_COPY
          usage = 0x88E4; // GL_STATIC_DRAW
          break;
        case 0x88E9: // GL_DYNAMIC_READ
        case 0x88EA: // GL_DYNAMIC_COPY
          usage = 0x88E8; // GL_DYNAMIC_DRAW
          break;
      }
      if (!data) {
        GLctx.bufferData(target, size, usage);
      } else {
        GLctx.bufferData(target, HEAPU8.subarray(data, data+size), usage);
      }
    }

  function _pthread_cond_broadcast() {
      return 0;
    }

  function __ZSt9terminatev() {
      _exit(-1234);
    }

  function _pthread_mutex_unlock() {}

  function _SDL_CreateWindow() {
  Module['printErr']('missing function: SDL_CreateWindow'); abort(-1);
  }

  var _llvm_pow_f64=Math_pow;

  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }

   
  Module["_bitshift64Shl"] = _bitshift64Shl;

  function ___errno_location() {
      return ___errno_state;
    }

  
  function _strerror_r(errnum, strerrbuf, buflen) {
      if (errnum in ERRNO_MESSAGES) {
        if (ERRNO_MESSAGES[errnum].length > buflen - 1) {
          return ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          var msg = ERRNO_MESSAGES[errnum];
          writeAsciiToMemory(msg, strerrbuf);
          return 0;
        }
      } else {
        return ___setErrNo(ERRNO_CODES.EINVAL);
      }
    }function _strerror(errnum) {
      if (!_strerror.buffer) _strerror.buffer = _malloc(256);
      _strerror_r(errnum, _strerror.buffer, 256);
      return _strerror.buffer;
    }


  function _catclose(catd) {
      // int catclose (nl_catd catd)
      return 0;
    }

  function _llvm_lifetime_start() {}

  function _SDL_Quit() {
      for (var i = 0; i < SDL.numChannels; ++i) {
        if (SDL.channels[i].audio) {
          SDL.channels[i].audio.pause();
        }
      }
      if (SDL.music.audio) {
        SDL.music.audio.pause();
      }
      Module.print('SDL_Quit called (and ignored)');
    }

  function _llvm_bswap_i32(x) {
      return ((x&0xff)<<24) | (((x>>8)&0xff)<<16) | (((x>>16)&0xff)<<8) | (x>>>24);
    }

  function ___cxa_guard_release() {}

  function _ungetc(c, stream) {
      // int ungetc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ungetc.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) {
        return -1;
      }
      if (c === -1) {
        // do nothing for EOF character
        return c;
      }
      c = unSign(c & 0xFF);
      stream.ungotten.push(c);
      stream.eof = false;
      return c;
    }

  function _uselocale(locale) {
      return 0;
    }

  function _vsnprintf(s, n, format, va_arg) {
      return _snprintf(s, n, format, HEAP32[((va_arg)>>2)]);
    }

  function _glDisableVertexAttribArray(index) {
      GLctx.disableVertexAttribArray(index);
    }


  function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
      if (pixels) {
        var data = GL.getTexPixelData(type, format, width, height, pixels, internalFormat);
        pixels = data.pixels;
        internalFormat = data.internalFormat;
      } else {
        pixels = null;
      }
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
    }

  function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }

  var _llvm_memmove_p0i8_p0i8_i32=_memmove;

  function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      // Work around a bug in Chromium which causes getShaderInfoLog to return null
      if (!log) log = '(unknown error)';
      log = log.substr(0, maxLength - 1);
      writeStringToMemory(log, infoLog);
      if (length) {
        HEAP32[((length)>>2)]=log.length
      }
    }

  
  
  function __isLeapYear(year) {
        return year%4 === 0 && (year%100 !== 0 || year%400 === 0);
    }
  
  function __arraySum(array, index) {
      var sum = 0;
      for (var i = 0; i <= index; sum += array[i++]);
      return sum;
    }
  
  
  var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];
  
  var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date, days) {
      var newDate = new Date(date.getTime());
      while(days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
  
        if (days > daysInCurrentMonth-newDate.getDate()) {
          // we spill over to next month
          days -= (daysInCurrentMonth-newDate.getDate()+1);
          newDate.setDate(1);
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth+1)
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear()+1);
          }
        } else {
          // we stay in current month 
          newDate.setDate(newDate.getDate()+days);
          return newDate;
        }
      }
  
      return newDate;
    }function _strftime(s, maxsize, format, tm) {
      // size_t strftime(char *restrict s, size_t maxsize, const char *restrict format, const struct tm *restrict timeptr);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html
      
      var date = {
        tm_sec: HEAP32[((tm)>>2)],
        tm_min: HEAP32[(((tm)+(4))>>2)],
        tm_hour: HEAP32[(((tm)+(8))>>2)],
        tm_mday: HEAP32[(((tm)+(12))>>2)],
        tm_mon: HEAP32[(((tm)+(16))>>2)],
        tm_year: HEAP32[(((tm)+(20))>>2)],
        tm_wday: HEAP32[(((tm)+(24))>>2)],
        tm_yday: HEAP32[(((tm)+(28))>>2)],
        tm_isdst: HEAP32[(((tm)+(32))>>2)]
      };
  
      var pattern = Pointer_stringify(format);
  
      // expand format
      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',     // Replaced by the locale's appropriate date and time representation - e.g., Mon Aug  3 14:02:01 2013
        '%D': '%m/%d/%y',                 // Equivalent to %m / %d / %y
        '%F': '%Y-%m-%d',                 // Equivalent to %Y - %m - %d
        '%h': '%b',                       // Equivalent to %b
        '%r': '%I:%M:%S %p',              // Replaced by the time in a.m. and p.m. notation
        '%R': '%H:%M',                    // Replaced by the time in 24-hour notation
        '%T': '%H:%M:%S',                 // Replaced by the time
        '%x': '%m/%d/%y',                 // Replaced by the locale's appropriate date representation
        '%X': '%H:%M:%S',                 // Replaced by the locale's appropriate date representation
      };
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule]);
      }
  
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
      function leadingSomething(value, digits, character) {
        var str = typeof value === 'number' ? value.toString() : (value || '');
        while (str.length < digits) {
          str = character[0]+str;
        }
        return str;
      };
  
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0');
      };
  
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : (value > 0 ? 1 : 0);
        };
  
        var compare;
        if ((compare = sgn(date1.getFullYear()-date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth()-date2.getMonth())) === 0) {
            compare = sgn(date1.getDate()-date2.getDate());
          }
        }
        return compare;
      };
  
      function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0: // Sunday
              return new Date(janFourth.getFullYear()-1, 11, 29);
            case 1: // Monday
              return janFourth;
            case 2: // Tuesday
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3: // Wednesday
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4: // Thursday
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5: // Friday
              return new Date(janFourth.getFullYear()-1, 11, 31);
            case 6: // Saturday
              return new Date(janFourth.getFullYear()-1, 11, 30);
          }
      };
  
      function getWeekBasedYear(date) {
          var thisDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear()+1, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            // this date is after the start of the first week of this year
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear()+1;
            } else {
              return thisDate.getFullYear();
            }
          } else { 
            return thisDate.getFullYear()-1;
          }
      };
  
      var EXPANSION_RULES_2 = {
        '%a': function(date) {
          return WEEKDAYS[date.tm_wday].substring(0,3);
        },
        '%A': function(date) {
          return WEEKDAYS[date.tm_wday];
        },
        '%b': function(date) {
          return MONTHS[date.tm_mon].substring(0,3);
        },
        '%B': function(date) {
          return MONTHS[date.tm_mon];
        },
        '%C': function(date) {
          var year = date.tm_year+1900;
          return leadingNulls(Math.floor(year/100),2);
        },
        '%d': function(date) {
          return leadingNulls(date.tm_mday, 2);
        },
        '%e': function(date) {
          return leadingSomething(date.tm_mday, 2, ' ');
        },
        '%g': function(date) {
          // %g, %G, and %V give values according to the ISO 8601:2000 standard week-based year. 
          // In this system, weeks begin on a Monday and week 1 of the year is the week that includes 
          // January 4th, which is also the week that includes the first Thursday of the year, and 
          // is also the first week that contains at least four days in the year. 
          // If the first Monday of January is the 2nd, 3rd, or 4th, the preceding days are part of 
          // the last week of the preceding year; thus, for Saturday 2nd January 1999, 
          // %G is replaced by 1998 and %V is replaced by 53. If December 29th, 30th, 
          // or 31st is a Monday, it and any following days are part of week 1 of the following year. 
          // Thus, for Tuesday 30th December 1997, %G is replaced by 1998 and %V is replaced by 01.
          
          return getWeekBasedYear(date).toString().substring(2);
        },
        '%G': function(date) {
          return getWeekBasedYear(date);
        },
        '%H': function(date) {
          return leadingNulls(date.tm_hour, 2);
        },
        '%I': function(date) {
          return leadingNulls(date.tm_hour < 13 ? date.tm_hour : date.tm_hour-12, 2);
        },
        '%j': function(date) {
          // Day of the year (001-366)
          return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon-1), 3);
        },
        '%m': function(date) {
          return leadingNulls(date.tm_mon+1, 2);
        },
        '%M': function(date) {
          return leadingNulls(date.tm_min, 2);
        },
        '%n': function() {
          return '\n';
        },
        '%p': function(date) {
          if (date.tm_hour > 0 && date.tm_hour < 13) {
            return 'AM';
          } else {
            return 'PM';
          }
        },
        '%S': function(date) {
          return leadingNulls(date.tm_sec, 2);
        },
        '%t': function() {
          return '\t';
        },
        '%u': function(date) {
          var day = new Date(date.tm_year+1900, date.tm_mon+1, date.tm_mday, 0, 0, 0, 0);
          return day.getDay() || 7;
        },
        '%U': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53]. 
          // The first Sunday of January is the first day of week 1; 
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year+1900, 0, 1);
          var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7-janFirst.getDay());
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
          
          // is target date after the first Sunday?
          if (compareByDay(firstSunday, endDate) < 0) {
            // calculate difference in days between first Sunday and endDate
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstSundayUntilEndJanuary = 31-firstSunday.getDate();
            var days = firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
  
          return compareByDay(firstSunday, janFirst) === 0 ? '01': '00';
        },
        '%V': function(date) {
          // Replaced by the week number of the year (Monday as the first day of the week) 
          // as a decimal number [01,53]. If the week containing 1 January has four 
          // or more days in the new year, then it is considered week 1. 
          // Otherwise, it is the last week of the previous year, and the next week is week 1. 
          // Both January 4th and the first Thursday of January are always in week 1. [ tm_year, tm_wday, tm_yday]
          var janFourthThisYear = new Date(date.tm_year+1900, 0, 4);
          var janFourthNextYear = new Date(date.tm_year+1901, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          var endDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
            // if given date is before this years first week, then it belongs to the 53rd week of last year
            return '53';
          } 
  
          if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
            // if given date is after next years first week, then it belongs to the 01th week of next year
            return '01';
          }
  
          // given date is in between CW 01..53 of this calendar year
          var daysDifference;
          if (firstWeekStartThisYear.getFullYear() < date.tm_year+1900) {
            // first CW of this year starts last year
            daysDifference = date.tm_yday+32-firstWeekStartThisYear.getDate()
          } else {
            // first CW of this year starts this year
            daysDifference = date.tm_yday+1-firstWeekStartThisYear.getDate();
          }
          return leadingNulls(Math.ceil(daysDifference/7), 2);
        },
        '%w': function(date) {
          var day = new Date(date.tm_year+1900, date.tm_mon+1, date.tm_mday, 0, 0, 0, 0);
          return day.getDay();
        },
        '%W': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53]. 
          // The first Monday of January is the first day of week 1; 
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year, 0, 1);
          var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7-janFirst.getDay()+1);
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
  
          // is target date after the first Monday?
          if (compareByDay(firstMonday, endDate) < 0) {
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstMondayUntilEndJanuary = 31-firstMonday.getDate();
            var days = firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
          return compareByDay(firstMonday, janFirst) === 0 ? '01': '00';
        },
        '%y': function(date) {
          // Replaced by the last two digits of the year as a decimal number [00,99]. [ tm_year]
          return (date.tm_year+1900).toString().substring(2);
        },
        '%Y': function(date) {
          // Replaced by the year as a decimal number (for example, 1997). [ tm_year]
          return date.tm_year+1900;
        },
        '%z': function(date) {
          // Replaced by the offset from UTC in the ISO 8601:2000 standard format ( +hhmm or -hhmm ),
          // or by no characters if no timezone is determinable. 
          // For example, "-0430" means 4 hours 30 minutes behind UTC (west of Greenwich). 
          // If tm_isdst is zero, the standard time offset is used. 
          // If tm_isdst is greater than zero, the daylight savings time offset is used. 
          // If tm_isdst is negative, no characters are returned. 
          // FIXME: we cannot determine time zone (or can we?)
          return '';
        },
        '%Z': function(date) {
          // Replaced by the timezone name or abbreviation, or by no bytes if no timezone information exists. [ tm_isdst]
          // FIXME: we cannot determine time zone (or can we?)
          return '';
        },
        '%%': function() {
          return '%';
        }
      };
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.indexOf(rule) >= 0) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date));
        }
      }
  
      var bytes = intArrayFromString(pattern, false);
      if (bytes.length > maxsize) {
        return 0;
      } 
  
      writeArrayToMemory(bytes, s);
      return bytes.length-1;
    }function _strftime_l(s, maxsize, format, tm) {
      return _strftime(s, maxsize, format, tm); // no locale support yet
    }

  function _abort() {
      Module['abort']();
    }


  function _glEnable(x0) { GLctx.enable(x0) }

  var _fabs=Math_abs;

  var _getc=_fgetc;

  function _glGenBuffers(n, buffers) {
      for (var i = 0; i < n; i++) {
        var id = GL.getNewId(GL.buffers);
        var buffer = GLctx.createBuffer();
        buffer.name = id;
        GL.buffers[id] = buffer;
        HEAP32[(((buffers)+(i*4))>>2)]=id;
      }
    }

  function _glGetAttribLocation(program, name) {
      program = GL.programs[program];
      name = Pointer_stringify(name);
      return GLctx.getAttribLocation(program, name);
    }

  function ___cxa_allocate_exception(size) {
      var ptr = _malloc(size + ___cxa_exception_header_size);
      return ptr + ___cxa_exception_header_size;
    }

  function _glDeleteShader(shader) {
      GLctx.deleteShader(GL.shaders[shader]);
      GL.shaders[shader] = null;
    }

  var _fmodl=_fmod;

  function _glCreateProgram() {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      program.name = id;
      GL.programs[id] = program;
      return id;
    }

  
  
  function _sprintf(s, format, varargs) {
      // int sprintf(char *restrict s, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      return _snprintf(s, undefined, format, varargs);
    }function _asprintf(s, format, varargs) {
      return _sprintf(-s, format, varargs);
    }function _vasprintf(s, format, va_arg) {
      return _asprintf(s, format, HEAP32[((va_arg)>>2)]);
    }

  function _glViewport(x0, x1, x2, x3) { GLctx.viewport(x0, x1, x2, x3) }

  function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg) {
      Module['noExitRuntime'] = true;
  
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms'); //, left: ' + Browser.mainLoop.remainingBlockers);
          Browser.mainLoop.updateStatus();
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
        if (Browser.mainLoop.shouldPause) {
          // catch pauses from non-main loop sources
          Browser.mainLoop.paused = true;
          Browser.mainLoop.shouldPause = false;
          return;
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
  
        if (Browser.mainLoop.method === 'timeout' && Module.ctx) {
          Module.printErr('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          Browser.mainLoop.method = ''; // just warn once per call to set main loop
        }
  
        if (Module['preMainLoop']) {
          Module['preMainLoop']();
        }
  
        try {
          if (typeof arg !== 'undefined') {
            Runtime.dynCall('vi', func, [arg]);
          } else {
            Runtime.dynCall('v', func);
          }
        } catch (e) {
          if (e instanceof ExitStatus) {
            return;
          } else {
            if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
            throw e;
          }
        }
  
        if (Module['postMainLoop']) {
          Module['postMainLoop']();
        }
  
        if (Browser.mainLoop.shouldPause) {
          // catch pauses from the main loop itself
          Browser.mainLoop.paused = true;
          Browser.mainLoop.shouldPause = false;
          return;
        }
        Browser.mainLoop.scheduler();
      }
      if (fps && fps > 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          setTimeout(Browser.mainLoop.runner, 1000/fps); // doing this each time means that on exception, we stop
        };
        Browser.mainLoop.method = 'timeout';
      } else {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      }
      Browser.mainLoop.scheduler();
  
      if (simulateInfiniteLoop) {
        throw 'SimulateInfiniteLoop';
      }
    }

  function _catopen(name, oflag) {
      // nl_catd catopen (const char *name, int oflag)
      return -1;
    }

  function ___ctype_toupper_loc() {
      // http://refspecs.freestandards.org/LSB_3.1.1/LSB-Core-generic/LSB-Core-generic/libutil---ctype-toupper-loc.html
      var me = ___ctype_toupper_loc;
      if (!me.ret) {
        var values = [
          128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,
          158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,
          188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,
          218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,
          248,249,250,251,252,253,254,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
          33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,
          73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
          81,82,83,84,85,86,87,88,89,90,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,
          145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,
          175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,
          205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,
          235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255
        ];
        var i32size = 4;
        var arr = _malloc(values.length * i32size);
        for (var i = 0; i < values.length; i++) {
          HEAP32[(((arr)+(i * i32size))>>2)]=values[i];
        }
        me.ret = allocate([arr + 128 * i32size], 'i32*', ALLOC_NORMAL);
      }
      return me.ret;
    }

  
  function _isdigit(chr) {
      return chr >= 48 && chr <= 57;
    }function _isdigit_l(chr) {
      return _isdigit(chr); // no locale support yet
    }

  function ___ctype_tolower_loc() {
      // http://refspecs.freestandards.org/LSB_3.1.1/LSB-Core-generic/LSB-Core-generic/libutil---ctype-tolower-loc.html
      var me = ___ctype_tolower_loc;
      if (!me.ret) {
        var values = [
          128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,
          158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,
          188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,
          218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,
          248,249,250,251,252,253,254,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
          33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,97,98,99,100,101,102,103,
          104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,91,92,93,94,95,96,97,98,99,100,101,102,103,
          104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,
          134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,
          164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,
          194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,
          224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,
          254,255
        ];
        var i32size = 4;
        var arr = _malloc(values.length * i32size);
        for (var i = 0; i < values.length; i++) {
          HEAP32[(((arr)+(i * i32size))>>2)]=values[i];
        }
        me.ret = allocate([arr + 128 * i32size], 'i32*', ALLOC_NORMAL);
      }
      return me.ret;
    }

  function _glUniformMatrix4fv(location, count, transpose, value) {
      location = GL.uniforms[location];
      var view;
      if (count == 1) {
        // avoid allocation for the common case of uploading one uniform matrix
        view = GL.miniTempBufferViews[15];
        for (var i = 0; i < 16; i++) {
          view[i] = HEAPF32[(((value)+(i*4))>>2)];
        }
      } else {
        view = HEAPF32.subarray((value)>>2,(value+count*64)>>2);
      }
      GLctx.uniformMatrix4fv(location, transpose, view);
    }

  var _BItoD=true;

  function _glTexParameteri(x0, x1, x2) { GLctx.texParameteri(x0, x1, x2) }

  function _glDeleteBuffers(n, buffers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((buffers)+(i*4))>>2)];
        var buffer = GL.buffers[id];
  
        // From spec: "glDeleteBuffers silently ignores 0's and names that do not
        // correspond to existing buffer objects."
        if (!buffer) continue;
  
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
  
        if (id == GL.currArrayBuffer) GL.currArrayBuffer = 0;
        if (id == GL.currElementArrayBuffer) GL.currElementArrayBuffer = 0;
      }
    }

  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }

  var _SDL_RWFromMem=_SDL_RWFromConstMem;

  var __ZTISt9exception=allocate([allocate([1,0,0,0,0,0,0], "i8", ALLOC_STATIC)+8, 0], "i32", ALLOC_STATIC);

  var ___dso_handle=allocate(1, "i32*", ALLOC_STATIC);



FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
var GLctx; GL.init()
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
_fgetc.ret = allocate([0], "i8", ALLOC_STATIC);
_fputc.ret = allocate([0], "i8", ALLOC_STATIC);
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

staticSealed = true; // seal the static portion of memory

STACK_MAX = STACK_BASE + 5242880;

DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");

 var ctlz_i8 = allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_DYNAMIC);
 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);

var Math_min = Math.min;
function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    Module["dynCall_viiiiiii"](index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  try {
    Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vi(index,a1) {
  try {
    Module["dynCall_vi"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  try {
    Module["dynCall_vii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  try {
    Module["dynCall_viiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiiiid(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    Module["dynCall_viiiiiid"](index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viii(index,a1,a2,a3) {
  try {
    Module["dynCall_viii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiiid(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module["dynCall_viiiiid"](index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_v(index) {
  try {
    Module["dynCall_v"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    return Module["dynCall_iiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiiii(index,a1,a2,a3,a4) {
  try {
    return Module["dynCall_iiiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    Module["dynCall_viiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iii(index,a1,a2) {
  try {
    return Module["dynCall_iii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  try {
    return Module["dynCall_iiiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiii(index,a1,a2,a3,a4) {
  try {
    Module["dynCall_viiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=env.ctlz_i8|0;var o=env.___rand_seed|0;var p=env.__ZTISt9exception|0;var q=env.___dso_handle|0;var r=env._stderr|0;var s=env._stdin|0;var t=env._stdout|0;var u=0;var v=0;var w=0;var x=0;var y=+env.NaN,z=+env.Infinity;var A=0,B=0,C=0,D=0,E=0.0,F=0,G=0,H=0,I=0.0;var J=0;var K=0;var L=0;var M=0;var N=0;var O=0;var P=0;var Q=0;var R=0;var S=0;var T=global.Math.floor;var U=global.Math.abs;var V=global.Math.sqrt;var W=global.Math.pow;var X=global.Math.cos;var Y=global.Math.sin;var Z=global.Math.tan;var _=global.Math.acos;var $=global.Math.asin;var aa=global.Math.atan;var ba=global.Math.atan2;var ca=global.Math.exp;var da=global.Math.log;var ea=global.Math.ceil;var fa=global.Math.imul;var ga=env.abort;var ha=env.assert;var ia=env.asmPrintInt;var ja=env.asmPrintFloat;var ka=env.min;var la=env.invoke_iiii;var ma=env.invoke_viiiiiii;var na=env.invoke_viiiii;var oa=env.invoke_vi;var pa=env.invoke_vii;var qa=env.invoke_viiiiiiiii;var ra=env.invoke_ii;var sa=env.invoke_viiiiiid;var ta=env.invoke_viii;var ua=env.invoke_viiiiid;var va=env.invoke_v;var wa=env.invoke_iiiiiiiii;var xa=env.invoke_iiiii;var ya=env.invoke_viiiiiiii;var za=env.invoke_viiiiii;var Aa=env.invoke_iii;var Ba=env.invoke_iiiiii;var Ca=env.invoke_viiii;var Da=env._glUseProgram;var Ea=env._fabs;var Fa=env._sqrtf;var Ga=env._vsscanf;var Ha=env.__ZSt9terminatev;var Ia=env._glUniformMatrix4fv;var Ja=env.___cxa_guard_acquire;var Ka=env._SDL_CreateWindow;var La=env._SDL_RWFromFile;var Ma=env._glDeleteProgram;var Na=env._sscanf;var Oa=env.__ZSt18uncaught_exceptionv;var Pa=env.___ctype_toupper_loc;var Qa=env._glBindBuffer;var Ra=env._glGetShaderInfoLog;var Sa=env.__addDays;var Ta=env._glGetUniformLocation;var Ua=env._sbrk;var Va=env._glBlendFunc;var Wa=env._glGetAttribLocation;var Xa=env._glDisableVertexAttribArray;var Ya=env.___cxa_begin_catch;var Za=env._sinf;var _a=env._sysconf;var $a=env._fileno;var ab=env._fread;var bb=env._puts;var cb=env._SDL_GetWindowSize;var db=env._write;var eb=env.__isLeapYear;var fb=env._glGenBuffers;var gb=env._glShaderSource;var hb=env.__ZNSt9exceptionD2Ev;var ib=env.___cxa_does_inherit;var jb=env._strtoll_l;var kb=env._catclose;var lb=env._llvm_lifetime_end;var mb=env._glEnableVertexAttribArray;var nb=env._glVertexAttribPointer;var ob=env.__reallyNegative;var pb=env._send;var qb=env._SDL_GL_SetAttribute;var rb=env._glGetProgramInfoLog;var sb=env.___cxa_is_number_type;var tb=env._atan2f;var ub=env.___cxa_find_matching_catch;var vb=env._isxdigit_l;var wb=env._glDrawElements;var xb=env.___cxa_guard_release;var yb=env._SDL_ReadLE32;var zb=env._strerror_r;var Ab=env._glViewport;var Bb=env._sin;var Cb=env.___setErrNo;var Db=env._llvm_pow_f32;var Eb=env._newlocale;var Fb=env._isdigit_l;var Gb=env.___resumeException;var Hb=env._freelocale;var Ib=env._glTexImage2D;var Jb=env._glEnable;var Kb=env._glGenTextures;var Lb=env._sprintf;var Mb=env._vasprintf;var Nb=env._llvm_bswap_i32;var Ob=env._glAttachShader;var Pb=env._vsnprintf;var Qb=env._glCreateProgram;var Rb=env._strtoull_l;var Sb=env._read;var Tb=env._fwrite;var Ub=env._time;var Vb=env._pthread_mutex_lock;var Wb=env._catopen;var Xb=env._exit;var Yb=env._llvm_pow_f64;var Zb=env.___ctype_b_loc;var _b=env._fmod;var $b=env._llvm_lifetime_start;var ac=env._SDL_GL_CreateContext;var bc=env.___cxa_allocate_exception;var cc=env._strtoll;var dc=env._pwrite;var ec=env._glBindTexture;var fc=env._uselocale;var gc=env._SDL_Init;var hc=env._snprintf;var ic=env.___errno_location;var jc=env._SDL_Quit;var kc=env._strtoull;var lc=env._strftime;var mc=env._glCreateShader;var nc=env._isxdigit;var oc=env._log;var pc=env._glActiveTexture;var qc=env._pthread_cond_broadcast;var rc=env._recv;var sc=env._fgetc;var tc=env._glCompileShader;var uc=env.__parseInt64;var vc=env.__getFloat;var wc=env._abort;var xc=env._glDeleteBuffers;var yc=env._glBufferData;var zc=env._isspace;var Ac=env._pthread_cond_wait;var Bc=env._glDeleteShader;var Cc=env._SDL_GetTicks;var Dc=env._cosf;var Ec=env._glGetProgramiv;var Fc=env._SDL_CloseAudio;var Gc=env._ungetc;var Hc=env._Mix_PlayChannel;var Ic=env._glLinkProgram;var Jc=env._strftime_l;var Kc=env._SDL_PauseAudio;var Lc=env._SDL_PollEvent;var Mc=env._catgets;var Nc=env._glTexParameteri;var Oc=env._glClear;var Pc=env._asprintf;var Qc=env._SDL_GL_SwapWindow;var Rc=env._Mix_LoadWAV_RW;var Sc=env.__exit;var Tc=env._Mix_OpenAudio;var Uc=env.__arraySum;var Vc=env._glGetShaderiv;var Wc=env.___ctype_tolower_loc;var Xc=env._fputs;var Yc=env._pthread_mutex_unlock;var Zc=env._pread;var _c=env._mkport;var $c=env._fflush;var ad=env._emscripten_memcpy_big;var bd=env._emscripten_set_main_loop;var cd=env.__scanString;var dd=env._glBufferSubData;var ed=env._copysign;var fd=env._fputc;var gd=env.___cxa_throw;var hd=env._isdigit;var id=env._strerror;var jd=env.__formatString;var kd=env._atexit;var ld=env._SDL_RWFromConstMem;var md=0.0;
// EMSCRIPTEN_START_FUNCS
function Fd(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+7&-8;return b|0}function Gd(){return i|0}function Hd(a){a=a|0;i=a}function Id(a,b){a=a|0;b=b|0;if((u|0)==0){u=a;v=b}}function Jd(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0]}function Kd(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0];a[k+4|0]=a[b+4|0];a[k+5|0]=a[b+5|0];a[k+6|0]=a[b+6|0];a[k+7|0]=a[b+7|0]}function Ld(a){a=a|0;J=a}function Md(a){a=a|0;K=a}function Nd(a){a=a|0;L=a}function Od(a){a=a|0;M=a}function Pd(a){a=a|0;N=a}function Qd(a){a=a|0;O=a}function Rd(a){a=a|0;P=a}function Sd(a){a=a|0;Q=a}function Td(a){a=a|0;R=a}function Ud(a){a=a|0;S=a}function Vd(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;e=i;f=a>>>16;g=a&65535;if((c|0)==1){a=(d[b]|0)+g|0;h=a>>>0>65520?a+ -65521|0:a;a=h+f|0;j=(a>>>0>65520?a+15|0:a)<<16|h;i=e;return j|0}if((b|0)==0){j=1;i=e;return j|0}if(c>>>0<16){if((c|0)==0){k=g;l=f}else{h=b;a=c;m=g;n=f;while(1){o=a+ -1|0;p=(d[h]|0)+m|0;q=p+n|0;if((o|0)==0){k=p;l=q;break}else{n=q;m=p;a=o;h=h+1|0}}}j=((l>>>0)%65521|0)<<16|(k>>>0>65520?k+ -65521|0:k);i=e;return j|0}do{if(c>>>0>5551){k=b;l=c;h=g;a=f;do{l=l+ -5552|0;m=k;n=h;o=347;p=a;while(1){q=(d[m]|0)+n|0;r=q+(d[m+1|0]|0)|0;s=r+(d[m+2|0]|0)|0;t=s+(d[m+3|0]|0)|0;u=t+(d[m+4|0]|0)|0;v=u+(d[m+5|0]|0)|0;w=v+(d[m+6|0]|0)|0;x=w+(d[m+7|0]|0)|0;y=x+(d[m+8|0]|0)|0;z=y+(d[m+9|0]|0)|0;A=z+(d[m+10|0]|0)|0;B=A+(d[m+11|0]|0)|0;C=B+(d[m+12|0]|0)|0;D=C+(d[m+13|0]|0)|0;E=D+(d[m+14|0]|0)|0;F=E+(d[m+15|0]|0)|0;G=q+p+r+s+t+u+v+w+x+y+z+A+B+C+D+E+F|0;E=o+ -1|0;if((E|0)==0){break}else{p=G;o=E;n=F;m=m+16|0}}k=k+5552|0;h=(F>>>0)%65521|0;a=(G>>>0)%65521|0;}while(l>>>0>5551);if((l|0)==0){H=h;I=a;break}if(l>>>0>15){J=l;K=k;L=h;M=a;N=15}else{O=l;P=k;Q=h;R=a;N=16}}else{J=c;K=b;L=g;M=f;N=15}}while(0);if((N|0)==15){while(1){N=0;S=J+ -16|0;f=(d[K]|0)+L|0;g=f+(d[K+1|0]|0)|0;b=g+(d[K+2|0]|0)|0;c=b+(d[K+3|0]|0)|0;G=c+(d[K+4|0]|0)|0;F=G+(d[K+5|0]|0)|0;m=F+(d[K+6|0]|0)|0;n=m+(d[K+7|0]|0)|0;o=n+(d[K+8|0]|0)|0;p=o+(d[K+9|0]|0)|0;E=p+(d[K+10|0]|0)|0;D=E+(d[K+11|0]|0)|0;C=D+(d[K+12|0]|0)|0;B=C+(d[K+13|0]|0)|0;A=B+(d[K+14|0]|0)|0;T=A+(d[K+15|0]|0)|0;U=f+M+g+b+c+G+F+m+n+o+p+E+D+C+B+A+T|0;V=K+16|0;if(S>>>0>15){M=U;L=T;K=V;J=S;N=15}else{break}}if((S|0)==0){W=T;X=U;N=17}else{O=S;P=V;Q=T;R=U;N=16}}if((N|0)==16){while(1){N=0;U=O+ -1|0;T=(d[P]|0)+Q|0;V=T+R|0;if((U|0)==0){W=T;X=V;N=17;break}else{R=V;Q=T;P=P+1|0;O=U;N=16}}}if((N|0)==17){H=(W>>>0)%65521|0;I=(X>>>0)%65521|0}j=I<<16|H;i=e;return j|0}function Wd(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;f=i;if((b|0)==0){g=0;i=f;return g|0}h=~a;a:do{if((e|0)==0){j=h}else{a=b;k=e;l=h;while(1){if((a&3|0)==0){break}m=c[8+(((d[a]|0)^l&255)<<2)>>2]^l>>>8;n=k+ -1|0;if((n|0)==0){j=m;break a}else{a=a+1|0;k=n;l=m}}m=a;if(k>>>0>31){n=k;o=m;p=l;while(1){q=c[o>>2]^p;r=c[2056+((q>>>8&255)<<2)>>2]^c[3080+((q&255)<<2)>>2]^c[1032+((q>>>16&255)<<2)>>2]^c[8+(q>>>24<<2)>>2]^c[o+4>>2];q=c[2056+((r>>>8&255)<<2)>>2]^c[3080+((r&255)<<2)>>2]^c[1032+((r>>>16&255)<<2)>>2]^c[8+(r>>>24<<2)>>2]^c[o+8>>2];r=c[2056+((q>>>8&255)<<2)>>2]^c[3080+((q&255)<<2)>>2]^c[1032+((q>>>16&255)<<2)>>2]^c[8+(q>>>24<<2)>>2]^c[o+12>>2];q=c[2056+((r>>>8&255)<<2)>>2]^c[3080+((r&255)<<2)>>2]^c[1032+((r>>>16&255)<<2)>>2]^c[8+(r>>>24<<2)>>2]^c[o+16>>2];r=c[2056+((q>>>8&255)<<2)>>2]^c[3080+((q&255)<<2)>>2]^c[1032+((q>>>16&255)<<2)>>2]^c[8+(q>>>24<<2)>>2]^c[o+20>>2];q=c[2056+((r>>>8&255)<<2)>>2]^c[3080+((r&255)<<2)>>2]^c[1032+((r>>>16&255)<<2)>>2]^c[8+(r>>>24<<2)>>2]^c[o+24>>2];r=o+32|0;s=c[2056+((q>>>8&255)<<2)>>2]^c[3080+((q&255)<<2)>>2]^c[1032+((q>>>16&255)<<2)>>2]^c[8+(q>>>24<<2)>>2]^c[o+28>>2];q=c[2056+((s>>>8&255)<<2)>>2]^c[3080+((s&255)<<2)>>2]^c[1032+((s>>>16&255)<<2)>>2]^c[8+(s>>>24<<2)>>2];s=n+ -32|0;if(s>>>0>31){p=q;o=r;n=s}else{t=s;u=r;v=q;break}}}else{t=k;u=m;v=l}if(t>>>0>3){n=t;o=u;p=v;while(1){a=o+4|0;q=c[o>>2]^p;r=c[2056+((q>>>8&255)<<2)>>2]^c[3080+((q&255)<<2)>>2]^c[1032+((q>>>16&255)<<2)>>2]^c[8+(q>>>24<<2)>>2];q=n+ -4|0;if(q>>>0>3){p=r;o=a;n=q}else{w=q;x=a;y=r;break}}}else{w=t;x=u;y=v}if((w|0)==0){j=y;break}n=x;o=w;p=y;while(1){l=c[8+(((d[n]|0)^p&255)<<2)>>2]^p>>>8;m=o+ -1|0;if((m|0)==0){j=l;break}else{p=l;o=m;n=n+1|0}}}}while(0);g=~j;i=f;return g|0}function Xd(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;if((d|0)==0){g=-6;i=f;return g|0}if(!((a[d]|0)==49&(e|0)==56)){g=-6;i=f;return g|0}if((b|0)==0){g=-2;i=f;return g|0}e=b+24|0;c[e>>2]=0;d=b+32|0;h=c[d>>2]|0;if((h|0)==0){c[d>>2]=23;c[b+40>>2]=0;j=23}else{j=h}h=b+36|0;if((c[h>>2]|0)==0){c[h>>2]=39}d=b+40|0;k=nd[j&31](c[d>>2]|0,1,7116)|0;if((k|0)==0){g=-4;i=f;return g|0}j=b+28|0;c[j>>2]=k;c[k+52>>2]=0;l=c[j>>2]|0;do{if((l|0)!=0){m=l;n=m+52|0;o=c[n>>2]|0;p=m+36|0;if((o|0)==0){c[m+8>>2]=1;c[p>>2]=15;q=l}else{if((c[p>>2]|0)==15){r=l}else{rd[c[h>>2]&63](c[d>>2]|0,o);c[n>>2]=0;r=c[j>>2]|0}c[m+8>>2]=1;c[p>>2]=15;if((r|0)==0){break}else{q=r}}p=q;c[p+28>>2]=0;c[b+20>>2]=0;c[b+8>>2]=0;c[e>>2]=0;c[b+48>>2]=1;c[q>>2]=0;c[p+4>>2]=0;c[p+12>>2]=0;c[p+20>>2]=32768;c[p+32>>2]=0;c[p+40>>2]=0;c[p+44>>2]=0;c[p+48>>2]=0;c[p+56>>2]=0;c[p+60>>2]=0;m=p+1328|0;c[p+108>>2]=m;c[p+80>>2]=m;c[p+76>>2]=m;c[p+7104>>2]=1;c[p+7108>>2]=-1;g=0;i=f;return g|0}}while(0);rd[c[h>>2]&63](c[d>>2]|0,k);c[j>>2]=0;g=-2;i=f;return g|0}function Yd(f,g){f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Ac=0,Bc=0,Cc=0,Dc=0,Ec=0,Fc=0,Gc=0,Hc=0,Ic=0,Jc=0,Kc=0,Lc=0,Mc=0,Nc=0,Oc=0,Pc=0,Qc=0,Rc=0,Sc=0,Tc=0,Uc=0,Vc=0,Wc=0,Xc=0,Yc=0,Zc=0,_c=0,$c=0,ad=0,bd=0,cd=0,dd=0,ed=0,fd=0,gd=0,hd=0,id=0,jd=0,kd=0,ld=0,md=0,nd=0,od=0,pd=0,qd=0,rd=0,sd=0,td=0,ud=0,vd=0,wd=0,xd=0,yd=0,zd=0,Ad=0,Bd=0,Cd=0,Dd=0,Ed=0,Fd=0,Gd=0,Hd=0,Id=0,Jd=0,Kd=0,Ld=0,Md=0,Nd=0,Od=0,Pd=0,Qd=0,Rd=0,Sd=0,Td=0,Ud=0,Xd=0,Yd=0,_d=0,be=0,ce=0,de=0,ee=0,fe=0,ge=0,he=0,ie=0,je=0,ke=0,le=0,me=0,ne=0,oe=0,pe=0,qe=0,re=0,se=0,te=0,ue=0,ve=0,we=0,xe=0,ye=0,ze=0,Ae=0,Be=0,Ce=0,De=0,Ee=0,Fe=0,Ge=0,He=0,Ie=0,Je=0,Ke=0,Le=0,Me=0,Ne=0,Oe=0,Pe=0,Qe=0,Re=0,Se=0,Te=0,Ue=0,Ve=0,We=0,Xe=0,Ye=0,Ze=0,_e=0,$e=0,af=0,bf=0,cf=0,df=0,ef=0,ff=0,gf=0,hf=0,jf=0,kf=0,lf=0,mf=0,nf=0,of=0,pf=0,qf=0,rf=0,sf=0,tf=0,uf=0,vf=0,wf=0,xf=0,yf=0,zf=0,Af=0,Bf=0,Cf=0,Df=0,Ef=0,Ff=0,Gf=0,Hf=0,If=0,Jf=0,Kf=0,Lf=0,Mf=0,Nf=0,Of=0,Pf=0,Qf=0,Rf=0,Sf=0,Tf=0,Uf=0,Vf=0,Wf=0,Xf=0,Yf=0,Zf=0,_f=0,$f=0,ag=0,bg=0,cg=0,dg=0,eg=0,fg=0,gg=0,hg=0,ig=0,jg=0,kg=0,lg=0,mg=0,ng=0,og=0,pg=0,qg=0,rg=0,sg=0,tg=0,ug=0,vg=0,wg=0,xg=0,yg=0,zg=0,Ag=0,Bg=0,Cg=0,Dg=0,Eg=0,Fg=0,Gg=0,Hg=0,Ig=0,Jg=0,Kg=0,Lg=0;h=i;i=i+8|0;j=h;if((f|0)==0){k=-2;i=h;return k|0}l=c[f+28>>2]|0;if((l|0)==0){k=-2;i=h;return k|0}m=f+12|0;n=c[m>>2]|0;if((n|0)==0){k=-2;i=h;return k|0}o=f;p=c[o>>2]|0;do{if((p|0)==0){if((c[f+4>>2]|0)==0){break}else{k=-2}i=h;return k|0}}while(0);q=l;r=l;l=c[r>>2]|0;if((l|0)==11){c[r>>2]=12;s=12;t=c[o>>2]|0;u=c[m>>2]|0}else{s=l;t=p;u=n}n=f+16|0;p=c[n>>2]|0;l=f+4|0;v=c[l>>2]|0;w=q+56|0;x=q+60|0;y=q+8|0;z=q+24|0;A=j;B=j+1|0;C=q+16|0;D=q+32|0;E=f+24|0;F=q+36|0;G=q+20|0;H=f+48|0;I=q+64|0;J=q+12|0;K=(g+ -5|0)>>>0<2;L=q+4|0;M=q+76|0;N=q+84|0;O=q+80|0;P=q+88|0;Q=(g|0)==6;R=q+7108|0;S=q+72|0;T=q+7112|0;U=q+68|0;V=q+44|0;W=q+7104|0;X=q+48|0;Y=q+52|0;Z=q+40|0;_=f+20|0;$=q+28|0;aa=q+96|0;ba=q+100|0;ca=q+92|0;da=q+104|0;ea=q+1328|0;fa=q+108|0;ga=q+112|0;ha=q+752|0;ia=q+624|0;ja=j+2|0;ka=j+3|0;j=s;s=c[x>>2]|0;la=v;ma=c[w>>2]|0;na=p;oa=t;t=p;p=u;u=0;a:while(1){b:do{switch(j|0){case 21:{pa=c[S>>2]|0;qa=s;ra=la;sa=ma;ta=oa;ua=u;va=221;break};case 23:{wa=c[S>>2]|0;xa=s;ya=la;za=ma;Aa=oa;Ba=u;va=240;break};case 18:{Ca=c[da>>2]|0;Da=s;Ea=la;Fa=ma;Ga=oa;Ha=u;va=164;break};case 1:{if(s>>>0<16){Ia=s;Ja=la;Ka=ma;La=oa;while(1){if((Ja|0)==0){Ma=Ia;Na=0;Oa=Ka;Pa=na;Qa=La;Ra=t;Sa=u;break a}Ta=Ja+ -1|0;Ua=La+1|0;Va=(d[La]<<Ia)+Ka|0;Wa=Ia+8|0;if(Wa>>>0<16){Ia=Wa;Ja=Ta;Ka=Va;La=Ua}else{Xa=Wa;Ya=Ta;Za=Va;_a=Ua;break}}}else{Xa=s;Ya=la;Za=ma;_a=oa}c[C>>2]=Za;if((Za&255|0)!=8){c[E>>2]=8264;c[r>>2]=29;$a=Xa;ab=Ya;bb=Za;cb=na;db=_a;eb=t;fb=p;gb=u;break b}if((Za&57344|0)!=0){c[E>>2]=8320;c[r>>2]=29;$a=Xa;ab=Ya;bb=Za;cb=na;db=_a;eb=t;fb=p;gb=u;break b}La=c[D>>2]|0;if((La|0)==0){hb=Za}else{c[La>>2]=Za>>>8&1;hb=c[C>>2]|0}if((hb&512|0)!=0){a[A]=Za;a[B]=Za>>>8;c[z>>2]=Wd(c[z>>2]|0,A,2)|0}c[r>>2]=2;ib=0;jb=Ya;kb=0;lb=_a;va=47;break};case 9:{if(s>>>0<32){La=s;Ka=la;Ja=ma;Ia=oa;while(1){if((Ka|0)==0){Ma=La;Na=0;Oa=Ja;Pa=na;Qa=Ia;Ra=t;Sa=u;break a}Ua=Ka+ -1|0;Va=Ia+1|0;Ta=(d[Ia]<<La)+Ja|0;Wa=La+8|0;if(Wa>>>0<32){La=Wa;Ka=Ua;Ja=Ta;Ia=Va}else{mb=Ua;nb=Ta;ob=Va;break}}}else{mb=la;nb=ma;ob=oa}Ia=Nb(nb|0)|0;c[z>>2]=Ia;c[H>>2]=Ia;c[r>>2]=10;pb=0;qb=mb;rb=0;sb=ob;va=121;break};case 16:{if(s>>>0<14){Ia=s;Ja=la;Ka=ma;La=oa;while(1){if((Ja|0)==0){Ma=Ia;Na=0;Oa=Ka;Pa=na;Qa=La;Ra=t;Sa=u;break a}Va=Ja+ -1|0;Ta=La+1|0;Ua=(d[La]<<Ia)+Ka|0;Wa=Ia+8|0;if(Wa>>>0<14){Ia=Wa;Ja=Va;Ka=Ua;La=Ta}else{tb=Wa;ub=Va;vb=Ua;wb=Ta;break}}}else{tb=s;ub=la;vb=ma;wb=oa}La=(vb&31)+257|0;c[aa>>2]=La;Ka=(vb>>>5&31)+1|0;c[ba>>2]=Ka;c[ca>>2]=(vb>>>10&15)+4;Ja=vb>>>14;Ia=tb+ -14|0;if(La>>>0>286|Ka>>>0>30){c[E>>2]=8432;c[r>>2]=29;$a=Ia;ab=ub;bb=Ja;cb=na;db=wb;eb=t;fb=p;gb=u;break b}else{c[da>>2]=0;c[r>>2]=17;xb=0;yb=Ia;zb=ub;Ab=Ja;Bb=wb;va=154;break b}break};case 0:{Ja=c[y>>2]|0;if((Ja|0)==0){c[r>>2]=12;$a=s;ab=la;bb=ma;cb=na;db=oa;eb=t;fb=p;gb=u;break b}if(s>>>0<16){Ia=s;Ka=la;La=ma;Ta=oa;while(1){if((Ka|0)==0){Ma=Ia;Na=0;Oa=La;Pa=na;Qa=Ta;Ra=t;Sa=u;break a}Ua=Ka+ -1|0;Va=Ta+1|0;Wa=(d[Ta]<<Ia)+La|0;Cb=Ia+8|0;if(Cb>>>0<16){Ia=Cb;Ka=Ua;La=Wa;Ta=Va}else{Db=Cb;Eb=Ua;Fb=Wa;Gb=Va;break}}}else{Db=s;Eb=la;Fb=ma;Gb=oa}if((Ja&2|0)!=0&(Fb|0)==35615){c[z>>2]=Wd(0,0,0)|0;a[A]=31;a[B]=-117;c[z>>2]=Wd(c[z>>2]|0,A,2)|0;c[r>>2]=1;$a=0;ab=Eb;bb=0;cb=na;db=Gb;eb=t;fb=p;gb=u;break b}c[C>>2]=0;Ta=c[D>>2]|0;if((Ta|0)==0){Hb=Ja}else{c[Ta+48>>2]=-1;Hb=c[y>>2]|0}do{if((Hb&1|0)!=0){if(((((Fb<<8&65280)+(Fb>>>8)|0)>>>0)%31|0|0)!=0){break}if((Fb&15|0)!=8){c[E>>2]=8264;c[r>>2]=29;$a=Db;ab=Eb;bb=Fb;cb=na;db=Gb;eb=t;fb=p;gb=u;break b}Ta=Fb>>>4;La=Db+ -4|0;Ka=(Ta&15)+8|0;Ia=c[F>>2]|0;do{if((Ia|0)==0){c[F>>2]=Ka}else{if(!(Ka>>>0>Ia>>>0)){break}c[E>>2]=8296;c[r>>2]=29;$a=La;ab=Eb;bb=Ta;cb=na;db=Gb;eb=t;fb=p;gb=u;break b}}while(0);c[G>>2]=1<<Ka;Ta=Vd(0,0,0)|0;c[z>>2]=Ta;c[H>>2]=Ta;c[r>>2]=Fb>>>12&2^11;$a=0;ab=Eb;bb=0;cb=na;db=Gb;eb=t;fb=p;gb=u;break b}}while(0);c[E>>2]=8240;c[r>>2]=29;$a=Db;ab=Eb;bb=Fb;cb=na;db=Gb;eb=t;fb=p;gb=u;break};case 2:{if(s>>>0<32){ib=s;jb=la;kb=ma;lb=oa;va=47}else{Ib=la;Jb=ma;Kb=oa;va=49}break};case 3:{if(s>>>0<16){Lb=s;Mb=la;Ob=ma;Pb=oa;va=55}else{Qb=la;Rb=ma;Sb=oa;va=57}break};case 4:{Tb=s;Ub=la;Vb=ma;Wb=oa;va=62;break};case 5:{Xb=s;Yb=la;Zb=ma;_b=oa;va=73;break};case 6:{$b=s;ac=la;bc=ma;cc=oa;va=83;break};case 7:{dc=s;ec=la;fc=ma;gc=oa;va=96;break};case 8:{hc=s;ic=la;jc=ma;kc=oa;va=109;break};case 10:{pb=s;qb=la;rb=ma;sb=oa;va=121;break};case 11:{lc=s;mc=la;nc=ma;oc=oa;va=124;break};case 12:{pc=s;qc=la;rc=ma;sc=oa;va=125;break};case 13:{Ja=s&7;Ta=ma>>>Ja;La=s-Ja|0;if(La>>>0<32){Ja=La;Ia=la;Va=Ta;Wa=oa;while(1){if((Ia|0)==0){Ma=Ja;Na=0;Oa=Va;Pa=na;Qa=Wa;Ra=t;Sa=u;break a}Ua=Ia+ -1|0;Cb=Wa+1|0;tc=(d[Wa]<<Ja)+Va|0;uc=Ja+8|0;if(uc>>>0<32){Ja=uc;Ia=Ua;Va=tc;Wa=Cb}else{vc=uc;wc=Ua;xc=tc;yc=Cb;break}}}else{vc=La;wc=la;xc=Ta;yc=oa}Wa=xc&65535;if((Wa|0)==(xc>>>16^65535|0)){c[I>>2]=Wa;c[r>>2]=14;if(Q){zc=0;Ac=wc;Bc=0;Cc=na;Dc=yc;Ec=u;va=285;break a}else{Fc=0;Gc=wc;Hc=0;Ic=yc;va=143;break b}}else{c[E>>2]=8400;c[r>>2]=29;$a=vc;ab=wc;bb=xc;cb=na;db=yc;eb=t;fb=p;gb=u;break b}break};case 14:{Fc=s;Gc=la;Hc=ma;Ic=oa;va=143;break};case 15:{Jc=s;Kc=la;Lc=ma;Mc=oa;va=144;break};case 17:{Wa=c[da>>2]|0;if(Wa>>>0<(c[ca>>2]|0)>>>0){xb=Wa;yb=s;zb=la;Ab=ma;Bb=oa;va=154}else{Nc=Wa;Oc=s;Pc=la;Qc=ma;Rc=oa;va=158}break};case 19:{Sc=s;Tc=la;Uc=ma;Vc=oa;Wc=u;va=201;break};case 20:{Xc=s;Yc=la;Zc=ma;_c=oa;$c=u;va=202;break};case 22:{ad=s;bd=la;cd=ma;dd=oa;ed=u;va=228;break};case 24:{fd=s;gd=la;hd=ma;id=oa;jd=u;va=246;break};case 25:{if((na|0)==0){zc=s;Ac=la;Bc=ma;Cc=0;Dc=oa;Ec=u;va=285;break a}a[p]=c[I>>2];c[r>>2]=20;$a=s;ab=la;bb=ma;cb=na+ -1|0;db=oa;eb=t;fb=p+1|0;gb=u;break};case 26:{do{if((c[y>>2]|0)==0){kd=s;ld=la;md=ma;nd=oa;od=t}else{if(s>>>0<32){Wa=s;Va=la;Ia=ma;Ja=oa;while(1){if((Va|0)==0){Ma=Wa;Na=0;Oa=Ia;Pa=na;Qa=Ja;Ra=t;Sa=u;break a}Cb=Va+ -1|0;tc=Ja+1|0;Ua=(d[Ja]<<Wa)+Ia|0;uc=Wa+8|0;if(uc>>>0<32){Wa=uc;Va=Cb;Ia=Ua;Ja=tc}else{pd=uc;qd=Cb;rd=Ua;sd=tc;break}}}else{pd=s;qd=la;rd=ma;sd=oa}Ja=t-na|0;c[_>>2]=(c[_>>2]|0)+Ja;c[$>>2]=(c[$>>2]|0)+Ja;if((t|0)!=(na|0)){Ia=c[z>>2]|0;Va=p+(0-Ja)|0;if((c[C>>2]|0)==0){td=Vd(Ia,Va,Ja)|0}else{td=Wd(Ia,Va,Ja)|0}c[z>>2]=td;c[H>>2]=td}if((c[C>>2]|0)==0){ud=Nb(rd|0)|0}else{ud=rd}if((ud|0)==(c[z>>2]|0)){kd=0;ld=qd;md=0;nd=sd;od=na;break}c[E>>2]=8720;c[r>>2]=29;$a=pd;ab=qd;bb=rd;cb=na;db=sd;eb=na;fb=p;gb=u;break b}}while(0);c[r>>2]=27;vd=kd;wd=ld;xd=md;yd=nd;zd=od;va=277;break};case 27:{vd=s;wd=la;xd=ma;yd=oa;zd=t;va=277;break};case 28:{zc=s;Ac=la;Bc=ma;Cc=na;Dc=oa;Ec=1;va=285;break a;break};case 29:{Ma=s;Na=la;Oa=ma;Pa=na;Qa=oa;Ra=t;Sa=-3;break a;break};case 30:{va=299;break a;break};default:{k=-2;va=300;break a}}}while(0);if((va|0)==47){while(1){va=0;if((jb|0)==0){Ma=ib;Na=0;Oa=kb;Pa=na;Qa=lb;Ra=t;Sa=u;break a}Ta=jb+ -1|0;La=lb+1|0;Ja=(d[lb]<<ib)+kb|0;Va=ib+8|0;if(Va>>>0<32){ib=Va;jb=Ta;kb=Ja;lb=La;va=47}else{Ib=Ta;Jb=Ja;Kb=La;va=49;break}}}else if((va|0)==121){va=0;if((c[J>>2]|0)==0){va=122;break}La=Vd(0,0,0)|0;c[z>>2]=La;c[H>>2]=La;c[r>>2]=11;lc=pb;mc=qb;nc=rb;oc=sb;va=124}else if((va|0)==143){va=0;c[r>>2]=15;Jc=Fc;Kc=Gc;Lc=Hc;Mc=Ic;va=144}else if((va|0)==154){while(1){va=0;if(yb>>>0<3){La=yb;Ja=zb;Ta=Ab;Va=Bb;while(1){if((Ja|0)==0){Ma=La;Na=0;Oa=Ta;Pa=na;Qa=Va;Ra=t;Sa=u;break a}Ia=Ja+ -1|0;Wa=Va+1|0;Ka=(d[Va]<<La)+Ta|0;tc=La+8|0;if(tc>>>0<3){La=tc;Ja=Ia;Ta=Ka;Va=Wa}else{Ad=tc;Bd=Ia;Cd=Ka;Dd=Wa;break}}}else{Ad=yb;Bd=zb;Cd=Ab;Dd=Bb}c[da>>2]=xb+1;b[q+(e[8200+(xb<<1)>>1]<<1)+112>>1]=Cd&7;Va=Cd>>>3;Ta=Ad+ -3|0;Ja=c[da>>2]|0;if(Ja>>>0<(c[ca>>2]|0)>>>0){xb=Ja;yb=Ta;zb=Bd;Ab=Va;Bb=Dd;va=154}else{Nc=Ja;Oc=Ta;Pc=Bd;Qc=Va;Rc=Dd;va=158;break}}}else if((va|0)==277){va=0;if((c[y>>2]|0)==0){Ed=vd;Fd=wd;Gd=xd;Hd=yd;va=284;break}if((c[C>>2]|0)==0){Ed=vd;Fd=wd;Gd=xd;Hd=yd;va=284;break}if(vd>>>0<32){Va=vd;Ta=wd;Ja=xd;La=yd;while(1){if((Ta|0)==0){Ma=Va;Na=0;Oa=Ja;Pa=na;Qa=La;Ra=zd;Sa=u;break a}Wa=Ta+ -1|0;Ka=La+1|0;Ia=(d[La]<<Va)+Ja|0;tc=Va+8|0;if(tc>>>0<32){Va=tc;Ta=Wa;Ja=Ia;La=Ka}else{Id=tc;Jd=Wa;Kd=Ia;Ld=Ka;break}}}else{Id=vd;Jd=wd;Kd=xd;Ld=yd}if((Kd|0)==(c[$>>2]|0)){Ed=0;Fd=Jd;Gd=0;Hd=Ld;va=284;break}c[E>>2]=8744;c[r>>2]=29;$a=Id;ab=Jd;bb=Kd;cb=na;db=Ld;eb=zd;fb=p;gb=u}do{if((va|0)==49){va=0;La=c[D>>2]|0;if((La|0)!=0){c[La+4>>2]=Jb}if((c[C>>2]&512|0)!=0){a[A]=Jb;a[B]=Jb>>>8;a[ja]=Jb>>>16;a[ka]=Jb>>>24;c[z>>2]=Wd(c[z>>2]|0,A,4)|0}c[r>>2]=3;Lb=0;Mb=Ib;Ob=0;Pb=Kb;va=55}else if((va|0)==124){va=0;if(K){zc=lc;Ac=mc;Bc=nc;Cc=na;Dc=oc;Ec=u;va=285;break a}else{pc=lc;qc=mc;rc=nc;sc=oc;va=125}}else if((va|0)==144){va=0;La=c[I>>2]|0;if((La|0)==0){c[r>>2]=11;$a=Jc;ab=Kc;bb=Lc;cb=na;db=Mc;eb=t;fb=p;gb=u;break}Ja=La>>>0>Kc>>>0?Kc:La;La=Ja>>>0>na>>>0?na:Ja;if((La|0)==0){zc=Jc;Ac=Kc;Bc=Lc;Cc=na;Dc=Mc;Ec=u;va=285;break a}Cp(p|0,Mc|0,La|0)|0;c[I>>2]=(c[I>>2]|0)-La;$a=Jc;ab=Kc-La|0;bb=Lc;cb=na-La|0;db=Mc+La|0;eb=t;fb=p+La|0;gb=u}else if((va|0)==158){va=0;if(Nc>>>0<19){La=Nc;while(1){Ja=La+1|0;b[q+(e[8200+(La<<1)>>1]<<1)+112>>1]=0;if((Ja|0)==19){break}else{La=Ja}}c[da>>2]=19}c[fa>>2]=ea;c[M>>2]=ea;c[N>>2]=7;La=$d(0,ga,19,fa,N,ha)|0;if((La|0)==0){c[da>>2]=0;c[r>>2]=18;Ca=0;Da=Oc;Ea=Pc;Fa=Qc;Ga=Rc;Ha=0;va=164;break}else{c[E>>2]=8472;c[r>>2]=29;$a=Oc;ab=Pc;bb=Qc;cb=na;db=Rc;eb=t;fb=p;gb=La;break}}}while(0);c:do{if((va|0)==55){while(1){va=0;if((Mb|0)==0){Ma=Lb;Na=0;Oa=Ob;Pa=na;Qa=Pb;Ra=t;Sa=u;break a}La=Mb+ -1|0;Ja=Pb+1|0;Ta=(d[Pb]<<Lb)+Ob|0;Va=Lb+8|0;if(Va>>>0<16){Lb=Va;Mb=La;Ob=Ta;Pb=Ja;va=55}else{Qb=La;Rb=Ta;Sb=Ja;va=57;break}}}else if((va|0)==125){va=0;if((c[L>>2]|0)!=0){Ja=pc&7;c[r>>2]=26;$a=pc-Ja|0;ab=qc;bb=rc>>>Ja;cb=na;db=sc;eb=t;fb=p;gb=u;break}if(pc>>>0<3){Ja=pc;Ta=qc;La=rc;Va=sc;while(1){if((Ta|0)==0){Ma=Ja;Na=0;Oa=La;Pa=na;Qa=Va;Ra=t;Sa=u;break a}Ka=Ta+ -1|0;Ia=Va+1|0;Wa=(d[Va]<<Ja)+La|0;tc=Ja+8|0;if(tc>>>0<3){Ja=tc;Ta=Ka;La=Wa;Va=Ia}else{Md=tc;Nd=Ka;Od=Wa;Pd=Ia;break}}}else{Md=pc;Nd=qc;Od=rc;Pd=sc}c[L>>2]=Od&1;Va=Od>>>1&3;if((Va|0)==0){c[r>>2]=13}else if((Va|0)==1){c[M>>2]=8768;c[N>>2]=9;c[O>>2]=10816;c[P>>2]=5;c[r>>2]=19;if(Q){va=133;break a}}else if((Va|0)==2){c[r>>2]=16}else if((Va|0)==3){c[E>>2]=8376;c[r>>2]=29}$a=Md+ -3|0;ab=Nd;bb=Od>>>3;cb=na;db=Pd;eb=t;fb=p;gb=u}else if((va|0)==164){va=0;Va=c[aa>>2]|0;La=c[ba>>2]|0;do{if(Ca>>>0<(La+Va|0)>>>0){Ta=La;Ja=Va;Ia=Ca;Wa=Da;Ka=Ea;tc=Fa;Ua=Ga;d:while(1){Cb=(1<<c[N>>2])+ -1|0;uc=Cb&tc;Qd=c[M>>2]|0;Rd=d[Qd+(uc<<2)+1|0]|0;if(Rd>>>0>Wa>>>0){Sd=Wa;Td=Ka;Ud=tc;Xd=Ua;while(1){if((Td|0)==0){Ma=Sd;Na=0;Oa=Ud;Pa=na;Qa=Xd;Ra=t;Sa=Ha;break a}Yd=Td+ -1|0;_d=Xd+1|0;be=(d[Xd]<<Sd)+Ud|0;ce=Sd+8|0;de=Cb&be;ee=d[Qd+(de<<2)+1|0]|0;if(ee>>>0>ce>>>0){Sd=ce;Td=Yd;Ud=be;Xd=_d}else{fe=ee;ge=de;he=ce;ie=Yd;je=be;ke=_d;break}}}else{fe=Rd;ge=uc;he=Wa;ie=Ka;je=tc;ke=Ua}Xd=b[Qd+(ge<<2)+2>>1]|0;e:do{if((Xd&65535)<16){if(he>>>0<fe>>>0){Ud=he;Td=ie;Sd=je;Cb=ke;while(1){if((Td|0)==0){Ma=Ud;Na=0;Oa=Sd;Pa=na;Qa=Cb;Ra=t;Sa=Ha;break a}_d=Td+ -1|0;be=Cb+1|0;Yd=(d[Cb]<<Ud)+Sd|0;ce=Ud+8|0;if(ce>>>0<fe>>>0){Ud=ce;Td=_d;Sd=Yd;Cb=be}else{le=ce;me=_d;ne=Yd;oe=be;break}}}else{le=he;me=ie;ne=je;oe=ke}c[da>>2]=Ia+1;b[q+(Ia<<1)+112>>1]=Xd;pe=le-fe|0;qe=me;re=ne>>>fe;se=oe}else{if(Xd<<16>>16==16){Cb=fe+2|0;if(he>>>0<Cb>>>0){Sd=he;Td=ie;Ud=je;be=ke;while(1){if((Td|0)==0){Ma=Sd;Na=0;Oa=Ud;Pa=na;Qa=be;Ra=t;Sa=Ha;break a}Yd=Td+ -1|0;_d=be+1|0;ce=(d[be]<<Sd)+Ud|0;de=Sd+8|0;if(de>>>0<Cb>>>0){Sd=de;Td=Yd;Ud=ce;be=_d}else{te=de;ue=Yd;ve=ce;we=_d;break}}}else{te=he;ue=ie;ve=je;we=ke}xe=ve>>>fe;ye=te-fe|0;if((Ia|0)==0){va=181;break d}ze=ye+ -2|0;Ae=(xe&3)+3|0;Be=ue;Ce=xe>>>2;De=b[q+(Ia+ -1<<1)+112>>1]|0;Ee=we}else if(Xd<<16>>16==17){be=fe+3|0;if(he>>>0<be>>>0){Ud=he;Td=ie;Sd=je;Cb=ke;while(1){if((Td|0)==0){Ma=Ud;Na=0;Oa=Sd;Pa=na;Qa=Cb;Ra=t;Sa=Ha;break a}_d=Td+ -1|0;ce=Cb+1|0;Yd=(d[Cb]<<Ud)+Sd|0;de=Ud+8|0;if(de>>>0<be>>>0){Ud=de;Td=_d;Sd=Yd;Cb=ce}else{Fe=de;Ge=_d;He=Yd;Ie=ce;break}}}else{Fe=he;Ge=ie;He=je;Ie=ke}Cb=He>>>fe;ze=-3-fe+Fe|0;Ae=(Cb&7)+3|0;Be=Ge;Ce=Cb>>>3;De=0;Ee=Ie}else{Cb=fe+7|0;if(he>>>0<Cb>>>0){Sd=he;Td=ie;Ud=je;be=ke;while(1){if((Td|0)==0){Ma=Sd;Na=0;Oa=Ud;Pa=na;Qa=be;Ra=t;Sa=Ha;break a}ce=Td+ -1|0;Yd=be+1|0;_d=(d[be]<<Sd)+Ud|0;de=Sd+8|0;if(de>>>0<Cb>>>0){Sd=de;Td=ce;Ud=_d;be=Yd}else{Je=de;Ke=ce;Le=_d;Me=Yd;break}}}else{Je=he;Ke=ie;Le=je;Me=ke}be=Le>>>fe;ze=-7-fe+Je|0;Ae=(be&127)+11|0;Be=Ke;Ce=be>>>7;De=0;Ee=Me}if((Ia+Ae|0)>>>0>(Ta+Ja|0)>>>0){va=190;break d}else{Ne=Ia;Oe=Ae}while(1){be=Oe+ -1|0;c[da>>2]=Ne+1;b[q+(Ne<<1)+112>>1]=De;if((be|0)==0){pe=ze;qe=Be;re=Ce;se=Ee;break e}Ne=c[da>>2]|0;Oe=be}}}while(0);Xd=c[da>>2]|0;Pe=c[aa>>2]|0;Qd=c[ba>>2]|0;if(Xd>>>0<(Qd+Pe|0)>>>0){Ta=Qd;Ja=Pe;Ia=Xd;Wa=pe;Ka=qe;tc=re;Ua=se}else{va=193;break}}if((va|0)==181){va=0;c[E>>2]=8504;c[r>>2]=29;$a=ye;ab=ue;bb=xe;cb=na;db=we;eb=t;fb=p;gb=Ha;break c}else if((va|0)==190){va=0;c[E>>2]=8504;c[r>>2]=29;$a=ze;ab=Be;bb=Ce;cb=na;db=Ee;eb=t;fb=p;gb=Ha;break c}else if((va|0)==193){va=0;if((c[r>>2]|0)==29){$a=pe;ab=qe;bb=re;cb=na;db=se;eb=t;fb=p;gb=Ha;break c}else{Qe=Pe;Re=pe;Se=qe;Te=re;Ue=se;break}}}else{Qe=Va;Re=Da;Se=Ea;Te=Fa;Ue=Ga}}while(0);if((b[ia>>1]|0)==0){c[E>>2]=8536;c[r>>2]=29;$a=Re;ab=Se;bb=Te;cb=na;db=Ue;eb=t;fb=p;gb=Ha;break}c[fa>>2]=ea;c[M>>2]=ea;c[N>>2]=9;Va=$d(1,ga,Qe,fa,N,ha)|0;if((Va|0)!=0){c[E>>2]=8576;c[r>>2]=29;$a=Re;ab=Se;bb=Te;cb=na;db=Ue;eb=t;fb=p;gb=Va;break}c[O>>2]=c[fa>>2];c[P>>2]=6;Va=$d(2,q+(c[aa>>2]<<1)+112|0,c[ba>>2]|0,fa,P,ha)|0;if((Va|0)==0){c[r>>2]=19;if(Q){zc=Re;Ac=Se;Bc=Te;Cc=na;Dc=Ue;Ec=0;va=285;break a}else{Sc=Re;Tc=Se;Uc=Te;Vc=Ue;Wc=0;va=201;break}}else{c[E>>2]=8608;c[r>>2]=29;$a=Re;ab=Se;bb=Te;cb=na;db=Ue;eb=t;fb=p;gb=Va;break}}}while(0);if((va|0)==57){va=0;Va=c[D>>2]|0;if((Va|0)!=0){c[Va+8>>2]=Rb&255;c[Va+12>>2]=Rb>>>8}if((c[C>>2]&512|0)!=0){a[A]=Rb;a[B]=Rb>>>8;c[z>>2]=Wd(c[z>>2]|0,A,2)|0}c[r>>2]=4;Tb=0;Ub=Qb;Vb=0;Wb=Sb;va=62}else if((va|0)==201){va=0;c[r>>2]=20;Xc=Sc;Yc=Tc;Zc=Uc;_c=Vc;$c=Wc;va=202}do{if((va|0)==62){va=0;Va=c[C>>2]|0;do{if((Va&1024|0)==0){La=c[D>>2]|0;if((La|0)==0){Ve=Tb;We=Ub;Xe=Vb;Ye=Wb;break}c[La+16>>2]=0;Ve=Tb;We=Ub;Xe=Vb;Ye=Wb}else{if(Tb>>>0<16){La=Tb;Ua=Ub;tc=Vb;Ka=Wb;while(1){if((Ua|0)==0){Ma=La;Na=0;Oa=tc;Pa=na;Qa=Ka;Ra=t;Sa=u;break a}Wa=Ua+ -1|0;Ia=Ka+1|0;Ja=(d[Ka]<<La)+tc|0;Ta=La+8|0;if(Ta>>>0<16){La=Ta;Ua=Wa;tc=Ja;Ka=Ia}else{Ze=Wa;_e=Ja;$e=Ia;break}}}else{Ze=Ub;_e=Vb;$e=Wb}c[I>>2]=_e;Ka=c[D>>2]|0;if((Ka|0)==0){af=Va}else{c[Ka+20>>2]=_e;af=c[C>>2]|0}if((af&512|0)==0){Ve=0;We=Ze;Xe=0;Ye=$e;break}a[A]=_e;a[B]=_e>>>8;c[z>>2]=Wd(c[z>>2]|0,A,2)|0;Ve=0;We=Ze;Xe=0;Ye=$e}}while(0);c[r>>2]=5;Xb=Ve;Yb=We;Zb=Xe;_b=Ye;va=73}else if((va|0)==202){va=0;if(Yc>>>0>5&na>>>0>257){c[m>>2]=p;c[n>>2]=na;c[o>>2]=_c;c[l>>2]=Yc;c[w>>2]=Zc;c[x>>2]=Xc;ae(f,t);Va=c[m>>2]|0;Ka=c[n>>2]|0;tc=c[o>>2]|0;Ua=c[l>>2]|0;La=c[w>>2]|0;Ia=c[x>>2]|0;if((c[r>>2]|0)!=11){$a=Ia;ab=Ua;bb=La;cb=Ka;db=tc;eb=t;fb=Va;gb=$c;break}c[R>>2]=-1;$a=Ia;ab=Ua;bb=La;cb=Ka;db=tc;eb=t;fb=Va;gb=$c;break}c[R>>2]=0;Va=(1<<c[N>>2])+ -1|0;tc=Va&Zc;Ka=c[M>>2]|0;La=a[Ka+(tc<<2)+1|0]|0;Ua=La&255;if(Ua>>>0>Xc>>>0){Ia=Xc;Ja=Yc;Wa=Zc;Ta=_c;while(1){if((Ja|0)==0){Ma=Ia;Na=0;Oa=Wa;Pa=na;Qa=Ta;Ra=t;Sa=$c;break a}Xd=Ja+ -1|0;Qd=Ta+1|0;uc=(d[Ta]<<Ia)+Wa|0;Rd=Ia+8|0;be=Va&uc;Ud=a[Ka+(be<<2)+1|0]|0;Td=Ud&255;if(Td>>>0>Rd>>>0){Ia=Rd;Ja=Xd;Wa=uc;Ta=Qd}else{bf=Ud;cf=Td;df=be;ef=Rd;ff=Xd;gf=uc;hf=Qd;break}}}else{bf=La;cf=Ua;df=tc;ef=Xc;ff=Yc;gf=Zc;hf=_c}Ta=a[Ka+(df<<2)|0]|0;Wa=b[Ka+(df<<2)+2>>1]|0;Ja=Ta&255;do{if(Ta<<24>>24==0){jf=0;kf=ef;lf=ff;mf=0;nf=bf;of=Wa;pf=gf;qf=hf}else{if((Ja&240|0)!=0){jf=0;kf=ef;lf=ff;mf=Ta;nf=bf;of=Wa;pf=gf;qf=hf;break}Ia=Wa&65535;Va=(1<<cf+Ja)+ -1|0;Qd=((gf&Va)>>>cf)+Ia|0;uc=a[Ka+(Qd<<2)+1|0]|0;if(((uc&255)+cf|0)>>>0>ef>>>0){Xd=ef;Rd=ff;be=gf;Td=hf;while(1){if((Rd|0)==0){Ma=Xd;Na=0;Oa=be;Pa=na;Qa=Td;Ra=t;Sa=$c;break a}Ud=Rd+ -1|0;Sd=Td+1|0;Cb=(d[Td]<<Xd)+be|0;Yd=Xd+8|0;_d=((Cb&Va)>>>cf)+Ia|0;ce=a[Ka+(_d<<2)+1|0]|0;if(((ce&255)+cf|0)>>>0>Yd>>>0){Xd=Yd;Rd=Ud;be=Cb;Td=Sd}else{rf=_d;sf=ce;tf=Yd;uf=Ud;vf=Cb;wf=Sd;break}}}else{rf=Qd;sf=uc;tf=ef;uf=ff;vf=gf;wf=hf}Td=b[Ka+(rf<<2)+2>>1]|0;be=a[Ka+(rf<<2)|0]|0;c[R>>2]=cf;jf=cf;kf=tf-cf|0;lf=uf;mf=be;nf=sf;of=Td;pf=vf>>>cf;qf=wf}}while(0);Ka=nf&255;Ja=pf>>>Ka;Wa=kf-Ka|0;c[R>>2]=jf+Ka;c[I>>2]=of&65535;Ka=mf&255;if(mf<<24>>24==0){c[r>>2]=25;$a=Wa;ab=lf;bb=Ja;cb=na;db=qf;eb=t;fb=p;gb=$c;break}if((Ka&32|0)!=0){c[R>>2]=-1;c[r>>2]=11;$a=Wa;ab=lf;bb=Ja;cb=na;db=qf;eb=t;fb=p;gb=$c;break}if((Ka&64|0)==0){Ta=Ka&15;c[S>>2]=Ta;c[r>>2]=21;pa=Ta;qa=Wa;ra=lf;sa=Ja;ta=qf;ua=$c;va=221;break}else{c[E>>2]=8632;c[r>>2]=29;$a=Wa;ab=lf;bb=Ja;cb=na;db=qf;eb=t;fb=p;gb=$c;break}}}while(0);if((va|0)==73){va=0;Ja=c[C>>2]|0;if((Ja&1024|0)==0){xf=Yb;yf=_b}else{Wa=c[I>>2]|0;Ta=Wa>>>0>Yb>>>0?Yb:Wa;if((Ta|0)==0){zf=Wa;Af=Yb;Bf=_b}else{Ka=c[D>>2]|0;do{if((Ka|0)==0){Cf=Ja}else{tc=c[Ka+16>>2]|0;if((tc|0)==0){Cf=Ja;break}Ua=(c[Ka+20>>2]|0)-Wa|0;La=c[Ka+24>>2]|0;Cp(tc+Ua|0,_b|0,((Ua+Ta|0)>>>0>La>>>0?La-Ua|0:Ta)|0)|0;Cf=c[C>>2]|0}}while(0);if((Cf&512|0)!=0){c[z>>2]=Wd(c[z>>2]|0,_b,Ta)|0}Ka=(c[I>>2]|0)-Ta|0;c[I>>2]=Ka;zf=Ka;Af=Yb-Ta|0;Bf=_b+Ta|0}if((zf|0)==0){xf=Af;yf=Bf}else{zc=Xb;Ac=Af;Bc=Zb;Cc=na;Dc=Bf;Ec=u;va=285;break}}c[I>>2]=0;c[r>>2]=6;$b=Xb;ac=xf;bc=Zb;cc=yf;va=83}else if((va|0)==221){va=0;if((pa|0)==0){Df=c[I>>2]|0;Ef=qa;Ff=ra;Gf=sa;Hf=ta}else{if(qa>>>0<pa>>>0){Ka=qa;Wa=ra;Ja=sa;Ua=ta;while(1){if((Wa|0)==0){Ma=Ka;Na=0;Oa=Ja;Pa=na;Qa=Ua;Ra=t;Sa=ua;break a}La=Wa+ -1|0;tc=Ua+1|0;Td=(d[Ua]<<Ka)+Ja|0;be=Ka+8|0;if(be>>>0<pa>>>0){Ka=be;Wa=La;Ja=Td;Ua=tc}else{If=be;Jf=La;Kf=Td;Lf=tc;break}}}else{If=qa;Jf=ra;Kf=sa;Lf=ta}Ua=(c[I>>2]|0)+((1<<pa)+ -1&Kf)|0;c[I>>2]=Ua;c[R>>2]=(c[R>>2]|0)+pa;Df=Ua;Ef=If-pa|0;Ff=Jf;Gf=Kf>>>pa;Hf=Lf}c[T>>2]=Df;c[r>>2]=22;ad=Ef;bd=Ff;cd=Gf;dd=Hf;ed=ua;va=228}do{if((va|0)==83){va=0;do{if((c[C>>2]&2048|0)==0){Ua=c[D>>2]|0;if((Ua|0)==0){Mf=ac;Nf=cc;break}c[Ua+28>>2]=0;Mf=ac;Nf=cc}else{if((ac|0)==0){zc=$b;Ac=0;Bc=bc;Cc=na;Dc=cc;Ec=u;va=285;break a}else{Of=0}while(1){Pf=Of+1|0;Ua=a[cc+Of|0]|0;Ja=c[D>>2]|0;do{if((Ja|0)!=0){Wa=c[Ja+28>>2]|0;if((Wa|0)==0){break}Ka=c[I>>2]|0;if(!(Ka>>>0<(c[Ja+32>>2]|0)>>>0)){break}c[I>>2]=Ka+1;a[Wa+Ka|0]=Ua}}while(0);Qf=Ua<<24>>24!=0;if(Qf&Pf>>>0<ac>>>0){Of=Pf}else{break}}if((c[C>>2]&512|0)!=0){c[z>>2]=Wd(c[z>>2]|0,cc,Pf)|0}uc=ac-Pf|0;Qd=cc+Pf|0;if(Qf){zc=$b;Ac=uc;Bc=bc;Cc=na;Dc=Qd;Ec=u;va=285;break a}else{Mf=uc;Nf=Qd}}}while(0);c[I>>2]=0;c[r>>2]=7;dc=$b;ec=Mf;fc=bc;gc=Nf;va=96}else if((va|0)==228){va=0;Qd=(1<<c[P>>2])+ -1|0;uc=Qd&cd;Ja=c[O>>2]|0;Ka=a[Ja+(uc<<2)+1|0]|0;Wa=Ka&255;if(Wa>>>0>ad>>>0){Ta=ad;tc=bd;Td=cd;La=dd;while(1){if((tc|0)==0){Ma=Ta;Na=0;Oa=Td;Pa=na;Qa=La;Ra=t;Sa=ed;break a}be=tc+ -1|0;Rd=La+1|0;Xd=(d[La]<<Ta)+Td|0;Ia=Ta+8|0;Va=Qd&Xd;Sd=a[Ja+(Va<<2)+1|0]|0;Cb=Sd&255;if(Cb>>>0>Ia>>>0){Ta=Ia;tc=be;Td=Xd;La=Rd}else{Rf=Sd;Sf=Cb;Tf=Va;Uf=Ia;Vf=be;Wf=Xd;Xf=Rd;break}}}else{Rf=Ka;Sf=Wa;Tf=uc;Uf=ad;Vf=bd;Wf=cd;Xf=dd}La=a[Ja+(Tf<<2)|0]|0;Td=b[Ja+(Tf<<2)+2>>1]|0;tc=La&255;if((tc&240|0)==0){Ta=Td&65535;Qd=(1<<Sf+tc)+ -1|0;tc=((Wf&Qd)>>>Sf)+Ta|0;Rd=a[Ja+(tc<<2)+1|0]|0;if(((Rd&255)+Sf|0)>>>0>Uf>>>0){Xd=Uf;be=Vf;Ia=Wf;Va=Xf;while(1){if((be|0)==0){Ma=Xd;Na=0;Oa=Ia;Pa=na;Qa=Va;Ra=t;Sa=ed;break a}Cb=be+ -1|0;Sd=Va+1|0;Ud=(d[Va]<<Xd)+Ia|0;Yd=Xd+8|0;ce=((Ud&Qd)>>>Sf)+Ta|0;_d=a[Ja+(ce<<2)+1|0]|0;if(((_d&255)+Sf|0)>>>0>Yd>>>0){Xd=Yd;be=Cb;Ia=Ud;Va=Sd}else{Yf=ce;Zf=_d;_f=Yd;$f=Cb;ag=Ud;bg=Sd;break}}}else{Yf=tc;Zf=Rd;_f=Uf;$f=Vf;ag=Wf;bg=Xf}Va=b[Ja+(Yf<<2)+2>>1]|0;Ia=a[Ja+(Yf<<2)|0]|0;be=(c[R>>2]|0)+Sf|0;c[R>>2]=be;cg=be;dg=_f-Sf|0;eg=$f;fg=Ia;gg=Zf;hg=Va;ig=ag>>>Sf;jg=bg}else{cg=c[R>>2]|0;dg=Uf;eg=Vf;fg=La;gg=Rf;hg=Td;ig=Wf;jg=Xf}Va=gg&255;Ia=ig>>>Va;be=dg-Va|0;c[R>>2]=cg+Va;Va=fg&255;if((Va&64|0)==0){c[U>>2]=hg&65535;Xd=Va&15;c[S>>2]=Xd;c[r>>2]=23;wa=Xd;xa=be;ya=eg;za=Ia;Aa=jg;Ba=ed;va=240;break}else{c[E>>2]=8664;c[r>>2]=29;$a=be;ab=eg;bb=Ia;cb=na;db=jg;eb=t;fb=p;gb=ed;break}}}while(0);if((va|0)==96){va=0;do{if((c[C>>2]&4096|0)==0){Ia=c[D>>2]|0;if((Ia|0)==0){kg=ec;lg=gc;break}c[Ia+36>>2]=0;kg=ec;lg=gc}else{if((ec|0)==0){zc=dc;Ac=0;Bc=fc;Cc=na;Dc=gc;Ec=u;va=285;break a}else{mg=0}while(1){ng=mg+1|0;Ia=a[gc+mg|0]|0;be=c[D>>2]|0;do{if((be|0)!=0){Xd=c[be+36>>2]|0;if((Xd|0)==0){break}Va=c[I>>2]|0;if(!(Va>>>0<(c[be+40>>2]|0)>>>0)){break}c[I>>2]=Va+1;a[Xd+Va|0]=Ia}}while(0);og=Ia<<24>>24!=0;if(og&ng>>>0<ec>>>0){mg=ng}else{break}}if((c[C>>2]&512|0)!=0){c[z>>2]=Wd(c[z>>2]|0,gc,ng)|0}Td=ec-ng|0;La=gc+ng|0;if(og){zc=dc;Ac=Td;Bc=fc;Cc=na;Dc=La;Ec=u;va=285;break a}else{kg=Td;lg=La}}}while(0);c[r>>2]=8;hc=dc;ic=kg;jc=fc;kc=lg;va=109}else if((va|0)==240){va=0;if((wa|0)==0){pg=xa;qg=ya;rg=za;sg=Aa}else{if(xa>>>0<wa>>>0){La=xa;Td=ya;Ja=za;Rd=Aa;while(1){if((Td|0)==0){Ma=La;Na=0;Oa=Ja;Pa=na;Qa=Rd;Ra=t;Sa=Ba;break a}tc=Td+ -1|0;be=Rd+1|0;Va=(d[Rd]<<La)+Ja|0;Xd=La+8|0;if(Xd>>>0<wa>>>0){La=Xd;Td=tc;Ja=Va;Rd=be}else{tg=Xd;ug=tc;vg=Va;wg=be;break}}}else{tg=xa;ug=ya;vg=za;wg=Aa}c[U>>2]=(c[U>>2]|0)+((1<<wa)+ -1&vg);c[R>>2]=(c[R>>2]|0)+wa;pg=tg-wa|0;qg=ug;rg=vg>>>wa;sg=wg}c[r>>2]=24;fd=pg;gd=qg;hd=rg;id=sg;jd=Ba;va=246}f:do{if((va|0)==109){va=0;Rd=c[C>>2]|0;do{if((Rd&512|0)==0){xg=hc;yg=ic;zg=jc;Ag=kc}else{if(hc>>>0<16){Ja=hc;Td=ic;La=jc;be=kc;while(1){if((Td|0)==0){Ma=Ja;Na=0;Oa=La;Pa=na;Qa=be;Ra=t;Sa=u;break a}Va=Td+ -1|0;tc=be+1|0;Xd=(d[be]<<Ja)+La|0;Ta=Ja+8|0;if(Ta>>>0<16){Ja=Ta;Td=Va;La=Xd;be=tc}else{Bg=Ta;Cg=Va;Dg=Xd;Eg=tc;break}}}else{Bg=hc;Cg=ic;Dg=jc;Eg=kc}if((Dg|0)==(c[z>>2]&65535|0)){xg=0;yg=Cg;zg=0;Ag=Eg;break}c[E>>2]=8352;c[r>>2]=29;$a=Bg;ab=Cg;bb=Dg;cb=na;db=Eg;eb=t;fb=p;gb=u;break f}}while(0);be=c[D>>2]|0;if((be|0)!=0){c[be+44>>2]=Rd>>>9&1;c[be+48>>2]=1}be=Wd(0,0,0)|0;c[z>>2]=be;c[H>>2]=be;c[r>>2]=11;$a=xg;ab=yg;bb=zg;cb=na;db=Ag;eb=t;fb=p;gb=u}else if((va|0)==246){va=0;if((na|0)==0){zc=fd;Ac=gd;Bc=hd;Cc=0;Dc=id;Ec=jd;va=285;break a}be=t-na|0;La=c[U>>2]|0;if(La>>>0>be>>>0){Td=La-be|0;do{if(Td>>>0>(c[V>>2]|0)>>>0){if((c[W>>2]|0)==0){break}c[E>>2]=8688;c[r>>2]=29;$a=fd;ab=gd;bb=hd;cb=na;db=id;eb=t;fb=p;gb=jd;break f}}while(0);Rd=c[X>>2]|0;if(Td>>>0>Rd>>>0){be=Td-Rd|0;Fg=be;Gg=(c[Y>>2]|0)+((c[Z>>2]|0)-be)|0}else{Fg=Td;Gg=(c[Y>>2]|0)+(Rd-Td)|0}Rd=c[I>>2]|0;Hg=Rd;Ig=Fg>>>0>Rd>>>0?Rd:Fg;Jg=Gg}else{Rd=c[I>>2]|0;Hg=Rd;Ig=Rd;Jg=p+(0-La)|0}Rd=Ig>>>0>na>>>0?na:Ig;c[I>>2]=Hg-Rd;be=~na;Ja=~Ig;Ia=be>>>0>Ja>>>0?be:Ja;Ja=Rd;be=Jg;tc=p;while(1){a[tc]=a[be]|0;Xd=Ja+ -1|0;if((Xd|0)==0){break}else{tc=tc+1|0;be=be+1|0;Ja=Xd}}Ja=na-Rd|0;be=p+~Ia|0;if((c[I>>2]|0)!=0){$a=fd;ab=gd;bb=hd;cb=Ja;db=id;eb=t;fb=be;gb=jd;break}c[r>>2]=20;$a=fd;ab=gd;bb=hd;cb=Ja;db=id;eb=t;fb=be;gb=jd}}while(0);j=c[r>>2]|0;s=$a;la=ab;ma=bb;na=cb;oa=db;t=eb;p=fb;u=gb}if((va|0)==122){c[m>>2]=p;c[n>>2]=na;c[o>>2]=sb;c[l>>2]=qb;c[w>>2]=rb;c[x>>2]=pb;k=2;i=h;return k|0}else if((va|0)==133){Ma=Md+ -3|0;Na=Nd;Oa=Od>>>3;Pa=na;Qa=Pd;Ra=t;Sa=u}else if((va|0)==284){c[r>>2]=28;Ma=Ed;Na=Fd;Oa=Gd;Pa=na;Qa=Hd;Ra=zd;Sa=1}else if((va|0)==285){Ma=zc;Na=Ac;Oa=Bc;Pa=Cc;Qa=Dc;Ra=t;Sa=Ec}else if((va|0)==299){k=-4;i=h;return k|0}else if((va|0)==300){i=h;return k|0}c[m>>2]=p;c[n>>2]=Pa;c[o>>2]=Qa;c[l>>2]=Na;c[w>>2]=Oa;c[x>>2]=Ma;do{if((c[Z>>2]|0)==0){if(!((c[r>>2]|0)>>>0<26)){break}if((Ra|0)!=(c[n>>2]|0)){va=289}}else{va=289}}while(0);do{if((va|0)==289){if((Zd(f,Ra)|0)==0){break}c[r>>2]=30;k=-4;i=h;return k|0}}while(0);va=c[l>>2]|0;l=c[n>>2]|0;n=Ra-l|0;Z=f+8|0;c[Z>>2]=v-va+(c[Z>>2]|0);c[_>>2]=(c[_>>2]|0)+n;c[$>>2]=(c[$>>2]|0)+n;$=(Ra|0)==(l|0);if(!((c[y>>2]|0)==0|$)){y=c[z>>2]|0;l=(c[m>>2]|0)+(0-n)|0;if((c[C>>2]|0)==0){Kg=Vd(y,l,n)|0}else{Kg=Wd(y,l,n)|0}c[z>>2]=Kg;c[H>>2]=Kg}Kg=c[r>>2]|0;if((Kg|0)==19){Lg=256}else{Lg=(Kg|0)==14?256:0}c[f+44>>2]=((c[L>>2]|0)!=0?64:0)+(c[x>>2]|0)+((Kg|0)==11?128:0)+Lg;k=((v|0)==(va|0)&$|(g|0)==4)&(Sa|0)==0?-5:Sa;i=h;return k|0}function Zd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;d=i;e=c[a+28>>2]|0;f=e+52|0;g=c[f>>2]|0;do{if((g|0)==0){h=nd[c[a+32>>2]&31](c[a+40>>2]|0,1<<c[e+36>>2],1)|0;c[f>>2]=h;if((h|0)==0){j=1}else{k=h;break}i=d;return j|0}else{k=g}}while(0);g=e+40|0;h=c[g>>2]|0;if((h|0)==0){l=1<<c[e+36>>2];c[g>>2]=l;c[e+48>>2]=0;c[e+44>>2]=0;m=l}else{m=h}h=b-(c[a+16>>2]|0)|0;if(!(h>>>0<m>>>0)){Cp(k|0,(c[a+12>>2]|0)+(0-m)|0,m|0)|0;c[e+48>>2]=0;c[e+44>>2]=c[g>>2];j=0;i=d;return j|0}b=e+48|0;l=c[b>>2]|0;n=m-l|0;m=n>>>0>h>>>0?h:n;n=a+12|0;Cp(k+l|0,(c[n>>2]|0)+(0-h)|0,m|0)|0;l=h-m|0;if((h|0)!=(m|0)){Cp(c[f>>2]|0,(c[n>>2]|0)+(0-l)|0,l|0)|0;c[b>>2]=l;c[e+44>>2]=c[g>>2];j=0;i=d;return j|0}l=(c[b>>2]|0)+h|0;n=c[g>>2]|0;c[b>>2]=(l|0)==(n|0)?0:l;l=e+44|0;e=c[l>>2]|0;if(!(e>>>0<n>>>0)){j=0;i=d;return j|0}c[l>>2]=e+h;j=0;i=d;return j|0}function _d(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;b=i;if((a|0)==0){d=-2;i=b;return d|0}e=a+28|0;f=c[e>>2]|0;if((f|0)==0){d=-2;i=b;return d|0}g=a+36|0;h=c[g>>2]|0;if((h|0)==0){d=-2;i=b;return d|0}j=c[f+52>>2]|0;k=a+40|0;if((j|0)==0){l=f;m=h}else{rd[h&63](c[k>>2]|0,j);l=c[e>>2]|0;m=c[g>>2]|0}rd[m&63](c[k>>2]|0,l);c[e>>2]=0;d=0;i=b;return d|0}function $d(d,f,g,h,j,k){d=d|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0;l=i;i=i+32|0;m=l;n=i;i=i+32|0;o=m+0|0;p=o+32|0;do{b[o>>1]=0;o=o+2|0}while((o|0)<(p|0));o=(g|0)==0;if(!o){p=0;do{q=m+(e[f+(p<<1)>>1]<<1)|0;b[q>>1]=(b[q>>1]|0)+1<<16>>16;p=p+1|0;}while((p|0)!=(g|0))}p=c[j>>2]|0;q=15;while(1){r=q+ -1|0;if((b[m+(q<<1)>>1]|0)!=0){break}if((r|0)==0){s=7;break}else{q=r}}if((s|0)==7){r=c[h>>2]|0;c[h>>2]=r+4;a[r]=64;a[r+1|0]=1;b[r+2>>1]=0;r=c[h>>2]|0;c[h>>2]=r+4;a[r]=64;a[r+1|0]=1;b[r+2>>1]=0;c[j>>2]=1;t=0;i=l;return t|0}r=p>>>0>q>>>0?q:p;a:do{if(q>>>0>1){p=1;while(1){u=p+1|0;if((b[m+(p<<1)>>1]|0)!=0){v=p;break a}if(u>>>0<q>>>0){p=u}else{v=u;break}}}else{v=1}}while(0);p=r>>>0<v>>>0?v:r;r=1;u=1;do{r=(r<<1)-(e[m+(u<<1)>>1]|0)|0;u=u+1|0;if((r|0)<0){t=-1;s=56;break}}while(u>>>0<16);if((s|0)==56){i=l;return t|0}do{if((r|0)>0){if((d|0)!=0&(q|0)==1){break}else{t=-1}i=l;return t|0}}while(0);b[n+2>>1]=0;r=0;u=1;do{r=(e[m+(u<<1)>>1]|0)+(r&65535)|0;u=u+1|0;b[n+(u<<1)>>1]=r;}while((u|0)!=15);if(!o){o=0;do{u=b[f+(o<<1)>>1]|0;if(!(u<<16>>16==0)){r=n+((u&65535)<<1)|0;u=b[r>>1]|0;b[r>>1]=u+1<<16>>16;b[k+((u&65535)<<1)>>1]=o}o=o+1|0;}while((o|0)!=(g|0))}do{if((d|0)==0){w=0;x=1<<p;y=0;z=k;A=19;B=k}else if((d|0)==1){g=1<<p;if(g>>>0>851){t=1}else{w=0;x=g;y=1;z=10944+ -514|0;A=256;B=11008+ -514|0;break}i=l;return t|0}else{g=1<<p;o=(d|0)==2;if(o&g>>>0>591){t=1}else{w=o;x=g;y=0;z=11072;A=-1;B=11136;break}i=l;return t|0}}while(0);d=x+ -1|0;g=p&255;o=p;n=0;u=0;r=v;v=-1;C=c[h>>2]|0;D=0;E=x;b:while(1){x=1<<o;F=u;G=r;H=D;while(1){I=G-n|0;J=I&255;K=b[k+(H<<1)>>1]|0;L=K&65535;do{if((L|0)<(A|0)){M=0;N=K}else{if((L|0)<=(A|0)){M=96;N=0;break}M=b[B+(L<<1)>>1]&255;N=b[z+(L<<1)>>1]|0}}while(0);L=1<<I;K=F>>>n;O=x;while(1){P=O-L|0;Q=P+K|0;a[C+(Q<<2)|0]=M;a[C+(Q<<2)+1|0]=J;b[C+(Q<<2)+2>>1]=N;if((O|0)==(L|0)){break}else{O=P}}O=1<<G+ -1;while(1){if((O&F|0)==0){break}else{O=O>>>1}}if((O|0)==0){R=0}else{R=(O+ -1&F)+O|0}S=H+1|0;L=m+(G<<1)|0;K=(b[L>>1]|0)+ -1<<16>>16;b[L>>1]=K;if(K<<16>>16==0){if((G|0)==(q|0)){break b}T=e[f+(e[k+(S<<1)>>1]<<1)>>1]|0}else{T=G}if(!(T>>>0>p>>>0)){F=R;G=T;H=S;continue}U=R&d;if((U|0)==(v|0)){F=R;G=T;H=S}else{break}}H=(n|0)==0?p:n;G=C+(x<<2)|0;F=T-H|0;c:do{if(T>>>0<q>>>0){K=T;L=F;I=1<<F;while(1){P=I-(e[m+(K<<1)>>1]|0)|0;if((P|0)<1){V=L;break c}Q=L+1|0;W=Q+H|0;if(W>>>0<q>>>0){K=W;L=Q;I=P<<1}else{V=Q;break}}}else{V=F}}while(0);F=(1<<V)+E|0;if(y&F>>>0>851|w&F>>>0>591){t=1;s=56;break}a[(c[h>>2]|0)+(U<<2)|0]=V;a[(c[h>>2]|0)+(U<<2)+1|0]=g;x=c[h>>2]|0;b[x+(U<<2)+2>>1]=(G-x|0)>>>2;o=V;n=H;u=R;r=T;v=U;C=G;D=S;E=F}if((s|0)==56){i=l;return t|0}d:do{if((R|0)!=0){s=n;S=J;D=R;U=q;T=C;while(1){do{if((s|0)==0){X=0;Y=S;Z=U;_=T}else{if((D&d|0)==(v|0)){X=s;Y=S;Z=U;_=T;break}X=0;Y=g;Z=p;_=c[h>>2]|0}}while(0);r=D>>>X;a[_+(r<<2)|0]=64;a[_+(r<<2)+1|0]=Y;b[_+(r<<2)+2>>1]=0;r=1<<Z+ -1;while(1){if((r&D|0)==0){break}else{r=r>>>1}}if((r|0)==0){break d}u=(r+ -1&D)+r|0;if((u|0)==0){break}else{s=X;S=Y;D=u;U=Z;T=_}}}}while(0);c[h>>2]=(c[h>>2]|0)+(E<<2);c[j>>2]=p;t=0;i=l;return t|0}function ae(e,f){e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0;g=i;h=c[e+28>>2]|0;j=h;k=e;l=c[k>>2]|0;m=e+4|0;n=l+((c[m>>2]|0)+ -6)|0;o=e+12|0;p=c[o>>2]|0;q=e+16|0;r=c[q>>2]|0;s=p+(r+ -258)|0;t=c[j+44>>2]|0;u=c[j+48>>2]|0;v=c[j+52>>2]|0;w=j+56|0;x=j+60|0;y=c[j+76>>2]|0;z=c[j+80>>2]|0;A=(1<<c[j+84>>2])+ -1|0;B=(1<<c[j+88>>2])+ -1|0;C=p+(r+~f)|0;f=j+7104|0;r=v+ -1|0;D=(u|0)==0;E=(c[j+40>>2]|0)+ -1|0;j=E+u|0;F=u+ -1|0;G=C+ -1|0;H=C-u|0;I=c[x>>2]|0;J=c[w>>2]|0;K=l+ -1|0;l=p+ -1|0;a:while(1){if(I>>>0<15){p=K+2|0;L=I+16|0;M=((d[K+1|0]|0)<<I)+J+((d[p]|0)<<I+8)|0;N=p}else{L=I;M=J;N=K}p=M&A;O=a[y+(p<<2)|0]|0;P=b[y+(p<<2)+2>>1]|0;Q=d[y+(p<<2)+1|0]|0;p=M>>>Q;R=L-Q|0;do{if(O<<24>>24==0){S=p;T=R;U=P&255;V=7}else{W=O&255;X=R;Y=p;Q=P;while(1){if((W&16|0)!=0){break}if((W&64|0)!=0){V=55;break a}Z=(Y&(1<<W)+ -1)+(Q&65535)|0;_=a[y+(Z<<2)|0]|0;$=b[y+(Z<<2)+2>>1]|0;aa=d[y+(Z<<2)+1|0]|0;ba=Y>>>aa;ca=X-aa|0;if(_<<24>>24==0){V=6;break}else{W=_&255;X=ca;Y=ba;Q=$}}if((V|0)==6){V=0;S=ba;T=ca;U=$&255;V=7;break}_=Q&65535;aa=W&15;if((aa|0)==0){da=X;ea=Y;fa=N;ga=_}else{if(X>>>0<aa>>>0){Z=N+1|0;ha=X+8|0;ia=((d[Z]|0)<<X)+Y|0;ja=Z}else{ha=X;ia=Y;ja=N}da=ha-aa|0;ea=ia>>>aa;fa=ja;ga=(ia&(1<<aa)+ -1)+_|0}if(da>>>0<15){_=fa+2|0;ka=da+16|0;la=((d[fa+1|0]|0)<<da)+ea+((d[_]|0)<<da+8)|0;ma=_}else{ka=da;la=ea;ma=fa}_=la&B;aa=b[z+(_<<2)+2>>1]|0;Z=d[z+(_<<2)+1|0]|0;na=la>>>Z;oa=ka-Z|0;Z=d[z+(_<<2)|0]|0;if((Z&16|0)==0){_=Z;pa=oa;qa=na;ra=aa;while(1){if((_&64|0)!=0){V=52;break a}sa=(qa&(1<<_)+ -1)+(ra&65535)|0;ta=b[z+(sa<<2)+2>>1]|0;ua=d[z+(sa<<2)+1|0]|0;va=qa>>>ua;wa=pa-ua|0;ua=d[z+(sa<<2)|0]|0;if((ua&16|0)==0){_=ua;pa=wa;qa=va;ra=ta}else{xa=va;ya=wa;za=ua;Aa=ta;break}}}else{xa=na;ya=oa;za=Z;Aa=aa}ra=Aa&65535;_=za&15;do{if(ya>>>0<_>>>0){Q=ma+1|0;ta=((d[Q]|0)<<ya)+xa|0;ua=ya+8|0;if(!(ua>>>0<_>>>0)){Ba=ua;Ca=ta;Da=Q;break}Q=ma+2|0;Ba=ya+16|0;Ca=((d[Q]|0)<<ua)+ta|0;Da=Q}else{Ba=ya;Ca=xa;Da=ma}}while(0);aa=(Ca&(1<<_)+ -1)+ra|0;Ea=Ca>>>_;Fa=Ba-_|0;Z=l;oa=Z-C|0;if(!(aa>>>0>oa>>>0)){na=l+(0-aa)|0;Q=ga;ta=l;while(1){a[ta+1|0]=a[na+1|0]|0;a[ta+2|0]=a[na+2|0]|0;ua=na+3|0;Ga=ta+3|0;a[Ga]=a[ua]|0;Ha=Q+ -3|0;if(Ha>>>0>2){ta=Ga;Q=Ha;na=ua}else{break}}if((Ha|0)==0){Ia=Fa;Ja=Ea;Ka=Da;La=Ga;break}Q=ta+4|0;a[Q]=a[na+4|0]|0;if(!(Ha>>>0>1)){Ia=Fa;Ja=Ea;Ka=Da;La=Q;break}Q=ta+5|0;a[Q]=a[na+5|0]|0;Ia=Fa;Ja=Ea;Ka=Da;La=Q;break}Q=aa-oa|0;if(Q>>>0>t>>>0){if((c[f>>2]|0)!=0){V=22;break a}}do{if(D){_=v+(E-Q)|0;if(!(Q>>>0<ga>>>0)){Ma=_;Na=ga;Oa=l;break}ra=ga-Q|0;ua=aa-Z|0;wa=_;_=Q;va=l;do{wa=wa+1|0;va=va+1|0;a[va]=a[wa]|0;_=_+ -1|0;}while((_|0)!=0);Ma=l+(G+ua+(1-aa))|0;Na=ra;Oa=l+(C+ua)|0}else{if(!(u>>>0<Q>>>0)){_=v+(F-Q)|0;if(!(Q>>>0<ga>>>0)){Ma=_;Na=ga;Oa=l;break}wa=ga-Q|0;va=aa-Z|0;sa=_;_=Q;Pa=l;do{sa=sa+1|0;Pa=Pa+1|0;a[Pa]=a[sa]|0;_=_+ -1|0;}while((_|0)!=0);Ma=l+(G+va+(1-aa))|0;Na=wa;Oa=l+(C+va)|0;break}_=v+(j-Q)|0;sa=Q-u|0;if(!(sa>>>0<ga>>>0)){Ma=_;Na=ga;Oa=l;break}Pa=ga-sa|0;ua=aa-Z|0;ra=_;_=sa;sa=l;do{ra=ra+1|0;sa=sa+1|0;a[sa]=a[ra]|0;_=_+ -1|0;}while((_|0)!=0);_=l+(H+ua)|0;if(!(u>>>0<Pa>>>0)){Ma=r;Na=Pa;Oa=_;break}ra=Pa-u|0;sa=r;va=u;wa=_;do{sa=sa+1|0;wa=wa+1|0;a[wa]=a[sa]|0;va=va+ -1|0;}while((va|0)!=0);Ma=l+(G+ua+(1-aa))|0;Na=ra;Oa=l+(C+ua)|0}}while(0);if(Na>>>0>2){aa=Ma;Z=Na;Q=Oa;while(1){a[Q+1|0]=a[aa+1|0]|0;a[Q+2|0]=a[aa+2|0]|0;oa=aa+3|0;na=Q+3|0;a[na]=a[oa]|0;ta=Z+ -3|0;if(ta>>>0>2){Q=na;Z=ta;aa=oa}else{Qa=oa;Ra=ta;Sa=na;break}}}else{Qa=Ma;Ra=Na;Sa=Oa}if((Ra|0)==0){Ia=Fa;Ja=Ea;Ka=Da;La=Sa;break}aa=Sa+1|0;a[aa]=a[Qa+1|0]|0;if(!(Ra>>>0>1)){Ia=Fa;Ja=Ea;Ka=Da;La=aa;break}aa=Sa+2|0;a[aa]=a[Qa+2|0]|0;Ia=Fa;Ja=Ea;Ka=Da;La=aa}}while(0);if((V|0)==7){V=0;P=l+1|0;a[P]=U;Ia=T;Ja=S;Ka=N;La=P}if(Ka>>>0<n>>>0&La>>>0<s>>>0){I=Ia;J=Ja;K=Ka;l=La}else{Ta=Ia;Ua=Ja;Va=Ka;Wa=La;break}}do{if((V|0)==22){c[e+24>>2]=11200;c[h>>2]=29;Ta=Fa;Ua=Ea;Va=Da;Wa=l}else if((V|0)==52){c[e+24>>2]=11232;c[h>>2]=29;Ta=pa;Ua=qa;Va=ma;Wa=l}else if((V|0)==55){if((W&32|0)==0){c[e+24>>2]=11256;c[h>>2]=29;Ta=X;Ua=Y;Va=N;Wa=l;break}else{c[h>>2]=11;Ta=X;Ua=Y;Va=N;Wa=l;break}}}while(0);l=Ta>>>3;N=Va+(0-l)|0;Y=Ta-(l<<3)|0;Ta=(1<<Y)+ -1&Ua;c[k>>2]=Va+(1-l);c[o>>2]=Wa+1;if(N>>>0<n>>>0){Xa=n-N|0}else{Xa=n-N|0}c[m>>2]=Xa+5;if(Wa>>>0<s>>>0){Ya=s-Wa|0;Za=Ya+257|0;c[q>>2]=Za;c[w>>2]=Ta;c[x>>2]=Y;i=g;return}else{Ya=s-Wa|0;Za=Ya+257|0;c[q>>2]=Za;c[w>>2]=Ta;c[x>>2]=Y;i=g;return}}function be(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+56|0;g=f;c[g>>2]=d;d=g+4|0;c[d>>2]=e;c[g+12>>2]=a;c[g+16>>2]=c[b>>2];c[g+32>>2]=0;c[g+36>>2]=0;a=Xd(g,11288,56)|0;if((a|0)!=0){h=a;i=f;return h|0}a=Yd(g,4)|0;if((a|0)==1){c[b>>2]=c[g+20>>2];h=_d(g)|0;i=f;return h|0}_d(g)|0;if((a|0)==-5){j=4}else if((a|0)==2){h=-3;i=f;return h|0}do{if((j|0)==4){if((c[d>>2]|0)==0){h=-3}else{break}i=f;return h|0}}while(0);h=a;i=f;return h|0}function ce(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;a=i;d=fp(fa(c,b)|0)|0;i=a;return d|0}function de(a,b){a=a|0;b=b|0;a=i;gp(b);i=a;return}function ee(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,j=0.0;e=b;b=c[e+4>>2]|0;f=c[(c[2824]|0)+32>>2]|0;h=a;c[h>>2]=c[e>>2];c[h+4>>2]=b;j=+(c[f+8>>2]|0)*.5;g[a+8>>2]=+(c[f+4>>2]|0)*.5;g[a+12>>2]=j;f=d;d=c[f+4>>2]|0;b=a+16|0;c[b>>2]=c[f>>2];c[b+4>>2]=d;i=i;return}function fe(a){a=a|0;var b=0,d=0,e=0,f=0.0,h=0.0,j=0.0,k=0;b=i;d=c[2824]|0;e=a;f=+g[e>>2];h=+g[e+4>>2];j=+g[d+16>>2];if(!(f>j+-16.0)){k=1;i=b;return k|0}if(!(f<j+ +g[d+8>>2]+16.0)){k=1;i=b;return k|0}j=+g[d+20>>2];if(!(h>j+-16.0)){k=1;i=b;return k|0}k=!(h<j+ +g[d+12>>2]+16.0);i=b;return k|0}function ge(a){a=a|0;var b=0.0,d=0.0,e=0;b=+h[(c[2824]|0)+128>>3];d=b*+g[a+20>>2];e=a;g[e>>2]=+g[a+16>>2]*b+ +g[e>>2];e=a+4|0;g[e>>2]=d+ +g[e>>2];i=i;return}function he(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;b=i;i=i+24|0;d=b;e=b+8|0;f=b+16|0;g=i;i=i+8|0;h=c[2824]|0;j=h+72|0;k=c[h+32>>2]|0;h=a;a=c[h+4>>2]|0;l=f;c[l>>2]=c[h>>2];c[l+4>>2]=a;c[g>>2]=0;a=e;l=f;c[a+0>>2]=c[l+0>>2];c[a+4>>2]=c[l+4>>2];l=d;a=g;c[l+0>>2]=c[a+0>>2];Ff(j,k,e,0,d,0.0);i=b;return}function ie(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0,h=0,j=0,k=0,l=0,m=0.0;e=i;i=i+16|0;f=e;h=e+8|0;j=a;k=b;b=c[k+4>>2]|0;l=h;c[l>>2]=c[k>>2];c[l+4>>2]=b;b=c[(c[2824]|0)+36>>2]|0;l=f;k=h;c[l+0>>2]=c[k+0>>2];c[l+4>>2]=c[k+4>>2];ye(j,f,b,1);g[a+20>>2]=d;m=+Y(+d);g[a+24>>2]=+X(+d);g[a+28>>2]=m;g[a+12>>2]=+g[a+8>>2];i=e;return}function je(a){a=a|0;var b=0,d=0,e=0,f=0.0,h=0.0,j=0.0,k=0;b=i;d=c[2824]|0;e=a;f=+g[e>>2];h=+g[e+4>>2];j=+g[d+16>>2];if(!(f>j+-16.0)){k=1;i=b;return k|0}if(!(f<j+ +g[d+8>>2]+16.0)){k=1;i=b;return k|0}j=+g[d+20>>2];if(!(h>j+-16.0)){k=1;i=b;return k|0}k=!(h<j+ +g[d+12>>2]+16.0);i=b;return k|0}function ke(a){a=a|0;var b=0,d=0,e=0,f=0.0,j=0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0;b=i;d=c[2824]|0;e=a;f=+g[e>>2];j=a+20|0;k=+g[j>>2];l=+ba(+(+g[d+360>>2]- +g[e+4>>2]),+(+g[d+356>>2]-f));f=1.0/(+h[d+128>>3]*60.0);if(f<0.0){m=0.0}else{m=f>1.0?1.0:f}f=+W(.014999999664723873,+m);m=+_b(+(l-k),6.2831854820251465);l=m;if(m<0.0){n=l+6.283185307179586}else{n=l}l=n;n=l;do{if(n>3.141592653589793){o=n+-6.283185307179586}else{if(!(n<-3.141592653589793)){o=l;break}o=n+6.283185307179586}}while(0);n=k+f*o;g[j>>2]=n;if(n<1.0461503267288208){p=1.0461503267288208}else{p=n>2.0923006534576416?2.0923006534576416:n}g[j>>2]=p;n=+X(+p);o=+Y(+p);p=+n;f=+o;j=a+24|0;g[j>>2]=p;g[j+4>>2]=f;f=+h[(c[2824]|0)+128>>3]*40.0;j=a;g[j>>2]=+g[j>>2]+n*f;j=a+4|0;g[j>>2]=+g[j>>2]+o*f;i=b;return}function le(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0.0;b=i;i=i+32|0;d=b;e=b+8|0;f=b+16|0;h=b+24|0;j=i;i=i+8|0;k=i;i=i+8|0;l=c[2824]|0;m=l+72|0;n=c[l+36>>2]|0;l=a;o=c[l+4>>2]|0;p=h;c[p>>2]=c[l>>2];c[p+4>>2]=o;q=-+g[a+24>>2];g[j>>2]=+g[a+28>>2];g[j+4>>2]=q;c[k>>2]=0;a=f;o=h;c[a+0>>2]=c[o+0>>2];c[a+4>>2]=c[o+4>>2];o=e;a=j;c[o+0>>2]=c[a+0>>2];c[o+4>>2]=c[a+4>>2];a=d;o=k;c[a+0>>2]=c[o+0>>2];Gf(m,n,f,e,0,d,0.0);i=b;return}function me(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,j=0,k=0,l=0,m=0.0,n=0,o=0.0,p=0,q=0,r=0.0;d=i;i=i+32|0;e=d;f=d+8|0;j=d+16|0;k=d+24|0;l=a+16|0;m=+g[l>>2]- +h[(c[2824]|0)+128>>3];g[l>>2]=m;if(!(m<0.0)){i=d;return}g[l>>2]=+da(+(+(Hp()|0)/2147483647.0*.9999799728393555+9999999747378752.0e-21))*-4.0;l=c[2824]|0;n=a;m=+g[n>>2];o=+g[b>>2]+m;m=+g[b+4>>2]+ +g[n+4>>2];n=l+420|0;b=c[n>>2]|0;if(b>>>0<(c[l+424>>2]|0)>>>0){p=b+24|0;c[n>>2]=p;q=p}else{qe(l+416|0);q=c[n>>2]|0}n=k;l=q+ -24|0;r=+o;o=+m;q=j;g[q>>2]=r;g[q+4>>2]=o;q=a+8|0;a=c[q+4>>2]|0;p=k;c[p>>2]=c[q>>2];c[p+4>>2]=a;a=f;p=j;c[a+0>>2]=c[p+0>>2];c[a+4>>2]=c[p+4>>2];p=e;a=n;c[p+0>>2]=c[a+0>>2];c[p+4>>2]=c[a+4>>2];ee(l,f,e);i=d;return}function ne(a,b){a=a|0;b=+b;var d=0,e=0,f=0,h=0,j=0,k=0,l=0;d=i;i=i+16|0;e=d;f=d+8|0;h=a;g[f>>2]=b;g[f+4>>2]=-48.0;j=c[(c[2824]|0)+60>>2]|0;k=e;l=f;c[k+0>>2]=c[l+0>>2];c[k+4>>2]=c[l+4>>2];ye(h,e,j,70);j=0;do{e=j<<1;b=+(+((j*14|0)+ -32|0));h=a+(e*20|0)+20|0;c[h>>2]=-1048576e3;g[h+4>>2]=b;h=a+(e*20|0)+28|0;c[h>>2]=-1035468800;c[h+4>>2]=1112014848;g[a+(e*20|0)+36>>2]=+da(+(+(Hp()|0)/2147483647.0*.9999799728393555+9999999747378752.0e-21))*-4.0;h=e|1;e=a+(h*20|0)+20|0;c[e>>2]=1098907648;g[e+4>>2]=b;e=a+(h*20|0)+28|0;c[e>>2]=1112014848;c[e+4>>2]=1112014848;g[a+(h*20|0)+36>>2]=+da(+(+(Hp()|0)/2147483647.0*.9999799728393555+9999999747378752.0e-21))*-4.0;j=j+1|0;}while((j|0)!=6);i=d;return}function oe(a){a=a|0;var b=0,d=0;b=i;d=a+4|0;g[d>>2]=+h[(c[2824]|0)+128>>3]*10.0+ +g[d>>2];me(a+20|0,a);me(a+40|0,a);me(a+60|0,a);me(a+80|0,a);me(a+100|0,a);me(a+120|0,a);me(a+140|0,a);me(a+160|0,a);me(a+180|0,a);me(a+200|0,a);me(a+220|0,a);me(a+240|0,a);i=b;return}function pe(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+24|0;d=b;e=b+8|0;f=b+16|0;g=i;i=i+8|0;j=c[2824]|0;k=c[j+60>>2]|0;l=(~~(+h[j+112>>3]*10.0)|0)%(c[k+20>>2]|0)|0;m=j+72|0;j=a;a=c[j+4>>2]|0;n=f;c[n>>2]=c[j>>2];c[n+4>>2]=a;c[g>>2]=0;a=e;n=f;c[a+0>>2]=c[n+0>>2];c[a+4>>2]=c[n+4>>2];n=d;a=g;c[n+0>>2]=c[a+0>>2];Ff(m,k,e,l,d,0.0);i=b;return}function qe(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;d=a+4|0;e=c[d>>2]|0;f=a;g=c[f>>2]|0;h=g;j=(e-h|0)/24|0;k=j+1|0;if(k>>>0>178956970){km(0)}l=a+8|0;a=((c[l>>2]|0)-h|0)/24|0;if(a>>>0<89478485){m=a<<1;a=m>>>0<k>>>0?k:m;if((a|0)==0){n=0;o=0}else{p=a;q=5}}else{p=178956970;q=5}if((q|0)==5){n=p;o=kp(p*24|0)|0}p=o+(j*24|0)|0;q=o+(n*24|0)|0;n=o+(k*24|0)|0;if((e|0)==(g|0)){r=p;s=e}else{k=j+ -1-(((e+ -24+(0-h)|0)>>>0)/24|0)|0;h=e;e=p;do{e=e+ -24|0;h=h+ -24|0;p=e;j=h;c[p+0>>2]=c[j+0>>2];c[p+4>>2]=c[j+4>>2];c[p+8>>2]=c[j+8>>2];c[p+12>>2]=c[j+12>>2];c[p+16>>2]=c[j+16>>2];c[p+20>>2]=c[j+20>>2];}while((h|0)!=(g|0));r=o+(k*24|0)|0;s=c[f>>2]|0}c[f>>2]=r;c[d>>2]=n;c[l>>2]=q;if((s|0)==0){i=b;return}mp(s);i=b;return}function re(a,b){a=a|0;b=+b;var d=0,e=0,f=0,h=0,j=0,k=0,l=0;d=i;i=i+16|0;e=d;f=d+8|0;h=a;g[f>>2]=b;g[f+4>>2]=-32.0;j=c[(c[2824]|0)+56>>2]|0;k=e;l=f;c[k+0>>2]=c[l+0>>2];c[k+4>>2]=c[l+4>>2];ye(h,e,j,35);g[a+20>>2]=+(Hp()|0)/2147483647.0*3.0;i=d;return}function se(a){a=a|0;var b=0,d=0,e=0,f=0,j=0,k=0,l=0.0,m=0,n=0.0,o=0,p=0.0,q=0,r=0,s=0,t=0;b=i;i=i+32|0;d=b;e=b+8|0;f=b+16|0;j=b+24|0;k=c[2824]|0;l=+h[k+128>>3];m=a+4|0;n=l*10.0+ +g[m>>2];g[m>>2]=n;o=a+20|0;p=+g[o>>2]-l;g[o>>2]=p;if(!(p<0.0)){i=b;return}g[o>>2]=p+3.0;o=a;p=+g[o>>2]+12.0;a=k+432|0;q=c[a>>2]|0;if(q>>>0<(c[k+436>>2]|0)>>>0){r=q+32|0;c[a>>2]=r;s=r}else{ue(k+428|0);s=c[a>>2]|0}a=s+ -32|0;l=+p;p=+(n+6.0);s=f;g[s>>2]=l;g[s+4>>2]=p;s=e;k=f;c[s+0>>2]=c[k+0>>2];c[s+4>>2]=c[k+4>>2];ie(a,e,.942477822303772);e=c[2824]|0;p=+g[o>>2]+-12.0;l=+g[m>>2]+6.0;m=e+432|0;o=c[m>>2]|0;if(o>>>0<(c[e+436>>2]|0)>>>0){a=o+32|0;c[m>>2]=a;t=a}else{ue(e+428|0);t=c[m>>2]|0}m=t+ -32|0;n=+p;p=+l;t=j;g[t>>2]=n;g[t+4>>2]=p;t=d;e=j;c[t+0>>2]=c[e+0>>2];c[t+4>>2]=c[e+4>>2];ie(m,d,2.1991147994995117);i=b;return}function te(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+24|0;d=b;e=b+8|0;f=b+16|0;g=i;i=i+8|0;j=c[2824]|0;k=c[j+56>>2]|0;l=(~~(+h[j+112>>3]*10.0)|0)%(c[k+20>>2]|0)|0;m=j+72|0;j=a;a=c[j+4>>2]|0;n=f;c[n>>2]=c[j>>2];c[n+4>>2]=a;c[g>>2]=0;a=e;n=f;c[a+0>>2]=c[n+0>>2];c[a+4>>2]=c[n+4>>2];n=d;a=g;c[n+0>>2]=c[a+0>>2];Ff(m,k,e,l,d,0.0);i=b;return}function ue(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;d=a+4|0;e=c[d>>2]|0;f=a;g=c[f>>2]|0;h=g;j=e-h>>5;k=j+1|0;if(k>>>0>134217727){km(0)}l=a+8|0;a=(c[l>>2]|0)-h|0;if(a>>5>>>0<67108863){m=a>>4;a=m>>>0<k>>>0?k:m;if((a|0)==0){n=0;o=0}else{p=a;q=5}}else{p=134217727;q=5}if((q|0)==5){n=p;o=kp(p<<5)|0}p=o+(j<<5)|0;q=o+(n<<5)|0;n=o+(k<<5)|0;if((e|0)==(g|0)){r=p;s=e}else{k=j+ -1-((e+ -32+(0-h)|0)>>>5)|0;h=e;e=p;do{e=e+ -32|0;h=h+ -32|0;p=e;j=h;c[p+0>>2]=c[j+0>>2];c[p+4>>2]=c[j+4>>2];c[p+8>>2]=c[j+8>>2];c[p+12>>2]=c[j+12>>2];c[p+16>>2]=c[j+16>>2];c[p+20>>2]=c[j+20>>2];c[p+24>>2]=c[j+24>>2];c[p+28>>2]=c[j+28>>2];}while((h|0)!=(g|0));r=o+(k<<5)|0;s=c[f>>2]|0}c[f>>2]=r;c[d>>2]=n;c[l>>2]=q;if((s|0)==0){i=b;return}mp(s);i=b;return}function ve(a,b){a=a|0;b=+b;var d=0,e=0,f=0,j=0,k=0,l=0,m=0;d=i;i=i+16|0;e=d;f=d+8|0;j=a;g[f>>2]=b;g[f+4>>2]=-16.0;k=c[(c[2824]|0)+52>>2]|0;l=e;m=f;c[l+0>>2]=c[m+0>>2];c[l+4>>2]=c[m+4>>2];ye(j,e,k,15);k=a+20|0;g[k>>2]=+(Hp()|0)/2147483647.0*6.283185307179586;g[a+24>>2]=+(Hp()|0)/2147483647.0*2.5;g[a+28>>2]=b- +Y(+((+h[(c[2824]|0)+112>>3]+ +g[k>>2])*2.5132741603225375))*28.0;g[a+32>>2]=175.0;i=d;return}function we(a){a=a|0;var b=0,d=0,e=0,f=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0.0,u=0.0,v=0,w=0.0,x=0,y=0,z=0,A=0,B=0;b=i;i=i+96|0;d=b;e=b+8|0;f=b+16|0;j=b+24|0;k=b+32|0;l=b+40|0;m=b+48|0;n=b+56|0;o=b+64|0;p=b+72|0;q=b+80|0;r=b+88|0;s=a+32|0;t=+g[s>>2];u=t;v=c[2824]|0;w=+h[v+128>>3];x=a+4|0;g[x>>2]=u*w+ +g[x>>2];g[s>>2]=u+(12.5-t)*.06;g[a>>2]=+g[a+28>>2]+ +Y(+((+h[v+112>>3]+ +g[a+20>>2])*2.5132741603225375))*28.0;s=a+24|0;t=+g[s>>2]-w;g[s>>2]=t;if(!(t<0.0)){i=b;return}g[s>>2]=t+2.5;s=v+420|0;x=c[s>>2]|0;if(x>>>0<(c[v+424>>2]|0)>>>0){y=x+24|0;c[s>>2]=y;z=y}else{qe(v+416|0);z=c[s>>2]|0}s=n;v=z+ -24|0;z=a;a=z;y=c[a+4>>2]|0;x=m;c[x>>2]=c[a>>2];c[x+4>>2]=y;y=n;c[y>>2]=-1043857408;c[y+4>>2]=1112014848;y=l;n=m;c[y+0>>2]=c[n+0>>2];c[y+4>>2]=c[n+4>>2];n=k;y=s;c[n+0>>2]=c[y+0>>2];c[n+4>>2]=c[y+4>>2];ee(v,l,k);k=c[2824]|0;l=k+420|0;v=c[l>>2]|0;if(v>>>0<(c[k+424>>2]|0)>>>0){y=v+24|0;c[l>>2]=y;A=y}else{qe(k+416|0);A=c[l>>2]|0}l=p;k=A+ -24|0;A=z;y=c[A+4>>2]|0;v=o;c[v>>2]=c[A>>2];c[v+4>>2]=y;y=p;c[y>>2]=0;c[y+4>>2]=1112014848;y=j;p=o;c[y+0>>2]=c[p+0>>2];c[y+4>>2]=c[p+4>>2];p=f;y=l;c[p+0>>2]=c[y+0>>2];c[p+4>>2]=c[y+4>>2];ee(k,j,f);f=c[2824]|0;j=f+420|0;k=c[j>>2]|0;if(k>>>0<(c[f+424>>2]|0)>>>0){y=k+24|0;c[j>>2]=y;B=y}else{qe(f+416|0);B=c[j>>2]|0}j=r;f=B+ -24|0;B=z;z=c[B+4>>2]|0;y=q;c[y>>2]=c[B>>2];c[y+4>>2]=z;z=r;c[z>>2]=1103626240;c[z+4>>2]=1112014848;z=e;r=q;c[z+0>>2]=c[r+0>>2];c[z+4>>2]=c[r+4>>2];r=d;z=j;c[r+0>>2]=c[z+0>>2];c[r+4>>2]=c[z+4>>2];ee(f,e,d);i=b;return}function xe(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+24|0;d=b;e=b+8|0;f=b+16|0;g=i;i=i+8|0;j=c[2824]|0;k=c[j+52>>2]|0;l=(~~(+h[j+112>>3]*10.0)|0)%(c[k+20>>2]|0)|0;m=j+72|0;j=a;a=c[j+4>>2]|0;n=f;c[n>>2]=c[j>>2];c[n+4>>2]=a;c[g>>2]=0;a=e;n=f;c[a+0>>2]=c[n+0>>2];c[a+4>>2]=c[n+4>>2];n=d;a=g;c[n+0>>2]=c[a+0>>2];Ff(m,k,e,l,d,0.0);i=b;return}function ye(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,j=0.0;f=b;b=c[f+4>>2]|0;h=a;c[h>>2]=c[f>>2];c[h+4>>2]=b;j=+(c[d+8>>2]|0)*.5;g[a+8>>2]=+(c[d+4>>2]|0)*.5;g[a+12>>2]=j;c[a+16>>2]=e;i=i;return}function ze(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;i=i+16|0;f=e;g=e+8|0;h=a+16|0;j=(c[h>>2]|0)-b|0;c[h>>2]=j;if((j|0)>=1){k=0;i=e;return k|0}j=c[2824]|0;h=j+504|0;b=c[h>>2]|0;if(b>>>0<(c[j+508>>2]|0)>>>0){l=b+16|0;c[h>>2]=l;m=l}else{Ae(j+500|0);m=c[h>>2]|0}h=m+ -16|0;m=a;a=c[m+4>>2]|0;j=g;c[j>>2]=c[m>>2];c[j+4>>2]=a;a=f;j=g;c[a+0>>2]=c[j+0>>2];c[a+4>>2]=c[j+4>>2];Ee(h,f,d);k=1;i=e;return k|0}function Ae(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;d=a+4|0;e=c[d>>2]|0;f=a;g=c[f>>2]|0;h=g;j=e-h>>4;k=j+1|0;if(k>>>0>268435455){km(0)}l=a+8|0;a=(c[l>>2]|0)-h|0;if(a>>4>>>0<134217727){m=a>>3;a=m>>>0<k>>>0?k:m;if((a|0)==0){n=0;o=0}else{p=a;q=5}}else{p=268435455;q=5}if((q|0)==5){n=p;o=kp(p<<4)|0}p=o+(j<<4)|0;q=o+(n<<4)|0;n=o+(k<<4)|0;if((e|0)==(g|0)){r=p;s=e}else{k=j+ -1-((e+ -16+(0-h)|0)>>>4)|0;h=e;e=p;do{e=e+ -16|0;h=h+ -16|0;p=e;j=h;c[p+0>>2]=c[j+0>>2];c[p+4>>2]=c[j+4>>2];c[p+8>>2]=c[j+8>>2];c[p+12>>2]=c[j+12>>2];}while((h|0)!=(g|0));r=o+(k<<4)|0;s=c[f>>2]|0}c[f>>2]=r;c[d>>2]=n;c[l>>2]=q;if((s|0)==0){i=b;return}mp(s);i=b;return}function Be(a,b){a=a|0;b=+b;var d=0,e=0,f=0,h=0,j=0,k=0,l=0;d=i;i=i+16|0;e=d;f=d+8|0;h=a;g[f>>2]=b;g[f+4>>2]=-16.0;j=c[(c[2824]|0)+48>>2]|0;k=e;l=f;c[k+0>>2]=c[l+0>>2];c[k+4>>2]=c[l+4>>2];ye(h,e,j,5);g[a+20>>2]=+da(+(+(Hp()|0)/2147483647.0*.9999799728393555+9999999747378752.0e-21))*-2.0;j=a+8|0;g[j>>2]=+g[j>>2]*.5;j=a+12|0;g[j>>2]=+g[j>>2]*.5;i=d;return}function Ce(a){a=a|0;var b=0,d=0,e=0,f=0,j=0,k=0.0,l=0,m=0.0,n=0,o=0,p=0,q=0;b=i;i=i+32|0;d=b;e=b+8|0;f=b+16|0;j=b+24|0;k=+h[(c[2824]|0)+128>>3];l=a+4|0;g[l>>2]=k*35.0+ +g[l>>2];l=a+20|0;m=+g[l>>2]-k;g[l>>2]=m;if(!(m<0.0)){i=b;return}g[l>>2]=+da(+(+(Hp()|0)/2147483647.0*.9999799728393555+9999999747378752.0e-21))*-2.0;l=c[2824]|0;m=+(Hp()|0)/2147483647.0*25.0+-12.5;n=l+420|0;o=c[n>>2]|0;if(o>>>0<(c[l+424>>2]|0)>>>0){p=o+24|0;c[n>>2]=p;q=p}else{qe(l+416|0);q=c[n>>2]|0}n=j;l=q+ -24|0;q=a;a=c[q+4>>2]|0;p=f;c[p>>2]=c[q>>2];c[p+4>>2]=a;a=j;g[a>>2]=m;c[a+4>>2]=1112014848;a=e;j=f;c[a+0>>2]=c[j+0>>2];c[a+4>>2]=c[j+4>>2];j=d;a=n;c[j+0>>2]=c[a+0>>2];c[j+4>>2]=c[a+4>>2];ee(l,e,d);i=b;return}function De(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+24|0;d=b;e=b+8|0;f=b+16|0;g=i;i=i+8|0;j=c[2824]|0;k=c[j+48>>2]|0;l=(~~(+h[j+112>>3]*10.0)|0)%(c[k+20>>2]|0)|0;m=j+72|0;j=a;a=c[j+4>>2]|0;n=f;c[n>>2]=c[j>>2];c[n+4>>2]=a;c[g>>2]=0;a=e;n=f;c[a+0>>2]=c[n+0>>2];c[a+4>>2]=c[n+4>>2];n=d;a=g;c[n+0>>2]=c[a+0>>2];Ff(m,k,e,l,d,0.0);i=b;return}function Ee(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,h=0,j=0;f=i;h=d;d=c[h+4>>2]|0;j=b;c[j>>2]=c[h>>2];c[j+4>>2]=d;a[b+8|0]=e&1;g[b+12>>2]=0.0;Af(sf((c[2824]|0)+24|0,-946564182,4)|0);i=f;return}function Fe(b){b=b|0;var d=0;d=c[2824]|0;i=i;return+g[b+12>>2]>=+(c[(c[((a[b+8|0]|0)==0?d+40|0:d+44|0)>>2]|0)+20>>2]|0)/20.0|0}function Ge(a){a=a|0;var b=0;b=a+12|0;g[b>>2]=+h[(c[2824]|0)+128>>3]+ +g[b>>2];i=i;return}function He(b){b=b|0;var d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;d=i;i=i+24|0;e=d;f=d+8|0;h=d+16|0;j=i;i=i+8|0;k=c[2824]|0;l=k+72|0;m=c[((a[b+8|0]|0)==0?k+40|0:k+44|0)>>2]|0;k=b;n=c[k+4>>2]|0;o=h;c[o>>2]=c[k>>2];c[o+4>>2]=n;n=~~(+g[b+12>>2]*20.0);c[j>>2]=0;b=f;o=h;c[b+0>>2]=c[o+0>>2];c[b+4>>2]=c[o+4>>2];o=e;b=j;c[o+0>>2]=c[b+0>>2];Ff(l,m,f,n,e,0.0);i=d;return}function Ie(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;e=a+4|0;c[e>>2]=b;c[a+24>>2]=sf((c[2824]|0)+24|0,-1709624745,2)|0;c[a>>2]=-1;b=c[e>>2]|0;if((b|0)==2){c[a+16>>2]=sf((c[2824]|0)+24|0,2026828852,2)|0;c[a+20>>2]=sf((c[2824]|0)+24|0,-1984479727,2)|0}else if((b|0)==3){c[a+16>>2]=sf((c[2824]|0)+24|0,2043606471,2)|0;c[a+20>>2]=sf((c[2824]|0)+24|0,-2001257346,2)|0}else if((b|0)==1){c[a+16>>2]=sf((c[2824]|0)+24|0,2077161709,2)|0;c[a+20>>2]=sf((c[2824]|0)+24|0,-2034812584,2)|0}else{c[a+16>>2]=sf((c[2824]|0)+24|0,1993273614,2)|0;c[a+20>>2]=sf((c[2824]|0)+24|0,-1950924489,2)|0}c[a+28>>2]=sf((c[2824]|0)+24|0,1405810906,2)|0;c[a+32>>2]=sf((c[2824]|0)+24|0,1422588525,2)|0;c[a+36>>2]=sf((c[2824]|0)+24|0,1372255668,2)|0;i=d;return}function Je(b){b=b|0;var d=0,e=0,f=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0.0,B=0.0,C=0,D=0,E=0,F=0;d=i;i=i+128|0;e=d;f=d+8|0;j=d+16|0;k=d+24|0;l=d+32|0;m=d+40|0;n=d+48|0;o=d+56|0;p=d+64|0;q=d+72|0;r=d+80|0;s=d+88|0;t=d+96|0;u=d+104|0;v=d+112|0;w=d+120|0;x=b;y=c[x>>2]|0;if((y|0)==86){z=5}else if((y|0)==0){g[b+8>>2]=0.0;A=0.0;z=4}else if((y|0)==76){y=b+8|0;B=+h[(c[2824]|0)+128>>3]+ +g[y>>2];g[y>>2]=B;if(B<.15000000596046448){A=B;z=4}else{z=5}}else{i=d;return}if((z|0)==4){y=~~(A*3.0/.15000000596046448);C=c[2824]|0;A=+g[C+8>>2];B=A*.25*+(c[b+4>>2]|0)-A*.125;D=C+72|0;E=c[b+24>>2]|0;A=+g[C+12>>2]+1.0;g[p>>2]=B+-16.0;g[p+4>>2]=A;c[q>>2]=0;C=o;F=p;c[C+0>>2]=c[F+0>>2];c[C+4>>2]=c[F+4>>2];F=n;C=q;c[F+0>>2]=c[C+0>>2];Ff(D,E,o,0,n,0.0);n=c[2824]|0;o=n+72|0;E=c[b+(y<<2)+28>>2]|0;A=+g[n+12>>2]+-2.0;g[r>>2]=B;g[r+4>>2]=A;c[s>>2]=0;n=m;y=r;c[n+0>>2]=c[y+0>>2];c[n+4>>2]=c[y+4>>2];y=l;n=s;c[y+0>>2]=c[n+0>>2];Ff(o,E,m,0,l,0.0);c[x>>2]=76;i=d;return}else if((z|0)==5){z=c[2824]|0;A=+g[z+8>>2];B=A*.25*+(c[b+4>>2]|0)-A*.125;l=z+72|0;m=c[b+24>>2]|0;A=+g[z+12>>2]+1.0;g[t>>2]=B+-16.0;g[t+4>>2]=A;c[u>>2]=0;z=k;E=t;c[z+0>>2]=c[E+0>>2];c[z+4>>2]=c[E+4>>2];E=j;z=u;c[E+0>>2]=c[z+0>>2];Ff(l,m,k,0,j,0.0);j=c[2824]|0;k=j+72|0;m=c[((a[b+12|0]|0)==0?b+20|0:b+16|0)>>2]|0;A=+g[j+12>>2]+-2.0;g[v>>2]=B;g[v+4>>2]=A;c[w>>2]=0;j=f;b=v;c[j+0>>2]=c[b+0>>2];c[j+4>>2]=c[b+4>>2];b=e;j=w;c[b+0>>2]=c[j+0>>2];Ff(k,m,f,0,e,0.0);c[x>>2]=86;i=d;return}}function Ke(b){b=b|0;var d=0,e=0,f=0.0;d=i;Ie(b,1);Ie(b+40|0,2);Ie(b+80|0,3);Ie(b+120|0,3);e=c[2824]|0;f=+g[e+8>>2]*.5;g[b+160>>2]=f;g[b+164>>2]=f;g[b+168>>2]=0.0;c[b+172>>2]=0;c[b+176>>2]=sf(e+24|0,-1686501324,2)|0;c[b+180>>2]=sf((c[2824]|0)+24|0,552281472,2)|0;a[b+184|0]=0;i=d;return}function Le(b){b=b|0;var d=0,e=0,f=0.0,j=0.0,k=0.0,l=0.0,m=0,n=0.0,o=0.0,p=0,q=0,r=0,s=0;d=i;e=c[2824]|0;if((a[e+145|0]|0)==0){f=+g[b+160>>2]}else{j=+g[e+136>>2];k=+g[e+8>>2]+-16.0;if(j<16.0){l=16.0}else{l=j>k?k:j}g[b+160>>2]=l;f=l}m=b+164|0;l=+g[m>>2];j=+h[e+128>>3];k=1.0/(j*60.0);if(k<0.0){n=0.0}else{n=k>1.0?1.0:k}g[m>>2]=l+(f-l)*+W(.20000000298023224,+n);m=b+168|0;n=+g[m>>2]+j/6.0;if(n<0.0){o=0.0}else{o=n>1.0?1.0:n}g[m>>2]=o;n=1.0-o;o=1.0-n*n;p=b+172|0;q=c[p>>2]|0;do{if(o>.9900000095367432){c[p>>2]=4;r=4}else{if(o>.7149999737739563){c[p>>2]=3;r=3;break}if(o>.42500001192092896){c[p>>2]=2;r=2;break}if(o>.15000000596046448){c[p>>2]=1;r=1;break}else{c[p>>2]=0;r=0;break}}}while(0);do{if((r|0)!=(q|0)){if((q|0)!=0){a[b+((q+ -1|0)*40|0)+12|0]=0}c[b+(q*40|0)>>2]=0;a[b+(q*40|0)+12|0]=1;s=c[p>>2]|0;if((s|0)==1){Af(sf(e+24|0,1292803721,4)|0);break}else if((s|0)==2){Af(sf(e+24|0,1242470864,4)|0);break}else if((s|0)==3){Af(sf(e+24|0,1259248483,4)|0);break}else if((s|0)==4){Af(sf(e+24|0,1343136578,4)|0);break}else{break}}}while(0);e=c[2824]|0;if((a[e+146|0]|0)==0){i=d;return}kf(e);if((c[p>>2]|0)!=0){Af(sf((c[2824]|0)+24|0,975326616,4)|0);e=c[p>>2]|0;if((e|0)>0){q=0;do{c[b+(q*40|0)>>2]=-1;q=q+1|0;}while((q|0)<(e|0))}c[p>>2]=0}g[m>>2]=0.0;i=d;return}function Me(b){b=b|0;var d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;d=i;i=i+64|0;e=d;f=d+8|0;h=d+16|0;j=d+24|0;k=d+32|0;l=d+40|0;m=d+48|0;n=d+56|0;if((a[b+184|0]|0)==0){o=b;Je(o);p=b+40|0;Je(p);q=b+80|0;Je(q);r=b+120|0;Je(r);i=d;return}s=(c[2824]|0)+72|0;t=c[b+176>>2]|0;g[k>>2]=0.0;g[k+4>>2]=4.0;c[l>>2]=0;u=j;v=k;c[u+0>>2]=c[v+0>>2];c[u+4>>2]=c[v+4>>2];v=h;u=l;c[v+0>>2]=c[u+0>>2];Ff(s,t,j,0,h,0.0);h=c[2824]|0;j=h+72|0;t=c[b+180>>2]|0;g[m>>2]=+g[h+8>>2];g[m+4>>2]=4.0;c[n>>2]=0;h=f;s=m;c[h+0>>2]=c[s+0>>2];c[h+4>>2]=c[s+4>>2];s=e;h=n;c[s+0>>2]=c[h+0>>2];Ff(j,t,f,0,e,0.0);o=b;Je(o);p=b+40|0;Je(p);q=b+80|0;Je(q);r=b+120|0;Je(r);i=d;return}function Ne(b){b=b|0;var d=0,e=0,f=0.0,h=0.0,j=0;d=i;e=c[2824]|0;f=+(+g[e+8>>2]*.5);h=+(+g[e+12>>2]+16.0);j=b;g[j>>2]=f;g[j+4>>2]=h;j=b+8|0;c[j>>2]=1073741824;c[j+4>>2]=1073741824;c[b+16>>2]=sf(e+24|0,456875097,2)|0;g[b+24>>2]=0.0;g[b+28>>2]=0.0;g[b+32>>2]=2.0;g[b+36>>2]=-1.0;c[b+48>>2]=1;a[b+52|0]=0;c[b+56>>2]=3;c[b+20>>2]=0;i=d;return}function Oe(b,d){b=b|0;d=d|0;var e=0,f=0,h=0,j=0,k=0,l=0,m=0.0,n=0.0,o=0.0,p=0.0,q=0,r=0;e=i;i=i+16|0;f=e;h=e+8|0;j=b+52|0;if((a[j]|0)==0){k=0;i=e;return k|0}if(+g[b+36>>2]>0.0){k=0;i=e;return k|0}l=d;m=+g[l>>2];n=+g[b>>2]-m;m=+g[b+4>>2]- +g[l+4>>2];l=d+8|0;o=+g[l>>2];p=+g[b+8>>2]+o;o=+g[b+12>>2]+ +g[l+4>>2];if(!(n*n<p*p)){k=0;i=e;return k|0}if(!(m*m<o*o)){k=0;i=e;return k|0}a[j]=0;j=b+56|0;c[j>>2]=(c[j>>2]|0)+ -1;j=c[2824]|0;l=j+504|0;d=c[l>>2]|0;if(d>>>0<(c[j+508>>2]|0)>>>0){q=d+16|0;c[l>>2]=q;r=q}else{Ae(j+500|0);r=c[l>>2]|0}l=r+ -16|0;r=b;b=r;j=c[b+4>>2]|0;q=h;c[q>>2]=c[b>>2];c[q+4>>2]=j;j=f;q=h;c[j+0>>2]=c[q+0>>2];c[j+4>>2]=c[q+4>>2];Ee(l,f,1);f=c[2824]|0;o=+(+g[f+8>>2]*.5);m=+(+g[f+12>>2]+16.0);f=r;g[f>>2]=o;g[f+4>>2]=m;k=1;i=e;return k|0}function Pe(a,b){a=a|0;b=+b;var d=0,e=0,f=0,h=0.0,j=0.0,k=0,l=0,m=0,n=0,o=0,p=0.0,q=0.0,r=0,s=0.0,t=0.0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0,B=0.0,C=0.0,D=0.0;d=i;i=i+8|0;e=d;f=(c[2824]|0)+8|0;h=+g[f>>2];j=h*.5;h=+g[f+4>>2]*.75;lf(e);a:do{if(mf(e)|0){f=e+4|0;k=a+4|0;l=0;b:while(1){m=l+4|0;c:do{if((l|0)==0){while(1){n=c[f>>2]|0;if(+g[n+4>>2]<+g[k>>2]+-4.0){o=n;break c}if(!(mf(e)|0)){p=j;break a}}}else{while(1){n=c[f>>2]|0;q=+g[n+4>>2];if(q<+g[k>>2]+-4.0){if(q>+g[m>>2]){o=n;break c}}if(!(mf(e)|0)){r=l;break b}}}}while(0);if(mf(e)|0){l=o}else{r=o;break}}if((r|0)==0){p=j;break}p=+g[r>>2]}else{p=j}}while(0);r=a;j=+g[r>>2];q=(p-j)*2.0;p=(h- +g[r+4>>2])*2.0;do{if(+g[a+36>>2]<.800000011920929){r=c[2824]|0;o=c[r+416>>2]|0;e=c[r+420>>2]|0;r=o+(((e-o|0)/24|0)*24|0)|0;if((e|0)==(o|0)){s=p;t=q;break}h=+g[a+4>>2];u=q;v=p;e=o;while(1){o=e;w=+g[o>>2];x=j-w;w=h- +g[o+4>>2];y=x*x+w*w;if(y<4096.0){z=+V(+y);y=(64.0-z)*5.0/z;A=v+w*y;B=u+x*y}else{A=v;B=u}o=e+24|0;if((o|0)==(r|0)){s=A;t=B;break}else{u=B;v=A;e=o}}}else{s=p;t=q}}while(0);e=a+24|0;r=e;q=t*b+ +g[r>>2];g[r>>2]=q;o=a+28|0;t=s*b+ +g[o>>2];g[o>>2]=t;l=e;s=+V(+(q*q+t*t));if(s>80.0){p=80.0/s;g[r>>2]=q*p;q=p*t;g[o>>2]=q;C=q}else{C=t}e=l;t=+g[e>>2];q=+g[e+4>>2]*b;e=a;p=j+t*b;g[e>>2]=p;k=a+4|0;t=+g[k>>2]+q;g[k>>2]=t;do{if(p<8.0){g[e>>2]=8.0;g[r>>2]=0.0}else{q=+g[(c[2824]|0)+8>>2]+-8.0;if(!(p>q)){break}g[e>>2]=q;g[r>>2]=0.0}}while(0);do{if(t<0.0){g[k>>2]=0.0;g[o>>2]=0.0;D=0.0}else{p=+g[(c[2824]|0)+12>>2];if(!(t>p)){D=C;break}g[k>>2]=p;g[o>>2]=0.0;D=0.0}}while(0);k=l;C=+g[k>>2];t=+g[k+4>>2]*.5*b;g[r>>2]=C-C*.5*b;g[o>>2]=D-t;i=d;return}function Qe(b){b=b|0;var d=0,e=0,f=0,j=0,k=0,l=0,m=0.0,n=0,o=0,p=0,q=0,r=0.0,s=0.0,t=0.0,u=0,v=0,w=0,x=0,y=0,z=0;d=i;i=i+32|0;e=d;f=d+8|0;j=d+16|0;k=d+24|0;l=b+36|0;m=+g[l>>2];if(m>0.0){g[l>>2]=m- +h[(c[2824]|0)+128>>3]}n=b+20|0;o=c[n>>2]|0;if((o|0)==130){p=6}else if((o|0)==169){p=26}else if((o|0)==162){p=8}else if((o|0)==0){p=4}else{i=d;return}do{if((p|0)==26){m=+g[b+32>>2];o=b+32|0;if(m>0.0){q=o;r=m;break}g[o>>2]=.4000000059604645;p=4}}while(0);do{if((p|0)==4){if((c[b+56>>2]|0)>0){g[b+32>>2]=.4000000059604645;g[l>>2]=3.0;a[b+52|0]=1;p=6;break}c[n>>2]=-1;i=d;return}}while(0);do{if((p|0)==6){l=b+4|0;m=+g[l>>2];s=200.0-m;if(!(s>4.0)){p=8;break}g[l>>2]=m+s*.10000000149011612;c[n>>2]=130;i=d;return}}while(0);do{if((p|0)==8){if((a[b+52|0]|0)==0){g[b+32>>2]=1.5;q=b+32|0;r=1.5;break}l=c[2824]|0;s=+h[l+128>>3];o=b+32|0;m=+g[o>>2]-s;g[o>>2]=m;a:do{if(m<0.0){g[o>>2]=m+.4;do{if((c[l+444>>2]|0)==(c[l+440>>2]|0)){if((c[l+456>>2]|0)!=(c[l+452>>2]|0)){break}if((c[l+468>>2]|0)!=(c[l+464>>2]|0)){break}if((c[l+480>>2]|0)!=(c[l+476>>2]|0)){break}if((c[l+432>>2]|0)==(c[l+428>>2]|0)){t=s;break a}}}while(0);Af(sf(l+24|0,-1273653648,4)|0);u=c[2824]|0;v=u+492|0;w=c[v>>2]|0;if(w>>>0<(c[u+496>>2]|0)>>>0){x=w+24|0;c[v>>2]=x;y=x}else{Se(u+488|0);y=c[v>>2]|0}v=k;u=y+ -24|0;x=b;w=c[x+4>>2]|0;z=j;c[z>>2]=c[x>>2];c[z+4>>2]=w;w=k;c[w>>2]=0;c[w+4>>2]=-1018691584;w=f;z=j;c[w+0>>2]=c[z+0>>2];c[w+4>>2]=c[z+4>>2];z=e;w=v;c[z+0>>2]=c[w+0>>2];c[z+4>>2]=c[w+4>>2];Te(u,f,e);t=+h[(c[2824]|0)+128>>3]}else{t=s}}while(0);s=t*2.5*.25;Pe(b,s);Pe(b,s);Pe(b,s);Pe(b,s);s=+g[b+24>>2];do{if(s<-1.0){c[b+48>>2]=0}else{l=b+48|0;if(s>1.0){c[l>>2]=2;break}else{c[l>>2]=1;break}}}while(0);c[n>>2]=162;i=d;return}}while(0);g[q>>2]=r- +h[(c[2824]|0)+128>>3];c[n>>2]=169;i=d;return}function Re(b){b=b|0;var d=0,e=0,f=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=i;i=i+24|0;e=d;f=d+8|0;j=d+16|0;k=j;l=i;i=i+8|0;if((a[b+52|0]|0)==0){i=d;return}m=c[2824]|0;do{if(+g[b+36>>2]>0.0){if((~~(+h[m+112>>3]*8.0)&1|0)==0){break}i=d;return}}while(0);n=m+72|0;m=c[b+16>>2]|0;o=b;p=c[o+4>>2]|0;q=j;c[q>>2]=c[o>>2];c[q+4>>2]=p;p=c[b+48>>2]|0;c[l>>2]=0;b=f;q=k;c[b+0>>2]=c[q+0>>2];c[b+4>>2]=c[q+4>>2];q=e;b=l;c[q+0>>2]=c[b+0>>2];Ff(n,m,f,p,e,0.0);i=d;return}function Se(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;d=a+4|0;e=c[d>>2]|0;f=a;g=c[f>>2]|0;h=g;j=(e-h|0)/24|0;k=j+1|0;if(k>>>0>178956970){km(0)}l=a+8|0;a=((c[l>>2]|0)-h|0)/24|0;if(a>>>0<89478485){m=a<<1;a=m>>>0<k>>>0?k:m;if((a|0)==0){n=0;o=0}else{p=a;q=5}}else{p=178956970;q=5}if((q|0)==5){n=p;o=kp(p*24|0)|0}p=o+(j*24|0)|0;q=o+(n*24|0)|0;n=o+(k*24|0)|0;if((e|0)==(g|0)){r=p;s=e}else{k=j+ -1-(((e+ -24+(0-h)|0)>>>0)/24|0)|0;h=e;e=p;do{e=e+ -24|0;h=h+ -24|0;p=e;j=h;c[p+0>>2]=c[j+0>>2];c[p+4>>2]=c[j+4>>2];c[p+8>>2]=c[j+8>>2];c[p+12>>2]=c[j+12>>2];c[p+16>>2]=c[j+16>>2];c[p+20>>2]=c[j+20>>2];}while((h|0)!=(g|0));r=o+(k*24|0)|0;s=c[f>>2]|0}c[f>>2]=r;c[d>>2]=n;c[l>>2]=q;if((s|0)==0){i=b;return}mp(s);i=b;return}function Te(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,j=0.0;e=b;b=c[e+4>>2]|0;f=c[(c[2824]|0)+28>>2]|0;h=a;c[h>>2]=c[e>>2];c[h+4>>2]=b;j=+(c[f+8>>2]|0)*.5;g[a+8>>2]=+(c[f+4>>2]|0)*.5;g[a+12>>2]=j;f=d;d=c[f+4>>2]|0;b=a+16|0;c[b>>2]=c[f>>2];c[b+4>>2]=d;i=i;return}function Ue(a){a=a|0;var b=0,d=0,e=0,f=0.0,h=0.0,j=0.0,k=0;b=i;d=c[2824]|0;e=a;f=+g[e>>2];h=+g[e+4>>2];j=+g[d+16>>2];if(!(f>j+-16.0)){k=1;i=b;return k|0}if(!(f<j+ +g[d+8>>2]+16.0)){k=1;i=b;return k|0}j=+g[d+20>>2];if(!(h>j+-16.0)){k=1;i=b;return k|0}k=!(h<j+ +g[d+12>>2]+16.0);i=b;return k|0}function Ve(a){a=a|0;var b=0.0,d=0.0,e=0;b=+h[(c[2824]|0)+128>>3];d=b*+g[a+20>>2];e=a;g[e>>2]=+g[a+16>>2]*b+ +g[e>>2];e=a+4|0;g[e>>2]=d+ +g[e>>2];i=i;return}function We(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;b=i;i=i+24|0;d=b;e=b+8|0;f=b+16|0;g=i;i=i+8|0;h=c[2824]|0;j=h+72|0;k=c[h+28>>2]|0;h=a;a=c[h+4>>2]|0;l=f;c[l>>2]=c[h>>2];c[l+4>>2]=a;c[g>>2]=0;a=e;l=f;c[a+0>>2]=c[l+0>>2];c[a+4>>2]=c[l+4>>2];l=d;a=g;c[l+0>>2]=c[a+0>>2];Ff(j,k,e,0,d,0.0);i=b;return}function Xe(a){a=a|0;var b=0;b=i;c[a>>2]=sf((c[2824]|0)+24|0,-392912007,2)|0;c[a+4>>2]=sf((c[2824]|0)+24|0,-392912007,2)|0;c[a+8>>2]=sf((c[2824]|0)+24|0,-1527814013,2)|0;c[a+12>>2]=sf((c[2824]|0)+24|0,-1071190004,2)|0;c[a+16>>2]=sf((c[2824]|0)+24|0,45817824,2)|0;c[a+20>>2]=sf((c[2824]|0)+24|0,-1997103194,2)|0;c[a+24>>2]=sf((c[2824]|0)+24|0,1763204872,2)|0;c[a+28>>2]=sf((c[2824]|0)+24|0,1362877967,2)|0;c[a+32>>2]=sf((c[2824]|0)+24|0,263667913,2)|0;c[a+36>>2]=sf((c[2824]|0)+24|0,1092147005,2)|0;i=b;return}function Ye(b){b=b|0;a[b+8|0]=0;a[b+9|0]=0;a[b+10|0]=0;i=i;return}function Ze(b){b=b|0;a[b+8|0]=0;a[b+10|0]=0;i=i;return}function _e(b,d){b=b|0;d=d|0;var e=0,f=0,h=0,j=0.0,k=0,l=0.0,m=0,n=0.0,o=0.0;e=i;i=i+8|0;f=e;cb(c[(c[2824]|0)+4>>2]|0,f|0,f+4|0);h=(c[2824]|0)+8|0;j=+g[h>>2];k=f;l=j/+(c[k>>2]|0);j=+g[h+4>>2]/+(c[k+4>>2]|0);k=c[d>>2]|0;if((k|0)==1026){h=b+9|0;if((a[h]|0)==0){m=0;i=e;return m|0}a[b+10|0]=1;a[h]=0;n=+(l*+(c[d+12>>2]|0));o=+(j*+(c[d+16>>2]|0));h=b;g[h>>2]=n;g[h+4>>2]=o;m=1;i=e;return m|0}else if((k|0)==1024){if((a[b+9|0]|0)==0){m=0;i=e;return m|0}o=+(l*+(c[d+12>>2]|0));n=+(j*+(c[d+16>>2]|0));h=b;g[h>>2]=o;g[h+4>>2]=n;m=1;i=e;return m|0}else if((k|0)==1025){if((a[d+8|0]|0)!=1){m=0;i=e;return m|0}a[b+8|0]=1;a[b+9|0]=1;n=+(l*+(c[d+12>>2]|0));l=+(j*+(c[d+16>>2]|0));d=b;g[d>>2]=n;g[d+4>>2]=l;m=1;i=e;return m|0}else{m=0;i=e;return m|0}return 0}function $e(b,c){b=b|0;c=c|0;c=i;do{if((a[11824]|0)==0){if((Ja(11824)|0)==0){break}gf(11304);kd(111,11304,q|0)|0;xb(11824)}}while(0);bd(1,60,1);i=c;return 0}function af(a){a=a|0;var b=0;b=i;cf(a);i=b;return}function bf(){var a=0;a=i;jf(c[2824]|0);hf(c[2824]|0);i=a;return}function cf(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=i;d=c[a+500>>2]|0;if((d|0)!=0){e=a+504|0;f=c[e>>2]|0;if((f|0)!=(d|0)){c[e>>2]=f+(~((f+ -16+(0-d)|0)>>>4)<<4)}mp(d)}d=c[a+488>>2]|0;if((d|0)!=0){f=a+492|0;e=c[f>>2]|0;if((e|0)!=(d|0)){c[f>>2]=e+(~(((e+ -24+(0-d)|0)>>>0)/24|0)*24|0)}mp(d)}d=c[a+476>>2]|0;if((d|0)!=0){e=a+480|0;f=c[e>>2]|0;if((f|0)!=(d|0)){c[e>>2]=f+(~(((f+ -260+(0-d)|0)>>>0)/260|0)*260|0)}mp(d)}d=c[a+464>>2]|0;if((d|0)!=0){f=a+468|0;e=c[f>>2]|0;if((e|0)!=(d|0)){c[f>>2]=e+(~(((e+ -24+(0-d)|0)>>>0)/24|0)*24|0)}mp(d)}d=c[a+452>>2]|0;if((d|0)!=0){e=a+456|0;f=c[e>>2]|0;if((f|0)!=(d|0)){c[e>>2]=f+(~(((f+ -36+(0-d)|0)>>>0)/36|0)*36|0)}mp(d)}d=c[a+440>>2]|0;if((d|0)!=0){f=a+444|0;e=c[f>>2]|0;if((e|0)!=(d|0)){c[f>>2]=e+(~(((e+ -24+(0-d)|0)>>>0)/24|0)*24|0)}mp(d)}d=c[a+428>>2]|0;if((d|0)!=0){e=a+432|0;f=c[e>>2]|0;if((f|0)!=(d|0)){c[e>>2]=f+(~((f+ -32+(0-d)|0)>>>5)<<5)}mp(d)}d=c[a+416>>2]|0;if((d|0)==0){g=a+72|0;Cf(g);c[2824]=0;i=b;return}f=a+420|0;e=c[f>>2]|0;if((e|0)!=(d|0)){c[f>>2]=e+(~(((e+ -24+(0-d)|0)>>>0)/24|0)*24|0)}mp(d);g=a+72|0;Cf(g);c[2824]=0;i=b;return}function df(a){a=a|0;var b=0;b=i;c[a>>2]=sf((c[2824]|0)+24|0,1269553309,2)|0;c[a+4>>2]=sf((c[2824]|0)+24|0,610260169,2)|0;c[a+8>>2]=sf((c[2824]|0)+24|0,998725738,2)|0;c[a+12>>2]=sf((c[2824]|0)+24|0,-1907566963,2)|0;c[a+16>>2]=sf((c[2824]|0)+24|0,591972422,2)|0;i=b;return}function ef(a){a=a|0;var b=0,d=0,e=0,f=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0.0,S=0.0,T=0.0;b=i;i=i+256|0;d=b;e=b+8|0;f=b+16|0;j=b+24|0;k=b+32|0;l=b+40|0;m=b+48|0;n=b+56|0;o=b+64|0;p=b+72|0;q=b+80|0;r=b+88|0;s=b+96|0;t=b+104|0;u=b+112|0;v=b+120|0;w=b+128|0;x=b+136|0;y=b+144|0;z=b+152|0;A=b+160|0;B=b+168|0;C=b+176|0;D=b+184|0;E=b+192|0;F=b+200|0;G=b+208|0;H=b+216|0;I=b+224|0;J=b+232|0;K=b+240|0;L=b+248|0;M=(c[2824]|0)+72|0;N=a;O=c[N>>2]|0;g[w>>2]=0.0;g[w+4>>2]=0.0;c[x>>2]=0;P=v;Q=w;c[P+0>>2]=c[Q+0>>2];c[P+4>>2]=c[Q+4>>2];Q=u;P=x;c[Q+0>>2]=c[P+0>>2];Ff(M,O,v,0,u,0.0);u=(c[2824]|0)+72|0;v=c[N>>2]|0;R=+(c[v+8>>2]|0);g[y>>2]=0.0;g[y+4>>2]=R;c[z>>2]=0;N=t;O=y;c[N+0>>2]=c[O+0>>2];c[N+4>>2]=c[O+4>>2];O=s;N=z;c[O+0>>2]=c[N+0>>2];Ff(u,v,t,0,s,0.0);R=+_b(+(+h[(c[2824]|0)+112>>3]*64.0),240.0);s=(c[2824]|0)+72|0;t=a+4|0;v=c[t>>2]|0;S=R;g[A>>2]=0.0;g[A+4>>2]=S;c[B>>2]=0;u=r;N=A;c[u+0>>2]=c[N+0>>2];c[u+4>>2]=c[N+4>>2];N=q;u=B;c[N+0>>2]=c[u+0>>2];Ff(s,v,r,0,q,0.0);q=(c[2824]|0)+72|0;r=c[t>>2]|0;T=R- +(c[r+8>>2]|0);g[C>>2]=0.0;g[C+4>>2]=T;c[D>>2]=0;v=p;s=C;c[v+0>>2]=c[s+0>>2];c[v+4>>2]=c[s+4>>2];s=o;v=D;c[s+0>>2]=c[v+0>>2];Ff(q,r,p,0,o,0.0);o=(c[2824]|0)+72|0;p=c[t>>2]|0;T=R- +(c[p+8>>2]<<1|0);g[E>>2]=0.0;g[E+4>>2]=T;c[F>>2]=0;t=n;r=E;c[t+0>>2]=c[r+0>>2];c[t+4>>2]=c[r+4>>2];r=m;t=F;c[r+0>>2]=c[t+0>>2];Ff(o,p,n,0,m,0.0);m=c[2824]|0;n=m+72|0;p=a+8|0;a=c[p>>2]|0;g[G>>2]=+g[m+8>>2];g[G+4>>2]=S;c[H>>2]=0;m=l;o=G;c[m+0>>2]=c[o+0>>2];c[m+4>>2]=c[o+4>>2];o=k;m=H;c[o+0>>2]=c[m+0>>2];Ff(n,a,l,0,k,0.0);k=c[2824]|0;l=k+72|0;a=c[p>>2]|0;S=R- +(c[a+8>>2]|0);g[I>>2]=+g[k+8>>2];g[I+4>>2]=S;c[J>>2]=0;k=j;n=I;c[k+0>>2]=c[n+0>>2];c[k+4>>2]=c[n+4>>2];n=f;k=J;c[n+0>>2]=c[k+0>>2];Ff(l,a,j,0,f,0.0);f=c[2824]|0;j=f+72|0;a=c[p>>2]|0;S=R+ +(c[a+8>>2]|0);g[K>>2]=+g[f+8>>2];g[K+4>>2]=S;c[L>>2]=0;f=e;p=K;c[f+0>>2]=c[p+0>>2];c[f+4>>2]=c[p+4>>2];p=d;f=L;c[p+0>>2]=c[f+0>>2];Ff(j,a,e,0,d,0.0);i=b;return}function ff(a){a=a|0;var b=0,d=0,e=0,f=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0.0,G=0,H=0,I=0.0,J=0,K=0,L=0.0;b=i;i=i+192|0;d=b;e=b+8|0;f=b+16|0;j=b+24|0;k=b+32|0;l=b+40|0;m=b+48|0;n=b+56|0;o=b+64|0;p=b+72|0;q=b+80|0;r=b+88|0;s=b+96|0;t=b+104|0;u=b+112|0;v=b+120|0;w=b+128|0;x=b+136|0;y=b+144|0;z=b+152|0;A=b+160|0;B=b+168|0;C=b+176|0;D=b+184|0;E=a+12|0;F=+_b(+(+h[(c[2824]|0)+112>>3]*300.0),+(+(c[(c[E>>2]|0)+8>>2]|0)));G=(c[2824]|0)+72|0;H=c[E>>2]|0;I=F;g[s>>2]=0.0;g[s+4>>2]=I;c[t>>2]=0;J=r;K=s;c[J+0>>2]=c[K+0>>2];c[J+4>>2]=c[K+4>>2];K=q;J=t;c[K+0>>2]=c[J+0>>2];Ff(G,H,r,0,q,0.0);q=(c[2824]|0)+72|0;r=c[E>>2]|0;L=F- +(c[r+8>>2]|0);g[u>>2]=0.0;g[u+4>>2]=L;c[v>>2]=0;H=p;G=u;c[H+0>>2]=c[G+0>>2];c[H+4>>2]=c[G+4>>2];G=o;H=v;c[G+0>>2]=c[H+0>>2];Ff(q,r,p,0,o,0.0);o=(c[2824]|0)+72|0;p=c[E>>2]|0;L=F+ +(c[p+8>>2]|0);g[w>>2]=0.0;g[w+4>>2]=L;c[x>>2]=0;E=n;r=w;c[E+0>>2]=c[r+0>>2];c[E+4>>2]=c[r+4>>2];r=m;E=x;c[r+0>>2]=c[E+0>>2];Ff(o,p,n,0,m,0.0);m=c[2824]|0;n=m+72|0;p=a+16|0;a=c[p>>2]|0;g[y>>2]=+g[m+8>>2];g[y+4>>2]=I;c[z>>2]=0;m=l;o=y;c[m+0>>2]=c[o+0>>2];c[m+4>>2]=c[o+4>>2];o=k;m=z;c[o+0>>2]=c[m+0>>2];Ff(n,a,l,0,k,0.0);k=c[2824]|0;l=k+72|0;a=c[p>>2]|0;I=F- +(c[a+8>>2]|0);g[A>>2]=+g[k+8>>2];g[A+4>>2]=I;c[B>>2]=0;k=j;n=A;c[k+0>>2]=c[n+0>>2];c[k+4>>2]=c[n+4>>2];n=f;k=B;c[n+0>>2]=c[k+0>>2];Ff(l,a,j,0,f,0.0);f=c[2824]|0;j=f+72|0;a=c[p>>2]|0;I=F+ +(c[a+8>>2]|0);g[C>>2]=+g[f+8>>2];g[C+4>>2]=I;c[D>>2]=0;f=e;p=C;c[f+0>>2]=c[p+0>>2];c[f+4>>2]=c[p+4>>2];p=d;f=D;c[p+0>>2]=c[f+0>>2];Ff(j,a,e,0,d,0.0);i=b;return}function gf(b){b=b|0;var d=0,e=0,f=0,g=0,j=0,k=0;d=i;i=i+16|0;e=d;f=d+8|0;c[2824]=b;c[b+4>>2]=Nf(11832,640,960)|0;Kf(b+8|0,160.0);rf(b+24|0,11848,0);Xe(b+28|0);g=tf(512)|0;c[b+68>>2]=g;j=b+72|0;c[f>>2]=g;g=e;k=f;c[g+0>>2]=c[k+0>>2];Bf(j,e);c[b+96>>2]=Cc()|0;c[b+100>>2]=0;h[b+104>>3]=1.0;e=b+128|0;j=b+112|0;c[j+0>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;c[j+12>>2]=0;h[e>>3]=.016666666666666666;Ye(b+136|0);df(b+148|0);Ke(b+168|0);Ne(b+356|0);e=b+416|0;b=e+0|0;j=b+96|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(j|0));a[e+96|0]=0;i=d;return}function hf(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;b=i;i=i+32|0;d=b;e=b+8|0;f=b+16|0;h=b+24|0;Oc(16384);j=a+72|0;Ef(j,a+8|0,0);k=a+148|0;ef(k);ff(k);k=c[a+64>>2]|0;l=a+168|0;g[f>>2]=+g[a+332>>2];g[f+4>>2]=-6.0;c[h>>2]=0;m=e;n=f;c[m+0>>2]=c[n+0>>2];c[m+4>>2]=c[n+4>>2];n=d;m=h;c[n+0>>2]=c[m+0>>2];Ff(j,k,e,0,d,0.0);d=c[a+476>>2]|0;e=c[a+480>>2]|0;k=d+(((e-d|0)/260|0)*260|0)|0;if((e|0)!=(d|0)){e=d;do{pe(e);e=e+260|0;}while((e|0)!=(k|0))}k=c[a+464>>2]|0;e=c[a+468>>2]|0;d=k+(((e-k|0)/24|0)*24|0)|0;if((e|0)!=(k|0)){e=k;do{te(e);e=e+24|0;}while((e|0)!=(d|0))}d=c[a+452>>2]|0;e=c[a+456>>2]|0;k=d+(((e-d|0)/36|0)*36|0)|0;if((e|0)!=(d|0)){e=d;do{xe(e);e=e+36|0;}while((e|0)!=(k|0))}k=c[a+440>>2]|0;e=c[a+444>>2]|0;d=k+(((e-k|0)/24|0)*24|0)|0;if((e|0)!=(k|0)){e=k;do{De(e);e=e+24|0;}while((e|0)!=(d|0))}d=c[a+500>>2]|0;e=(c[a+504>>2]|0)-d>>4;k=d+(e<<4)|0;if((e|0)!=0){e=d;do{He(e);e=e+16|0;}while((e|0)!=(k|0))}k=c[a+428>>2]|0;e=(c[a+432>>2]|0)-k>>5;d=k+(e<<5)|0;if((e|0)!=0){e=k;do{le(e);e=e+32|0;}while((e|0)!=(d|0))}d=c[a+416>>2]|0;e=c[a+420>>2]|0;k=d+(((e-d|0)/24|0)*24|0)|0;if((e|0)!=(d|0)){e=d;do{he(e);e=e+24|0;}while((e|0)!=(k|0))}k=c[a+488>>2]|0;e=c[a+492>>2]|0;d=k+(((e-k|0)/24|0)*24|0)|0;if((e|0)==(k|0)){o=a+356|0;Re(o);Me(l);Hf(j);p=a+4|0;q=c[p>>2]|0;Qc(q|0);i=b;return}e=k;do{We(e);e=e+24|0;}while((e|0)!=(d|0));o=a+356|0;Re(o);Me(l);Hf(j);p=a+4|0;q=c[p>>2]|0;Qc(q|0);i=b;return}function jf(b){b=b|0;var e=0,f=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0.0,x=0.0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0.0,aa=0.0,ba=0,ca=0,da=0,ea=0.0,fa=0.0,ga=0.0,ha=0.0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0;e=i;i=i+128|0;f=e;j=e+8|0;k=e+16|0;l=e+24|0;m=e+32|0;n=e+40|0;o=e+48|0;p=e+56|0;q=e+64|0;r=e+72|0;s=e+80|0;t=Cc()|0;u=b+96|0;v=t-(c[u>>2]|0)|0;c[b+100>>2]=v;c[u>>2]=t;w=+h[b+104>>3]*+(v|0)*.001;h[b+120>>3]=w;v=b+112|0;h[v>>3]=+h[v>>3]+w;v=b+128|0;x=+h[v>>3];h[v>>3]=x+(w-x)*.025;v=b+136|0;Ze(v);if((Lc(s|0)|0)!=0){t=s;u=b+512|0;y=s+16|0;do{if(!(_e(v,s)|0)){z=c[t>>2]|0;do{if((z|0)==256){A=1}else{if((z|0)!=768){A=0;break}A=(c[y>>2]|0)==27}}while(0);a[u]=d[u]|0|A&1}}while((Lc(s|0)|0)!=0)}Le(b+168|0);x=+g[b+12>>2]+30.0;s=b+440|0;A=c[s>>2]|0;u=b+444|0;a:do{if((c[u>>2]|0)!=(A|0)){y=A;do{t=y+4|0;v=y;z=y;while(1){Ce(y);if(+g[t>>2]<x){break}B=c[u>>2]|0;C=B+ -24|0;if((v|0)==(C|0)){D=B}else{B=C;c[z+0>>2]=c[B+0>>2];c[z+4>>2]=c[B+4>>2];c[z+8>>2]=c[B+8>>2];c[z+12>>2]=c[B+12>>2];c[z+16>>2]=c[B+16>>2];c[z+20>>2]=c[B+20>>2];D=c[u>>2]|0}B=D+(~(((D+ -24+(0-(D+ -24))|0)>>>0)/24|0)*24|0)|0;c[u>>2]=B;C=c[s>>2]|0;if((y|0)==(C+(((B-C|0)/24|0)*24|0)|0)){break a}}y=y+24|0;z=c[s>>2]|0;}while((y|0)!=(z+((((c[u>>2]|0)-z|0)/24|0)*24|0)|0))}}while(0);D=b+452|0;A=c[D>>2]|0;y=b+456|0;b:do{if((c[y>>2]|0)!=(A|0)){z=A;do{v=z+4|0;t=z;C=z;while(1){we(z);if(+g[v>>2]<x){break}B=c[y>>2]|0;E=B+ -36|0;if((t|0)==(E|0)){F=B}else{G=C+0|0;H=E+0|0;I=G+36|0;do{c[G>>2]=c[H>>2];G=G+4|0;H=H+4|0}while((G|0)<(I|0));F=c[y>>2]|0}E=F+(~(((F+ -36+(0-(F+ -36))|0)>>>0)/36|0)*36|0)|0;c[y>>2]=E;B=c[D>>2]|0;if((z|0)==(B+(((E-B|0)/36|0)*36|0)|0)){break b}}z=z+36|0;C=c[D>>2]|0;}while((z|0)!=(C+((((c[y>>2]|0)-C|0)/36|0)*36|0)|0))}}while(0);F=b+464|0;A=c[F>>2]|0;z=b+468|0;c:do{if((c[z>>2]|0)!=(A|0)){C=A;do{t=C+4|0;v=C;B=C;while(1){se(C);if(+g[t>>2]<x){break}E=c[z>>2]|0;J=E+ -24|0;if((v|0)==(J|0)){K=E}else{E=J;c[B+0>>2]=c[E+0>>2];c[B+4>>2]=c[E+4>>2];c[B+8>>2]=c[E+8>>2];c[B+12>>2]=c[E+12>>2];c[B+16>>2]=c[E+16>>2];c[B+20>>2]=c[E+20>>2];K=c[z>>2]|0}E=K+(~(((K+ -24+(0-(K+ -24))|0)>>>0)/24|0)*24|0)|0;c[z>>2]=E;J=c[F>>2]|0;if((C|0)==(J+(((E-J|0)/24|0)*24|0)|0)){break c}}C=C+24|0;B=c[F>>2]|0;}while((C|0)!=(B+((((c[z>>2]|0)-B|0)/24|0)*24|0)|0))}}while(0);K=b+476|0;A=c[K>>2]|0;C=b+480|0;d:do{if((c[C>>2]|0)!=(A|0)){w=x+30.0;B=A;do{v=B+4|0;t=B;J=B;while(1){oe(B);if(+g[v>>2]<w){break}E=c[C>>2]|0;L=E+ -260|0;if((t|0)==(L|0)){M=E}else{Cp(J|0,L|0,260)|0;M=c[C>>2]|0}L=M+(~(((M+ -260+(0-(M+ -260))|0)>>>0)/260|0)*260|0)|0;c[C>>2]=L;E=c[K>>2]|0;if((B|0)==(E+(((L-E|0)/260|0)*260|0)|0)){break d}}B=B+260|0;J=c[K>>2]|0;}while((B|0)!=(J+((((c[C>>2]|0)-J|0)/260|0)*260|0)|0))}}while(0);M=b+356|0;Qe(M);A=b+488|0;B=c[A>>2]|0;J=b+492|0;e:do{if((c[J>>2]|0)!=(B|0)){t=b+428|0;v=b+432|0;E=q;L=p;N=o;O=n;P=r;Q=B;do{R=Q;S=Q;T=Q;U=Q+4|0;V=Q+8|0;W=Q+12|0;X=Q;f:while(1){Ve(Q);g:do{if(Ue(Q)|0){Y=c[J>>2]|0;Z=Y+ -24|0;if((R|0)==(Z|0)){_=Y}else{Y=Z;c[S+0>>2]=c[Y+0>>2];c[S+4>>2]=c[Y+4>>2];c[S+8>>2]=c[Y+8>>2];c[S+12>>2]=c[Y+12>>2];c[S+16>>2]=c[Y+16>>2];c[S+20>>2]=c[Y+20>>2];_=c[J>>2]|0}c[J>>2]=_+(~(((_+ -24+(0-(_+ -24))|0)>>>0)/24|0)*24|0)}else{Y=c[t>>2]|0;Z=c[v>>2]|0;h:do{if((Z|0)!=(Y|0)){x=+g[T>>2];w=+g[U>>2];$=+g[V>>2];aa=+g[W>>2];ba=Y+(Z-Y>>5<<5)|0;ca=Y;while(1){da=ca;ea=+g[da>>2];fa=x-ea;ea=w- +g[da+4>>2];da=ca+8|0;ga=+g[da>>2];ha=$+ga;ga=aa+ +g[da+4>>2];if(fa*fa<ha*ha){if(ea*ea<ga*ga){break}}da=ca+32|0;if((da|0)==(ba|0)){break h}else{ca=da}}if(ze(ca,5,1)|0){ba=c[v>>2]|0;da=ba+ -32|0;if((ca|0)==(da|0)){ia=ba}else{ba=ca;ja=da;c[ba+0>>2]=c[ja+0>>2];c[ba+4>>2]=c[ja+4>>2];c[ba+8>>2]=c[ja+8>>2];c[ba+12>>2]=c[ja+12>>2];c[ba+16>>2]=c[ja+16>>2];c[ba+20>>2]=c[ja+20>>2];c[ba+24>>2]=c[ja+24>>2];c[ba+28>>2]=c[ja+28>>2];ia=c[v>>2]|0}c[v>>2]=ia+(~((ia+ -32+(0-(ia+ -32))|0)>>>5)<<5)}ja=c[2824]|0;ba=ja+504|0;da=c[ba>>2]|0;if(da>>>0<(c[ja+508>>2]|0)>>>0){ka=da+16|0;c[ba>>2]=ka;la=ka}else{Ae(ja+500|0);la=c[ba>>2]|0}ba=la+ -16|0;ja=X;ka=c[ja+4>>2]|0;da=n;c[da>>2]=c[ja>>2];c[da+4>>2]=ka;ka=m;da=O;c[ka+0>>2]=c[da+0>>2];c[ka+4>>2]=c[da+4>>2];Ee(ba,m,0);ba=(c[2824]|0)+492|0;da=c[ba>>2]|0;ka=da+ -24|0;if((R|0)==(ka|0)){ma=da}else{da=ka;c[S+0>>2]=c[da+0>>2];c[S+4>>2]=c[da+4>>2];c[S+8>>2]=c[da+8>>2];c[S+12>>2]=c[da+12>>2];c[S+16>>2]=c[da+16>>2];c[S+20>>2]=c[da+20>>2];ma=c[ba>>2]|0}c[ba>>2]=ma+(~(((ma+ -24+(0-(ma+ -24))|0)>>>0)/24|0)*24|0);break g}}while(0);Y=c[s>>2]|0;Z=c[u>>2]|0;i:do{if((Z|0)!=(Y|0)){aa=+g[T>>2];$=+g[U>>2];w=+g[V>>2];x=+g[W>>2];ba=Y+(((Z-Y|0)/24|0)*24|0)|0;da=Y;while(1){ka=da;ga=+g[ka>>2];ea=aa-ga;ga=$- +g[ka+4>>2];ka=da+8|0;ha=+g[ka>>2];fa=w+ha;ha=x+ +g[ka+4>>2];if(ea*ea<fa*fa){if(ga*ga<ha*ha){break}}ka=da+24|0;if((ka|0)==(ba|0)){break i}else{da=ka}}if(ze(da,5,1)|0){ba=c[u>>2]|0;ca=ba+ -24|0;if((da|0)==(ca|0)){na=ba}else{ba=da;ka=ca;c[ba+0>>2]=c[ka+0>>2];c[ba+4>>2]=c[ka+4>>2];c[ba+8>>2]=c[ka+8>>2];c[ba+12>>2]=c[ka+12>>2];c[ba+16>>2]=c[ka+16>>2];c[ba+20>>2]=c[ka+20>>2];na=c[u>>2]|0}c[u>>2]=na+(~(((na+ -24+(0-(na+ -24))|0)>>>0)/24|0)*24|0)}ka=c[2824]|0;ba=ka+504|0;ca=c[ba>>2]|0;if(ca>>>0<(c[ka+508>>2]|0)>>>0){ja=ca+16|0;c[ba>>2]=ja;oa=ja}else{Ae(ka+500|0);oa=c[ba>>2]|0}ba=oa+ -16|0;ka=X;ja=c[ka+4>>2]|0;ca=o;c[ca>>2]=c[ka>>2];c[ca+4>>2]=ja;ja=l;ca=N;c[ja+0>>2]=c[ca+0>>2];c[ja+4>>2]=c[ca+4>>2];Ee(ba,l,0);ba=(c[2824]|0)+492|0;ca=c[ba>>2]|0;ja=ca+ -24|0;if((R|0)==(ja|0)){pa=ca}else{ca=ja;c[S+0>>2]=c[ca+0>>2];c[S+4>>2]=c[ca+4>>2];c[S+8>>2]=c[ca+8>>2];c[S+12>>2]=c[ca+12>>2];c[S+16>>2]=c[ca+16>>2];c[S+20>>2]=c[ca+20>>2];pa=c[ba>>2]|0}c[ba>>2]=pa+(~(((pa+ -24+(0-(pa+ -24))|0)>>>0)/24|0)*24|0);break g}}while(0);Y=c[D>>2]|0;Z=c[y>>2]|0;j:do{if((Z|0)!=(Y|0)){x=+g[T>>2];w=+g[U>>2];$=+g[V>>2];aa=+g[W>>2];ba=Y+(((Z-Y|0)/36|0)*36|0)|0;ca=Y;while(1){ja=ca;ha=+g[ja>>2];ga=x-ha;ha=w- +g[ja+4>>2];ja=ca+8|0;fa=+g[ja>>2];ea=$+fa;fa=aa+ +g[ja+4>>2];if(ga*ga<ea*ea){if(ha*ha<fa*fa){break}}ja=ca+36|0;if((ja|0)==(ba|0)){break j}else{ca=ja}}if(ze(ca,5,1)|0){ba=c[y>>2]|0;da=ba+ -36|0;if((ca|0)==(da|0)){qa=ba}else{G=ca+0|0;H=da+0|0;I=G+36|0;do{c[G>>2]=c[H>>2];G=G+4|0;H=H+4|0}while((G|0)<(I|0));qa=c[y>>2]|0}c[y>>2]=qa+(~(((qa+ -36+(0-(qa+ -36))|0)>>>0)/36|0)*36|0)}ca=c[2824]|0;da=ca+504|0;ba=c[da>>2]|0;if(ba>>>0<(c[ca+508>>2]|0)>>>0){ja=ba+16|0;c[da>>2]=ja;ra=ja}else{Ae(ca+500|0);ra=c[da>>2]|0}da=ra+ -16|0;ca=X;ja=c[ca+4>>2]|0;ba=p;c[ba>>2]=c[ca>>2];c[ba+4>>2]=ja;ja=k;ba=L;c[ja+0>>2]=c[ba+0>>2];c[ja+4>>2]=c[ba+4>>2];Ee(da,k,0);da=(c[2824]|0)+492|0;ba=c[da>>2]|0;ja=ba+ -24|0;if((R|0)==(ja|0)){sa=ba}else{ba=ja;c[S+0>>2]=c[ba+0>>2];c[S+4>>2]=c[ba+4>>2];c[S+8>>2]=c[ba+8>>2];c[S+12>>2]=c[ba+12>>2];c[S+16>>2]=c[ba+16>>2];c[S+20>>2]=c[ba+20>>2];sa=c[da>>2]|0}c[da>>2]=sa+(~(((sa+ -24+(0-(sa+ -24))|0)>>>0)/24|0)*24|0);break g}}while(0);Y=c[F>>2]|0;Z=c[z>>2]|0;if((Z|0)==(Y|0)){break f}aa=+g[T>>2];$=+g[U>>2];w=+g[V>>2];x=+g[W>>2];da=Y+(((Z-Y|0)/24|0)*24|0)|0;Z=Y;while(1){Y=Z;fa=+g[Y>>2];ha=aa-fa;fa=$- +g[Y+4>>2];Y=Z+8|0;ea=+g[Y>>2];ga=w+ea;ea=x+ +g[Y+4>>2];if(ha*ha<ga*ga){if(fa*fa<ea*ea){break}}Y=Z+24|0;if((Y|0)==(da|0)){break f}else{Z=Y}}if(ze(Z,5,1)|0){da=c[z>>2]|0;Y=da+ -24|0;if((Z|0)==(Y|0)){ta=da}else{da=Z;ba=Y;c[da+0>>2]=c[ba+0>>2];c[da+4>>2]=c[ba+4>>2];c[da+8>>2]=c[ba+8>>2];c[da+12>>2]=c[ba+12>>2];c[da+16>>2]=c[ba+16>>2];c[da+20>>2]=c[ba+20>>2];ta=c[z>>2]|0}c[z>>2]=ta+(~(((ta+ -24+(0-(ta+ -24))|0)>>>0)/24|0)*24|0)}ba=c[2824]|0;da=ba+504|0;Y=c[da>>2]|0;if(Y>>>0<(c[ba+508>>2]|0)>>>0){ja=Y+16|0;c[da>>2]=ja;ua=ja}else{Ae(ba+500|0);ua=c[da>>2]|0}da=ua+ -16|0;ba=X;ja=c[ba+4>>2]|0;Y=q;c[Y>>2]=c[ba>>2];c[Y+4>>2]=ja;ja=j;Y=E;c[ja+0>>2]=c[Y+0>>2];c[ja+4>>2]=c[Y+4>>2];Ee(da,j,0);da=(c[2824]|0)+492|0;Y=c[da>>2]|0;ja=Y+ -24|0;if((R|0)==(ja|0)){va=Y}else{Y=ja;c[S+0>>2]=c[Y+0>>2];c[S+4>>2]=c[Y+4>>2];c[S+8>>2]=c[Y+8>>2];c[S+12>>2]=c[Y+12>>2];c[S+16>>2]=c[Y+16>>2];c[S+20>>2]=c[Y+20>>2];va=c[da>>2]|0}c[da>>2]=va+(~(((va+ -24+(0-(va+ -24))|0)>>>0)/24|0)*24|0)}}while(0);da=c[A>>2]|0;if((Q|0)==(da+((((c[J>>2]|0)-da|0)/24|0)*24|0)|0)){break e}}da=c[K>>2]|0;Y=c[C>>2]|0;k:do{if((Y|0)==(da|0)){wa=0}else{x=+g[T>>2];w=+g[U>>2];$=+g[V>>2];aa=+g[W>>2];ja=da+(((Y-da|0)/260|0)*260|0)|0;ba=da;while(1){ca=ba;ea=+g[ca>>2];fa=x-ea;ea=w- +g[ca+4>>2];ca=ba+8|0;ga=+g[ca>>2];ha=$+ga;ga=aa+ +g[ca+4>>2];if(fa*fa<ha*ha){if(ea*ea<ga*ga){break}}ca=ba+260|0;if((ca|0)==(ja|0)){wa=0;break k}else{ba=ca}}if(ze(ba,5,1)|0){ja=c[C>>2]|0;ca=ja+ -260|0;if((ba|0)==(ca|0)){xa=ja}else{Cp(ba|0,ca|0,260)|0;xa=c[C>>2]|0}c[C>>2]=xa+(~(((xa+ -260+(0-(xa+ -260))|0)>>>0)/260|0)*260|0)}ca=c[2824]|0;ja=ca+504|0;ka=c[ja>>2]|0;if(ka>>>0<(c[ca+508>>2]|0)>>>0){ya=ka+16|0;c[ja>>2]=ya;za=ya}else{Ae(ca+500|0);za=c[ja>>2]|0}ja=za+ -16|0;ca=X;ya=c[ca+4>>2]|0;ka=r;c[ka>>2]=c[ca>>2];c[ka+4>>2]=ya;ya=f;ka=P;c[ya+0>>2]=c[ka+0>>2];c[ya+4>>2]=c[ka+4>>2];Ee(ja,f,0);ja=(c[2824]|0)+492|0;ka=c[ja>>2]|0;ya=ka+ -24|0;if((R|0)==(ya|0)){Aa=ka}else{ka=ya;c[S+0>>2]=c[ka+0>>2];c[S+4>>2]=c[ka+4>>2];c[S+8>>2]=c[ka+8>>2];c[S+12>>2]=c[ka+12>>2];c[S+16>>2]=c[ka+16>>2];c[S+20>>2]=c[ka+20>>2];Aa=c[ja>>2]|0}c[ja>>2]=Aa+(~(((Aa+ -24+(0-(Aa+ -24))|0)>>>0)/24|0)*24|0);wa=1}}while(0);Q=wa?Q:Q+24|0;S=c[A>>2]|0;}while((Q|0)!=(S+((((c[J>>2]|0)-S|0)/24|0)*24|0)|0))}}while(0);J=b+416|0;A=c[J>>2]|0;wa=b+420|0;l:do{if((c[wa>>2]|0)!=(A|0)){Aa=A;do{f=Aa;r=Aa;za=Aa;while(1){ge(Aa);if(fe(Aa)|0){xa=c[wa>>2]|0;C=xa+ -24|0;if((f|0)==(C|0)){Ba=xa}else{xa=C;c[r+0>>2]=c[xa+0>>2];c[r+4>>2]=c[xa+4>>2];c[r+8>>2]=c[xa+8>>2];c[r+12>>2]=c[xa+12>>2];c[r+16>>2]=c[xa+16>>2];c[r+20>>2]=c[xa+20>>2];Ba=c[wa>>2]|0}Ca=Ba+(~(((Ba+ -24+(0-(Ba+ -24))|0)>>>0)/24|0)*24|0)|0}else{if(!(Oe(M,za)|0)){break}xa=c[wa>>2]|0;C=xa+ -24|0;if((f|0)==(C|0)){Da=xa}else{xa=C;c[r+0>>2]=c[xa+0>>2];c[r+4>>2]=c[xa+4>>2];c[r+8>>2]=c[xa+8>>2];c[r+12>>2]=c[xa+12>>2];c[r+16>>2]=c[xa+16>>2];c[r+20>>2]=c[xa+20>>2];Da=c[wa>>2]|0}Ca=Da+(~(((Da+ -24+(0-(Da+ -24))|0)>>>0)/24|0)*24|0)|0}c[wa>>2]=Ca;xa=c[J>>2]|0;if((Aa|0)==(xa+(((Ca-xa|0)/24|0)*24|0)|0)){break l}}Aa=Aa+24|0;r=c[J>>2]|0;}while((Aa|0)!=(r+((((c[wa>>2]|0)-r|0)/24|0)*24|0)|0))}}while(0);wa=b+428|0;J=c[wa>>2]|0;Ca=b+432|0;m:do{if((c[Ca>>2]|0)!=(J|0)){Da=J;do{Ba=Da;A=Da;Aa=Da;while(1){ke(Da);if(je(Da)|0){r=c[Ca>>2]|0;f=r+ -32|0;if((Ba|0)==(f|0)){Ea=r}else{r=f;c[A+0>>2]=c[r+0>>2];c[A+4>>2]=c[r+4>>2];c[A+8>>2]=c[r+8>>2];c[A+12>>2]=c[r+12>>2];c[A+16>>2]=c[r+16>>2];c[A+20>>2]=c[r+20>>2];c[A+24>>2]=c[r+24>>2];c[A+28>>2]=c[r+28>>2];Ea=c[Ca>>2]|0}Fa=Ea+(~((Ea+ -32+(0-(Ea+ -32))|0)>>>5)<<5)|0}else{if(!(Oe(M,Aa)|0)){break}r=c[Ca>>2]|0;f=r+ -32|0;if((Ba|0)==(f|0)){Ga=r}else{r=f;c[A+0>>2]=c[r+0>>2];c[A+4>>2]=c[r+4>>2];c[A+8>>2]=c[r+8>>2];c[A+12>>2]=c[r+12>>2];c[A+16>>2]=c[r+16>>2];c[A+20>>2]=c[r+20>>2];c[A+24>>2]=c[r+24>>2];c[A+28>>2]=c[r+28>>2];Ga=c[Ca>>2]|0}Fa=Ga+(~((Ga+ -32+(0-(Ga+ -32))|0)>>>5)<<5)|0}c[Ca>>2]=Fa;r=c[wa>>2]|0;if((Da|0)==(r+(Fa-r>>5<<5)|0)){break m}}Da=Da+32|0;A=c[wa>>2]|0;}while((Da|0)!=(A+((c[Ca>>2]|0)-A>>5<<5)|0))}}while(0);Ca=b+500|0;wa=c[Ca>>2]|0;Fa=b+504|0;if((c[Fa>>2]|0)==(wa|0)){i=e;return}b=wa;n:while(1){wa=b;Ga=b;while(1){Ge(b);if(!(Fe(b)|0)){break}M=c[Fa>>2]|0;Ea=M+ -16|0;if((wa|0)==(Ea|0)){Ha=M}else{M=Ea;c[Ga+0>>2]=c[M+0>>2];c[Ga+4>>2]=c[M+4>>2];c[Ga+8>>2]=c[M+8>>2];c[Ga+12>>2]=c[M+12>>2];Ha=c[Fa>>2]|0}M=Ha+(~((Ha+ -16+(0-(Ha+ -16))|0)>>>4)<<4)|0;c[Fa>>2]=M;Ea=c[Ca>>2]|0;if((b|0)==(Ea+(M-Ea>>4<<4)|0)){Ia=159;break n}}Ga=b+16|0;wa=c[Ca>>2]|0;if((Ga|0)==(wa+((c[Fa>>2]|0)-wa>>4<<4)|0)){Ia=159;break}else{b=Ga}}if((Ia|0)==159){i=e;return}}function kf(a){a=a|0;var b=0,d=0,e=0.0,f=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;d=c[a+340>>2]|0;if((d|0)==4){e=+g[a+328>>2];f=a+480|0;h=c[f>>2]|0;if(h>>>0<(c[a+484>>2]|0)>>>0){j=h+260|0;c[f>>2]=j;k=j}else{nf(a+476|0);k=c[f>>2]|0}ne(k+ -260|0,e);i=b;return}else if((d|0)==3){e=+g[a+328>>2];k=a+468|0;f=c[k>>2]|0;if(f>>>0<(c[a+472>>2]|0)>>>0){j=f+24|0;c[k>>2]=j;l=j}else{of(a+464|0);l=c[k>>2]|0}re(l+ -24|0,e);i=b;return}else if((d|0)==2){e=+g[a+328>>2];l=a+456|0;k=c[l>>2]|0;if(k>>>0<(c[a+460>>2]|0)>>>0){j=k+36|0;c[l>>2]=j;m=j}else{pf(a+452|0);m=c[l>>2]|0}ve(m+ -36|0,e);i=b;return}else if((d|0)==1){e=+g[a+328>>2];d=a+444|0;m=c[d>>2]|0;if(m>>>0<(c[a+448>>2]|0)>>>0){l=m+24|0;c[d>>2]=l;n=l}else{qf(a+440|0);n=c[d>>2]|0}Be(n+ -24|0,e);i=b;return}else{i=b;return}}function lf(a){a=a|0;c[a+4>>2]=0;c[a>>2]=0;i=i;return}function mf(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;b=i;d=a;switch(c[d>>2]|0){case 201:{e=a+4|0;f=(c[e>>2]|0)+32|0;c[e>>2]=f;g=f;break};case 195:{f=a+4|0;e=(c[f>>2]|0)+24|0;c[f>>2]=e;h=e;j=11;break};case 0:{e=c[(c[2824]|0)+440>>2]|0;c[a+4>>2]=e;k=a+4|0;l=e;j=3;break};case 189:{e=a+4|0;f=(c[e>>2]|0)+24|0;c[e>>2]=f;k=e;l=f;j=3;break};case 192:{f=a+4|0;e=(c[f>>2]|0)+36|0;c[f>>2]=e;m=e;j=7;break};case 198:{e=a+4|0;f=(c[e>>2]|0)+260|0;c[e>>2]=f;n=f;j=15;break};default:{o=0;i=b;return o|0}}do{if((j|0)==3){f=c[2824]|0;e=c[f+440>>2]|0;if((l|0)==(e+((((c[f+444>>2]|0)-e|0)/24|0)*24|0)|0)){e=c[f+452>>2]|0;c[k>>2]=e;m=e;j=7;break}c[d>>2]=189;o=1;i=b;return o|0}}while(0);do{if((j|0)==7){k=c[2824]|0;l=c[k+452>>2]|0;if((m|0)==(l+((((c[k+456>>2]|0)-l|0)/36|0)*36|0)|0)){l=c[k+464>>2]|0;c[a+4>>2]=l;h=l;j=11;break}c[d>>2]=192;o=1;i=b;return o|0}}while(0);do{if((j|0)==11){m=c[2824]|0;l=c[m+464>>2]|0;if((h|0)==(l+((((c[m+468>>2]|0)-l|0)/24|0)*24|0)|0)){l=c[m+476>>2]|0;c[a+4>>2]=l;n=l;j=15;break}c[d>>2]=195;o=1;i=b;return o|0}}while(0);do{if((j|0)==15){h=c[2824]|0;l=c[h+476>>2]|0;if((n|0)==(l+((((c[h+480>>2]|0)-l|0)/260|0)*260|0)|0)){l=c[h+428>>2]|0;c[a+4>>2]=l;g=l;break}c[d>>2]=198;o=1;i=b;return o|0}}while(0);n=c[2824]|0;j=c[n+428>>2]|0;if((g|0)==(j+((c[n+432>>2]|0)-j>>5<<5)|0)){c[a+4>>2]=0;c[d>>2]=-1;o=0;i=b;return o|0}else{c[d>>2]=201;o=1;i=b;return o|0}return 0}function nf(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;d=a+4|0;e=c[d>>2]|0;f=a;g=c[f>>2]|0;h=g;j=(e-h|0)/260|0;k=j+1|0;if(k>>>0>16519104){km(0)}l=a+8|0;a=((c[l>>2]|0)-h|0)/260|0;if(a>>>0<8259552){m=a<<1;a=m>>>0<k>>>0?k:m;if((a|0)==0){n=0;o=0}else{p=a;q=5}}else{p=16519104;q=5}if((q|0)==5){n=p;o=kp(p*260|0)|0}p=o+(j*260|0)|0;q=o+(n*260|0)|0;n=o+(k*260|0)|0;if((e|0)==(g|0)){r=p;s=e}else{k=j+ -1-(((e+ -260+(0-h)|0)>>>0)/260|0)|0;h=e;e=p;do{e=e+ -260|0;h=h+ -260|0;Cp(e|0,h|0,260)|0;}while((h|0)!=(g|0));r=o+(k*260|0)|0;s=c[f>>2]|0}c[f>>2]=r;c[d>>2]=n;c[l>>2]=q;if((s|0)==0){i=b;return}mp(s);i=b;return}function of(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;d=a+4|0;e=c[d>>2]|0;f=a;g=c[f>>2]|0;h=g;j=(e-h|0)/24|0;k=j+1|0;if(k>>>0>178956970){km(0)}l=a+8|0;a=((c[l>>2]|0)-h|0)/24|0;if(a>>>0<89478485){m=a<<1;a=m>>>0<k>>>0?k:m;if((a|0)==0){n=0;o=0}else{p=a;q=5}}else{p=178956970;q=5}if((q|0)==5){n=p;o=kp(p*24|0)|0}p=o+(j*24|0)|0;q=o+(n*24|0)|0;n=o+(k*24|0)|0;if((e|0)==(g|0)){r=p;s=e}else{k=j+ -1-(((e+ -24+(0-h)|0)>>>0)/24|0)|0;h=e;e=p;do{e=e+ -24|0;h=h+ -24|0;p=e;j=h;c[p+0>>2]=c[j+0>>2];c[p+4>>2]=c[j+4>>2];c[p+8>>2]=c[j+8>>2];c[p+12>>2]=c[j+12>>2];c[p+16>>2]=c[j+16>>2];c[p+20>>2]=c[j+20>>2];}while((h|0)!=(g|0));r=o+(k*24|0)|0;s=c[f>>2]|0}c[f>>2]=r;c[d>>2]=n;c[l>>2]=q;if((s|0)==0){i=b;return}mp(s);i=b;return}function pf(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;d=a+4|0;e=c[d>>2]|0;f=a;g=c[f>>2]|0;h=g;j=(e-h|0)/36|0;k=j+1|0;if(k>>>0>119304647){km(0)}l=a+8|0;a=((c[l>>2]|0)-h|0)/36|0;if(a>>>0<59652323){m=a<<1;a=m>>>0<k>>>0?k:m;if((a|0)==0){n=0;o=0}else{p=a;q=5}}else{p=119304647;q=5}if((q|0)==5){n=p;o=kp(p*36|0)|0}p=o+(j*36|0)|0;q=o+(n*36|0)|0;n=o+(k*36|0)|0;if((e|0)==(g|0)){r=p;s=e}else{k=j+ -1-(((e+ -36+(0-h)|0)>>>0)/36|0)|0;h=e;e=p;do{e=e+ -36|0;h=h+ -36|0;p=e+0|0;j=h+0|0;a=p+36|0;do{c[p>>2]=c[j>>2];p=p+4|0;j=j+4|0}while((p|0)<(a|0));}while((h|0)!=(g|0));r=o+(k*36|0)|0;s=c[f>>2]|0}c[f>>2]=r;c[d>>2]=n;c[l>>2]=q;if((s|0)==0){i=b;return}mp(s);i=b;return}function qf(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;d=a+4|0;e=c[d>>2]|0;f=a;g=c[f>>2]|0;h=g;j=(e-h|0)/24|0;k=j+1|0;if(k>>>0>178956970){km(0)}l=a+8|0;a=((c[l>>2]|0)-h|0)/24|0;if(a>>>0<89478485){m=a<<1;a=m>>>0<k>>>0?k:m;if((a|0)==0){n=0;o=0}else{p=a;q=5}}else{p=178956970;q=5}if((q|0)==5){n=p;o=kp(p*24|0)|0}p=o+(j*24|0)|0;q=o+(n*24|0)|0;n=o+(k*24|0)|0;if((e|0)==(g|0)){r=p;s=e}else{k=j+ -1-(((e+ -24+(0-h)|0)>>>0)/24|0)|0;h=e;e=p;do{e=e+ -24|0;h=h+ -24|0;p=e;j=h;c[p+0>>2]=c[j+0>>2];c[p+4>>2]=c[j+4>>2];c[p+8>>2]=c[j+8>>2];c[p+12>>2]=c[j+12>>2];c[p+16>>2]=c[j+16>>2];c[p+20>>2]=c[j+20>>2];}while((h|0)!=(g|0));r=o+(k*24|0)|0;s=c[f>>2]|0}c[f>>2]=r;c[d>>2]=n;c[l>>2]=q;if((s|0)==0){i=b;return}mp(s);i=b;return}function rf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;d=i;i=i+8|0;e=d;f=La(b|0,11864)|0;if((yb(f|0)|0)!=32){td[c[f+12>>2]&63](f)|0;c[a>>2]=0;i=d;return}b=yb(f|0)|0;g=yb(f|0)|0;h=fp(b+8|0)|0;j=h;k=h+8|0;l=f+4|0;if((zd[c[l>>2]&7](f,k,b,1)|0)==-1){gp(h);td[c[f+12>>2]&63](f)|0;c[a>>2]=0;i=d;return}b=e;if((zd[c[l>>2]&7](f,b,4,1)|0)!=0){m=k;do{k=h+((c[e>>2]|0)+8)|0;c[k>>2]=(c[k>>2]|0)+m;}while((zd[c[l>>2]&7](f,b,4,1)|0)!=0)}td[c[f+12>>2]&63](f)|0;c[h>>2]=g;c[h+4>>2]=0;c[a>>2]=j;i=d;return}function sf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;i=i+8|0;f=e;g=c[a>>2]|0;a=(c[g>>2]|0)+ -1|0;a:do{if((a|0)>=0){h=a;j=0;b:while(1){k=h;while(1){l=k+j>>1;m=c[g+(l*12|0)+8>>2]|0;if((m|0)==(b|0)){break b}if(m>>>0<b>>>0){break}if((l|0)>(j|0)){k=l+ -1|0}else{break a}}m=l+1|0;if((k|0)<(m|0)){break a}else{h=k;j=m}}if((c[g+(l*12|0)+12>>2]|0)!=(d|0)){break}n=c[g+(l*12|0)+16>>2]|0;i=e;return n|0}}while(0);l=c[g+4>>2]|0;if((l|0)==0){n=0;i=e;return n|0}c[f>>2]=l;n=sf(f,b,d)|0;i=e;return n|0}function tf(a){a=a|0;var b=0,d=0,e=0;b=i;d=fp((a*24|0)+56|0)|0;e=d;c[e>>2]=a;c[d+4>>2]=0;a=d+8|0;if(Pf(c[3112]|0,a,d+12|0,d+16|0)|0){Da(c[a>>2]|0);c[d+20>>2]=Ta(c[a>>2]|0,12472)|0;c[d+24>>2]=Ta(c[a>>2]|0,12480)|0;c[d+28>>2]=Wa(c[a>>2]|0,12488)|0;c[d+32>>2]=Wa(c[a>>2]|0,12504)|0;c[d+36>>2]=Wa(c[a>>2]|0,12512)|0;a=d+40|0;fb(3,a|0);Qa(34962,c[a>>2]|0);yc(34962,(c[e>>2]|0)*96|0,0,35048);Qa(34962,c[d+44>>2]|0);yc(34962,(c[e>>2]|0)*96|0,0,35048);Qa(34962,c[d+48>>2]|0);yc(34962,(c[e>>2]|0)*96|0,0,35048);Qa(34962,0);c[d+52>>2]=0;i=b;return d|0}else{bb(12456)|0;Xb(-1)}return 0}function uf(a,b){a=a|0;b=b|0;i=i;return(c[a>>2]|0)+(b*24|0)+56|0}function vf(a){a=a|0;i=i;return c[c[a>>2]>>2]|0}function wf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;f=a;c[(c[f>>2]|0)+4>>2]=b;if((d|0)==0){Da(c[(c[f>>2]|0)+8>>2]|0)}else{Da(d|0)}mb(c[(c[f>>2]|0)+28>>2]|0);mb(c[(c[f>>2]|0)+32>>2]|0);mb(c[(c[f>>2]|0)+36>>2]|0);Lf(b,c[(c[f>>2]|0)+20>>2]|0);i=e;return}function xf(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;e=a;a=c[e>>2]|0;Qa(34962,c[a+(c[a+52>>2]<<2)+40>>2]|0);nb(c[(c[e>>2]|0)+28>>2]|0,3,5126,0,24,0);nb(c[(c[e>>2]|0)+32>>2]|0,2,5126,0,24,12);nb(c[(c[e>>2]|0)+36>>2]|0,4,5121,1,24,20);dd(34962,0,b*24|0,(c[e>>2]|0)+56|0);b=(c[e>>2]|0)+52|0;c[b>>2]=((c[b>>2]|0)+1|0)%3|0;i=d;return}function yf(a){a=a|0;var b=0,d=0;b=i;d=a;c[(c[d>>2]|0)+4>>2]=0;Qa(34962,0);Xa(c[(c[d>>2]|0)+28>>2]|0);Xa(c[(c[d>>2]|0)+32>>2]|0);Xa(c[(c[d>>2]|0)+36>>2]|0);i=b;return}function zf(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;d=i;i=i+8|0;e=d;f=b;if((c[f>>2]|0)!=0){i=d;return}g=c[b+20>>2]|0;h=fp(g+44|0)|0;j=c[b+12>>2]|0;k=c[b+8>>2]|0;l=fa(k,j)|0;m=c[b+16>>2]|0;n=k&65535;k=fa(l,m)|0;o=l&65535;p=j<<3&65535;j=g-((g>>>0)%(l>>>0)|0)|0;l=j+36|0;q=h;a[q]=1179011410;a[q+1|0]=4605513;a[q+2|0]=17990;a[q+3|0]=70;q=h+4|0;a[q]=l;a[q+1|0]=l>>8;a[q+2|0]=l>>16;a[q+3|0]=l>>24;l=h+8|0;q=12528|0;r=l+14|0;do{a[l]=a[q]|0;l=l+1|0;q=q+1|0}while((l|0)<(r|0));q=h+22|0;a[q]=n;a[q+1|0]=n>>8;n=h+24|0;a[n]=m;a[n+1|0]=m>>8;a[n+2|0]=m>>16;a[n+3|0]=m>>24;m=h+28|0;a[m]=k;a[m+1|0]=k>>8;a[m+2|0]=k>>16;a[m+3|0]=k>>24;k=h+32|0;a[k]=o;a[k+1|0]=o>>8;o=h+34|0;a[o]=p;a[o+1|0]=p>>8;p=h+36|0;a[p]=1635017060;a[p+1|0]=6386785;a[p+2|0]=24948;a[p+3|0]=97;p=h+40|0;a[p]=j;a[p+1|0]=j>>8;a[p+2|0]=j>>16;a[p+3|0]=j>>24;c[e>>2]=g;be(h+44|0,e,c[b+4>>2]|0,c[b+24>>2]|0)|0;c[f>>2]=Rc(ld(h|0,(c[e>>2]|0)+44|0)|0,0)|0;gp(h);i=d;return}function Af(a){a=a|0;var b=0;b=i;zf(a);Hc(-1,c[a>>2]|0,0,-1)|0;i=b;return}function Bf(a,d){a=a|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;c[a>>2]=c[d>>2];c[a+8>>2]=-1;c[a+16>>2]=0;d=(vf(a)|0)>>2;f=a+4|0;c[f>>2]=d;g=i;i=i+((2*(d*6|0)|0)+7&-8)|0;if((d|0)>0){h=0;do{j=h<<2;k=h*6|0;b[g+(k<<1)>>1]=j;l=(j|1)&65535;b[g+((k|1)<<1)>>1]=l;m=(j|2)&65535;b[g+(k+2<<1)>>1]=m;b[g+(k+3<<1)>>1]=m;b[g+(k+4<<1)>>1]=l;b[g+(k+5<<1)>>1]=j|3;h=h+1|0;}while((h|0)<(d|0))}d=a+12|0;fb(1,d|0);Qa(34963,c[d>>2]|0);yc(34963,(c[f>>2]|0)*12|0,g|0,35044);Qa(34963,0);i=e;return}function Cf(a){a=a|0;var b=0;b=i;xc(1,a+12|0);i=b;return}function Df(a){a=a|0;Ya(a|0)|0;Ha()}function Ef(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=i;c[a+8>>2]=0;wf(a,b,d);Qa(34963,c[a+12>>2]|0);i=e;return}function Ff(a,b,d,e,f,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;h=+h;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0.0,t=0.0,u=0.0,v=0.0,w=0.0;j=i;k=c[b>>2]|0;l=a+16|0;m=(c[l>>2]|0)!=(k|0);n=a+8|0;o=c[n>>2]|0;if((o|0)==(c[a+4>>2]|0)){p=3}else{if((o|0)<1|m^1){q=o}else{p=3}}if((p|0)==3){xf(a,o<<2);wb(4,(c[n>>2]|0)*6|0,5123,0);c[n>>2]=0;q=0}if(m){Jf(k);c[l>>2]=k;r=c[n>>2]|0}else{r=q}q=uf(a,r<<2)|0;r=b+24|0;s=+(c[r+(e*48|0)+36>>2]|0);b=d;g[b>>2]=+g[b>>2]- +(c[r+(e*48|0)+32>>2]|0);b=d+4|0;t=+g[b>>2]-s;g[b>>2]=t;b=d;d=r+(e*48|0)|0;a=c[f>>2]|0;s=+g[b>>2];u=+g[b+4>>2];v=+g[d>>2];w=+g[d+4>>2];g[q>>2]=s;g[q+4>>2]=u;g[q+8>>2]=h;g[q+12>>2]=v;g[q+16>>2]=w;c[q+20>>2]=a;d=r+(e*48|0)+44|0;w=+(c[d>>2]|0)+t;b=r+(e*48|0)+8|0;v=+g[b>>2];u=+g[b+4>>2];g[q+24>>2]=s+0.0;g[q+28>>2]=w;g[q+32>>2]=h;g[q+36>>2]=v;g[q+40>>2]=u;c[q+44>>2]=a;b=r+(e*48|0)+40|0;f=r+(e*48|0)+16|0;u=+g[f>>2];v=+g[f+4>>2];g[q+48>>2]=s+ +(c[b>>2]|0);g[q+52>>2]=t+0.0;g[q+56>>2]=h;g[q+60>>2]=u;g[q+64>>2]=v;c[q+68>>2]=a;v=+(c[d>>2]|0)+t;d=r+(e*48|0)+24|0;t=+g[d>>2];u=+g[d+4>>2];g[q+72>>2]=+(c[b>>2]|0)+s;g[q+76>>2]=v;g[q+80>>2]=h;g[q+84>>2]=t;g[q+88>>2]=u;c[q+92>>2]=a;c[n>>2]=(c[n>>2]|0)+1;i=j;return}function Gf(a,b,d,e,f,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0.0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0,B=0.0,C=0.0,D=0.0,E=0.0;k=i;l=c[b>>2]|0;m=a+16|0;n=(c[m>>2]|0)!=(l|0);o=a+8|0;p=c[o>>2]|0;if((p|0)==(c[a+4>>2]|0)){q=3}else{if((p|0)<1|n^1){r=p}else{q=3}}if((q|0)==3){xf(a,p<<2);wb(4,(c[o>>2]|0)*6|0,5123,0);c[o>>2]=0;r=0}if(n){Jf(l);c[m>>2]=l;s=c[o>>2]|0}else{s=r}r=uf(a,s<<2)|0;s=b+24|0;t=+(c[s+(f*48|0)+32>>2]|0);u=+(c[s+(f*48|0)+36>>2]|0);v=-t;w=-u;x=0.0-t;y=+(c[s+(f*48|0)+44>>2]|0)-u;z=+(c[s+(f*48|0)+40>>2]|0)-t;t=0.0-u;b=e;u=+g[b>>2];A=+g[b+4>>2];B=+g[d>>2];C=+g[d+4>>2];d=s+(f*48|0)|0;b=c[h>>2]|0;D=+g[d>>2];E=+g[d+4>>2];g[r>>2]=B+(u*v-A*w);g[r+4>>2]=C+(u*w+A*v);g[r+8>>2]=j;g[r+12>>2]=D;g[r+16>>2]=E;c[r+20>>2]=b;E=y*A;D=y*u;d=s+(f*48|0)+8|0;y=+g[d>>2];v=+g[d+4>>2];g[r+24>>2]=B+(x*u-E);g[r+28>>2]=C+(D+x*A);g[r+32>>2]=j;g[r+36>>2]=y;g[r+40>>2]=v;c[r+44>>2]=b;v=z*u;y=z*A;d=s+(f*48|0)+16|0;z=+g[d>>2];x=+g[d+4>>2];g[r+48>>2]=B+(v-t*A);g[r+52>>2]=C+(t*u+y);g[r+56>>2]=j;g[r+60>>2]=z;g[r+64>>2]=x;c[r+68>>2]=b;d=s+(f*48|0)+24|0;x=+g[d>>2];z=+g[d+4>>2];g[r+72>>2]=B+(v-E);g[r+76>>2]=C+(D+y);g[r+80>>2]=j;g[r+84>>2]=x;g[r+88>>2]=z;c[r+92>>2]=b;c[o>>2]=(c[o>>2]|0)+1;i=k;return}function Hf(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;d=a+8|0;e=c[d>>2]|0;f=a;if((e|0)>0){xf(f,e<<2);wb(4,(c[d>>2]|0)*6|0,5123,0);c[d>>2]=0}c[d>>2]=-1;c[a+16>>2]=0;Qa(34963,0);yf(f);i=b;return}function If(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;i=i+8|0;d=b;e=a+16|0;if((c[e>>2]|0)!=0){i=b;return}Kb(1,e|0);ec(3553,c[e>>2]|0);e=a+20|0;if((c[e>>2]&1|0)==0){Nc(3553,10241,9728);Nc(3553,10240,9728)}else{Nc(3553,10241,9729);Nc(3553,10240,9729)}if((c[e>>2]&2|0)==0){Nc(3553,10242,33071);Nc(3553,10243,33071)}else{Nc(3553,10242,10497);Nc(3553,10243,10497)}e=a+4|0;f=a+8|0;g=fa(c[e>>2]<<2,c[f>>2]|0)|0;c[d>>2]=g;h=fp(g)|0;if((be(h,d,c[a>>2]|0,c[a+12>>2]|0)|0)!=0){bb(12568)|0;Xb(-1)}Ib(3553,0,6408,c[e>>2]|0,c[f>>2]|0,0,6408,5121,h|0);gp(h);i=b;return}function Jf(a){a=a|0;var b=0;b=i;If(a);ec(3553,c[a+16>>2]|0);i=b;return}function Kf(a,b){a=a|0;b=+b;var d=0,e=0,f=0,h=0.0,j=0.0;d=i;i=i+16|0;e=d;f=d+8|0;cb(Mf()|0,e|0,f|0);h=+b;j=+(+(c[f>>2]|0)*b/+(c[e>>2]|0));e=a;g[e>>2]=h;g[e+4>>2]=j;i=d;return}function Lf(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,h=0.0,j=0.0,k=0.0,l=0,m=0;d=i;i=i+64|0;e=d;f=+g[a>>2];h=-(+g[a+8>>2]*2.0+f)/f;j=+g[a+4>>2];k=-(+g[a+12>>2]*2.0+j)/-j;a=e;g[a>>2]=2.0/f;l=e+20|0;f=-2.0/j;m=e+4|0;c[m+0>>2]=0;c[m+4>>2]=0;c[m+8>>2]=0;c[m+12>>2]=0;g[l>>2]=f;l=e+40|0;m=e+24|0;c[m+0>>2]=0;c[m+4>>2]=0;c[m+8>>2]=0;c[m+12>>2]=0;g[l>>2]=.0078125;g[e+44>>2]=0.0;g[e+48>>2]=h;g[e+52>>2]=k;g[e+56>>2]=0.0;g[e+60>>2]=1.0;Ia(b|0,1,0,a|0);i=d;return}function Mf(){i=i;return c[3146]|0}function Nf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+16|0;f=e;g=e+8|0;c[f>>2]=b;c[g>>2]=d;gc(560)|0;Tc(22050,-32752,2,1024)|0;kd(2)|0;qb(17,3)|0;qb(18,2)|0;if((b|0)==0){c[f>>2]=1136;c[g>>2]=640;h=640;j=1136}else{h=d;j=b}b=Ka(((a|0)!=0?a:12592)|0,805240832,805240832,j|0,h|0,2)|0;ac(b|0)|0;cb(b|0,f|0,g|0);Ab(0,0,c[f>>2]|0,c[g>>2]|0);Jb(3553);pc(33984);Jb(3042);Va(770,771);c[3146]=b;i=e;return b|0}function Of(){var a=0;a=i;Fc();jc();i=a;return}function Pf(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;i=i+864|0;g=f;h=f+16|0;j=f+32|0;k=f+48|0;l=f+64|0;m=Qb()|0;n=mc(35633)|0;o=mc(35632)|0;p=Ep(a|0)|0;q=g;c[q>>2]=12664;c[g+4>>2]=12616;c[g+8>>2]=a;g=h;c[g>>2]=12664;c[h+4>>2]=12640;c[h+8>>2]=a;a=j;c[a>>2]=62;c[j+4>>2]=17;c[j+8>>2]=p;j=k;c[j>>2]=62;c[k+4>>2]=17;c[k+8>>2]=p;gb(n|0,3,q|0,a|0);gb(o|0,3,g|0,j|0);tc(n|0);tc(o|0);Vc(n|0,35713,l|0);if((c[l>>2]|0)!=1){Ra(n|0,256,f+328|0,f+72|0);Ma(m|0);Bc(o|0);Bc(n|0);r=0;i=f;return r|0}Vc(o|0,35713,l|0);if((c[l>>2]|0)!=1){Ra(o|0,256,f+592|0,f+336|0);Ma(m|0);Bc(o|0);Bc(n|0);r=0;i=f;return r|0}Ob(m|0,n|0);Ob(m|0,o|0);Ic(m|0);Ec(m|0,35714,l|0);if((c[l>>2]|0)==1){c[b>>2]=m;c[d>>2]=n;c[e>>2]=o;r=1;i=f;return r|0}else{rb(m|0,256,f+856|0,f+600|0);Ma(m|0);Bc(o|0);Bc(n|0);r=0;i=f;return r|0}return 0}function Qf(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;b=i;i=i+32|0;d=b;e=b+8|0;f=b+16|0;g=b+24|0;h=c[s>>2]|0;kg(13440,h,13496);c[3182]=14868;c[12736>>2]=14888;c[12732>>2]=0;nh(12736|0,13440);c[12808>>2]=0;c[12812>>2]=-1;j=c[t>>2]|0;c[3386]=14736;qm(13548|0);c[13552>>2]=0;c[13556>>2]=0;c[13560>>2]=0;c[13564>>2]=0;c[13568>>2]=0;c[13572>>2]=0;c[3386]=14056;c[13576>>2]=j;rm(g,13548|0);k=tm(g,17528)|0;l=k;sm(g);c[13580>>2]=l;c[13584>>2]=13504;a[13588|0]=(td[c[(c[k>>2]|0)+28>>2]&63](l)|0)&1;c[3204]=14948;c[12820>>2]=14968;nh(12820|0,13544);c[12892>>2]=0;c[12896>>2]=-1;l=c[r>>2]|0;c[3398]=14736;qm(13596|0);c[13600>>2]=0;c[13604>>2]=0;c[13608>>2]=0;c[13612>>2]=0;c[13616>>2]=0;c[13620>>2]=0;c[3398]=14056;c[13624>>2]=l;rm(f,13596|0);k=tm(f,17528)|0;g=k;sm(f);c[13628>>2]=g;c[13632>>2]=13512;a[13636|0]=(td[c[(c[k>>2]|0)+28>>2]&63](g)|0)&1;c[3226]=14948;c[12908>>2]=14968;nh(12908|0,13592);c[12980>>2]=0;c[12984>>2]=-1;g=c[(c[(c[3226]|0)+ -12>>2]|0)+12928>>2]|0;c[3248]=14948;c[12996>>2]=14968;nh(12996|0,g);c[13068>>2]=0;c[13072>>2]=-1;c[(c[(c[3182]|0)+ -12>>2]|0)+12800>>2]=12816;g=(c[(c[3226]|0)+ -12>>2]|0)+12908|0;c[g>>2]=c[g>>2]|8192;c[(c[(c[3226]|0)+ -12>>2]|0)+12976>>2]=12816;Yf(13640,h,13520|0);c[3270]=14908;c[13088>>2]=14928;c[13084>>2]=0;nh(13088|0,13640);c[13160>>2]=0;c[13164>>2]=-1;c[3424]=14800;qm(13700|0);c[13704>>2]=0;c[13708>>2]=0;c[13712>>2]=0;c[13716>>2]=0;c[13720>>2]=0;c[13724>>2]=0;c[3424]=13800;c[13728>>2]=j;rm(e,13700|0);j=tm(e,17536)|0;h=j;sm(e);c[13732>>2]=h;c[13736>>2]=13528;a[13740|0]=(td[c[(c[j>>2]|0)+28>>2]&63](h)|0)&1;c[3292]=14988;c[13172>>2]=15008;nh(13172|0,13696);c[13244>>2]=0;c[13248>>2]=-1;c[3436]=14800;qm(13748|0);c[13752>>2]=0;c[13756>>2]=0;c[13760>>2]=0;c[13764>>2]=0;c[13768>>2]=0;c[13772>>2]=0;c[3436]=13800;c[13776>>2]=l;rm(d,13748|0);l=tm(d,17536)|0;h=l;sm(d);c[13780>>2]=h;c[13784>>2]=13536;a[13788|0]=(td[c[(c[l>>2]|0)+28>>2]&63](h)|0)&1;c[3314]=14988;c[13260>>2]=15008;nh(13260|0,13744);c[13332>>2]=0;c[13336>>2]=-1;h=c[(c[(c[3314]|0)+ -12>>2]|0)+13280>>2]|0;c[3336]=14988;c[13348>>2]=15008;nh(13348|0,h);c[13420>>2]=0;c[13424>>2]=-1;c[(c[(c[3270]|0)+ -12>>2]|0)+13152>>2]=13168;h=(c[(c[3314]|0)+ -12>>2]|0)+13260|0;c[h>>2]=c[h>>2]|8192;c[(c[(c[3314]|0)+ -12>>2]|0)+13328>>2]=13168;i=b;return}function Rf(a){a=a|0;a=i;Uh(12816)|0;Uh(12992)|0;Zh(13168)|0;Zh(13344)|0;i=a;return}function Sf(a){a=a|0;var b=0;b=i;c[a>>2]=14800;sm(a+4|0);i=b;return}function Tf(a){a=a|0;var b=0;b=i;c[a>>2]=14800;sm(a+4|0);mp(a);i=b;return}function Uf(b,d){b=b|0;d=d|0;var e=0,f=0;e=i;td[c[(c[b>>2]|0)+24>>2]&63](b)|0;f=tm(d,17536)|0;d=f;c[b+36>>2]=d;a[b+44|0]=(td[c[(c[f>>2]|0)+28>>2]&63](d)|0)&1;i=e;return}function Vf(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+16|0;d=b;e=b+8|0;f=a+36|0;g=a+40|0;h=d;j=d+8|0;k=d;d=a+32|0;while(1){a=c[f>>2]|0;l=Dd[c[(c[a>>2]|0)+20>>2]&15](a,c[g>>2]|0,h,j,e)|0;a=(c[e>>2]|0)-k|0;if((Tb(h|0,1,a|0,c[d>>2]|0)|0)!=(a|0)){m=-1;n=5;break}if((l|0)==2){m=-1;n=5;break}else if((l|0)!=1){n=4;break}}if((n|0)==4){m=(($c(c[d>>2]|0)|0)!=0)<<31>>31;i=b;return m|0}else if((n|0)==5){i=b;return m|0}return 0}function Wf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;if((a[b+44|0]|0)!=0){g=Tb(d|0,4,e|0,c[b+32>>2]|0)|0;i=f;return g|0}h=b;if((e|0)>0){j=d;k=0}else{g=0;i=f;return g|0}while(1){if((Cd[c[(c[h>>2]|0)+52>>2]&15](b,c[j>>2]|0)|0)==-1){g=k;l=6;break}d=k+1|0;if((d|0)<(e|0)){j=j+4|0;k=d}else{g=d;l=6;break}}if((l|0)==6){i=f;return g|0}return 0}function Xf(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;e=i;i=i+32|0;f=e;g=e+8|0;h=e+16|0;j=e+24|0;k=(d|0)==-1;a:do{if(!k){c[g>>2]=d;if((a[b+44|0]|0)!=0){if((Tb(g|0,4,1,c[b+32>>2]|0)|0)==1){break}else{l=-1}i=e;return l|0}m=f;c[h>>2]=m;n=g+4|0;o=b+36|0;p=b+40|0;q=f+8|0;r=f;s=b+32|0;t=g;while(1){u=c[o>>2]|0;v=yd[c[(c[u>>2]|0)+12>>2]&15](u,c[p>>2]|0,t,n,j,m,q,h)|0;if((c[j>>2]|0)==(t|0)){l=-1;w=12;break}if((v|0)==3){w=7;break}u=(v|0)==1;if(!(v>>>0<2)){l=-1;w=12;break}v=(c[h>>2]|0)-r|0;if((Tb(m|0,1,v|0,c[s>>2]|0)|0)!=(v|0)){l=-1;w=12;break}if(u){t=u?c[j>>2]|0:t}else{break a}}if((w|0)==7){if((Tb(t|0,1,1,c[s>>2]|0)|0)==1){break}else{l=-1}i=e;return l|0}else if((w|0)==12){i=e;return l|0}}}while(0);l=k?0:d;i=e;return l|0}function Yf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;i=i+8|0;g=f;h=b;c[h>>2]=14800;j=b+4|0;qm(j);k=b+8|0;c[k+0>>2]=0;c[k+4>>2]=0;c[k+8>>2]=0;c[k+12>>2]=0;c[k+16>>2]=0;c[k+20>>2]=0;c[h>>2]=13912;c[b+32>>2]=d;c[b+40>>2]=e;c[b+48>>2]=-1;a[b+52|0]=0;rm(g,j);j=tm(g,17536)|0;e=j;d=b+36|0;c[d>>2]=e;h=b+44|0;c[h>>2]=td[c[(c[j>>2]|0)+24>>2]&63](e)|0;e=c[d>>2]|0;a[b+53|0]=(td[c[(c[e>>2]|0)+28>>2]&63](e)|0)&1;if((c[h>>2]|0)>8){Dl(14008)}else{sm(g);i=f;return}}function Zf(a){a=a|0;var b=0;b=i;c[a>>2]=14800;sm(a+4|0);i=b;return}function _f(a){a=a|0;var b=0;b=i;c[a>>2]=14800;sm(a+4|0);mp(a);i=b;return}function $f(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;f=tm(d,17536)|0;d=f;g=b+36|0;c[g>>2]=d;h=b+44|0;c[h>>2]=td[c[(c[f>>2]|0)+24>>2]&63](d)|0;d=c[g>>2]|0;a[b+53|0]=(td[c[(c[d>>2]|0)+28>>2]&63](d)|0)&1;if((c[h>>2]|0)>8){Dl(14008)}else{i=e;return}}function ag(a){a=a|0;var b=0,c=0;b=i;c=dg(a,0)|0;i=b;return c|0}function bg(a){a=a|0;var b=0,c=0;b=i;c=dg(a,1)|0;i=b;return c|0}function cg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;i=i+32|0;f=e;g=e+8|0;h=e+16|0;j=e+24|0;k=b+52|0;l=(a[k]|0)!=0;if((d|0)==-1){if(l){m=-1;i=e;return m|0}n=c[b+48>>2]|0;a[k]=(n|0)!=-1|0;m=n;i=e;return m|0}n=b+48|0;a:do{if(l){c[h>>2]=c[n>>2];o=c[b+36>>2]|0;p=f;q=yd[c[(c[o>>2]|0)+12>>2]&15](o,c[b+40>>2]|0,h,h+4|0,j,p,f+8|0,g)|0;if((q|0)==1|(q|0)==2){m=-1;i=e;return m|0}else if((q|0)==3){a[p]=c[n>>2];c[g>>2]=f+1}q=b+32|0;while(1){o=c[g>>2]|0;if(!(o>>>0>p>>>0)){break a}r=o+ -1|0;c[g>>2]=r;if((Gc(a[r]|0,c[q>>2]|0)|0)==-1){m=-1;break}}i=e;return m|0}}while(0);c[n>>2]=d;a[k]=1;m=d;i=e;return m|0}function dg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;e=i;i=i+32|0;f=e;g=e+8|0;h=e+16|0;j=e+24|0;k=b+52|0;if((a[k]|0)!=0){l=b+48|0;m=c[l>>2]|0;if(!d){n=m;i=e;return n|0}c[l>>2]=-1;a[k]=0;n=m;i=e;return n|0}m=c[b+44>>2]|0;k=(m|0)>1?m:1;a:do{if((k|0)>0){m=b+32|0;l=0;while(1){o=sc(c[m>>2]|0)|0;if((o|0)==-1){n=-1;break}a[f+l|0]=o;l=l+1|0;if((l|0)>=(k|0)){break a}}i=e;return n|0}}while(0);b:do{if((a[b+53|0]|0)==0){l=b+40|0;m=b+36|0;o=f;p=g+4|0;q=b+32|0;r=k;while(1){s=c[l>>2]|0;t=s;u=c[t>>2]|0;v=c[t+4>>2]|0;t=c[m>>2]|0;w=f+r|0;x=yd[c[(c[t>>2]|0)+16>>2]&15](t,s,o,w,h,g,p,j)|0;if((x|0)==3){y=14;break}else if((x|0)==2){n=-1;y=22;break}else if((x|0)!=1){z=r;break b}x=c[l>>2]|0;c[x>>2]=u;c[x+4>>2]=v;if((r|0)==8){n=-1;y=22;break}v=sc(c[q>>2]|0)|0;if((v|0)==-1){n=-1;y=22;break}a[w]=v;r=r+1|0}if((y|0)==14){c[g>>2]=a[o]|0;z=r;break}else if((y|0)==22){i=e;return n|0}}else{c[g>>2]=a[f]|0;z=k}}while(0);if(d){d=c[g>>2]|0;c[b+48>>2]=d;n=d;i=e;return n|0}d=b+32|0;b=z;while(1){if((b|0)<=0){break}z=b+ -1|0;if((Gc(a[f+z|0]|0,c[d>>2]|0)|0)==-1){n=-1;y=22;break}else{b=z}}if((y|0)==22){i=e;return n|0}n=c[g>>2]|0;i=e;return n|0}function eg(a){a=a|0;var b=0;b=i;c[a>>2]=14736;sm(a+4|0);i=b;return}function fg(a){a=a|0;var b=0;b=i;c[a>>2]=14736;sm(a+4|0);mp(a);i=b;return}function gg(b,d){b=b|0;d=d|0;var e=0,f=0;e=i;td[c[(c[b>>2]|0)+24>>2]&63](b)|0;f=tm(d,17528)|0;d=f;c[b+36>>2]=d;a[b+44|0]=(td[c[(c[f>>2]|0)+28>>2]&63](d)|0)&1;i=e;return}function hg(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+16|0;d=b;e=b+8|0;f=a+36|0;g=a+40|0;h=d;j=d+8|0;k=d;d=a+32|0;while(1){a=c[f>>2]|0;l=Dd[c[(c[a>>2]|0)+20>>2]&15](a,c[g>>2]|0,h,j,e)|0;a=(c[e>>2]|0)-k|0;if((Tb(h|0,1,a|0,c[d>>2]|0)|0)!=(a|0)){m=-1;n=5;break}if((l|0)==2){m=-1;n=5;break}else if((l|0)!=1){n=4;break}}if((n|0)==4){m=(($c(c[d>>2]|0)|0)!=0)<<31>>31;i=b;return m|0}else if((n|0)==5){i=b;return m|0}return 0}function ig(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;if((a[b+44|0]|0)!=0){h=Tb(e|0,1,f|0,c[b+32>>2]|0)|0;i=g;return h|0}j=b;if((f|0)>0){k=e;l=0}else{h=0;i=g;return h|0}while(1){if((Cd[c[(c[j>>2]|0)+52>>2]&15](b,d[k]|0)|0)==-1){h=l;m=6;break}e=l+1|0;if((e|0)<(f|0)){k=k+1|0;l=e}else{h=e;m=6;break}}if((m|0)==6){i=g;return h|0}return 0}function jg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;e=i;i=i+32|0;f=e;g=e+8|0;h=e+16|0;j=e+24|0;k=(d|0)==-1;a:do{if(!k){a[g]=d;if((a[b+44|0]|0)!=0){if((Tb(g|0,1,1,c[b+32>>2]|0)|0)==1){break}else{l=-1}i=e;return l|0}m=f;c[h>>2]=m;n=g+1|0;o=b+36|0;p=b+40|0;q=f+8|0;r=f;s=b+32|0;t=g;while(1){u=c[o>>2]|0;v=yd[c[(c[u>>2]|0)+12>>2]&15](u,c[p>>2]|0,t,n,j,m,q,h)|0;if((c[j>>2]|0)==(t|0)){l=-1;w=12;break}if((v|0)==3){w=7;break}u=(v|0)==1;if(!(v>>>0<2)){l=-1;w=12;break}v=(c[h>>2]|0)-r|0;if((Tb(m|0,1,v|0,c[s>>2]|0)|0)!=(v|0)){l=-1;w=12;break}if(u){t=u?c[j>>2]|0:t}else{break a}}if((w|0)==7){if((Tb(t|0,1,1,c[s>>2]|0)|0)==1){break}else{l=-1}i=e;return l|0}else if((w|0)==12){i=e;return l|0}}}while(0);l=k?0:d;i=e;return l|0}function kg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;i=i+8|0;g=f;h=b;c[h>>2]=14736;j=b+4|0;qm(j);k=b+8|0;c[k+0>>2]=0;c[k+4>>2]=0;c[k+8>>2]=0;c[k+12>>2]=0;c[k+16>>2]=0;c[k+20>>2]=0;c[h>>2]=14168;c[b+32>>2]=d;c[b+40>>2]=e;c[b+48>>2]=-1;a[b+52|0]=0;rm(g,j);j=tm(g,17528)|0;e=j;d=b+36|0;c[d>>2]=e;h=b+44|0;c[h>>2]=td[c[(c[j>>2]|0)+24>>2]&63](e)|0;e=c[d>>2]|0;a[b+53|0]=(td[c[(c[e>>2]|0)+28>>2]&63](e)|0)&1;if((c[h>>2]|0)>8){Dl(14008)}else{sm(g);i=f;return}}function lg(a){a=a|0;var b=0;b=i;c[a>>2]=14736;sm(a+4|0);i=b;return}function mg(a){a=a|0;var b=0;b=i;c[a>>2]=14736;sm(a+4|0);mp(a);i=b;return}function ng(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;f=tm(d,17528)|0;d=f;g=b+36|0;c[g>>2]=d;h=b+44|0;c[h>>2]=td[c[(c[f>>2]|0)+24>>2]&63](d)|0;d=c[g>>2]|0;a[b+53|0]=(td[c[(c[d>>2]|0)+28>>2]&63](d)|0)&1;if((c[h>>2]|0)>8){Dl(14008)}else{i=e;return}}function og(a){a=a|0;var b=0,c=0;b=i;c=rg(a,0)|0;i=b;return c|0}function pg(a){a=a|0;var b=0,c=0;b=i;c=rg(a,1)|0;i=b;return c|0}function qg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;i=i+32|0;f=e;g=e+8|0;h=e+16|0;j=e+24|0;k=b+52|0;l=(a[k]|0)!=0;if((d|0)==-1){if(l){m=-1;i=e;return m|0}n=c[b+48>>2]|0;a[k]=(n|0)!=-1|0;m=n;i=e;return m|0}n=b+48|0;a:do{if(l){a[h]=c[n>>2];o=c[b+36>>2]|0;p=f;q=yd[c[(c[o>>2]|0)+12>>2]&15](o,c[b+40>>2]|0,h,h+1|0,j,p,f+8|0,g)|0;if((q|0)==1|(q|0)==2){m=-1;i=e;return m|0}else if((q|0)==3){a[p]=c[n>>2];c[g>>2]=f+1}q=b+32|0;while(1){o=c[g>>2]|0;if(!(o>>>0>p>>>0)){break a}r=o+ -1|0;c[g>>2]=r;if((Gc(a[r]|0,c[q>>2]|0)|0)==-1){m=-1;break}}i=e;return m|0}}while(0);c[n>>2]=d;a[k]=1;m=d;i=e;return m|0}function rg(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;f=i;i=i+32|0;g=f;h=f+8|0;j=f+16|0;k=f+24|0;l=b+52|0;if((a[l]|0)!=0){m=b+48|0;n=c[m>>2]|0;if(!e){o=n;i=f;return o|0}c[m>>2]=-1;a[l]=0;o=n;i=f;return o|0}n=c[b+44>>2]|0;l=(n|0)>1?n:1;a:do{if((l|0)>0){n=b+32|0;m=0;while(1){p=sc(c[n>>2]|0)|0;if((p|0)==-1){o=-1;break}a[g+m|0]=p;m=m+1|0;if((m|0)>=(l|0)){break a}}i=f;return o|0}}while(0);b:do{if((a[b+53|0]|0)==0){m=b+40|0;n=b+36|0;p=g;q=h+1|0;r=b+32|0;s=l;while(1){t=c[m>>2]|0;u=t;v=c[u>>2]|0;w=c[u+4>>2]|0;u=c[n>>2]|0;x=g+s|0;y=yd[c[(c[u>>2]|0)+16>>2]&15](u,t,p,x,j,h,q,k)|0;if((y|0)==2){o=-1;z=23;break}else if((y|0)==3){z=14;break}else if((y|0)!=1){A=s;break b}y=c[m>>2]|0;c[y>>2]=v;c[y+4>>2]=w;if((s|0)==8){o=-1;z=23;break}w=sc(c[r>>2]|0)|0;if((w|0)==-1){o=-1;z=23;break}a[x]=w;s=s+1|0}if((z|0)==14){a[h]=a[p]|0;A=s;break}else if((z|0)==23){i=f;return o|0}}else{a[h]=a[g]|0;A=l}}while(0);do{if(e){l=a[h]|0;c[b+48>>2]=l&255;B=l}else{l=b+32|0;k=A;while(1){if((k|0)<=0){z=21;break}j=k+ -1|0;if((Gc(d[g+j|0]|0,c[l>>2]|0)|0)==-1){o=-1;z=23;break}else{k=j}}if((z|0)==21){B=a[h]|0;break}else if((z|0)==23){i=f;return o|0}}}while(0);o=B&255;i=f;return o|0}function sg(){var a=0;a=i;Qf(0);kd(112,13432,q|0)|0;i=a;return}function tg(a){a=a|0;i=i;return}function ug(a){a=a|0;var b=0;b=a+4|0;c[b>>2]=(c[b>>2]|0)+1;i=i;return}function vg(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;d=a+4|0;e=c[d>>2]|0;c[d>>2]=e+ -1;if((e|0)!=0){f=0;i=b;return f|0}qd[c[(c[a>>2]|0)+8>>2]&127](a);f=1;i=b;return f|0}function wg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;c[a>>2]=14312;e=Ep(b|0)|0;f=lp(e+13|0)|0;c[f+4>>2]=e;c[f>>2]=e;g=f+12|0;c[a+4>>2]=g;c[f+8>>2]=0;Cp(g|0,b|0,e+1|0)|0;i=d;return}function xg(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=14312;d=a+4|0;e=(c[d>>2]|0)+ -4|0;f=c[e>>2]|0;c[e>>2]=f+ -1;if((f+ -1|0)<0){np((c[d>>2]|0)+ -12|0)}hb(a|0);mp(a);i=b;return}function yg(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=i;c[a>>2]=14312;d=a+4|0;e=(c[d>>2]|0)+ -4|0;f=c[e>>2]|0;c[e>>2]=f+ -1;if((f+ -1|0)>=0){g=a;hb(g|0);i=b;return}np((c[d>>2]|0)+ -12|0);g=a;hb(g|0);i=b;return}function zg(a){a=a|0;i=i;return c[a+4>>2]|0}function Ag(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;c[b>>2]=14336;if((a[d]&1)==0){f=d+1|0}else{f=c[d+8>>2]|0}d=Ep(f|0)|0;g=lp(d+13|0)|0;c[g+4>>2]=d;c[g>>2]=d;h=g+12|0;c[b+4>>2]=h;c[g+8>>2]=0;Cp(h|0,f|0,d+1|0)|0;i=e;return}function Bg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;c[a>>2]=14336;e=Ep(b|0)|0;f=lp(e+13|0)|0;c[f+4>>2]=e;c[f>>2]=e;g=f+12|0;c[a+4>>2]=g;c[f+8>>2]=0;Cp(g|0,b|0,e+1|0)|0;i=d;return}function Cg(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=14336;d=a+4|0;e=(c[d>>2]|0)+ -4|0;f=c[e>>2]|0;c[e>>2]=f+ -1;if((f+ -1|0)<0){np((c[d>>2]|0)+ -12|0)}hb(a|0);mp(a);i=b;return}function Dg(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=i;c[a>>2]=14336;d=a+4|0;e=(c[d>>2]|0)+ -4|0;f=c[e>>2]|0;c[e>>2]=f+ -1;if((f+ -1|0)>=0){g=a;hb(g|0);i=b;return}np((c[d>>2]|0)+ -12|0);g=a;hb(g|0);i=b;return}function Eg(a){a=a|0;i=i;return c[a+4>>2]|0}function Fg(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=14312;d=a+4|0;e=(c[d>>2]|0)+ -4|0;f=c[e>>2]|0;c[e>>2]=f+ -1;if((f+ -1|0)<0){np((c[d>>2]|0)+ -12|0)}hb(a|0);mp(a);i=b;return}function Gg(a){a=a|0;i=i;return}function Hg(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=d;c[a+4>>2]=b;i=i;return}function Ig(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e;vd[c[(c[a>>2]|0)+12>>2]&3](f,a,b);if((c[f+4>>2]|0)!=(c[d+4>>2]|0)){g=0;i=e;return g|0}g=(c[f>>2]|0)==(c[d>>2]|0);i=e;return g|0}function Jg(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;if((c[b+4>>2]|0)!=(a|0)){f=0;i=e;return f|0}f=(c[b>>2]|0)==(d|0);i=e;return f|0}function Kg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;d=i;f=id(e|0)|0;e=Ep(f|0)|0;if(e>>>0>4294967279){Qg(0)}if(e>>>0<11){a[b]=e<<1;g=b+1|0;Cp(g|0,f|0,e|0)|0;h=g+e|0;a[h]=0;i=d;return}else{j=e+16&-16;k=kp(j)|0;c[b+8>>2]=k;c[b>>2]=j|1;c[b+4>>2]=e;g=k;Cp(g|0,f|0,e|0)|0;h=g+e|0;a[h]=0;i=d;return}}function Lg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;f=i;i=i+16|0;g=f;h=d;j=c[h>>2]|0;k=e;do{if((j|0)!=0){l=a[k]|0;if((l&1)==0){m=(l&255)>>>1}else{m=c[e+4>>2]|0}if((m|0)==0){n=j}else{_g(e,14488,2)|0;n=c[h>>2]|0}l=c[d+4>>2]|0;vd[c[(c[l>>2]|0)+24>>2]&3](g,l,n);l=g;o=a[l]|0;if((o&1)==0){p=g+1|0;q=(o&255)>>>1}else{p=c[g+8>>2]|0;q=c[g+4>>2]|0}_g(e,p,q)|0;if((a[l]&1)==0){break}mp(c[g+8>>2]|0)}}while(0);g=b;c[g+0>>2]=c[k+0>>2];c[g+4>>2]=c[k+4>>2];c[g+8>>2]=c[k+8>>2];c[k+0>>2]=0;c[k+4>>2]=0;c[k+8>>2]=0;i=f;return}function Mg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+32|0;g=f;h=f+16|0;j=Ep(e|0)|0;if(j>>>0>4294967279){Qg(0)}if(j>>>0<11){a[h]=j<<1;k=h+1|0}else{l=j+16&-16;m=kp(l)|0;c[h+8>>2]=m;c[h>>2]=l|1;c[h+4>>2]=j;k=m}Cp(k|0,e|0,j|0)|0;a[k+j|0]=0;Lg(g,d,h);Ag(b,g);if(!((a[g]&1)==0)){mp(c[g+8>>2]|0)}if(!((a[h]&1)==0)){mp(c[h+8>>2]|0)}c[b>>2]=14504;h=d;d=c[h+4>>2]|0;g=b+8|0;c[g>>2]=c[h>>2];c[g+4>>2]=d;i=f;return}function Ng(a){a=a|0;var b=0;b=i;Dg(a);mp(a);i=b;return}function Og(a){a=a|0;var b=0;b=i;Dg(a);i=b;return}function Pg(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=i;Vb(14640)|0;if((c[a>>2]|0)==1){do{Ac(14664,14640)|0;}while((c[a>>2]|0)==1)}if((c[a>>2]|0)==0){c[a>>2]=1;Yc(14640)|0;qd[d&127](b);Vb(14640)|0;c[a>>2]=-1;Yc(14640)|0;qc(14664)|0;i=e;return}else{Yc(14640)|0;i=e;return}}function Qg(a){a=a|0;a=bc(8)|0;wg(a,14712);c[a>>2]=14392;gd(a|0,14432,9)}function Rg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;f=d;if((a[f]&1)==0){g=b;c[g+0>>2]=c[f+0>>2];c[g+4>>2]=c[f+4>>2];c[g+8>>2]=c[f+8>>2];i=e;return}f=c[d+8>>2]|0;g=c[d+4>>2]|0;if(g>>>0>4294967279){Qg(0)}if(g>>>0<11){a[b]=g<<1;h=b+1|0}else{d=g+16&-16;j=kp(d)|0;c[b+8>>2]=j;c[b>>2]=d|1;c[b+4>>2]=g;h=j}Cp(h|0,f|0,g|0)|0;a[h+g|0]=0;i=e;return}function Sg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;if(e>>>0>4294967279){Qg(0)}if(e>>>0<11){a[b]=e<<1;g=b+1|0}else{h=e+16&-16;j=kp(h)|0;c[b+8>>2]=j;c[b>>2]=h|1;c[b+4>>2]=e;g=j}Cp(g|0,d|0,e|0)|0;a[g+e|0]=0;i=f;return}function Tg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;if(d>>>0>4294967279){Qg(0)}if(d>>>0<11){a[b]=d<<1;g=b+1|0}else{h=d+16&-16;j=kp(h)|0;c[b+8>>2]=j;c[b>>2]=h|1;c[b+4>>2]=d;g=j}Fp(g|0,e|0,d|0)|0;a[g+d|0]=0;i=f;return}function Ug(b){b=b|0;var d=0;d=i;if((a[b]&1)==0){i=d;return}mp(c[b+8>>2]|0);i=d;return}function Vg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;f=Ep(d|0)|0;g=b;h=a[g]|0;if((h&1)==0){j=h;k=10}else{h=c[b>>2]|0;j=h&255;k=(h&-2)+ -1|0}h=(j&1)==0;if(k>>>0<f>>>0){if(h){l=(j&255)>>>1}else{l=c[b+4>>2]|0}$g(b,k,f-k|0,l,0,l,f,d);i=e;return b|0}if(h){m=b+1|0}else{m=c[b+8>>2]|0}Dp(m|0,d|0,f|0)|0;a[m+f|0]=0;if((a[g]&1)==0){a[g]=f<<1;i=e;return b|0}else{c[b+4>>2]=f;i=e;return b|0}return 0}function Wg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;g=b;h=a[g]|0;j=(h&1)==0;if(j){k=(h&255)>>>1}else{k=c[b+4>>2]|0}if(k>>>0<d>>>0){Xg(b,d-k|0,e)|0;i=f;return}if(j){a[b+d+1|0]=0;a[g]=d<<1;i=f;return}else{a[(c[b+8>>2]|0)+d|0]=0;c[b+4>>2]=d;i=f;return}}function Xg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;f=i;if((d|0)==0){i=f;return b|0}g=b;h=a[g]|0;if((h&1)==0){j=h;k=10}else{h=c[b>>2]|0;j=h&255;k=(h&-2)+ -1|0}if((j&1)==0){l=(j&255)>>>1}else{l=c[b+4>>2]|0}if((k-l|0)>>>0<d>>>0){ah(b,k,d-k+l|0,l,l,0,0);m=a[g]|0}else{m=j}if((m&1)==0){n=b+1|0}else{n=c[b+8>>2]|0}Fp(n+l|0,e|0,d|0)|0;e=l+d|0;if((a[g]&1)==0){a[g]=e<<1}else{c[b+4>>2]=e}a[n+e|0]=0;i=f;return b|0}function Yg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;if(d>>>0>4294967279){Qg(0)}f=b;g=a[f]|0;if((g&1)==0){h=g;j=10}else{g=c[b>>2]|0;h=g&255;j=(g&-2)+ -1|0}if((h&1)==0){k=(h&255)>>>1}else{k=c[b+4>>2]|0}g=k>>>0>d>>>0?k:d;if(g>>>0<11){l=10}else{l=(g+16&-16)+ -1|0}if((l|0)==(j|0)){i=e;return}do{if((l|0)==10){m=b+1|0;n=0;o=c[b+8>>2]|0;p=1}else{g=l+1|0;if(l>>>0>j>>>0){q=kp(g)|0}else{q=kp(g)|0}if((h&1)==0){m=q;n=1;o=b+1|0;p=0;break}else{m=q;n=1;o=c[b+8>>2]|0;p=1;break}}}while(0);if((h&1)==0){r=(h&255)>>>1}else{r=c[b+4>>2]|0}Cp(m|0,o|0,r+1|0)|0;if(p){mp(o)}if(n){c[b>>2]=l+1|1;c[b+4>>2]=k;c[b+8>>2]=m;i=e;return}else{a[f]=k<<1;i=e;return}}function Zg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;e=i;f=b;g=a[f]|0;h=(g&1)!=0;if(h){j=(c[b>>2]&-2)+ -1|0;k=c[b+4>>2]|0}else{j=10;k=(g&255)>>>1}if((k|0)==(j|0)){ah(b,j,1,j,j,0,0);if((a[f]&1)==0){l=7}else{l=8}}else{if(h){l=8}else{l=7}}if((l|0)==7){a[f]=(k<<1)+2;m=b+1|0;n=k+1|0;o=m+k|0;a[o]=d;p=m+n|0;a[p]=0;i=e;return}else if((l|0)==8){l=c[b+8>>2]|0;f=k+1|0;c[b+4>>2]=f;m=l;n=f;o=m+k|0;a[o]=d;p=m+n|0;a[p]=0;i=e;return}}function _g(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;g=b;h=a[g]|0;if((h&1)==0){j=10;k=h}else{h=c[b>>2]|0;j=(h&-2)+ -1|0;k=h&255}if((k&1)==0){l=(k&255)>>>1}else{l=c[b+4>>2]|0}if((j-l|0)>>>0<e>>>0){$g(b,j,e-j+l|0,l,l,0,e,d);i=f;return b|0}if((e|0)==0){i=f;return b|0}if((k&1)==0){m=b+1|0}else{m=c[b+8>>2]|0}Cp(m+l|0,d|0,e|0)|0;d=l+e|0;if((a[g]&1)==0){a[g]=d<<1}else{c[b+4>>2]=d}a[m+d|0]=0;i=f;return b|0}function $g(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;l=i;if((-18-d|0)>>>0<e>>>0){Qg(0)}if((a[b]&1)==0){m=b+1|0}else{m=c[b+8>>2]|0}do{if(d>>>0<2147483623){n=e+d|0;o=d<<1;p=n>>>0<o>>>0?o:n;if(p>>>0<11){q=11;break}q=p+16&-16}else{q=-17}}while(0);e=kp(q)|0;if((g|0)!=0){Cp(e|0,m|0,g|0)|0}if((j|0)!=0){Cp(e+g|0,k|0,j|0)|0}k=f-h|0;if((k|0)!=(g|0)){Cp(e+(j+g)|0,m+(h+g)|0,k-g|0)|0}if((d|0)==10){r=b+8|0;c[r>>2]=e;s=q|1;t=b;c[t>>2]=s;u=k+j|0;v=b+4|0;c[v>>2]=u;w=e+u|0;a[w]=0;i=l;return}mp(m);r=b+8|0;c[r>>2]=e;s=q|1;t=b;c[t>>2]=s;u=k+j|0;v=b+4|0;c[v>>2]=u;w=e+u|0;a[w]=0;i=l;return}function ah(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;k=i;if((-17-d|0)>>>0<e>>>0){Qg(0)}if((a[b]&1)==0){l=b+1|0}else{l=c[b+8>>2]|0}do{if(d>>>0<2147483623){m=e+d|0;n=d<<1;o=m>>>0<n>>>0?n:m;if(o>>>0<11){p=11;break}p=o+16&-16}else{p=-17}}while(0);e=kp(p)|0;if((g|0)!=0){Cp(e|0,l|0,g|0)|0}o=f-h|0;if((o|0)!=(g|0)){Cp(e+(j+g)|0,l+(h+g)|0,o-g|0)|0}if((d|0)==10){q=b+8|0;c[q>>2]=e;r=p|1;s=b;c[s>>2]=r;i=k;return}mp(l);q=b+8|0;c[q>>2]=e;r=p|1;s=b;c[s>>2]=r;i=k;return}function bh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;if(e>>>0>1073741807){Qg(0)}if(e>>>0<2){a[b]=e<<1;g=b+4|0;Io(g,d,e)|0;h=g+(e<<2)|0;c[h>>2]=0;i=f;return}else{j=e+4&-4;k=kp(j<<2)|0;c[b+8>>2]=k;c[b>>2]=j|1;c[b+4>>2]=e;g=k;Io(g,d,e)|0;h=g+(e<<2)|0;c[h>>2]=0;i=f;return}}function ch(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;if(d>>>0>1073741807){Qg(0)}if(d>>>0<2){a[b]=d<<1;g=b+4|0;Ko(g,e,d)|0;h=g+(d<<2)|0;c[h>>2]=0;i=f;return}else{j=d+4&-4;k=kp(j<<2)|0;c[b+8>>2]=k;c[b>>2]=j|1;c[b+4>>2]=d;g=k;Ko(g,e,d)|0;h=g+(d<<2)|0;c[h>>2]=0;i=f;return}}function dh(b){b=b|0;var d=0;d=i;if((a[b]&1)==0){i=d;return}mp(c[b+8>>2]|0);i=d;return}function eh(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=fh(a,b,Ho(b)|0)|0;i=c;return d|0}function fh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;g=b;h=a[g]|0;if((h&1)==0){j=1;k=h}else{h=c[b>>2]|0;j=(h&-2)+ -1|0;k=h&255}h=(k&1)==0;if(j>>>0<e>>>0){if(h){l=(k&255)>>>1}else{l=c[b+4>>2]|0}ih(b,j,e-j|0,l,0,l,e,d);i=f;return b|0}if(h){m=b+4|0}else{m=c[b+8>>2]|0}Jo(m,d,e)|0;c[m+(e<<2)>>2]=0;if((a[g]&1)==0){a[g]=e<<1;i=f;return b|0}else{c[b+4>>2]=e;i=f;return b|0}return 0}function gh(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;if(d>>>0>1073741807){Qg(0)}f=b;g=a[f]|0;if((g&1)==0){h=g;j=1}else{g=c[b>>2]|0;h=g&255;j=(g&-2)+ -1|0}if((h&1)==0){k=(h&255)>>>1}else{k=c[b+4>>2]|0}g=k>>>0>d>>>0?k:d;if(g>>>0<2){l=1}else{l=(g+4&-4)+ -1|0}if((l|0)==(j|0)){i=e;return}do{if((l|0)==1){m=b+4|0;n=0;o=c[b+8>>2]|0;p=1}else{g=(l<<2)+4|0;if(l>>>0>j>>>0){q=kp(g)|0}else{q=kp(g)|0}g=q;if((h&1)==0){m=g;n=1;o=b+4|0;p=0;break}else{m=g;n=1;o=c[b+8>>2]|0;p=1;break}}}while(0);if((h&1)==0){r=(h&255)>>>1}else{r=c[b+4>>2]|0}Io(m,o,r+1|0)|0;if(p){mp(o)}if(n){c[b>>2]=l+1|1;c[b+4>>2]=k;c[b+8>>2]=m;i=e;return}else{a[f]=k<<1;i=e;return}}function hh(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;e=i;f=b;g=a[f]|0;h=(g&1)!=0;if(h){j=(c[b>>2]&-2)+ -1|0;k=c[b+4>>2]|0}else{j=1;k=(g&255)>>>1}if((k|0)==(j|0)){jh(b,j,1,j,j,0,0);if((a[f]&1)==0){l=7}else{l=8}}else{if(h){l=8}else{l=7}}if((l|0)==7){a[f]=(k<<1)+2;m=b+4|0;n=k+1|0;o=m+(k<<2)|0;c[o>>2]=d;p=m+(n<<2)|0;c[p>>2]=0;i=e;return}else if((l|0)==8){l=c[b+8>>2]|0;f=k+1|0;c[b+4>>2]=f;m=l;n=f;o=m+(k<<2)|0;c[o>>2]=d;p=m+(n<<2)|0;c[p>>2]=0;i=e;return}}function ih(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;l=i;if((1073741806-d|0)>>>0<e>>>0){Qg(0)}if((a[b]&1)==0){m=b+4|0}else{m=c[b+8>>2]|0}do{if(d>>>0<536870887){n=e+d|0;o=d<<1;p=n>>>0<o>>>0?o:n;if(p>>>0<2){q=2;break}q=p+4&-4}else{q=1073741807}}while(0);e=kp(q<<2)|0;if((g|0)!=0){Io(e,m,g)|0}if((j|0)!=0){Io(e+(g<<2)|0,k,j)|0}k=f-h|0;if((k|0)!=(g|0)){Io(e+(j+g<<2)|0,m+(h+g<<2)|0,k-g|0)|0}if((d|0)==1){r=b+8|0;c[r>>2]=e;s=q|1;t=b;c[t>>2]=s;u=k+j|0;v=b+4|0;c[v>>2]=u;w=e+(u<<2)|0;c[w>>2]=0;i=l;return}mp(m);r=b+8|0;c[r>>2]=e;s=q|1;t=b;c[t>>2]=s;u=k+j|0;v=b+4|0;c[v>>2]=u;w=e+(u<<2)|0;c[w>>2]=0;i=l;return}



function bk(e,f,g,h,j,k,l,m,n){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;var o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0;o=i;i=i+64|0;p=o;q=o+8|0;r=o+16|0;s=o+32|0;t=o+40|0;u=o+48|0;v=o+56|0;mh(s,j);w=s;s=c[w>>2]|0;if(!((c[4366]|0)==-1)){c[r>>2]=17464;c[r+4>>2]=113;c[r+8>>2]=0;Pg(17464,r,114)}r=(c[17468>>2]|0)+ -1|0;x=c[s+8>>2]|0;if(!((c[s+12>>2]|0)-x>>2>>>0>r>>>0)){y=bc(4)|0;z=y;Mo(z);gd(y|0,25424,101)}s=c[x+(r<<2)>>2]|0;if((s|0)==0){y=bc(4)|0;z=y;Mo(z);gd(y|0,25424,101)}y=s;vg(c[w>>2]|0)|0;c[k>>2]=0;w=g;a:do{if((m|0)==(n|0)){A=65}else{z=h;r=s;x=s+8|0;B=s;C=f;D=u;E=v;F=t;G=m;H=0;b:while(1){I=H;while(1){if((I|0)!=0){A=65;break a}J=c[w>>2]|0;do{if((J|0)==0){K=0}else{if((c[J+12>>2]|0)!=(c[J+16>>2]|0)){K=J;break}if(!((td[c[(c[J>>2]|0)+36>>2]&63](J)|0)==-1)){K=J;break}c[w>>2]=0;K=0}}while(0);J=(K|0)==0;L=c[z>>2]|0;c:do{if((L|0)==0){A=19}else{do{if((c[L+12>>2]|0)==(c[L+16>>2]|0)){if(!((td[c[(c[L>>2]|0)+36>>2]&63](L)|0)==-1)){break}c[z>>2]=0;A=19;break c}}while(0);if(J){M=L}else{A=20;break b}}}while(0);if((A|0)==19){A=0;if(J){A=20;break b}else{M=0}}if((nd[c[(c[r>>2]|0)+36>>2]&31](y,a[G]|0,0)|0)<<24>>24==37){A=22;break}L=a[G]|0;if(L<<24>>24>-1){N=c[x>>2]|0;if(!((b[N+(L<<24>>24<<1)>>1]&8192)==0)){O=G;A=33;break}}P=K+12|0;L=c[P>>2]|0;Q=K+16|0;if((L|0)==(c[Q>>2]|0)){R=td[c[(c[K>>2]|0)+36>>2]&63](K)|0}else{R=d[L]|0}L=Cd[c[(c[B>>2]|0)+12>>2]&15](y,R&255)|0;if(L<<24>>24==(Cd[c[(c[B>>2]|0)+12>>2]&15](y,a[G]|0)|0)<<24>>24){A=60;break}c[k>>2]=4;I=4}d:do{if((A|0)==22){A=0;I=G+1|0;if((I|0)==(n|0)){A=23;break b}L=nd[c[(c[r>>2]|0)+36>>2]&31](y,a[I]|0,0)|0;if(L<<24>>24==48|L<<24>>24==69){S=G+2|0;if((S|0)==(n|0)){A=26;break b}T=S;U=nd[c[(c[r>>2]|0)+36>>2]&31](y,a[S]|0,0)|0;V=L}else{T=I;U=L;V=0}L=c[(c[C>>2]|0)+36>>2]|0;c[D>>2]=K;c[E>>2]=M;I=q;S=u;c[I+0>>2]=c[S+0>>2];S=p;I=v;c[S+0>>2]=c[I+0>>2];sd[L&3](t,f,q,p,j,k,l,U,V);c[w>>2]=c[F>>2];W=T+1|0}else if((A|0)==33){while(1){A=0;L=O+1|0;if((L|0)==(n|0)){X=n;break}I=a[L]|0;if(!(I<<24>>24>-1)){X=L;break}if((b[N+(I<<24>>24<<1)>>1]&8192)==0){X=L;break}else{O=L;A=33}}J=K;L=M;I=M;while(1){do{if((J|0)==0){Y=0}else{if((c[J+12>>2]|0)!=(c[J+16>>2]|0)){Y=J;break}if(!((td[c[(c[J>>2]|0)+36>>2]&63](J)|0)==-1)){Y=J;break}c[w>>2]=0;Y=0}}while(0);S=(Y|0)==0;do{if((I|0)==0){Z=L;A=46}else{if((c[I+12>>2]|0)!=(c[I+16>>2]|0)){if(S){_=L;$=I;break}else{W=X;break d}}if((td[c[(c[I>>2]|0)+36>>2]&63](I)|0)==-1){c[z>>2]=0;Z=0;A=46;break}else{if(S^(L|0)==0){_=L;$=L;break}else{W=X;break d}}}}while(0);if((A|0)==46){A=0;if(S){W=X;break d}else{_=Z;$=0}}aa=Y+12|0;ba=c[aa>>2]|0;ca=Y+16|0;if((ba|0)==(c[ca>>2]|0)){da=td[c[(c[Y>>2]|0)+36>>2]&63](Y)|0}else{da=d[ba]|0}if(!((da&255)<<24>>24>-1)){W=X;break d}if((b[(c[x>>2]|0)+(da<<24>>24<<1)>>1]&8192)==0){W=X;break d}ba=c[aa>>2]|0;if((ba|0)==(c[ca>>2]|0)){td[c[(c[Y>>2]|0)+40>>2]&63](Y)|0;J=Y;L=_;I=$;continue}else{c[aa>>2]=ba+1;J=Y;L=_;I=$;continue}}}else if((A|0)==60){A=0;I=c[P>>2]|0;if((I|0)==(c[Q>>2]|0)){td[c[(c[K>>2]|0)+40>>2]&63](K)|0}else{c[P>>2]=I+1}W=G+1|0}}while(0);if((W|0)==(n|0)){A=65;break a}G=W;H=c[k>>2]|0}if((A|0)==20){c[k>>2]=4;ea=K;break}else if((A|0)==23){c[k>>2]=4;ea=K;break}else if((A|0)==26){c[k>>2]=4;ea=K;break}}}while(0);if((A|0)==65){ea=c[w>>2]|0}w=g;do{if((ea|0)==0){fa=0}else{if((c[ea+12>>2]|0)!=(c[ea+16>>2]|0)){fa=ea;break}if(!((td[c[(c[ea>>2]|0)+36>>2]&63](ea)|0)==-1)){fa=ea;break}c[w>>2]=0;fa=0}}while(0);w=(fa|0)==0;ea=h;h=c[ea>>2]|0;e:do{if((h|0)==0){A=75}else{do{if((c[h+12>>2]|0)==(c[h+16>>2]|0)){if(!((td[c[(c[h>>2]|0)+36>>2]&63](h)|0)==-1)){break}c[ea>>2]=0;A=75;break e}}while(0);if(!w){break}ga=e;c[ga>>2]=fa;i=o;return}}while(0);do{if((A|0)==75){if(w){break}ga=e;c[ga>>2]=fa;i=o;return}}while(0);c[k>>2]=c[k>>2]|2;ga=e;c[ga>>2]=fa;i=o;return}function ck(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function dk(a){a=a|0;i=i;return}function ek(a){a=a|0;i=i;return 2}function fk(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0;j=i;i=i+32|0;k=j;l=j+8|0;m=j+16|0;n=j+24|0;c[m>>2]=c[d>>2];c[n>>2]=c[e>>2];e=l;d=m;c[e+0>>2]=c[d+0>>2];d=k;e=n;c[d+0>>2]=c[e+0>>2];bk(a,b,l,k,f,g,h,16368,16376|0);i=j;return}function gk(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;k=i;i=i+32|0;l=k;m=k+8|0;n=k+16|0;o=k+24|0;p=d+8|0;q=td[c[(c[p>>2]|0)+20>>2]&63](p)|0;c[n>>2]=c[e>>2];c[o>>2]=c[f>>2];f=a[q]|0;if((f&1)==0){r=q+1|0;s=q+1|0;t=(f&255)>>>1}else{f=c[q+8>>2]|0;r=f;s=f;t=c[q+4>>2]|0}q=r+t|0;t=m;r=n;c[t+0>>2]=c[r+0>>2];r=l;t=o;c[r+0>>2]=c[t+0>>2];bk(b,d,m,l,g,h,j,s,q);i=k;return}function hk(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;j=i;i=i+40|0;k=j;l=j+8|0;m=j+16|0;n=j+32|0;mh(n,f);f=n;n=c[f>>2]|0;if(!((c[4366]|0)==-1)){c[m>>2]=17464;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17464,m,114)}m=(c[17468>>2]|0)+ -1|0;o=c[n+8>>2]|0;if(!((c[n+12>>2]|0)-o>>2>>>0>m>>>0)){p=bc(4)|0;q=p;Mo(q);gd(p|0,25424,101)}n=c[o+(m<<2)>>2]|0;if((n|0)==0){p=bc(4)|0;q=p;Mo(q);gd(p|0,25424,101)}p=n;vg(c[f>>2]|0)|0;f=c[e>>2]|0;e=b+8|0;b=td[c[c[e>>2]>>2]&63](e)|0;c[l>>2]=f;f=b+168|0;e=k;n=l;c[e+0>>2]=c[n+0>>2];n=Di(d,k,b,f,p,g,0)|0;g=n-b|0;if((g|0)>=168){r=d;s=c[r>>2]|0;t=a;c[t>>2]=s;i=j;return}c[h+24>>2]=((g|0)/12|0|0)%7|0;r=d;s=c[r>>2]|0;t=a;c[t>>2]=s;i=j;return}function ik(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;j=i;i=i+40|0;k=j;l=j+8|0;m=j+16|0;n=j+32|0;mh(n,f);f=n;n=c[f>>2]|0;if(!((c[4366]|0)==-1)){c[m>>2]=17464;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17464,m,114)}m=(c[17468>>2]|0)+ -1|0;o=c[n+8>>2]|0;if(!((c[n+12>>2]|0)-o>>2>>>0>m>>>0)){p=bc(4)|0;q=p;Mo(q);gd(p|0,25424,101)}n=c[o+(m<<2)>>2]|0;if((n|0)==0){p=bc(4)|0;q=p;Mo(q);gd(p|0,25424,101)}p=n;vg(c[f>>2]|0)|0;f=c[e>>2]|0;e=b+8|0;b=td[c[(c[e>>2]|0)+4>>2]&63](e)|0;c[l>>2]=f;f=b+288|0;e=k;n=l;c[e+0>>2]=c[n+0>>2];n=Di(d,k,b,f,p,g,0)|0;g=n-b|0;if((g|0)>=288){r=d;s=c[r>>2]|0;t=a;c[t>>2]=s;i=j;return}c[h+16>>2]=((g|0)/12|0|0)%12|0;r=d;s=c[r>>2]|0;t=a;c[t>>2]=s;i=j;return}function jk(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;b=i;i=i+40|0;j=b;k=b+8|0;l=b+16|0;m=b+32|0;mh(m,f);f=m;m=c[f>>2]|0;if(!((c[4366]|0)==-1)){c[l>>2]=17464;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17464,l,114)}l=(c[17468>>2]|0)+ -1|0;n=c[m+8>>2]|0;if(!((c[m+12>>2]|0)-n>>2>>>0>l>>>0)){o=bc(4)|0;p=o;Mo(p);gd(o|0,25424,101)}m=c[n+(l<<2)>>2]|0;if((m|0)==0){o=bc(4)|0;p=o;Mo(p);gd(o|0,25424,101)}o=m;vg(c[f>>2]|0)|0;f=h+20|0;c[k>>2]=c[e>>2];e=j;h=k;c[e+0>>2]=c[h+0>>2];h=nk(d,j,g,o,4)|0;if((c[g>>2]&4|0)!=0){q=d;r=c[q>>2]|0;s=a;c[s>>2]=r;i=b;return}if((h|0)<69){t=h+2e3|0}else{t=(h+ -69|0)>>>0<31?h+1900|0:h}c[f>>2]=t+ -1900;q=d;r=c[q>>2]|0;s=a;c[s>>2]=r;i=b;return}function kk(b,d,e,f,g,h,j,k,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0;l=i;i=i+576|0;m=l;n=l+8|0;o=l+16|0;p=l+24|0;q=l+32|0;r=l+40|0;s=l+48|0;t=l+56|0;u=l+64|0;v=l+72|0;w=l+80|0;x=l+88|0;y=l+96|0;z=l+104|0;A=l+112|0;B=l+120|0;C=l+128|0;D=l+136|0;E=l+144|0;F=l+152|0;G=l+160|0;H=l+168|0;I=l+176|0;J=l+184|0;K=l+192|0;L=l+200|0;M=l+208|0;N=l+216|0;O=l+224|0;P=l+232|0;Q=l+240|0;R=l+248|0;S=l+256|0;T=l+264|0;U=l+272|0;V=l+280|0;W=l+288|0;X=l+296|0;Y=l+304|0;Z=l+312|0;_=l+320|0;$=l+328|0;aa=l+336|0;ba=l+344|0;ca=l+352|0;da=l+368|0;ea=l+376|0;fa=l+384|0;ga=l+392|0;ha=l+400|0;ia=l+408|0;ja=l+416|0;ka=l+424|0;la=l+432|0;ma=l+440|0;na=l+448|0;oa=l+456|0;pa=l+464|0;qa=l+472|0;ra=l+480|0;sa=l+488|0;ta=l+496|0;ua=l+504|0;va=l+512|0;wa=l+520|0;xa=l+528|0;ya=l+536|0;za=l+544|0;Aa=l+552|0;Ba=l+560|0;Ca=l+568|0;c[h>>2]=0;mh(da,g);Da=da;da=c[Da>>2]|0;if(!((c[4366]|0)==-1)){c[ca>>2]=17464;c[ca+4>>2]=113;c[ca+8>>2]=0;Pg(17464,ca,114)}ca=(c[17468>>2]|0)+ -1|0;Ea=c[da+8>>2]|0;if(!((c[da+12>>2]|0)-Ea>>2>>>0>ca>>>0)){Fa=bc(4)|0;Ga=Fa;Mo(Ga);gd(Fa|0,25424,101)}da=c[Ea+(ca<<2)>>2]|0;if((da|0)==0){Fa=bc(4)|0;Ga=Fa;Mo(Ga);gd(Fa|0,25424,101)}Fa=da;vg(c[Da>>2]|0)|0;a:do{switch(k<<24>>24|0){case 104:case 66:case 98:{Da=c[f>>2]|0;da=d+8|0;Ga=td[c[(c[da>>2]|0)+4>>2]&63](da)|0;c[aa>>2]=Da;c[P+0>>2]=c[aa+0>>2];Da=(Di(e,P,Ga,Ga+288|0,Fa,h,0)|0)-Ga|0;if((Da|0)>=288){break a}c[j+16>>2]=((Da|0)/12|0|0)%12|0;break};case 106:{c[Y>>2]=c[f>>2];c[F+0>>2]=c[Y+0>>2];Da=nk(e,F,h,Fa,3)|0;Ga=c[h>>2]|0;if((Ga&4|0)==0&(Da|0)<366){c[j+28>>2]=Da;break a}else{c[h>>2]=Ga|4;break a}break};case 65:case 97:{Ga=c[f>>2]|0;Da=d+8|0;da=td[c[c[Da>>2]>>2]&63](Da)|0;c[ba>>2]=Ga;c[Q+0>>2]=c[ba+0>>2];Ga=(Di(e,Q,da,da+168|0,Fa,h,0)|0)-da|0;if((Ga|0)>=168){break a}c[j+24>>2]=((Ga|0)/12|0|0)%7|0;break};case 72:{c[_>>2]=c[f>>2];c[H+0>>2]=c[_+0>>2];Ga=nk(e,H,h,Fa,2)|0;da=c[h>>2]|0;if((da&4|0)==0&(Ga|0)<24){c[j+8>>2]=Ga;break a}else{c[h>>2]=da|4;break a}break};case 101:case 100:{da=j+12|0;c[$>>2]=c[f>>2];c[M+0>>2]=c[$+0>>2];Ga=nk(e,M,h,Fa,2)|0;Da=c[h>>2]|0;do{if((Da&4|0)==0){if(!((Ga+ -1|0)>>>0<31)){break}c[da>>2]=Ga;break a}}while(0);c[h>>2]=Da|4;break};case 68:{Ga=e;c[ia>>2]=c[Ga>>2];c[ja>>2]=c[f>>2];c[L+0>>2]=c[ia+0>>2];c[K+0>>2]=c[ja+0>>2];bk(ha,d,L,K,g,h,j,16376,16384|0);c[Ga>>2]=c[ha>>2];break};case 70:{Ga=e;c[la>>2]=c[Ga>>2];c[ma>>2]=c[f>>2];c[J+0>>2]=c[la+0>>2];c[I+0>>2]=c[ma+0>>2];bk(ka,d,J,I,g,h,j,16384,16392|0);c[Ga>>2]=c[ka>>2];break};case 73:{Ga=j+8|0;c[Z>>2]=c[f>>2];c[G+0>>2]=c[Z+0>>2];da=nk(e,G,h,Fa,2)|0;ca=c[h>>2]|0;do{if((ca&4|0)==0){if(!((da+ -1|0)>>>0<12)){break}c[Ga>>2]=da;break a}}while(0);c[h>>2]=ca|4;break};case 116:case 110:{c[na>>2]=c[f>>2];c[C+0>>2]=c[na+0>>2];lk(0,e,C,h,Fa);break};case 112:{da=j+8|0;Ga=c[f>>2]|0;Da=d+8|0;Ea=td[c[(c[Da>>2]|0)+8>>2]&63](Da)|0;Da=a[Ea]|0;if((Da&1)==0){Ha=(Da&255)>>>1}else{Ha=c[Ea+4>>2]|0}Da=a[Ea+12|0]|0;if((Da&1)==0){Ia=(Da&255)>>>1}else{Ia=c[Ea+16>>2]|0}if((Ha|0)==(0-Ia|0)){c[h>>2]=c[h>>2]|4;break a}c[V>>2]=Ga;c[B+0>>2]=c[V+0>>2];Ga=Di(e,B,Ea,Ea+24|0,Fa,h,0)|0;Da=Ga-Ea|0;do{if((Ga|0)==(Ea|0)){if((c[da>>2]|0)!=12){break}c[da>>2]=0;break a}}while(0);if((Da|0)!=12){break a}Ea=c[da>>2]|0;if((Ea|0)>=12){break a}c[da>>2]=Ea+12;break};case 109:{c[X>>2]=c[f>>2];c[E+0>>2]=c[X+0>>2];Ea=nk(e,E,h,Fa,2)|0;Ga=c[h>>2]|0;if((Ga&4|0)==0&(Ea|0)<13){c[j+16>>2]=Ea+ -1;break a}else{c[h>>2]=Ga|4;break a}break};case 77:{c[W>>2]=c[f>>2];c[D+0>>2]=c[W+0>>2];Ga=nk(e,D,h,Fa,2)|0;Ea=c[h>>2]|0;if((Ea&4|0)==0&(Ga|0)<60){c[j+4>>2]=Ga;break a}else{c[h>>2]=Ea|4;break a}break};case 114:{Ea=e;c[pa>>2]=c[Ea>>2];c[qa>>2]=c[f>>2];c[A+0>>2]=c[pa+0>>2];c[z+0>>2]=c[qa+0>>2];bk(oa,d,A,z,g,h,j,16392,16403|0);c[Ea>>2]=c[oa>>2];break};case 82:{Ea=e;c[sa>>2]=c[Ea>>2];c[ta>>2]=c[f>>2];c[y+0>>2]=c[sa+0>>2];c[x+0>>2]=c[ta+0>>2];bk(ra,d,y,x,g,h,j,16408,16413|0);c[Ea>>2]=c[ra>>2];break};case 83:{c[U>>2]=c[f>>2];c[w+0>>2]=c[U+0>>2];Ea=nk(e,w,h,Fa,2)|0;Ga=c[h>>2]|0;if((Ga&4|0)==0&(Ea|0)<61){c[j>>2]=Ea;break a}else{c[h>>2]=Ga|4;break a}break};case 84:{Ga=e;c[va>>2]=c[Ga>>2];c[wa>>2]=c[f>>2];c[v+0>>2]=c[va+0>>2];c[u+0>>2]=c[wa+0>>2];bk(ua,d,v,u,g,h,j,16416,16424|0);c[Ga>>2]=c[ua>>2];break};case 119:{c[T>>2]=c[f>>2];c[t+0>>2]=c[T+0>>2];Ga=nk(e,t,h,Fa,1)|0;Ea=c[h>>2]|0;if((Ea&4|0)==0&(Ga|0)<7){c[j+24>>2]=Ga;break a}else{c[h>>2]=Ea|4;break a}break};case 120:{Ea=c[(c[d>>2]|0)+20>>2]|0;c[xa>>2]=c[e>>2];c[ya>>2]=c[f>>2];c[s+0>>2]=c[xa+0>>2];c[r+0>>2]=c[ya+0>>2];od[Ea&63](b,d,s,r,g,h,j);i=l;return};case 88:{Ea=d+8|0;Ga=td[c[(c[Ea>>2]|0)+24>>2]&63](Ea)|0;Ea=e;c[Aa>>2]=c[Ea>>2];c[Ba>>2]=c[f>>2];ca=a[Ga]|0;if((ca&1)==0){Ja=Ga+1|0;Ka=Ga+1|0;La=(ca&255)>>>1}else{ca=c[Ga+8>>2]|0;Ja=ca;Ka=ca;La=c[Ga+4>>2]|0}c[q+0>>2]=c[Aa+0>>2];c[p+0>>2]=c[Ba+0>>2];bk(za,d,q,p,g,h,j,Ka,Ja+La|0);c[Ea>>2]=c[za>>2];break};case 121:{c[S>>2]=c[f>>2];c[o+0>>2]=c[S+0>>2];Ea=nk(e,o,h,Fa,4)|0;if((c[h>>2]&4|0)!=0){break a}if((Ea|0)<69){Ma=Ea+2e3|0}else{Ma=(Ea+ -69|0)>>>0<31?Ea+1900|0:Ea}c[j+20>>2]=Ma+ -1900;break};case 89:{c[R>>2]=c[f>>2];c[n+0>>2]=c[R+0>>2];Ea=nk(e,n,h,Fa,4)|0;if((c[h>>2]&4|0)!=0){break a}c[j+20>>2]=Ea+ -1900;break};case 37:{c[Ca>>2]=c[f>>2];c[m+0>>2]=c[Ca+0>>2];mk(0,e,m,h,Fa);break};case 99:{Ea=d+8|0;Ga=td[c[(c[Ea>>2]|0)+12>>2]&63](Ea)|0;Ea=e;c[fa>>2]=c[Ea>>2];c[ga>>2]=c[f>>2];ca=a[Ga]|0;if((ca&1)==0){Na=Ga+1|0;Oa=Ga+1|0;Pa=(ca&255)>>>1}else{ca=c[Ga+8>>2]|0;Na=ca;Oa=ca;Pa=c[Ga+4>>2]|0}c[O+0>>2]=c[fa+0>>2];c[N+0>>2]=c[ga+0>>2];bk(ea,d,O,N,g,h,j,Oa,Na+Pa|0);c[Ea>>2]=c[ea>>2];break};default:{c[h>>2]=c[h>>2]|4}}}while(0);c[b>>2]=c[e>>2];i=l;return}function lk(a,e,f,g,h){a=a|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;a=i;j=e;e=f;f=h+8|0;a:while(1){h=c[j>>2]|0;do{if((h|0)==0){k=0}else{if((c[h+12>>2]|0)!=(c[h+16>>2]|0)){k=h;break}if((td[c[(c[h>>2]|0)+36>>2]&63](h)|0)==-1){c[j>>2]=0;k=0;break}else{k=c[j>>2]|0;break}}}while(0);h=(k|0)==0;l=c[e>>2]|0;do{if((l|0)==0){m=12}else{if((c[l+12>>2]|0)!=(c[l+16>>2]|0)){if(h){n=l;break}else{o=l;break a}}if((td[c[(c[l>>2]|0)+36>>2]&63](l)|0)==-1){c[e>>2]=0;m=12;break}else{if(h){n=l;break}else{o=l;break a}}}}while(0);if((m|0)==12){m=0;if(h){o=0;break}else{n=0}}l=c[j>>2]|0;p=c[l+12>>2]|0;if((p|0)==(c[l+16>>2]|0)){q=td[c[(c[l>>2]|0)+36>>2]&63](l)|0}else{q=d[p]|0}if(!((q&255)<<24>>24>-1)){o=n;break}if((b[(c[f>>2]|0)+(q<<24>>24<<1)>>1]&8192)==0){o=n;break}p=c[j>>2]|0;l=p+12|0;r=c[l>>2]|0;if((r|0)==(c[p+16>>2]|0)){td[c[(c[p>>2]|0)+40>>2]&63](p)|0;continue}else{c[l>>2]=r+1;continue}}n=c[j>>2]|0;do{if((n|0)==0){s=0}else{if((c[n+12>>2]|0)!=(c[n+16>>2]|0)){s=n;break}if((td[c[(c[n>>2]|0)+36>>2]&63](n)|0)==-1){c[j>>2]=0;s=0;break}else{s=c[j>>2]|0;break}}}while(0);j=(s|0)==0;b:do{if((o|0)==0){m=32}else{do{if((c[o+12>>2]|0)==(c[o+16>>2]|0)){if(!((td[c[(c[o>>2]|0)+36>>2]&63](o)|0)==-1)){break}c[e>>2]=0;m=32;break b}}while(0);if(!j){break}i=a;return}}while(0);do{if((m|0)==32){if(j){break}i=a;return}}while(0);c[g>>2]=c[g>>2]|2;i=a;return}function mk(a,b,e,f,g){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0;a=i;h=b;b=c[h>>2]|0;do{if((b|0)==0){j=0}else{if((c[b+12>>2]|0)!=(c[b+16>>2]|0)){j=b;break}if((td[c[(c[b>>2]|0)+36>>2]&63](b)|0)==-1){c[h>>2]=0;j=0;break}else{j=c[h>>2]|0;break}}}while(0);b=(j|0)==0;j=e;e=c[j>>2]|0;a:do{if((e|0)==0){k=11}else{do{if((c[e+12>>2]|0)==(c[e+16>>2]|0)){if(!((td[c[(c[e>>2]|0)+36>>2]&63](e)|0)==-1)){break}c[j>>2]=0;k=11;break a}}while(0);if(b){l=e}else{k=12}}}while(0);if((k|0)==11){if(b){k=12}else{l=0}}if((k|0)==12){c[f>>2]=c[f>>2]|6;i=a;return}b=c[h>>2]|0;e=c[b+12>>2]|0;if((e|0)==(c[b+16>>2]|0)){m=td[c[(c[b>>2]|0)+36>>2]&63](b)|0}else{m=d[e]|0}if(!((nd[c[(c[g>>2]|0)+36>>2]&31](g,m&255,0)|0)<<24>>24==37)){c[f>>2]=c[f>>2]|4;i=a;return}m=c[h>>2]|0;g=m+12|0;e=c[g>>2]|0;if((e|0)==(c[m+16>>2]|0)){td[c[(c[m>>2]|0)+40>>2]&63](m)|0}else{c[g>>2]=e+1}e=c[h>>2]|0;do{if((e|0)==0){n=0}else{if((c[e+12>>2]|0)!=(c[e+16>>2]|0)){n=e;break}if((td[c[(c[e>>2]|0)+36>>2]&63](e)|0)==-1){c[h>>2]=0;n=0;break}else{n=c[h>>2]|0;break}}}while(0);h=(n|0)==0;b:do{if((l|0)==0){k=31}else{do{if((c[l+12>>2]|0)==(c[l+16>>2]|0)){if(!((td[c[(c[l>>2]|0)+36>>2]&63](l)|0)==-1)){break}c[j>>2]=0;k=31;break b}}while(0);if(!h){break}i=a;return}}while(0);do{if((k|0)==31){if(h){break}i=a;return}}while(0);c[f>>2]=c[f>>2]|2;i=a;return}function nk(a,e,f,g,h){a=a|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;j=i;k=a;a=c[k>>2]|0;do{if((a|0)==0){l=0}else{if((c[a+12>>2]|0)!=(c[a+16>>2]|0)){l=a;break}if((td[c[(c[a>>2]|0)+36>>2]&63](a)|0)==-1){c[k>>2]=0;l=0;break}else{l=c[k>>2]|0;break}}}while(0);a=(l|0)==0;l=e;e=c[l>>2]|0;a:do{if((e|0)==0){m=11}else{do{if((c[e+12>>2]|0)==(c[e+16>>2]|0)){if(!((td[c[(c[e>>2]|0)+36>>2]&63](e)|0)==-1)){break}c[l>>2]=0;m=11;break a}}while(0);if(a){n=e}else{m=12}}}while(0);if((m|0)==11){if(a){m=12}else{n=0}}if((m|0)==12){c[f>>2]=c[f>>2]|6;o=0;i=j;return o|0}a=c[k>>2]|0;e=c[a+12>>2]|0;if((e|0)==(c[a+16>>2]|0)){p=td[c[(c[a>>2]|0)+36>>2]&63](a)|0}else{p=d[e]|0}e=p&255;do{if(e<<24>>24>-1){a=g+8|0;if((b[(c[a>>2]|0)+(p<<24>>24<<1)>>1]&2048)==0){break}q=g;r=(nd[c[(c[q>>2]|0)+36>>2]&31](g,e,0)|0)<<24>>24;s=c[k>>2]|0;t=s+12|0;u=c[t>>2]|0;if((u|0)==(c[s+16>>2]|0)){td[c[(c[s>>2]|0)+40>>2]&63](s)|0;v=h;w=n;x=n;y=r}else{c[t>>2]=u+1;v=h;w=n;x=n;y=r}while(1){z=y+ -48|0;r=v+ -1|0;u=c[k>>2]|0;do{if((u|0)==0){A=0}else{if((c[u+12>>2]|0)!=(c[u+16>>2]|0)){A=u;break}if((td[c[(c[u>>2]|0)+36>>2]&63](u)|0)==-1){c[k>>2]=0;A=0;break}else{A=c[k>>2]|0;break}}}while(0);u=(A|0)==0;do{if((x|0)==0){B=w;C=0}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){B=w;C=x;break}if(!((td[c[(c[x>>2]|0)+36>>2]&63](x)|0)==-1)){B=w;C=w;break}c[l>>2]=0;B=0;C=0}}while(0);D=c[k>>2]|0;if(!((u^(C|0)==0)&(r|0)>0)){m=40;break}t=c[D+12>>2]|0;if((t|0)==(c[D+16>>2]|0)){E=td[c[(c[D>>2]|0)+36>>2]&63](D)|0}else{E=d[t]|0}t=E&255;if(!(t<<24>>24>-1)){o=z;m=52;break}if((b[(c[a>>2]|0)+(E<<24>>24<<1)>>1]&2048)==0){o=z;m=52;break}s=((nd[c[(c[q>>2]|0)+36>>2]&31](g,t,0)|0)<<24>>24)+(z*10|0)|0;t=c[k>>2]|0;F=t+12|0;G=c[F>>2]|0;if((G|0)==(c[t+16>>2]|0)){td[c[(c[t>>2]|0)+40>>2]&63](t)|0;H=r;w=B;x=C;y=s;v=H;continue}else{c[F>>2]=G+1;H=r;w=B;x=C;y=s;v=H;continue}}if((m|0)==40){do{if((D|0)==0){I=0}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){I=D;break}if((td[c[(c[D>>2]|0)+36>>2]&63](D)|0)==-1){c[k>>2]=0;I=0;break}else{I=c[k>>2]|0;break}}}while(0);q=(I|0)==0;b:do{if((B|0)==0){m=50}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if(!((td[c[(c[B>>2]|0)+36>>2]&63](B)|0)==-1)){break}c[l>>2]=0;m=50;break b}}while(0);if(q){o=z}else{break}i=j;return o|0}}while(0);do{if((m|0)==50){if(q){break}else{o=z}i=j;return o|0}}while(0);c[f>>2]=c[f>>2]|2;o=z;i=j;return o|0}else if((m|0)==52){i=j;return o|0}}}while(0);c[f>>2]=c[f>>2]|4;o=0;i=j;return o|0}function ok(a,b,d,e,f,g,h,j,k){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0;l=i;i=i+64|0;m=l;n=l+8|0;o=l+16|0;p=l+32|0;q=l+40|0;r=l+48|0;s=l+56|0;mh(p,f);t=p;p=c[t>>2]|0;if(!((c[4364]|0)==-1)){c[o>>2]=17456;c[o+4>>2]=113;c[o+8>>2]=0;Pg(17456,o,114)}o=(c[17460>>2]|0)+ -1|0;u=c[p+8>>2]|0;if(!((c[p+12>>2]|0)-u>>2>>>0>o>>>0)){v=bc(4)|0;w=v;Mo(w);gd(v|0,25424,101)}p=c[u+(o<<2)>>2]|0;if((p|0)==0){v=bc(4)|0;w=v;Mo(w);gd(v|0,25424,101)}v=p;vg(c[t>>2]|0)|0;c[g>>2]=0;t=d;a:do{if((j|0)==(k|0)){x=69}else{w=e;o=p;u=p;y=p;z=b;A=r;B=s;C=q;D=j;E=0;b:while(1){F=E;while(1){if((F|0)!=0){x=69;break a}G=c[t>>2]|0;do{if((G|0)==0){H=0;I=1}else{J=c[G+12>>2]|0;if((J|0)==(c[G+16>>2]|0)){K=td[c[(c[G>>2]|0)+36>>2]&63](G)|0}else{K=c[J>>2]|0}if(!((K|0)==-1)){H=G;I=0;break}c[t>>2]=0;H=0;I=1}}while(0);G=c[w>>2]|0;do{if((G|0)==0){x=22}else{J=c[G+12>>2]|0;if((J|0)==(c[G+16>>2]|0)){L=td[c[(c[G>>2]|0)+36>>2]&63](G)|0}else{L=c[J>>2]|0}if((L|0)==-1){c[w>>2]=0;x=22;break}else{if(I){M=G;break}else{x=24;break b}}}}while(0);if((x|0)==22){x=0;if(I){x=24;break b}else{M=0}}if((nd[c[(c[o>>2]|0)+52>>2]&31](v,c[D>>2]|0,0)|0)<<24>>24==37){x=26;break}if(nd[c[(c[u>>2]|0)+12>>2]&31](v,8192,c[D>>2]|0)|0){N=D;x=36;break}O=H+12|0;G=c[O>>2]|0;P=H+16|0;if((G|0)==(c[P>>2]|0)){Q=td[c[(c[H>>2]|0)+36>>2]&63](H)|0}else{Q=c[G>>2]|0}G=Cd[c[(c[y>>2]|0)+28>>2]&15](v,Q)|0;if((G|0)==(Cd[c[(c[y>>2]|0)+28>>2]&15](v,c[D>>2]|0)|0)){x=64;break}c[g>>2]=4;F=4}c:do{if((x|0)==26){x=0;F=D+4|0;if((F|0)==(k|0)){x=27;break b}G=nd[c[(c[o>>2]|0)+52>>2]&31](v,c[F>>2]|0,0)|0;if(G<<24>>24==48|G<<24>>24==69){J=D+8|0;if((J|0)==(k|0)){x=30;break b}R=J;S=nd[c[(c[o>>2]|0)+52>>2]&31](v,c[J>>2]|0,0)|0;T=G}else{R=F;S=G;T=0}G=c[(c[z>>2]|0)+36>>2]|0;c[A>>2]=H;c[B>>2]=M;F=n;J=r;c[F+0>>2]=c[J+0>>2];J=m;F=s;c[J+0>>2]=c[F+0>>2];sd[G&3](q,b,n,m,f,g,h,S,T);c[t>>2]=c[C>>2];U=R+4|0}else if((x|0)==36){while(1){x=0;G=N+4|0;if((G|0)==(k|0)){V=k;break}if(nd[c[(c[u>>2]|0)+12>>2]&31](v,8192,c[G>>2]|0)|0){N=G;x=36}else{V=G;break}}G=H;F=M;J=M;while(1){do{if((G|0)==0){W=0;X=1}else{Y=c[G+12>>2]|0;if((Y|0)==(c[G+16>>2]|0)){Z=td[c[(c[G>>2]|0)+36>>2]&63](G)|0}else{Z=c[Y>>2]|0}if(!((Z|0)==-1)){W=G;X=0;break}c[t>>2]=0;W=0;X=1}}while(0);do{if((J|0)==0){_=F;x=51}else{Y=c[J+12>>2]|0;if((Y|0)==(c[J+16>>2]|0)){$=td[c[(c[J>>2]|0)+36>>2]&63](J)|0}else{$=c[Y>>2]|0}if(($|0)==-1){c[w>>2]=0;_=0;x=51;break}else{if(X^(F|0)==0){aa=F;ba=F;break}else{U=V;break c}}}}while(0);if((x|0)==51){x=0;if(X){U=V;break c}else{aa=_;ba=0}}Y=W+12|0;ca=c[Y>>2]|0;da=W+16|0;if((ca|0)==(c[da>>2]|0)){ea=td[c[(c[W>>2]|0)+36>>2]&63](W)|0}else{ea=c[ca>>2]|0}if(!(nd[c[(c[u>>2]|0)+12>>2]&31](v,8192,ea)|0)){U=V;break c}ca=c[Y>>2]|0;if((ca|0)==(c[da>>2]|0)){td[c[(c[W>>2]|0)+40>>2]&63](W)|0;G=W;F=aa;J=ba;continue}else{c[Y>>2]=ca+4;G=W;F=aa;J=ba;continue}}}else if((x|0)==64){x=0;J=c[O>>2]|0;if((J|0)==(c[P>>2]|0)){td[c[(c[H>>2]|0)+40>>2]&63](H)|0}else{c[O>>2]=J+4}U=D+4|0}}while(0);if((U|0)==(k|0)){x=69;break a}D=U;E=c[g>>2]|0}if((x|0)==24){c[g>>2]=4;fa=H;break}else if((x|0)==27){c[g>>2]=4;fa=H;break}else if((x|0)==30){c[g>>2]=4;fa=H;break}}}while(0);if((x|0)==69){fa=c[t>>2]|0}t=d;do{if((fa|0)==0){ga=0;ha=1}else{d=c[fa+12>>2]|0;if((d|0)==(c[fa+16>>2]|0)){ia=td[c[(c[fa>>2]|0)+36>>2]&63](fa)|0}else{ia=c[d>>2]|0}if(!((ia|0)==-1)){ga=fa;ha=0;break}c[t>>2]=0;ga=0;ha=1}}while(0);t=e;e=c[t>>2]|0;do{if((e|0)==0){x=82}else{fa=c[e+12>>2]|0;if((fa|0)==(c[e+16>>2]|0)){ja=td[c[(c[e>>2]|0)+36>>2]&63](e)|0}else{ja=c[fa>>2]|0}if((ja|0)==-1){c[t>>2]=0;x=82;break}if(!ha){break}ka=a;c[ka>>2]=ga;i=l;return}}while(0);do{if((x|0)==82){if(ha){break}ka=a;c[ka>>2]=ga;i=l;return}}while(0);c[g>>2]=c[g>>2]|2;ka=a;c[ka>>2]=ga;i=l;return}function pk(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function qk(a){a=a|0;i=i;return}function rk(a){a=a|0;i=i;return 2}function sk(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0;j=i;i=i+32|0;k=j;l=j+8|0;m=j+16|0;n=j+24|0;c[m>>2]=c[d>>2];c[n>>2]=c[e>>2];e=l;d=m;c[e+0>>2]=c[d+0>>2];d=k;e=n;c[d+0>>2]=c[e+0>>2];ok(a,b,l,k,f,g,h,16520,16552|0);i=j;return}function tk(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;k=i;i=i+32|0;l=k;m=k+8|0;n=k+16|0;o=k+24|0;p=d+8|0;q=td[c[(c[p>>2]|0)+20>>2]&63](p)|0;c[n>>2]=c[e>>2];c[o>>2]=c[f>>2];f=a[q]|0;if((f&1)==0){r=q+4|0;s=q+4|0;t=(f&255)>>>1}else{f=c[q+8>>2]|0;r=f;s=f;t=c[q+4>>2]|0}q=r+(t<<2)|0;t=m;r=n;c[t+0>>2]=c[r+0>>2];r=l;t=o;c[r+0>>2]=c[t+0>>2];ok(b,d,m,l,g,h,j,s,q);i=k;return}function uk(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;j=i;i=i+40|0;k=j;l=j+8|0;m=j+16|0;n=j+32|0;mh(n,f);f=n;n=c[f>>2]|0;if(!((c[4364]|0)==-1)){c[m>>2]=17456;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17456,m,114)}m=(c[17460>>2]|0)+ -1|0;o=c[n+8>>2]|0;if(!((c[n+12>>2]|0)-o>>2>>>0>m>>>0)){p=bc(4)|0;q=p;Mo(q);gd(p|0,25424,101)}n=c[o+(m<<2)>>2]|0;if((n|0)==0){p=bc(4)|0;q=p;Mo(q);gd(p|0,25424,101)}p=n;vg(c[f>>2]|0)|0;f=c[e>>2]|0;e=b+8|0;b=td[c[c[e>>2]>>2]&63](e)|0;c[l>>2]=f;f=b+168|0;e=k;n=l;c[e+0>>2]=c[n+0>>2];n=aj(d,k,b,f,p,g,0)|0;g=n-b|0;if((g|0)>=168){r=d;s=c[r>>2]|0;t=a;c[t>>2]=s;i=j;return}c[h+24>>2]=((g|0)/12|0|0)%7|0;r=d;s=c[r>>2]|0;t=a;c[t>>2]=s;i=j;return}function vk(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;j=i;i=i+40|0;k=j;l=j+8|0;m=j+16|0;n=j+32|0;mh(n,f);f=n;n=c[f>>2]|0;if(!((c[4364]|0)==-1)){c[m>>2]=17456;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17456,m,114)}m=(c[17460>>2]|0)+ -1|0;o=c[n+8>>2]|0;if(!((c[n+12>>2]|0)-o>>2>>>0>m>>>0)){p=bc(4)|0;q=p;Mo(q);gd(p|0,25424,101)}n=c[o+(m<<2)>>2]|0;if((n|0)==0){p=bc(4)|0;q=p;Mo(q);gd(p|0,25424,101)}p=n;vg(c[f>>2]|0)|0;f=c[e>>2]|0;e=b+8|0;b=td[c[(c[e>>2]|0)+4>>2]&63](e)|0;c[l>>2]=f;f=b+288|0;e=k;n=l;c[e+0>>2]=c[n+0>>2];n=aj(d,k,b,f,p,g,0)|0;g=n-b|0;if((g|0)>=288){r=d;s=c[r>>2]|0;t=a;c[t>>2]=s;i=j;return}c[h+16>>2]=((g|0)/12|0|0)%12|0;r=d;s=c[r>>2]|0;t=a;c[t>>2]=s;i=j;return}function wk(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;b=i;i=i+40|0;j=b;k=b+8|0;l=b+16|0;m=b+32|0;mh(m,f);f=m;m=c[f>>2]|0;if(!((c[4364]|0)==-1)){c[l>>2]=17456;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17456,l,114)}l=(c[17460>>2]|0)+ -1|0;n=c[m+8>>2]|0;if(!((c[m+12>>2]|0)-n>>2>>>0>l>>>0)){o=bc(4)|0;p=o;Mo(p);gd(o|0,25424,101)}m=c[n+(l<<2)>>2]|0;if((m|0)==0){o=bc(4)|0;p=o;Mo(p);gd(o|0,25424,101)}o=m;vg(c[f>>2]|0)|0;f=h+20|0;c[k>>2]=c[e>>2];e=j;h=k;c[e+0>>2]=c[h+0>>2];h=Ak(d,j,g,o,4)|0;if((c[g>>2]&4|0)!=0){q=d;r=c[q>>2]|0;s=a;c[s>>2]=r;i=b;return}if((h|0)<69){t=h+2e3|0}else{t=(h+ -69|0)>>>0<31?h+1900|0:h}c[f>>2]=t+ -1900;q=d;r=c[q>>2]|0;s=a;c[s>>2]=r;i=b;return}function xk(b,d,e,f,g,h,j,k,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0;l=i;i=i+576|0;m=l;n=l+8|0;o=l+16|0;p=l+24|0;q=l+32|0;r=l+40|0;s=l+48|0;t=l+56|0;u=l+64|0;v=l+72|0;w=l+80|0;x=l+88|0;y=l+96|0;z=l+104|0;A=l+112|0;B=l+120|0;C=l+128|0;D=l+136|0;E=l+144|0;F=l+152|0;G=l+160|0;H=l+168|0;I=l+176|0;J=l+184|0;K=l+192|0;L=l+200|0;M=l+208|0;N=l+216|0;O=l+224|0;P=l+232|0;Q=l+240|0;R=l+248|0;S=l+256|0;T=l+264|0;U=l+272|0;V=l+280|0;W=l+288|0;X=l+296|0;Y=l+304|0;Z=l+312|0;_=l+320|0;$=l+328|0;aa=l+336|0;ba=l+344|0;ca=l+352|0;da=l+368|0;ea=l+376|0;fa=l+384|0;ga=l+392|0;ha=l+400|0;ia=l+408|0;ja=l+416|0;ka=l+424|0;la=l+432|0;ma=l+440|0;na=l+448|0;oa=l+456|0;pa=l+464|0;qa=l+472|0;ra=l+480|0;sa=l+488|0;ta=l+496|0;ua=l+504|0;va=l+512|0;wa=l+520|0;xa=l+528|0;ya=l+536|0;za=l+544|0;Aa=l+552|0;Ba=l+560|0;Ca=l+568|0;c[h>>2]=0;mh(da,g);Da=da;da=c[Da>>2]|0;if(!((c[4364]|0)==-1)){c[ca>>2]=17456;c[ca+4>>2]=113;c[ca+8>>2]=0;Pg(17456,ca,114)}ca=(c[17460>>2]|0)+ -1|0;Ea=c[da+8>>2]|0;if(!((c[da+12>>2]|0)-Ea>>2>>>0>ca>>>0)){Fa=bc(4)|0;Ga=Fa;Mo(Ga);gd(Fa|0,25424,101)}da=c[Ea+(ca<<2)>>2]|0;if((da|0)==0){Fa=bc(4)|0;Ga=Fa;Mo(Ga);gd(Fa|0,25424,101)}Fa=da;vg(c[Da>>2]|0)|0;a:do{switch(k<<24>>24|0){case 84:{Da=e;c[va>>2]=c[Da>>2];c[wa>>2]=c[f>>2];c[v+0>>2]=c[va+0>>2];c[u+0>>2]=c[wa+0>>2];ok(ua,d,v,u,g,h,j,16688,16720|0);c[Da>>2]=c[ua>>2];break};case 119:{c[T>>2]=c[f>>2];c[t+0>>2]=c[T+0>>2];Da=Ak(e,t,h,Fa,1)|0;da=c[h>>2]|0;if((da&4|0)==0&(Da|0)<7){c[j+24>>2]=Da;break a}else{c[h>>2]=da|4;break a}break};case 120:{da=c[(c[d>>2]|0)+20>>2]|0;c[xa>>2]=c[e>>2];c[ya>>2]=c[f>>2];c[s+0>>2]=c[xa+0>>2];c[r+0>>2]=c[ya+0>>2];od[da&63](b,d,s,r,g,h,j);i=l;return};case 112:{da=j+8|0;Da=c[f>>2]|0;Ga=d+8|0;ca=td[c[(c[Ga>>2]|0)+8>>2]&63](Ga)|0;Ga=a[ca]|0;if((Ga&1)==0){Ha=(Ga&255)>>>1}else{Ha=c[ca+4>>2]|0}Ga=a[ca+12|0]|0;if((Ga&1)==0){Ia=(Ga&255)>>>1}else{Ia=c[ca+16>>2]|0}if((Ha|0)==(0-Ia|0)){c[h>>2]=c[h>>2]|4;break a}c[V>>2]=Da;c[B+0>>2]=c[V+0>>2];Da=aj(e,B,ca,ca+24|0,Fa,h,0)|0;Ga=Da-ca|0;do{if((Da|0)==(ca|0)){if((c[da>>2]|0)!=12){break}c[da>>2]=0;break a}}while(0);if((Ga|0)!=12){break a}ca=c[da>>2]|0;if((ca|0)>=12){break a}c[da>>2]=ca+12;break};case 82:{ca=e;c[sa>>2]=c[ca>>2];c[ta>>2]=c[f>>2];c[y+0>>2]=c[sa+0>>2];c[x+0>>2]=c[ta+0>>2];ok(ra,d,y,x,g,h,j,16664,16684|0);c[ca>>2]=c[ra>>2];break};case 77:{c[W>>2]=c[f>>2];c[D+0>>2]=c[W+0>>2];ca=Ak(e,D,h,Fa,2)|0;Da=c[h>>2]|0;if((Da&4|0)==0&(ca|0)<60){c[j+4>>2]=ca;break a}else{c[h>>2]=Da|4;break a}break};case 88:{Da=d+8|0;ca=td[c[(c[Da>>2]|0)+24>>2]&63](Da)|0;Da=e;c[Aa>>2]=c[Da>>2];c[Ba>>2]=c[f>>2];Ea=a[ca]|0;if((Ea&1)==0){Ja=ca+4|0;Ka=ca+4|0;La=(Ea&255)>>>1}else{Ea=c[ca+8>>2]|0;Ja=Ea;Ka=Ea;La=c[ca+4>>2]|0}c[q+0>>2]=c[Aa+0>>2];c[p+0>>2]=c[Ba+0>>2];ok(za,d,q,p,g,h,j,Ka,Ja+(La<<2)|0);c[Da>>2]=c[za>>2];break};case 99:{Da=d+8|0;ca=td[c[(c[Da>>2]|0)+12>>2]&63](Da)|0;Da=e;c[fa>>2]=c[Da>>2];c[ga>>2]=c[f>>2];Ea=a[ca]|0;if((Ea&1)==0){Ma=ca+4|0;Na=ca+4|0;Oa=(Ea&255)>>>1}else{Ea=c[ca+8>>2]|0;Ma=Ea;Na=Ea;Oa=c[ca+4>>2]|0}c[O+0>>2]=c[fa+0>>2];c[N+0>>2]=c[ga+0>>2];ok(ea,d,O,N,g,h,j,Na,Ma+(Oa<<2)|0);c[Da>>2]=c[ea>>2];break};case 101:case 100:{Da=j+12|0;c[$>>2]=c[f>>2];c[M+0>>2]=c[$+0>>2];ca=Ak(e,M,h,Fa,2)|0;Ea=c[h>>2]|0;do{if((Ea&4|0)==0){if(!((ca+ -1|0)>>>0<31)){break}c[Da>>2]=ca;break a}}while(0);c[h>>2]=Ea|4;break};case 68:{ca=e;c[ia>>2]=c[ca>>2];c[ja>>2]=c[f>>2];c[L+0>>2]=c[ia+0>>2];c[K+0>>2]=c[ja+0>>2];ok(ha,d,L,K,g,h,j,16552,16584|0);c[ca>>2]=c[ha>>2];break};case 70:{ca=e;c[la>>2]=c[ca>>2];c[ma>>2]=c[f>>2];c[J+0>>2]=c[la+0>>2];c[I+0>>2]=c[ma+0>>2];ok(ka,d,J,I,g,h,j,16584,16616|0);c[ca>>2]=c[ka>>2];break};case 72:{c[_>>2]=c[f>>2];c[H+0>>2]=c[_+0>>2];ca=Ak(e,H,h,Fa,2)|0;Da=c[h>>2]|0;if((Da&4|0)==0&(ca|0)<24){c[j+8>>2]=ca;break a}else{c[h>>2]=Da|4;break a}break};case 73:{Da=j+8|0;c[Z>>2]=c[f>>2];c[G+0>>2]=c[Z+0>>2];ca=Ak(e,G,h,Fa,2)|0;da=c[h>>2]|0;do{if((da&4|0)==0){if(!((ca+ -1|0)>>>0<12)){break}c[Da>>2]=ca;break a}}while(0);c[h>>2]=da|4;break};case 106:{c[Y>>2]=c[f>>2];c[F+0>>2]=c[Y+0>>2];ca=Ak(e,F,h,Fa,3)|0;Da=c[h>>2]|0;if((Da&4|0)==0&(ca|0)<366){c[j+28>>2]=ca;break a}else{c[h>>2]=Da|4;break a}break};case 109:{c[X>>2]=c[f>>2];c[E+0>>2]=c[X+0>>2];Da=Ak(e,E,h,Fa,2)|0;ca=c[h>>2]|0;if((ca&4|0)==0&(Da|0)<13){c[j+16>>2]=Da+ -1;break a}else{c[h>>2]=ca|4;break a}break};case 65:case 97:{ca=c[f>>2]|0;Da=d+8|0;Ea=td[c[c[Da>>2]>>2]&63](Da)|0;c[ba>>2]=ca;c[Q+0>>2]=c[ba+0>>2];ca=(aj(e,Q,Ea,Ea+168|0,Fa,h,0)|0)-Ea|0;if((ca|0)>=168){break a}c[j+24>>2]=((ca|0)/12|0|0)%7|0;break};case 104:case 66:case 98:{ca=c[f>>2]|0;Ea=d+8|0;Da=td[c[(c[Ea>>2]|0)+4>>2]&63](Ea)|0;c[aa>>2]=ca;c[P+0>>2]=c[aa+0>>2];ca=(aj(e,P,Da,Da+288|0,Fa,h,0)|0)-Da|0;if((ca|0)>=288){break a}c[j+16>>2]=((ca|0)/12|0|0)%12|0;break};case 37:{c[Ca>>2]=c[f>>2];c[m+0>>2]=c[Ca+0>>2];zk(0,e,m,h,Fa);break};case 83:{c[U>>2]=c[f>>2];c[w+0>>2]=c[U+0>>2];ca=Ak(e,w,h,Fa,2)|0;Da=c[h>>2]|0;if((Da&4|0)==0&(ca|0)<61){c[j>>2]=ca;break a}else{c[h>>2]=Da|4;break a}break};case 114:{Da=e;c[pa>>2]=c[Da>>2];c[qa>>2]=c[f>>2];c[A+0>>2]=c[pa+0>>2];c[z+0>>2]=c[qa+0>>2];ok(oa,d,A,z,g,h,j,16616,16660|0);c[Da>>2]=c[oa>>2];break};case 121:{c[S>>2]=c[f>>2];c[o+0>>2]=c[S+0>>2];Da=Ak(e,o,h,Fa,4)|0;if((c[h>>2]&4|0)!=0){break a}if((Da|0)<69){Pa=Da+2e3|0}else{Pa=(Da+ -69|0)>>>0<31?Da+1900|0:Da}c[j+20>>2]=Pa+ -1900;break};case 89:{c[R>>2]=c[f>>2];c[n+0>>2]=c[R+0>>2];Da=Ak(e,n,h,Fa,4)|0;if((c[h>>2]&4|0)!=0){break a}c[j+20>>2]=Da+ -1900;break};case 116:case 110:{c[na>>2]=c[f>>2];c[C+0>>2]=c[na+0>>2];yk(0,e,C,h,Fa);break};default:{c[h>>2]=c[h>>2]|4}}}while(0);c[b>>2]=c[e>>2];i=l;return}function yk(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;a=i;g=b;b=d;d=f;a:while(1){h=c[g>>2]|0;do{if((h|0)==0){j=1}else{k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){l=td[c[(c[h>>2]|0)+36>>2]&63](h)|0}else{l=c[k>>2]|0}if((l|0)==-1){c[g>>2]=0;j=1;break}else{j=(c[g>>2]|0)==0;break}}}while(0);h=c[b>>2]|0;do{if((h|0)==0){m=15}else{k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){n=td[c[(c[h>>2]|0)+36>>2]&63](h)|0}else{n=c[k>>2]|0}if((n|0)==-1){c[b>>2]=0;m=15;break}else{if(j){o=h;break}else{p=h;break a}}}}while(0);if((m|0)==15){m=0;if(j){p=0;break}else{o=0}}h=c[g>>2]|0;k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){q=td[c[(c[h>>2]|0)+36>>2]&63](h)|0}else{q=c[k>>2]|0}if(!(nd[c[(c[d>>2]|0)+12>>2]&31](f,8192,q)|0)){p=o;break}k=c[g>>2]|0;h=k+12|0;r=c[h>>2]|0;if((r|0)==(c[k+16>>2]|0)){td[c[(c[k>>2]|0)+40>>2]&63](k)|0;continue}else{c[h>>2]=r+4;continue}}o=c[g>>2]|0;do{if((o|0)==0){s=1}else{q=c[o+12>>2]|0;if((q|0)==(c[o+16>>2]|0)){t=td[c[(c[o>>2]|0)+36>>2]&63](o)|0}else{t=c[q>>2]|0}if((t|0)==-1){c[g>>2]=0;s=1;break}else{s=(c[g>>2]|0)==0;break}}}while(0);do{if((p|0)==0){m=37}else{g=c[p+12>>2]|0;if((g|0)==(c[p+16>>2]|0)){u=td[c[(c[p>>2]|0)+36>>2]&63](p)|0}else{u=c[g>>2]|0}if((u|0)==-1){c[b>>2]=0;m=37;break}if(!s){break}i=a;return}}while(0);do{if((m|0)==37){if(s){break}i=a;return}}while(0);c[e>>2]=c[e>>2]|2;i=a;return}function zk(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;a=i;g=b;b=c[g>>2]|0;do{if((b|0)==0){h=1}else{j=c[b+12>>2]|0;if((j|0)==(c[b+16>>2]|0)){k=td[c[(c[b>>2]|0)+36>>2]&63](b)|0}else{k=c[j>>2]|0}if((k|0)==-1){c[g>>2]=0;h=1;break}else{h=(c[g>>2]|0)==0;break}}}while(0);k=d;d=c[k>>2]|0;do{if((d|0)==0){l=14}else{b=c[d+12>>2]|0;if((b|0)==(c[d+16>>2]|0)){m=td[c[(c[d>>2]|0)+36>>2]&63](d)|0}else{m=c[b>>2]|0}if((m|0)==-1){c[k>>2]=0;l=14;break}else{if(h){n=d;break}else{l=16;break}}}}while(0);if((l|0)==14){if(h){l=16}else{n=0}}if((l|0)==16){c[e>>2]=c[e>>2]|6;i=a;return}h=c[g>>2]|0;d=c[h+12>>2]|0;if((d|0)==(c[h+16>>2]|0)){o=td[c[(c[h>>2]|0)+36>>2]&63](h)|0}else{o=c[d>>2]|0}if(!((nd[c[(c[f>>2]|0)+52>>2]&31](f,o,0)|0)<<24>>24==37)){c[e>>2]=c[e>>2]|4;i=a;return}o=c[g>>2]|0;f=o+12|0;d=c[f>>2]|0;if((d|0)==(c[o+16>>2]|0)){td[c[(c[o>>2]|0)+40>>2]&63](o)|0}else{c[f>>2]=d+4}d=c[g>>2]|0;do{if((d|0)==0){p=1}else{f=c[d+12>>2]|0;if((f|0)==(c[d+16>>2]|0)){q=td[c[(c[d>>2]|0)+36>>2]&63](d)|0}else{q=c[f>>2]|0}if((q|0)==-1){c[g>>2]=0;p=1;break}else{p=(c[g>>2]|0)==0;break}}}while(0);do{if((n|0)==0){l=38}else{g=c[n+12>>2]|0;if((g|0)==(c[n+16>>2]|0)){r=td[c[(c[n>>2]|0)+36>>2]&63](n)|0}else{r=c[g>>2]|0}if((r|0)==-1){c[k>>2]=0;l=38;break}if(!p){break}i=a;return}}while(0);do{if((l|0)==38){if(p){break}i=a;return}}while(0);c[e>>2]=c[e>>2]|2;i=a;return}function Ak(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;g=i;h=a;a=c[h>>2]|0;do{if((a|0)==0){j=1}else{k=c[a+12>>2]|0;if((k|0)==(c[a+16>>2]|0)){l=td[c[(c[a>>2]|0)+36>>2]&63](a)|0}else{l=c[k>>2]|0}if((l|0)==-1){c[h>>2]=0;j=1;break}else{j=(c[h>>2]|0)==0;break}}}while(0);l=b;b=c[l>>2]|0;do{if((b|0)==0){m=14}else{a=c[b+12>>2]|0;if((a|0)==(c[b+16>>2]|0)){n=td[c[(c[b>>2]|0)+36>>2]&63](b)|0}else{n=c[a>>2]|0}if((n|0)==-1){c[l>>2]=0;m=14;break}else{if(j){o=b;break}else{m=16;break}}}}while(0);if((m|0)==14){if(j){m=16}else{o=0}}if((m|0)==16){c[d>>2]=c[d>>2]|6;p=0;i=g;return p|0}j=c[h>>2]|0;b=c[j+12>>2]|0;if((b|0)==(c[j+16>>2]|0)){q=td[c[(c[j>>2]|0)+36>>2]&63](j)|0}else{q=c[b>>2]|0}b=e;if(!(nd[c[(c[b>>2]|0)+12>>2]&31](e,2048,q)|0)){c[d>>2]=c[d>>2]|4;p=0;i=g;return p|0}j=e;n=(nd[c[(c[j>>2]|0)+52>>2]&31](e,q,0)|0)<<24>>24;q=c[h>>2]|0;a=q+12|0;k=c[a>>2]|0;if((k|0)==(c[q+16>>2]|0)){td[c[(c[q>>2]|0)+40>>2]&63](q)|0;r=f;s=o;t=o;u=n}else{c[a>>2]=k+4;r=f;s=o;t=o;u=n}while(1){v=u+ -48|0;n=r+ -1|0;o=c[h>>2]|0;do{if((o|0)==0){w=1}else{f=c[o+12>>2]|0;if((f|0)==(c[o+16>>2]|0)){x=td[c[(c[o>>2]|0)+36>>2]&63](o)|0}else{x=c[f>>2]|0}if((x|0)==-1){c[h>>2]=0;w=1;break}else{w=(c[h>>2]|0)==0;break}}}while(0);do{if((t|0)==0){y=s;z=0;A=1}else{o=c[t+12>>2]|0;if((o|0)==(c[t+16>>2]|0)){B=td[c[(c[t>>2]|0)+36>>2]&63](t)|0}else{B=c[o>>2]|0}if((B|0)==-1){c[l>>2]=0;y=0;z=0;A=1;break}else{y=s;z=s;A=(s|0)==0;break}}}while(0);C=c[h>>2]|0;if(!((w^A)&(n|0)>0)){break}o=c[C+12>>2]|0;if((o|0)==(c[C+16>>2]|0)){D=td[c[(c[C>>2]|0)+36>>2]&63](C)|0}else{D=c[o>>2]|0}if(!(nd[c[(c[b>>2]|0)+12>>2]&31](e,2048,D)|0)){p=v;m=63;break}o=((nd[c[(c[j>>2]|0)+52>>2]&31](e,D,0)|0)<<24>>24)+(v*10|0)|0;f=c[h>>2]|0;k=f+12|0;a=c[k>>2]|0;if((a|0)==(c[f+16>>2]|0)){td[c[(c[f>>2]|0)+40>>2]&63](f)|0;E=n;s=y;t=z;u=o;r=E;continue}else{c[k>>2]=a+4;E=n;s=y;t=z;u=o;r=E;continue}}if((m|0)==63){i=g;return p|0}do{if((C|0)==0){F=1}else{E=c[C+12>>2]|0;if((E|0)==(c[C+16>>2]|0)){G=td[c[(c[C>>2]|0)+36>>2]&63](C)|0}else{G=c[E>>2]|0}if((G|0)==-1){c[h>>2]=0;F=1;break}else{F=(c[h>>2]|0)==0;break}}}while(0);do{if((y|0)==0){m=60}else{h=c[y+12>>2]|0;if((h|0)==(c[y+16>>2]|0)){H=td[c[(c[y>>2]|0)+36>>2]&63](y)|0}else{H=c[h>>2]|0}if((H|0)==-1){c[l>>2]=0;m=60;break}if(F){p=v}else{break}i=g;return p|0}}while(0);do{if((m|0)==60){if(F){break}else{p=v}i=g;return p|0}}while(0);c[d>>2]=c[d>>2]|2;p=v;i=g;return p|0}function Bk(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;e=b+8|0;f=c[e>>2]|0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);if((f|0)==(c[4338]|0)){g=b;mp(g);i=d;return}Hb(c[e>>2]|0);g=b;mp(g);i=d;return}function Ck(b){b=b|0;var d=0,e=0;d=i;e=b+8|0;b=c[e>>2]|0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);if((b|0)==(c[4338]|0)){i=d;return}Hb(c[e>>2]|0);i=d;return}function Dk(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;g=i;i=i+112|0;f=g;l=g+8|0;m=l;n=f;a[n]=37;o=f+1|0;a[o]=j;p=f+2|0;a[p]=k;a[f+3|0]=0;if(!(k<<24>>24==0)){a[o]=k;a[p]=j}j=Jc(m|0,100,n|0,h|0,c[d+8>>2]|0)|0;d=l+j|0;l=c[e>>2]|0;if((j|0)==0){q=l;r=b;c[r>>2]=q;i=g;return}else{s=m;t=l;u=l}while(1){l=a[s]|0;do{if((u|0)==0){v=t;w=0}else{m=u+24|0;j=c[m>>2]|0;if((j|0)==(c[u+28>>2]|0)){e=(Cd[c[(c[u>>2]|0)+52>>2]&15](u,l&255)|0)==-1;v=e?0:t;w=e?0:u;break}else{c[m>>2]=j+1;a[j]=l;v=t;w=u;break}}}while(0);l=s+1|0;if((l|0)==(d|0)){q=v;break}else{s=l;t=v;u=w}}r=b;c[r>>2]=q;i=g;return}function Ek(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;e=b+8|0;f=c[e>>2]|0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);if((f|0)==(c[4338]|0)){g=b;mp(g);i=d;return}Hb(c[e>>2]|0);g=b;mp(g);i=d;return}function Fk(b){b=b|0;var d=0,e=0;d=i;e=b+8|0;b=c[e>>2]|0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);if((b|0)==(c[4338]|0)){i=d;return}Hb(c[e>>2]|0);i=d;return}function Gk(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;f=i;i=i+408|0;e=f;k=f+400|0;l=e;c[k>>2]=e+400;Hk(b+8|0,l,k,g,h,j);j=c[k>>2]|0;k=c[d>>2]|0;if((l|0)==(j|0)){m=k;n=a;c[n>>2]=m;i=f;return}else{o=l;p=k;q=k}while(1){k=c[o>>2]|0;if((p|0)==0){r=q;s=0}else{l=p+24|0;d=c[l>>2]|0;if((d|0)==(c[p+28>>2]|0)){t=Cd[c[(c[p>>2]|0)+52>>2]&15](p,k)|0}else{c[l>>2]=d+4;c[d>>2]=k;t=k}k=(t|0)==-1;r=k?0:q;s=k?0:p}k=o+4|0;if((k|0)==(j|0)){m=r;break}else{o=k;p=s;q=r}}n=a;c[n>>2]=m;i=f;return}function Hk(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;j=i;i=i+120|0;k=j;l=j+112|0;m=i;i=i+8|0;n=j+8|0;o=k;a[o]=37;p=k+1|0;a[p]=g;q=k+2|0;a[q]=h;a[k+3|0]=0;if(!(h<<24>>24==0)){a[p]=h;a[q]=g}g=b;Jc(n|0,100,o|0,f|0,c[g>>2]|0)|0;f=l;c[f>>2]=0;c[f+4>>2]=0;c[m>>2]=n;n=(c[e>>2]|0)-d>>2;f=fc(c[g>>2]|0)|0;g=Co(d,m,n,l)|0;if((f|0)!=0){fc(f|0)|0}if((g|0)==-1){Dl(18344)}else{c[e>>2]=d+(g<<2);i=j;return}}function Ik(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Jk(a){a=a|0;i=i;return}function Kk(a){a=a|0;i=i;return 127}function Lk(a){a=a|0;i=i;return 127}function Mk(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function Nk(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function Ok(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function Pk(a,b){a=a|0;b=b|0;b=i;Tg(a,1,45);i=b;return}function Qk(a){a=a|0;i=i;return 0}function Rk(b,c){b=b|0;c=c|0;c=b;a[c]=67109634;a[c+1|0]=262147;a[c+2|0]=1024;a[c+3|0]=4;i=i;return}function Sk(b,c){b=b|0;c=c|0;c=b;a[c]=67109634;a[c+1|0]=262147;a[c+2|0]=1024;a[c+3|0]=4;i=i;return}function Tk(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Uk(a){a=a|0;i=i;return}function Vk(a){a=a|0;i=i;return 127}function Wk(a){a=a|0;i=i;return 127}function Xk(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function Yk(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function Zk(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function _k(a,b){a=a|0;b=b|0;b=i;Tg(a,1,45);i=b;return}function $k(a){a=a|0;i=i;return 0}function al(b,c){b=b|0;c=c|0;c=b;a[c]=67109634;a[c+1|0]=262147;a[c+2|0]=1024;a[c+3|0]=4;i=i;return}function bl(b,c){b=b|0;c=c|0;c=b;a[c]=67109634;a[c+1|0]=262147;a[c+2|0]=1024;a[c+3|0]=4;i=i;return}function cl(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function dl(a){a=a|0;i=i;return}function el(a){a=a|0;i=i;return 2147483647}function fl(a){a=a|0;i=i;return 2147483647}function gl(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function hl(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function il(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function jl(a,b){a=a|0;b=b|0;b=i;ch(a,1,45);i=b;return}function kl(a){a=a|0;i=i;return 0}function ll(b,c){b=b|0;c=c|0;c=b;a[c]=67109634;a[c+1|0]=262147;a[c+2|0]=1024;a[c+3|0]=4;i=i;return}function ml(b,c){b=b|0;c=c|0;c=b;a[c]=67109634;a[c+1|0]=262147;a[c+2|0]=1024;a[c+3|0]=4;i=i;return}function nl(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function ol(a){a=a|0;i=i;return}function pl(a){a=a|0;i=i;return 2147483647}function ql(a){a=a|0;i=i;return 2147483647}function rl(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function sl(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function tl(a,b){a=a|0;b=b|0;var d=0;b=i;d=a;c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;i=b;return}function ul(a,b){a=a|0;b=b|0;b=i;ch(a,1,45);i=b;return}function vl(a){a=a|0;i=i;return 0}function wl(b,c){b=b|0;c=c|0;c=b;a[c]=67109634;a[c+1|0]=262147;a[c+2|0]=1024;a[c+3|0]=4;i=i;return}function xl(b,c){b=b|0;c=c|0;c=b;a[c]=67109634;a[c+1|0]=262147;a[c+2|0]=1024;a[c+3|0]=4;i=i;return}function yl(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function zl(a){a=a|0;i=i;return}function Al(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;d=i;i=i+16|0;l=d;m=d+8|0;n=i;i=i+16|0;o=i;i=i+104|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=i;i=i+8|0;t=i;i=i+8|0;u=i;i=i+16|0;v=i;i=i+104|0;w=p;c[w>>2]=o;x=p+4|0;c[x>>2]=115;y=o+100|0;mh(r,h);o=r;z=c[o>>2]|0;if(!((c[4366]|0)==-1)){c[n>>2]=17464;c[n+4>>2]=113;c[n+8>>2]=0;Pg(17464,n,114)}n=(c[17468>>2]|0)+ -1|0;A=c[z+8>>2]|0;if(!((c[z+12>>2]|0)-A>>2>>>0>n>>>0)){B=bc(4)|0;C=B;Mo(C);gd(B|0,25424,101)}z=c[A+(n<<2)>>2]|0;if((z|0)==0){B=bc(4)|0;C=B;Mo(C);gd(B|0,25424,101)}B=z;a[s]=0;C=f;c[t>>2]=c[C>>2];f=c[h+4>>2]|0;h=l;n=t;c[h+0>>2]=c[n+0>>2];n=Cl(e,l,g,r,f,j,s,B,p,q,y)|0;do{if(n){y=u;zd[c[(c[z>>2]|0)+32>>2]&7](B,17080,17090|0,y)|0;p=v;f=c[q>>2]|0;r=c[w>>2]|0;g=f-r|0;do{if((g|0)>98){l=fp(g+2|0)|0;if((l|0)!=0){D=l;E=l;break}rp()}else{D=0;E=p}}while(0);if((a[s]|0)==0){F=E}else{a[E]=45;F=E+1|0}if(r>>>0<f>>>0){g=u+10|0;l=u;h=F;t=r;while(1){A=a[t]|0;G=y;while(1){H=G+1|0;if((a[G]|0)==A<<24>>24){I=G;break}if((H|0)==(g|0)){I=g;break}else{G=H}}a[h]=a[17080+(I-l)|0]|0;G=t+1|0;A=h+1|0;if(G>>>0<(c[q>>2]|0)>>>0){h=A;t=G}else{J=A;break}}}else{J=F}a[J]=0;c[m>>2]=k;if((Na(p|0,17096,m|0)|0)!=1){t=bc(8)|0;Bg(t,17104);gd(t|0,14472,11)}if((D|0)==0){break}gp(D)}}while(0);D=e;e=c[D>>2]|0;do{if((e|0)==0){K=0}else{if((c[e+12>>2]|0)!=(c[e+16>>2]|0)){K=e;break}if(!((td[c[(c[e>>2]|0)+36>>2]&63](e)|0)==-1)){K=e;break}c[D>>2]=0;K=0}}while(0);D=(K|0)==0;e=c[C>>2]|0;do{if((e|0)==0){L=31}else{if((c[e+12>>2]|0)!=(c[e+16>>2]|0)){if(D){break}else{L=33;break}}if((td[c[(c[e>>2]|0)+36>>2]&63](e)|0)==-1){c[C>>2]=0;L=31;break}else{if(D){break}else{L=33;break}}}}while(0);if((L|0)==31){if(D){L=33}}if((L|0)==33){c[j>>2]=c[j>>2]|2}c[b>>2]=K;vg(c[o>>2]|0)|0;o=c[w>>2]|0;c[w>>2]=0;if((o|0)==0){i=d;return}qd[c[x>>2]&127](o);i=d;return}function Bl(a){a=a|0;i=i;return}function Cl(e,f,g,h,j,k,l,m,n,o,p){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;var q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0;q=i;i=i+408|0;r=q;s=q+400|0;t=s;u=i;i=i+8|0;v=i;i=i+8|0;w=i;i=i+16|0;x=i;i=i+16|0;y=i;i=i+16|0;z=i;i=i+16|0;A=i;i=i+16|0;B=i;i=i+8|0;C=i;i=i+8|0;D=r;c[s>>2]=0;E=w;c[E+0>>2]=0;c[E+4>>2]=0;c[E+8>>2]=0;F=x;c[F+0>>2]=0;c[F+4>>2]=0;c[F+8>>2]=0;G=y;c[G+0>>2]=0;c[G+4>>2]=0;c[G+8>>2]=0;H=z;c[H+0>>2]=0;c[H+4>>2]=0;c[H+8>>2]=0;I=A;c[I+0>>2]=0;c[I+4>>2]=0;c[I+8>>2]=0;Gl(g,h,t,u,v,w,x,y,z,B);t=n;c[o>>2]=c[t>>2];h=e;e=f;f=s;s=m+8|0;m=z+1|0;g=z+4|0;J=z+8|0;K=y+1|0;L=y+4|0;M=y+8|0;N=(j&512|0)!=0;j=x+1|0;O=x+8|0;P=x+4|0;Q=A;R=Q+1|0;S=A+8|0;T=A+4|0;U=f+3|0;V=n+4|0;n=w+4|0;W=r+400|0;r=D;X=D;D=p;p=0;Y=0;Z=115;a:while(1){_=c[h>>2]|0;do{if((_|0)==0){$=0}else{if((c[_+12>>2]|0)!=(c[_+16>>2]|0)){$=_;break}if((td[c[(c[_>>2]|0)+36>>2]&63](_)|0)==-1){c[h>>2]=0;$=0;break}else{$=c[h>>2]|0;break}}}while(0);_=($|0)==0;aa=c[e>>2]|0;do{if((aa|0)==0){ba=12}else{if((c[aa+12>>2]|0)!=(c[aa+16>>2]|0)){if(_){ca=aa;break}else{da=X;ea=r;fa=Y;ga=Z;ba=269;break a}}if((td[c[(c[aa>>2]|0)+36>>2]&63](aa)|0)==-1){c[e>>2]=0;ba=12;break}else{if(_){ca=aa;break}else{da=X;ea=r;fa=Y;ga=Z;ba=269;break a}}}}while(0);if((ba|0)==12){ba=0;if(_){da=X;ea=r;fa=Y;ga=Z;ba=269;break}else{ca=0}}b:do{switch(a[f+p|0]|0){case 3:{aa=a[G]|0;ha=(aa&1)==0;if(ha){ia=(aa&255)>>>1}else{ia=c[L>>2]|0}ja=a[H]|0;ka=(ja&1)==0;if(ka){la=(ja&255)>>>1}else{la=c[g>>2]|0}if((ia|0)==(0-la|0)){ma=D;na=X;oa=r;pa=W;qa=Y;ra=Z;break b}if(ha){sa=(aa&255)>>>1}else{sa=c[L>>2]|0}do{if((sa|0)!=0){if(ka){ta=(ja&255)>>>1}else{ta=c[g>>2]|0}if((ta|0)==0){break}ua=c[h>>2]|0;va=c[ua+12>>2]|0;wa=c[ua+16>>2]|0;if((va|0)==(wa|0)){xa=td[c[(c[ua>>2]|0)+36>>2]&63](ua)|0;ya=c[h>>2]|0;za=xa;Aa=c[ya+16>>2]|0;Ba=c[ya+12>>2]|0;Ca=ya;Da=a[G]|0}else{za=d[va]|0;Aa=wa;Ba=va;Ca=ua;Da=aa}ua=Ca+12|0;va=(Ba|0)==(Aa|0);if((za&255)<<24>>24==(a[(Da&1)==0?K:c[M>>2]|0]|0)){if(va){td[c[(c[Ca>>2]|0)+40>>2]&63](Ca)|0}else{c[ua>>2]=Ba+1}ua=a[G]|0;if((ua&1)==0){Ea=(ua&255)>>>1}else{Ea=c[L>>2]|0}ma=D;na=X;oa=r;pa=W;qa=Ea>>>0>1?y:Y;ra=Z;break b}if(va){Fa=td[c[(c[Ca>>2]|0)+36>>2]&63](Ca)|0}else{Fa=d[Ba]|0}if(!((Fa&255)<<24>>24==(a[(a[H]&1)==0?m:c[J>>2]|0]|0))){ba=112;break a}va=c[h>>2]|0;ua=va+12|0;wa=c[ua>>2]|0;if((wa|0)==(c[va+16>>2]|0)){td[c[(c[va>>2]|0)+40>>2]&63](va)|0}else{c[ua>>2]=wa+1}a[l]=1;wa=a[H]|0;if((wa&1)==0){Ga=(wa&255)>>>1}else{Ga=c[g>>2]|0}ma=D;na=X;oa=r;pa=W;qa=Ga>>>0>1?z:Y;ra=Z;break b}}while(0);if(ha){Ha=(aa&255)>>>1}else{Ha=c[L>>2]|0}ka=c[h>>2]|0;wa=c[ka+12>>2]|0;ua=(wa|0)==(c[ka+16>>2]|0);if((Ha|0)==0){if(ua){va=td[c[(c[ka>>2]|0)+36>>2]&63](ka)|0;Ia=va;Ja=a[H]|0}else{Ia=d[wa]|0;Ja=ja}if(!((Ia&255)<<24>>24==(a[(Ja&1)==0?m:c[J>>2]|0]|0))){ma=D;na=X;oa=r;pa=W;qa=Y;ra=Z;break b}va=c[h>>2]|0;ya=va+12|0;xa=c[ya>>2]|0;if((xa|0)==(c[va+16>>2]|0)){td[c[(c[va>>2]|0)+40>>2]&63](va)|0}else{c[ya>>2]=xa+1}a[l]=1;xa=a[H]|0;if((xa&1)==0){Ka=(xa&255)>>>1}else{Ka=c[g>>2]|0}ma=D;na=X;oa=r;pa=W;qa=Ka>>>0>1?z:Y;ra=Z;break b}if(ua){ua=td[c[(c[ka>>2]|0)+36>>2]&63](ka)|0;La=ua;Ma=a[G]|0}else{La=d[wa]|0;Ma=aa}if(!((La&255)<<24>>24==(a[(Ma&1)==0?K:c[M>>2]|0]|0))){a[l]=1;ma=D;na=X;oa=r;pa=W;qa=Y;ra=Z;break b}wa=c[h>>2]|0;ua=wa+12|0;ka=c[ua>>2]|0;if((ka|0)==(c[wa+16>>2]|0)){td[c[(c[wa>>2]|0)+40>>2]&63](wa)|0}else{c[ua>>2]=ka+1}ka=a[G]|0;if((ka&1)==0){Na=(ka&255)>>>1}else{Na=c[L>>2]|0}ma=D;na=X;oa=r;pa=W;qa=Na>>>0>1?y:Y;ra=Z;break};case 1:{if((p|0)==3){da=X;ea=r;fa=Y;ga=Z;ba=269;break a}ka=c[h>>2]|0;ua=c[ka+12>>2]|0;if((ua|0)==(c[ka+16>>2]|0)){Oa=td[c[(c[ka>>2]|0)+36>>2]&63](ka)|0}else{Oa=d[ua]|0}if(!((Oa&255)<<24>>24>-1)){ba=25;break a}if((b[(c[s>>2]|0)+(Oa<<24>>24<<1)>>1]&8192)==0){ba=25;break a}ua=c[h>>2]|0;ka=ua+12|0;wa=c[ka>>2]|0;if((wa|0)==(c[ua+16>>2]|0)){Pa=td[c[(c[ua>>2]|0)+40>>2]&63](ua)|0}else{c[ka>>2]=wa+1;Pa=d[wa]|0}Zg(A,Pa&255);ba=26;break};case 0:{ba=26;break};case 2:{if(!((Y|0)!=0|p>>>0<2)){if((p|0)==2){Qa=(a[U]|0)!=0}else{Qa=0}if(!(N|Qa)){ma=D;na=X;oa=r;pa=W;qa=0;ra=Z;break b}}wa=a[F]|0;ka=(wa&1)==0;ua=ka?j:c[O>>2]|0;c:do{if((p|0)==0){Ra=ca;Sa=ca;Ta=wa;Ua=ua}else{if((d[f+(p+ -1)|0]|0)>=2){Ra=ca;Sa=ca;Ta=wa;Ua=ua;break}xa=ua+(ka?(wa&255)>>>1:c[P>>2]|0)|0;ya=ua;while(1){if((ya|0)==(xa|0)){Va=xa;break}va=a[ya]|0;if(!(va<<24>>24>-1)){Va=ya;break}if((b[(c[s>>2]|0)+(va<<24>>24<<1)>>1]&8192)==0){Va=ya;break}else{ya=ya+1|0}}ya=Va-ua|0;xa=a[I]|0;va=(xa&1)==0;if(va){Wa=(xa&255)>>>1}else{Wa=c[T>>2]|0}if(ya>>>0>Wa>>>0){Ra=ca;Sa=ca;Ta=wa;Ua=ua;break}if(va){va=(xa&255)>>>1;Xa=Q+(va-ya)+1|0;Ya=R;Za=va}else{va=c[S>>2]|0;xa=c[T>>2]|0;Xa=va+(xa-ya)|0;Ya=va;Za=xa}xa=Ya+Za|0;if((Xa|0)==(xa|0)){Ra=ca;Sa=ca;Ta=wa;Ua=Va;break}else{_a=ua;$a=Xa}while(1){if((a[$a]|0)!=(a[_a]|0)){Ra=ca;Sa=ca;Ta=wa;Ua=ua;break c}va=$a+1|0;if((va|0)==(xa|0)){Ra=ca;Sa=ca;Ta=wa;Ua=Va;break}else{_a=_a+1|0;$a=va}}}}while(0);d:while(1){if((Ta&1)==0){ab=j;bb=(Ta&255)>>>1}else{ab=c[O>>2]|0;bb=c[P>>2]|0}if((Ua|0)==(ab+bb|0)){break}wa=c[h>>2]|0;do{if((wa|0)==0){cb=0}else{if((c[wa+12>>2]|0)!=(c[wa+16>>2]|0)){cb=wa;break}if((td[c[(c[wa>>2]|0)+36>>2]&63](wa)|0)==-1){c[h>>2]=0;cb=0;break}else{cb=c[h>>2]|0;break}}}while(0);wa=(cb|0)==0;do{if((Sa|0)==0){db=Ra;ba=147}else{if((c[Sa+12>>2]|0)!=(c[Sa+16>>2]|0)){if(wa){eb=Ra;fb=Sa;break}else{break d}}if((td[c[(c[Sa>>2]|0)+36>>2]&63](Sa)|0)==-1){c[e>>2]=0;db=0;ba=147;break}else{if(wa^(Ra|0)==0){eb=Ra;fb=Ra;break}else{break d}}}}while(0);if((ba|0)==147){ba=0;if(wa){break}else{eb=db;fb=0}}ua=c[h>>2]|0;ka=c[ua+12>>2]|0;if((ka|0)==(c[ua+16>>2]|0)){gb=td[c[(c[ua>>2]|0)+36>>2]&63](ua)|0}else{gb=d[ka]|0}if(!((gb&255)<<24>>24==(a[Ua]|0))){break}ka=c[h>>2]|0;ua=ka+12|0;aa=c[ua>>2]|0;if((aa|0)==(c[ka+16>>2]|0)){td[c[(c[ka>>2]|0)+40>>2]&63](ka)|0}else{c[ua>>2]=aa+1}Ra=eb;Sa=fb;Ta=a[F]|0;Ua=Ua+1|0}if(!N){ma=D;na=X;oa=r;pa=W;qa=Y;ra=Z;break b}aa=a[F]|0;if((aa&1)==0){hb=j;ib=(aa&255)>>>1}else{hb=c[O>>2]|0;ib=c[P>>2]|0}if((Ua|0)==(hb+ib|0)){ma=D;na=X;oa=r;pa=W;qa=Y;ra=Z}else{ba=162;break a}break};case 4:{aa=D;ua=X;ka=r;ja=W;ha=0;xa=Z;e:while(1){va=c[h>>2]|0;do{if((va|0)==0){jb=0}else{if((c[va+12>>2]|0)!=(c[va+16>>2]|0)){jb=va;break}if((td[c[(c[va>>2]|0)+36>>2]&63](va)|0)==-1){c[h>>2]=0;jb=0;break}else{jb=c[h>>2]|0;break}}}while(0);va=(jb|0)==0;wa=c[e>>2]|0;do{if((wa|0)==0){ba=173}else{if((c[wa+12>>2]|0)!=(c[wa+16>>2]|0)){if(va){break}else{break e}}if((td[c[(c[wa>>2]|0)+36>>2]&63](wa)|0)==-1){c[e>>2]=0;ba=173;break}else{if(va){break}else{break e}}}}while(0);if((ba|0)==173){ba=0;if(va){break}}wa=c[h>>2]|0;ya=c[wa+12>>2]|0;if((ya|0)==(c[wa+16>>2]|0)){kb=td[c[(c[wa>>2]|0)+36>>2]&63](wa)|0}else{kb=d[ya]|0}ya=kb&255;do{if(ya<<24>>24>-1){if((b[(c[s>>2]|0)+(kb<<24>>24<<1)>>1]&2048)==0){ba=189;break}wa=c[o>>2]|0;if((wa|0)==(aa|0)){lb=(c[V>>2]|0)!=115;mb=c[t>>2]|0;nb=aa-mb|0;ob=nb>>>0<2147483647?nb<<1:-1;pb=hp(lb?mb:0,ob)|0;if((pb|0)==0){ba=182;break a}do{if(lb){c[t>>2]=pb;qb=pb}else{mb=c[t>>2]|0;c[t>>2]=pb;if((mb|0)==0){qb=pb;break}qd[c[V>>2]&127](mb);qb=c[t>>2]|0}}while(0);c[V>>2]=116;pb=qb+nb|0;c[o>>2]=pb;rb=pb;sb=(c[t>>2]|0)+ob|0}else{rb=wa;sb=aa}c[o>>2]=rb+1;a[rb]=ya;tb=sb;ub=ua;vb=ka;wb=ja;xb=ha+1|0;yb=xa}else{ba=189}}while(0);if((ba|0)==189){ba=0;va=a[E]|0;if((va&1)==0){zb=(va&255)>>>1}else{zb=c[n>>2]|0}if((zb|0)==0|(ha|0)==0){break}if(!(ya<<24>>24==(a[v]|0))){break}if((ka|0)==(ja|0)){va=ka-ua|0;pb=va>>>0<2147483647?va<<1:-1;if((xa|0)==115){Ab=0}else{Ab=ua}lb=hp(Ab,pb)|0;mb=lb;if((lb|0)==0){ba=198;break a}Bb=mb;Cb=mb+(va>>2<<2)|0;Db=mb+(pb>>>2<<2)|0;Eb=116}else{Bb=ua;Cb=ka;Db=ja;Eb=xa}c[Cb>>2]=ha;tb=aa;ub=Bb;vb=Cb+4|0;wb=Db;xb=0;yb=Eb}pb=c[h>>2]|0;mb=pb+12|0;va=c[mb>>2]|0;if((va|0)==(c[pb+16>>2]|0)){td[c[(c[pb>>2]|0)+40>>2]&63](pb)|0;aa=tb;ua=ub;ka=vb;ja=wb;ha=xb;xa=yb;continue}else{c[mb>>2]=va+1;aa=tb;ua=ub;ka=vb;ja=wb;ha=xb;xa=yb;continue}}if((ua|0)==(ka|0)|(ha|0)==0){Fb=ua;Gb=ka;Hb=ja;Ib=xa}else{if((ka|0)==(ja|0)){va=ka-ua|0;mb=va>>>0<2147483647?va<<1:-1;if((xa|0)==115){Jb=0}else{Jb=ua}pb=hp(Jb,mb)|0;lb=pb;if((pb|0)==0){ba=209;break a}Kb=lb;Lb=lb+(va>>2<<2)|0;Mb=lb+(mb>>>2<<2)|0;Nb=116}else{Kb=ua;Lb=ka;Mb=ja;Nb=xa}c[Lb>>2]=ha;Fb=Kb;Gb=Lb+4|0;Hb=Mb;Ib=Nb}mb=c[B>>2]|0;if((mb|0)>0){lb=c[h>>2]|0;do{if((lb|0)==0){Ob=0}else{if((c[lb+12>>2]|0)!=(c[lb+16>>2]|0)){Ob=lb;break}if((td[c[(c[lb>>2]|0)+36>>2]&63](lb)|0)==-1){c[h>>2]=0;Ob=0;break}else{Ob=c[h>>2]|0;break}}}while(0);lb=(Ob|0)==0;ha=c[e>>2]|0;do{if((ha|0)==0){ba=223}else{if((c[ha+12>>2]|0)!=(c[ha+16>>2]|0)){if(lb){Pb=ha;break}else{ba=229;break a}}if((td[c[(c[ha>>2]|0)+36>>2]&63](ha)|0)==-1){c[e>>2]=0;ba=223;break}else{if(lb){Pb=ha;break}else{ba=229;break a}}}}while(0);if((ba|0)==223){ba=0;if(lb){ba=229;break a}else{Pb=0}}ha=c[h>>2]|0;xa=c[ha+12>>2]|0;if((xa|0)==(c[ha+16>>2]|0)){Qb=td[c[(c[ha>>2]|0)+36>>2]&63](ha)|0}else{Qb=d[xa]|0}if(!((Qb&255)<<24>>24==(a[u]|0))){ba=229;break a}xa=c[h>>2]|0;ha=xa+12|0;ja=c[ha>>2]|0;if((ja|0)==(c[xa+16>>2]|0)){td[c[(c[xa>>2]|0)+40>>2]&63](xa)|0;Rb=Pb;Sb=mb;Tb=Pb;Ub=aa}else{c[ha>>2]=ja+1;Rb=Pb;Sb=mb;Tb=Pb;Ub=aa}while(1){ja=c[h>>2]|0;do{if((ja|0)==0){Vb=0}else{if((c[ja+12>>2]|0)!=(c[ja+16>>2]|0)){Vb=ja;break}if((td[c[(c[ja>>2]|0)+36>>2]&63](ja)|0)==-1){c[h>>2]=0;Vb=0;break}else{Vb=c[h>>2]|0;break}}}while(0);ja=(Vb|0)==0;do{if((Tb|0)==0){Wb=Rb;ba=243}else{if((c[Tb+12>>2]|0)!=(c[Tb+16>>2]|0)){if(ja){Xb=Rb;Yb=Tb;break}else{ba=250;break a}}if((td[c[(c[Tb>>2]|0)+36>>2]&63](Tb)|0)==-1){c[e>>2]=0;Wb=0;ba=243;break}else{if(ja^(Rb|0)==0){Xb=Rb;Yb=Rb;break}else{ba=250;break a}}}}while(0);if((ba|0)==243){ba=0;if(ja){ba=250;break a}else{Xb=Wb;Yb=0}}ya=c[h>>2]|0;ha=c[ya+12>>2]|0;if((ha|0)==(c[ya+16>>2]|0)){Zb=td[c[(c[ya>>2]|0)+36>>2]&63](ya)|0}else{Zb=d[ha]|0}if(!((Zb&255)<<24>>24>-1)){ba=250;break a}if((b[(c[s>>2]|0)+(Zb<<24>>24<<1)>>1]&2048)==0){ba=250;break a}ha=c[o>>2]|0;if((ha|0)==(Ub|0)){ya=(c[V>>2]|0)!=115;xa=c[t>>2]|0;ka=Ub-xa|0;ua=ka>>>0<2147483647?ka<<1:-1;va=hp(ya?xa:0,ua)|0;if((va|0)==0){ba=253;break a}do{if(ya){c[t>>2]=va;_b=va}else{xa=c[t>>2]|0;c[t>>2]=va;if((xa|0)==0){_b=va;break}qd[c[V>>2]&127](xa);_b=c[t>>2]|0}}while(0);c[V>>2]=116;va=_b+ka|0;c[o>>2]=va;$b=va;ac=(c[t>>2]|0)+ua|0}else{$b=ha;ac=Ub}va=c[h>>2]|0;ya=c[va+12>>2]|0;if((ya|0)==(c[va+16>>2]|0)){ja=td[c[(c[va>>2]|0)+36>>2]&63](va)|0;bc=ja;cc=c[o>>2]|0}else{bc=d[ya]|0;cc=$b}c[o>>2]=cc+1;a[cc]=bc;ya=Sb+ -1|0;c[B>>2]=ya;ja=c[h>>2]|0;va=ja+12|0;xa=c[va>>2]|0;if((xa|0)==(c[ja+16>>2]|0)){td[c[(c[ja>>2]|0)+40>>2]&63](ja)|0}else{c[va>>2]=xa+1}if((ya|0)>0){Rb=Xb;Sb=ya;Tb=Yb;Ub=ac}else{dc=ac;break}}}else{dc=aa}if((c[o>>2]|0)==(c[t>>2]|0)){ba=267;break a}else{ma=dc;na=Fb;oa=Gb;pa=Hb;qa=Y;ra=Ib}break};default:{ma=D;na=X;oa=r;pa=W;qa=Y;ra=Z}}}while(0);f:do{if((ba|0)==26){ba=0;if((p|0)==3){da=X;ea=r;fa=Y;ga=Z;ba=269;break a}else{ec=ca;fc=ca}while(1){_=c[h>>2]|0;do{if((_|0)==0){gc=0}else{if((c[_+12>>2]|0)!=(c[_+16>>2]|0)){gc=_;break}if((td[c[(c[_>>2]|0)+36>>2]&63](_)|0)==-1){c[h>>2]=0;gc=0;break}else{gc=c[h>>2]|0;break}}}while(0);_=(gc|0)==0;do{if((fc|0)==0){hc=ec;ba=37}else{if((c[fc+12>>2]|0)!=(c[fc+16>>2]|0)){if(_){ic=ec;jc=fc;break}else{ma=D;na=X;oa=r;pa=W;qa=Y;ra=Z;break f}}if((td[c[(c[fc>>2]|0)+36>>2]&63](fc)|0)==-1){c[e>>2]=0;hc=0;ba=37;break}else{if(_^(ec|0)==0){ic=ec;jc=ec;break}else{ma=D;na=X;oa=r;pa=W;qa=Y;ra=Z;break f}}}}while(0);if((ba|0)==37){ba=0;if(_){ma=D;na=X;oa=r;pa=W;qa=Y;ra=Z;break f}else{ic=hc;jc=0}}ha=c[h>>2]|0;ua=c[ha+12>>2]|0;if((ua|0)==(c[ha+16>>2]|0)){kc=td[c[(c[ha>>2]|0)+36>>2]&63](ha)|0}else{kc=d[ua]|0}if(!((kc&255)<<24>>24>-1)){ma=D;na=X;oa=r;pa=W;qa=Y;ra=Z;break f}if((b[(c[s>>2]|0)+(kc<<24>>24<<1)>>1]&8192)==0){ma=D;na=X;oa=r;pa=W;qa=Y;ra=Z;break f}ua=c[h>>2]|0;ha=ua+12|0;ka=c[ha>>2]|0;if((ka|0)==(c[ua+16>>2]|0)){lc=td[c[(c[ua>>2]|0)+40>>2]&63](ua)|0}else{c[ha>>2]=ka+1;lc=d[ka]|0}Zg(A,lc&255);ec=ic;fc=jc}}}while(0);aa=p+1|0;if(aa>>>0<4){W=pa;r=oa;X=na;D=ma;p=aa;Y=qa;Z=ra}else{da=na;ea=oa;fa=qa;ga=ra;ba=269;break}}g:do{if((ba|0)==25){c[k>>2]=c[k>>2]|4;mc=0;nc=X;oc=Z}else if((ba|0)==112){c[k>>2]=c[k>>2]|4;mc=0;nc=X;oc=Z}else if((ba|0)==162){c[k>>2]=c[k>>2]|4;mc=0;nc=X;oc=Z}else if((ba|0)==182){rp()}else if((ba|0)==198){rp()}else if((ba|0)==209){rp()}else if((ba|0)==229){c[k>>2]=c[k>>2]|4;mc=0;nc=Fb;oc=Ib}else if((ba|0)==250){c[k>>2]=c[k>>2]|4;mc=0;nc=Fb;oc=Ib}else if((ba|0)==253){rp()}else if((ba|0)==267){c[k>>2]=c[k>>2]|4;mc=0;nc=Fb;oc=Ib}else if((ba|0)==269){h:do{if((fa|0)!=0){ra=fa;qa=fa+1|0;oa=fa+8|0;na=fa+4|0;Y=1;i:while(1){p=a[ra]|0;if((p&1)==0){pc=(p&255)>>>1}else{pc=c[na>>2]|0}if(!(Y>>>0<pc>>>0)){break h}p=c[h>>2]|0;do{if((p|0)==0){qc=0}else{if((c[p+12>>2]|0)!=(c[p+16>>2]|0)){qc=p;break}if((td[c[(c[p>>2]|0)+36>>2]&63](p)|0)==-1){c[h>>2]=0;qc=0;break}else{qc=c[h>>2]|0;break}}}while(0);p=(qc|0)==0;_=c[e>>2]|0;do{if((_|0)==0){ba=285}else{if((c[_+12>>2]|0)!=(c[_+16>>2]|0)){if(p){break}else{break i}}if((td[c[(c[_>>2]|0)+36>>2]&63](_)|0)==-1){c[e>>2]=0;ba=285;break}else{if(p){break}else{break i}}}}while(0);if((ba|0)==285){ba=0;if(p){break}}_=c[h>>2]|0;ma=c[_+12>>2]|0;if((ma|0)==(c[_+16>>2]|0)){rc=td[c[(c[_>>2]|0)+36>>2]&63](_)|0}else{rc=d[ma]|0}if((a[ra]&1)==0){sc=qa}else{sc=c[oa>>2]|0}if(!((rc&255)<<24>>24==(a[sc+Y|0]|0))){break}ma=Y+1|0;_=c[h>>2]|0;D=_+12|0;r=c[D>>2]|0;if((r|0)==(c[_+16>>2]|0)){td[c[(c[_>>2]|0)+40>>2]&63](_)|0;Y=ma;continue}else{c[D>>2]=r+1;Y=ma;continue}}c[k>>2]=c[k>>2]|4;mc=0;nc=da;oc=ga;break g}}while(0);if((da|0)==(ea|0)){mc=1;nc=ea;oc=ga;break}c[C>>2]=0;Hl(w,da,ea,C);if((c[C>>2]|0)==0){mc=1;nc=da;oc=ga;break}c[k>>2]=c[k>>2]|4;mc=0;nc=da;oc=ga}}while(0);Ug(A);Ug(z);Ug(y);Ug(x);Ug(w);if((nc|0)==0){i=q;return mc|0}qd[oc&127](nc);i=q;return mc|0}function Dl(a){a=a|0;var b=0;b=bc(8)|0;Bg(b,a);gd(b|0,14472,11)}function El(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;d=i;i=i+168|0;l=d;m=d+8|0;n=d+24|0;o=d+128|0;p=d+136|0;q=d+144|0;r=d+152|0;s=d+160|0;t=o;c[t>>2]=n;u=o+4|0;c[u>>2]=115;v=n+100|0;mh(q,h);n=q;w=c[n>>2]|0;if(!((c[4366]|0)==-1)){c[m>>2]=17464;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17464,m,114)}m=(c[17468>>2]|0)+ -1|0;x=c[w+8>>2]|0;if(!((c[w+12>>2]|0)-x>>2>>>0>m>>>0)){y=bc(4)|0;z=y;Mo(z);gd(y|0,25424,101)}w=c[x+(m<<2)>>2]|0;if((w|0)==0){y=bc(4)|0;z=y;Mo(z);gd(y|0,25424,101)}y=w;a[r]=0;z=f;f=c[z>>2]|0;c[s>>2]=f;m=c[h+4>>2]|0;h=l;x=s;c[h+0>>2]=c[x+0>>2];x=Cl(e,l,g,q,m,j,r,y,o,p,v)|0;if(x){x=k;if((a[x]&1)==0){a[k+1|0]=0;a[x]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}x=w;if((a[r]|0)!=0){Zg(k,Cd[c[(c[x>>2]|0)+28>>2]&15](y,45)|0)}r=Cd[c[(c[x>>2]|0)+28>>2]&15](y,48)|0;y=c[t>>2]|0;x=c[p>>2]|0;p=x+ -1|0;a:do{if(y>>>0<p>>>0){w=y;while(1){v=w+1|0;if(!((a[w]|0)==r<<24>>24)){A=w;break a}if(v>>>0<p>>>0){w=v}else{A=v;break}}}else{A=y}}while(0);Fl(k,A,x)|0}x=e;e=c[x>>2]|0;do{if((e|0)==0){B=0}else{if((c[e+12>>2]|0)!=(c[e+16>>2]|0)){B=e;break}if(!((td[c[(c[e>>2]|0)+36>>2]&63](e)|0)==-1)){B=e;break}c[x>>2]=0;B=0}}while(0);x=(B|0)==0;do{if((f|0)==0){C=25}else{if((c[f+12>>2]|0)!=(c[f+16>>2]|0)){if(x){break}else{C=27;break}}if((td[c[(c[f>>2]|0)+36>>2]&63](f)|0)==-1){c[z>>2]=0;C=25;break}else{if(x^(f|0)==0){break}else{C=27;break}}}}while(0);if((C|0)==25){if(x){C=27}}if((C|0)==27){c[j>>2]=c[j>>2]|2}c[b>>2]=B;vg(c[n>>2]|0)|0;n=c[t>>2]|0;c[t>>2]=0;if((n|0)==0){i=d;return}qd[c[u>>2]&127](n);i=d;return}function Fl(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;g=b;h=d;j=a[g]|0;if((j&1)==0){k=(j&255)>>>1;l=j;m=10}else{j=c[b>>2]|0;k=c[b+4>>2]|0;l=j&255;m=(j&-2)+ -1|0}j=e-h|0;if((e|0)==(d|0)){i=f;return b|0}if((m-k|0)>>>0<j>>>0){ah(b,m,k+j-m|0,k,k,0,0);n=a[g]|0}else{n=l}if((n&1)==0){o=b+1|0}else{o=c[b+8>>2]|0}n=e+(k-h)|0;h=d;d=o+k|0;while(1){a[d]=a[h]|0;l=h+1|0;if((l|0)==(e|0)){break}else{d=d+1|0;h=l}}a[o+n|0]=0;n=k+j|0;if((a[g]&1)==0){a[g]=n<<1;i=f;return b|0}else{c[b+4>>2]=n;i=f;return b|0}return 0}function Gl(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;n=i;i=i+176|0;o=n;p=n+16|0;q=n+32|0;r=n+40|0;s=n+56|0;t=n+72|0;u=n+88|0;v=n+104|0;w=n+112|0;x=n+128|0;y=n+144|0;z=n+160|0;if(b){b=c[d>>2]|0;if(!((c[4226]|0)==-1)){c[p>>2]=16904;c[p+4>>2]=113;c[p+8>>2]=0;Pg(16904,p,114)}p=(c[16908>>2]|0)+ -1|0;A=c[b+8>>2]|0;if(!((c[b+12>>2]|0)-A>>2>>>0>p>>>0)){B=bc(4)|0;C=B;Mo(C);gd(B|0,25424,101)}b=c[A+(p<<2)>>2]|0;if((b|0)==0){B=bc(4)|0;C=B;Mo(C);gd(B|0,25424,101)}B=b;rd[c[(c[b>>2]|0)+44>>2]&63](q,B);C=e;p=c[q>>2]|0;a[C]=p;a[C+1|0]=p>>8;a[C+2|0]=p>>16;a[C+3|0]=p>>24;p=b;rd[c[(c[p>>2]|0)+32>>2]&63](r,B);C=l;if((a[C]&1)==0){a[l+1|0]=0;a[C]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}Yg(l,0);q=r;c[C+0>>2]=c[q+0>>2];c[C+4>>2]=c[q+4>>2];c[C+8>>2]=c[q+8>>2];c[q+0>>2]=0;c[q+4>>2]=0;c[q+8>>2]=0;Ug(r);rd[c[(c[p>>2]|0)+28>>2]&63](s,B);r=k;if((a[r]&1)==0){a[k+1|0]=0;a[r]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}Yg(k,0);q=s;c[r+0>>2]=c[q+0>>2];c[r+4>>2]=c[q+4>>2];c[r+8>>2]=c[q+8>>2];c[q+0>>2]=0;c[q+4>>2]=0;c[q+8>>2]=0;Ug(s);s=b;a[f]=td[c[(c[s>>2]|0)+12>>2]&63](B)|0;a[g]=td[c[(c[s>>2]|0)+16>>2]&63](B)|0;rd[c[(c[p>>2]|0)+20>>2]&63](t,B);s=h;if((a[s]&1)==0){a[h+1|0]=0;a[s]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}Yg(h,0);q=t;c[s+0>>2]=c[q+0>>2];c[s+4>>2]=c[q+4>>2];c[s+8>>2]=c[q+8>>2];c[q+0>>2]=0;c[q+4>>2]=0;c[q+8>>2]=0;Ug(t);rd[c[(c[p>>2]|0)+24>>2]&63](u,B);p=j;if((a[p]&1)==0){a[j+1|0]=0;a[p]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}Yg(j,0);t=u;c[p+0>>2]=c[t+0>>2];c[p+4>>2]=c[t+4>>2];c[p+8>>2]=c[t+8>>2];c[t+0>>2]=0;c[t+4>>2]=0;c[t+8>>2]=0;Ug(u);D=td[c[(c[b>>2]|0)+36>>2]&63](B)|0;c[m>>2]=D;i=n;return}else{B=c[d>>2]|0;if(!((c[4210]|0)==-1)){c[o>>2]=16840;c[o+4>>2]=113;c[o+8>>2]=0;Pg(16840,o,114)}o=(c[16844>>2]|0)+ -1|0;d=c[B+8>>2]|0;if(!((c[B+12>>2]|0)-d>>2>>>0>o>>>0)){E=bc(4)|0;F=E;Mo(F);gd(E|0,25424,101)}B=c[d+(o<<2)>>2]|0;if((B|0)==0){E=bc(4)|0;F=E;Mo(F);gd(E|0,25424,101)}E=B;rd[c[(c[B>>2]|0)+44>>2]&63](v,E);F=e;e=c[v>>2]|0;a[F]=e;a[F+1|0]=e>>8;a[F+2|0]=e>>16;a[F+3|0]=e>>24;e=B;rd[c[(c[e>>2]|0)+32>>2]&63](w,E);F=l;if((a[F]&1)==0){a[l+1|0]=0;a[F]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}Yg(l,0);l=w;c[F+0>>2]=c[l+0>>2];c[F+4>>2]=c[l+4>>2];c[F+8>>2]=c[l+8>>2];c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;Ug(w);rd[c[(c[e>>2]|0)+28>>2]&63](x,E);w=k;if((a[w]&1)==0){a[k+1|0]=0;a[w]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}Yg(k,0);k=x;c[w+0>>2]=c[k+0>>2];c[w+4>>2]=c[k+4>>2];c[w+8>>2]=c[k+8>>2];c[k+0>>2]=0;c[k+4>>2]=0;c[k+8>>2]=0;Ug(x);x=B;a[f]=td[c[(c[x>>2]|0)+12>>2]&63](E)|0;a[g]=td[c[(c[x>>2]|0)+16>>2]&63](E)|0;rd[c[(c[e>>2]|0)+20>>2]&63](y,E);x=h;if((a[x]&1)==0){a[h+1|0]=0;a[x]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}Yg(h,0);h=y;c[x+0>>2]=c[h+0>>2];c[x+4>>2]=c[h+4>>2];c[x+8>>2]=c[h+8>>2];c[h+0>>2]=0;c[h+4>>2]=0;c[h+8>>2]=0;Ug(y);rd[c[(c[e>>2]|0)+24>>2]&63](z,E);e=j;if((a[e]&1)==0){a[j+1|0]=0;a[e]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}Yg(j,0);j=z;c[e+0>>2]=c[j+0>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[j+0>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;Ug(z);D=td[c[(c[B>>2]|0)+36>>2]&63](E)|0;c[m>>2]=D;i=n;return}}function Hl(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;h=b;j=a[h]|0;if((j&1)==0){k=(j&255)>>>1}else{k=c[b+4>>2]|0}if((k|0)==0){i=g;return}do{if((d|0)==(e|0)){l=j}else{k=e+ -4|0;if(k>>>0>d>>>0){m=d;n=k}else{l=j;break}do{k=c[m>>2]|0;c[m>>2]=c[n>>2];c[n>>2]=k;m=m+4|0;n=n+ -4|0;}while(m>>>0<n>>>0);l=a[h]|0}}while(0);if((l&1)==0){o=b+1|0;p=(l&255)>>>1}else{o=c[b+8>>2]|0;p=c[b+4>>2]|0}b=e+ -4|0;e=a[o]|0;l=e<<24>>24<1|e<<24>>24==127;a:do{if(b>>>0>d>>>0){h=o+p|0;n=e;m=o;j=d;k=l;while(1){if(!k){if((n<<24>>24|0)!=(c[j>>2]|0)){break}}q=(h-m|0)>1?m+1|0:m;r=j+4|0;s=a[q]|0;t=s<<24>>24<1|s<<24>>24==127;if(r>>>0<b>>>0){n=s;m=q;j=r;k=t}else{u=s;v=t;break a}}c[f>>2]=4;i=g;return}else{u=e;v=l}}while(0);if(v){i=g;return}v=c[b>>2]|0;if(!(u<<24>>24>>>0<v>>>0|(v|0)==0)){i=g;return}c[f>>2]=4;i=g;return}function Il(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Jl(a){a=a|0;i=i;return}function Kl(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;d=i;i=i+16|0;l=d;m=d+8|0;n=i;i=i+16|0;o=i;i=i+400|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=i;i=i+8|0;t=i;i=i+8|0;u=i;i=i+40|0;v=i;i=i+104|0;w=p;c[w>>2]=o;x=p+4|0;c[x>>2]=115;y=o+400|0;mh(r,h);o=r;z=c[o>>2]|0;if(!((c[4364]|0)==-1)){c[n>>2]=17456;c[n+4>>2]=113;c[n+8>>2]=0;Pg(17456,n,114)}n=(c[17460>>2]|0)+ -1|0;A=c[z+8>>2]|0;if(!((c[z+12>>2]|0)-A>>2>>>0>n>>>0)){B=bc(4)|0;C=B;Mo(C);gd(B|0,25424,101)}z=c[A+(n<<2)>>2]|0;if((z|0)==0){B=bc(4)|0;C=B;Mo(C);gd(B|0,25424,101)}B=z;a[s]=0;C=f;c[t>>2]=c[C>>2];f=c[h+4>>2]|0;h=l;n=t;c[h+0>>2]=c[n+0>>2];n=Ll(e,l,g,r,f,j,s,B,p,q,y)|0;do{if(n){y=u;zd[c[(c[z>>2]|0)+48>>2]&7](B,17160,17170|0,y)|0;p=v;f=c[q>>2]|0;r=c[w>>2]|0;g=f-r|0;do{if((g|0)>392){l=fp((g>>2)+2|0)|0;if((l|0)!=0){D=l;E=l;break}rp()}else{D=0;E=p}}while(0);if((a[s]|0)==0){F=E}else{a[E]=45;F=E+1|0}if(r>>>0<f>>>0){g=u+40|0;l=u;h=F;t=r;while(1){A=c[t>>2]|0;G=y;while(1){H=G+4|0;if((c[G>>2]|0)==(A|0)){I=G;break}if((H|0)==(g|0)){I=g;break}else{G=H}}a[h]=a[17160+(I-l>>2)|0]|0;G=t+4|0;A=h+1|0;if(G>>>0<(c[q>>2]|0)>>>0){h=A;t=G}else{J=A;break}}}else{J=F}a[J]=0;c[m>>2]=k;if((Na(p|0,17096,m|0)|0)!=1){t=bc(8)|0;Bg(t,17104);gd(t|0,14472,11)}if((D|0)==0){break}gp(D)}}while(0);D=e;e=c[D>>2]|0;do{if((e|0)==0){K=1}else{m=c[e+12>>2]|0;if((m|0)==(c[e+16>>2]|0)){L=td[c[(c[e>>2]|0)+36>>2]&63](e)|0}else{L=c[m>>2]|0}if((L|0)==-1){c[D>>2]=0;K=1;break}else{K=(c[D>>2]|0)==0;break}}}while(0);L=c[C>>2]|0;do{if((L|0)==0){M=35}else{e=c[L+12>>2]|0;if((e|0)==(c[L+16>>2]|0)){N=td[c[(c[L>>2]|0)+36>>2]&63](L)|0}else{N=c[e>>2]|0}if((N|0)==-1){c[C>>2]=0;M=35;break}else{if(K){break}else{M=37;break}}}}while(0);if((M|0)==35){if(K){M=37}}if((M|0)==37){c[j>>2]=c[j>>2]|2}c[b>>2]=c[D>>2];vg(c[o>>2]|0)|0;o=c[w>>2]|0;c[w>>2]=0;if((o|0)==0){i=d;return}qd[c[x>>2]&127](o);i=d;return}function Ll(b,e,f,g,h,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Ac=0,Bc=0,Cc=0;p=i;i=i+408|0;q=p;r=p+400|0;s=r;t=i;i=i+8|0;u=i;i=i+8|0;v=i;i=i+16|0;w=i;i=i+16|0;x=i;i=i+16|0;y=i;i=i+16|0;z=i;i=i+16|0;A=i;i=i+8|0;B=i;i=i+8|0;C=q;c[r>>2]=0;D=v;c[D+0>>2]=0;c[D+4>>2]=0;c[D+8>>2]=0;E=w;c[E+0>>2]=0;c[E+4>>2]=0;c[E+8>>2]=0;F=x;c[F+0>>2]=0;c[F+4>>2]=0;c[F+8>>2]=0;G=y;c[G+0>>2]=0;c[G+4>>2]=0;c[G+8>>2]=0;H=z;c[H+0>>2]=0;c[H+4>>2]=0;c[H+8>>2]=0;Ol(f,g,s,t,u,v,w,x,y,A);s=m;c[n>>2]=c[s>>2];g=b;b=e;e=r;r=l;f=y+4|0;I=y+8|0;J=x+4|0;K=x+8|0;L=(h&512|0)!=0;h=w+4|0;M=w+8|0;N=z+4|0;O=z+8|0;P=e+3|0;Q=m+4|0;m=v+4|0;R=q+400|0;q=C;S=C;C=o;o=0;T=0;U=115;a:while(1){V=c[g>>2]|0;do{if((V|0)==0){W=1}else{X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){Y=td[c[(c[V>>2]|0)+36>>2]&63](V)|0}else{Y=c[X>>2]|0}if((Y|0)==-1){c[g>>2]=0;W=1;break}else{W=(c[g>>2]|0)==0;break}}}while(0);V=c[b>>2]|0;do{if((V|0)==0){Z=15}else{X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){_=td[c[(c[V>>2]|0)+36>>2]&63](V)|0}else{_=c[X>>2]|0}if((_|0)==-1){c[b>>2]=0;Z=15;break}else{if(W){$=V;break}else{aa=S;ba=q;ca=T;da=U;Z=292;break a}}}}while(0);if((Z|0)==15){Z=0;if(W){aa=S;ba=q;ca=T;da=U;Z=292;break}else{$=0}}b:do{switch(a[e+o|0]|0){case 4:{V=C;X=S;ea=q;fa=R;ga=0;ha=U;c:while(1){ia=c[g>>2]|0;do{if((ia|0)==0){ja=1}else{ka=c[ia+12>>2]|0;if((ka|0)==(c[ia+16>>2]|0)){la=td[c[(c[ia>>2]|0)+36>>2]&63](ia)|0}else{la=c[ka>>2]|0}if((la|0)==-1){c[g>>2]=0;ja=1;break}else{ja=(c[g>>2]|0)==0;break}}}while(0);ia=c[b>>2]|0;do{if((ia|0)==0){Z=188}else{ka=c[ia+12>>2]|0;if((ka|0)==(c[ia+16>>2]|0)){ma=td[c[(c[ia>>2]|0)+36>>2]&63](ia)|0}else{ma=c[ka>>2]|0}if((ma|0)==-1){c[b>>2]=0;Z=188;break}else{if(ja){break}else{break c}}}}while(0);if((Z|0)==188){Z=0;if(ja){break}}ia=c[g>>2]|0;ka=c[ia+12>>2]|0;if((ka|0)==(c[ia+16>>2]|0)){na=td[c[(c[ia>>2]|0)+36>>2]&63](ia)|0}else{na=c[ka>>2]|0}if(nd[c[(c[r>>2]|0)+12>>2]&31](l,2048,na)|0){ka=c[n>>2]|0;if((ka|0)==(V|0)){ia=(c[Q>>2]|0)!=115;oa=c[s>>2]|0;pa=V-oa|0;qa=pa>>>0<2147483647?pa<<1:-1;ra=pa>>2;if(ia){sa=oa}else{sa=0}oa=hp(sa,qa)|0;pa=oa;if((oa|0)==0){Z=198;break a}do{if(ia){c[s>>2]=pa;ta=pa}else{oa=c[s>>2]|0;c[s>>2]=pa;if((oa|0)==0){ta=pa;break}qd[c[Q>>2]&127](oa);ta=c[s>>2]|0}}while(0);c[Q>>2]=116;pa=ta+(ra<<2)|0;c[n>>2]=pa;ua=pa;va=(c[s>>2]|0)+(qa>>>2<<2)|0}else{ua=ka;va=V}c[n>>2]=ua+4;c[ua>>2]=na;wa=va;xa=X;ya=ea;za=fa;Aa=ga+1|0;Ba=ha}else{pa=a[D]|0;if((pa&1)==0){Ca=(pa&255)>>>1}else{Ca=c[m>>2]|0}if((Ca|0)==0|(ga|0)==0){break}if((na|0)!=(c[u>>2]|0)){break}if((ea|0)==(fa|0)){pa=ea-X|0;ia=pa>>>0<2147483647?pa<<1:-1;if((ha|0)!=115){Da=X}else{Da=0}oa=hp(Da,ia)|0;Ea=oa;if((oa|0)==0){Z=214;break a}Fa=Ea;Ga=Ea+(pa>>2<<2)|0;Ha=Ea+(ia>>>2<<2)|0;Ia=116}else{Fa=X;Ga=ea;Ha=fa;Ia=ha}c[Ga>>2]=ga;wa=V;xa=Fa;ya=Ga+4|0;za=Ha;Aa=0;Ba=Ia}ia=c[g>>2]|0;Ea=ia+12|0;pa=c[Ea>>2]|0;if((pa|0)==(c[ia+16>>2]|0)){td[c[(c[ia>>2]|0)+40>>2]&63](ia)|0;V=wa;X=xa;ea=ya;fa=za;ga=Aa;ha=Ba;continue}else{c[Ea>>2]=pa+4;V=wa;X=xa;ea=ya;fa=za;ga=Aa;ha=Ba;continue}}if((X|0)==(ea|0)|(ga|0)==0){Ja=X;Ka=ea;La=fa;Ma=ha}else{if((ea|0)==(fa|0)){pa=ea-X|0;Ea=pa>>>0<2147483647?pa<<1:-1;if((ha|0)!=115){Na=X}else{Na=0}ia=hp(Na,Ea)|0;oa=ia;if((ia|0)==0){Z=225;break a}Oa=oa;Pa=oa+(pa>>2<<2)|0;Qa=oa+(Ea>>>2<<2)|0;Ra=116}else{Oa=X;Pa=ea;Qa=fa;Ra=ha}c[Pa>>2]=ga;Ja=Oa;Ka=Pa+4|0;La=Qa;Ma=Ra}Ea=c[A>>2]|0;if((Ea|0)>0){oa=c[g>>2]|0;do{if((oa|0)==0){Sa=1}else{pa=c[oa+12>>2]|0;if((pa|0)==(c[oa+16>>2]|0)){Ta=td[c[(c[oa>>2]|0)+36>>2]&63](oa)|0}else{Ta=c[pa>>2]|0}if((Ta|0)==-1){c[g>>2]=0;Sa=1;break}else{Sa=(c[g>>2]|0)==0;break}}}while(0);oa=c[b>>2]|0;do{if((oa|0)==0){Z=242}else{ga=c[oa+12>>2]|0;if((ga|0)==(c[oa+16>>2]|0)){Ua=td[c[(c[oa>>2]|0)+36>>2]&63](oa)|0}else{Ua=c[ga>>2]|0}if((Ua|0)==-1){c[b>>2]=0;Z=242;break}else{if(Sa){Va=oa;break}else{Z=248;break a}}}}while(0);if((Z|0)==242){Z=0;if(Sa){Z=248;break a}else{Va=0}}oa=c[g>>2]|0;ga=c[oa+12>>2]|0;if((ga|0)==(c[oa+16>>2]|0)){Wa=td[c[(c[oa>>2]|0)+36>>2]&63](oa)|0}else{Wa=c[ga>>2]|0}if((Wa|0)!=(c[t>>2]|0)){Z=248;break a}ga=c[g>>2]|0;oa=ga+12|0;ha=c[oa>>2]|0;if((ha|0)==(c[ga+16>>2]|0)){td[c[(c[ga>>2]|0)+40>>2]&63](ga)|0;Xa=Va;Ya=Ea;Za=Va;_a=V}else{c[oa>>2]=ha+4;Xa=Va;Ya=Ea;Za=Va;_a=V}while(1){ha=c[g>>2]|0;do{if((ha|0)==0){$a=1}else{oa=c[ha+12>>2]|0;if((oa|0)==(c[ha+16>>2]|0)){ab=td[c[(c[ha>>2]|0)+36>>2]&63](ha)|0}else{ab=c[oa>>2]|0}if((ab|0)==-1){c[g>>2]=0;$a=1;break}else{$a=(c[g>>2]|0)==0;break}}}while(0);do{if((Za|0)==0){bb=Xa;Z=265}else{ha=c[Za+12>>2]|0;if((ha|0)==(c[Za+16>>2]|0)){cb=td[c[(c[Za>>2]|0)+36>>2]&63](Za)|0}else{cb=c[ha>>2]|0}if((cb|0)==-1){c[b>>2]=0;bb=0;Z=265;break}else{if($a^(Xa|0)==0){db=Xa;eb=Xa;break}else{Z=271;break a}}}}while(0);if((Z|0)==265){Z=0;if($a){Z=271;break a}else{db=bb;eb=0}}ha=c[g>>2]|0;ka=c[ha+12>>2]|0;if((ka|0)==(c[ha+16>>2]|0)){fb=td[c[(c[ha>>2]|0)+36>>2]&63](ha)|0}else{fb=c[ka>>2]|0}if(!(nd[c[(c[r>>2]|0)+12>>2]&31](l,2048,fb)|0)){Z=271;break a}ka=c[n>>2]|0;if((ka|0)==(_a|0)){ha=(c[Q>>2]|0)!=115;qa=c[s>>2]|0;ra=_a-qa|0;oa=ra>>>0<2147483647?ra<<1:-1;ga=ra>>2;if(ha){gb=qa}else{gb=0}qa=hp(gb,oa)|0;ra=qa;if((qa|0)==0){Z=276;break a}do{if(ha){c[s>>2]=ra;hb=ra}else{qa=c[s>>2]|0;c[s>>2]=ra;if((qa|0)==0){hb=ra;break}qd[c[Q>>2]&127](qa);hb=c[s>>2]|0}}while(0);c[Q>>2]=116;ra=hb+(ga<<2)|0;c[n>>2]=ra;ib=ra;jb=(c[s>>2]|0)+(oa>>>2<<2)|0}else{ib=ka;jb=_a}ra=c[g>>2]|0;ha=c[ra+12>>2]|0;if((ha|0)==(c[ra+16>>2]|0)){qa=td[c[(c[ra>>2]|0)+36>>2]&63](ra)|0;kb=qa;lb=c[n>>2]|0}else{kb=c[ha>>2]|0;lb=ib}c[n>>2]=lb+4;c[lb>>2]=kb;ha=Ya+ -1|0;c[A>>2]=ha;qa=c[g>>2]|0;ra=qa+12|0;fa=c[ra>>2]|0;if((fa|0)==(c[qa+16>>2]|0)){td[c[(c[qa>>2]|0)+40>>2]&63](qa)|0}else{c[ra>>2]=fa+4}if((ha|0)>0){Xa=db;Ya=ha;Za=eb;_a=jb}else{mb=jb;break}}}else{mb=V}if((c[n>>2]|0)==(c[s>>2]|0)){Z=290;break a}else{nb=mb;ob=Ja;pb=Ka;qb=La;rb=T;sb=Ma}break};case 1:{if((o|0)==3){aa=S;ba=q;ca=T;da=U;Z=292;break a}Ea=c[g>>2]|0;ha=c[Ea+12>>2]|0;if((ha|0)==(c[Ea+16>>2]|0)){tb=td[c[(c[Ea>>2]|0)+36>>2]&63](Ea)|0}else{tb=c[ha>>2]|0}if(!(nd[c[(c[r>>2]|0)+12>>2]&31](l,8192,tb)|0)){Z=27;break a}ha=c[g>>2]|0;Ea=ha+12|0;fa=c[Ea>>2]|0;if((fa|0)==(c[ha+16>>2]|0)){ub=td[c[(c[ha>>2]|0)+40>>2]&63](ha)|0}else{c[Ea>>2]=fa+4;ub=c[fa>>2]|0}hh(z,ub);Z=28;break};case 0:{Z=28;break};case 3:{fa=a[F]|0;Ea=(fa&1)==0;if(Ea){vb=(fa&255)>>>1}else{vb=c[J>>2]|0}ha=a[G]|0;ra=(ha&1)==0;if(ra){wb=(ha&255)>>>1}else{wb=c[f>>2]|0}if((vb|0)==(0-wb|0)){nb=C;ob=S;pb=q;qb=R;rb=T;sb=U;break b}if(Ea){xb=(fa&255)>>>1}else{xb=c[J>>2]|0}do{if((xb|0)!=0){if(ra){yb=(ha&255)>>>1}else{yb=c[f>>2]|0}if((yb|0)==0){break}qa=c[g>>2]|0;ea=c[qa+12>>2]|0;if((ea|0)==(c[qa+16>>2]|0)){X=td[c[(c[qa>>2]|0)+36>>2]&63](qa)|0;zb=X;Ab=a[F]|0}else{zb=c[ea>>2]|0;Ab=fa}ea=c[g>>2]|0;X=ea+12|0;qa=c[X>>2]|0;pa=(qa|0)==(c[ea+16>>2]|0);if((zb|0)==(c[((Ab&1)==0?J:c[K>>2]|0)>>2]|0)){if(pa){td[c[(c[ea>>2]|0)+40>>2]&63](ea)|0}else{c[X>>2]=qa+4}X=a[F]|0;if((X&1)==0){Bb=(X&255)>>>1}else{Bb=c[J>>2]|0}nb=C;ob=S;pb=q;qb=R;rb=Bb>>>0>1?x:T;sb=U;break b}if(pa){Cb=td[c[(c[ea>>2]|0)+36>>2]&63](ea)|0}else{Cb=c[qa>>2]|0}if((Cb|0)!=(c[((a[G]&1)==0?f:c[I>>2]|0)>>2]|0)){Z=116;break a}qa=c[g>>2]|0;ea=qa+12|0;pa=c[ea>>2]|0;if((pa|0)==(c[qa+16>>2]|0)){td[c[(c[qa>>2]|0)+40>>2]&63](qa)|0}else{c[ea>>2]=pa+4}a[k]=1;pa=a[G]|0;if((pa&1)==0){Db=(pa&255)>>>1}else{Db=c[f>>2]|0}nb=C;ob=S;pb=q;qb=R;rb=Db>>>0>1?y:T;sb=U;break b}}while(0);if(Ea){Eb=(fa&255)>>>1}else{Eb=c[J>>2]|0}ra=c[g>>2]|0;V=c[ra+12>>2]|0;pa=(V|0)==(c[ra+16>>2]|0);if((Eb|0)==0){if(pa){ea=td[c[(c[ra>>2]|0)+36>>2]&63](ra)|0;Fb=ea;Gb=a[G]|0}else{Fb=c[V>>2]|0;Gb=ha}if((Fb|0)!=(c[((Gb&1)==0?f:c[I>>2]|0)>>2]|0)){nb=C;ob=S;pb=q;qb=R;rb=T;sb=U;break b}ea=c[g>>2]|0;qa=ea+12|0;X=c[qa>>2]|0;if((X|0)==(c[ea+16>>2]|0)){td[c[(c[ea>>2]|0)+40>>2]&63](ea)|0}else{c[qa>>2]=X+4}a[k]=1;X=a[G]|0;if((X&1)==0){Hb=(X&255)>>>1}else{Hb=c[f>>2]|0}nb=C;ob=S;pb=q;qb=R;rb=Hb>>>0>1?y:T;sb=U;break b}if(pa){pa=td[c[(c[ra>>2]|0)+36>>2]&63](ra)|0;Ib=pa;Jb=a[F]|0}else{Ib=c[V>>2]|0;Jb=fa}if((Ib|0)!=(c[((Jb&1)==0?J:c[K>>2]|0)>>2]|0)){a[k]=1;nb=C;ob=S;pb=q;qb=R;rb=T;sb=U;break b}V=c[g>>2]|0;pa=V+12|0;ra=c[pa>>2]|0;if((ra|0)==(c[V+16>>2]|0)){td[c[(c[V>>2]|0)+40>>2]&63](V)|0}else{c[pa>>2]=ra+4}ra=a[F]|0;if((ra&1)==0){Kb=(ra&255)>>>1}else{Kb=c[J>>2]|0}nb=C;ob=S;pb=q;qb=R;rb=Kb>>>0>1?x:T;sb=U;break};case 2:{if(!((T|0)!=0|o>>>0<2)){if((o|0)==2){Lb=(a[P]|0)!=0}else{Lb=0}if(!(L|Lb)){nb=C;ob=S;pb=q;qb=R;rb=0;sb=U;break b}}ra=a[E]|0;pa=(ra&1)==0?h:c[M>>2]|0;d:do{if((o|0)==0){Mb=$;Nb=$;Ob=ra;Pb=pa}else{if((d[e+(o+ -1)|0]|0)<2){Qb=ra;Rb=pa}else{Mb=$;Nb=$;Ob=ra;Pb=pa;break}while(1){if((Qb&1)==0){Sb=h;Tb=(Qb&255)>>>1}else{Sb=c[M>>2]|0;Tb=c[h>>2]|0}if((Rb|0)==(Sb+(Tb<<2)|0)){Ub=Qb;break}if(!(nd[c[(c[r>>2]|0)+12>>2]&31](l,8192,c[Rb>>2]|0)|0)){Z=129;break}Qb=a[E]|0;Rb=Rb+4|0}if((Z|0)==129){Z=0;Ub=a[E]|0}ka=(Ub&1)==0;oa=Rb-(ka?h:c[M>>2]|0)>>2;ga=a[H]|0;V=(ga&1)==0;if(V){Vb=(ga&255)>>>1}else{Vb=c[N>>2]|0}e:do{if(!(oa>>>0>Vb>>>0)){if(V){Wb=N+(((ga&255)>>>1)-oa<<2)|0;Xb=N;Yb=(ga&255)>>>1}else{X=c[O>>2]|0;qa=c[N>>2]|0;Wb=X+(qa-oa<<2)|0;Xb=X;Yb=qa}qa=Xb+(Yb<<2)|0;if((Wb|0)==(qa|0)){Mb=$;Nb=$;Ob=Ub;Pb=Rb;break d}else{Zb=ka?h:c[M>>2]|0;_b=Wb}while(1){if((c[_b>>2]|0)!=(c[Zb>>2]|0)){break e}X=_b+4|0;if((X|0)==(qa|0)){Mb=$;Nb=$;Ob=Ub;Pb=Rb;break d}Zb=Zb+4|0;_b=X}}}while(0);Mb=$;Nb=$;Ob=Ub;Pb=ka?h:c[M>>2]|0}}while(0);f:while(1){if((Ob&1)==0){$b=h;ac=(Ob&255)>>>1}else{$b=c[M>>2]|0;ac=c[h>>2]|0}if((Pb|0)==($b+(ac<<2)|0)){break}pa=c[g>>2]|0;do{if((pa|0)==0){bc=1}else{ra=c[pa+12>>2]|0;if((ra|0)==(c[pa+16>>2]|0)){cc=td[c[(c[pa>>2]|0)+36>>2]&63](pa)|0}else{cc=c[ra>>2]|0}if((cc|0)==-1){c[g>>2]=0;bc=1;break}else{bc=(c[g>>2]|0)==0;break}}}while(0);do{if((Nb|0)==0){dc=Mb;Z=159}else{pa=c[Nb+12>>2]|0;if((pa|0)==(c[Nb+16>>2]|0)){ec=td[c[(c[Nb>>2]|0)+36>>2]&63](Nb)|0}else{ec=c[pa>>2]|0}if((ec|0)==-1){c[b>>2]=0;dc=0;Z=159;break}else{if(bc^(Mb|0)==0){fc=Mb;gc=Mb;break}else{break f}}}}while(0);if((Z|0)==159){Z=0;if(bc){break}else{fc=dc;gc=0}}pa=c[g>>2]|0;ka=c[pa+12>>2]|0;if((ka|0)==(c[pa+16>>2]|0)){hc=td[c[(c[pa>>2]|0)+36>>2]&63](pa)|0}else{hc=c[ka>>2]|0}if((hc|0)!=(c[Pb>>2]|0)){break}ka=c[g>>2]|0;pa=ka+12|0;ra=c[pa>>2]|0;if((ra|0)==(c[ka+16>>2]|0)){td[c[(c[ka>>2]|0)+40>>2]&63](ka)|0}else{c[pa>>2]=ra+4}Mb=fc;Nb=gc;Ob=a[E]|0;Pb=Pb+4|0}if(!L){nb=C;ob=S;pb=q;qb=R;rb=T;sb=U;break b}ra=a[E]|0;if((ra&1)==0){ic=h;jc=(ra&255)>>>1}else{ic=c[M>>2]|0;jc=c[h>>2]|0}if((Pb|0)==(ic+(jc<<2)|0)){nb=C;ob=S;pb=q;qb=R;rb=T;sb=U}else{Z=174;break a}break};default:{nb=C;ob=S;pb=q;qb=R;rb=T;sb=U}}}while(0);g:do{if((Z|0)==28){Z=0;if((o|0)==3){aa=S;ba=q;ca=T;da=U;Z=292;break a}else{kc=$;lc=$}while(1){ra=c[g>>2]|0;do{if((ra|0)==0){mc=1}else{pa=c[ra+12>>2]|0;if((pa|0)==(c[ra+16>>2]|0)){nc=td[c[(c[ra>>2]|0)+36>>2]&63](ra)|0}else{nc=c[pa>>2]|0}if((nc|0)==-1){c[g>>2]=0;mc=1;break}else{mc=(c[g>>2]|0)==0;break}}}while(0);do{if((lc|0)==0){oc=kc;Z=42}else{ra=c[lc+12>>2]|0;if((ra|0)==(c[lc+16>>2]|0)){pc=td[c[(c[lc>>2]|0)+36>>2]&63](lc)|0}else{pc=c[ra>>2]|0}if((pc|0)==-1){c[b>>2]=0;oc=0;Z=42;break}else{if(mc^(kc|0)==0){qc=kc;rc=kc;break}else{nb=C;ob=S;pb=q;qb=R;rb=T;sb=U;break g}}}}while(0);if((Z|0)==42){Z=0;if(mc){nb=C;ob=S;pb=q;qb=R;rb=T;sb=U;break g}else{qc=oc;rc=0}}ra=c[g>>2]|0;pa=c[ra+12>>2]|0;if((pa|0)==(c[ra+16>>2]|0)){sc=td[c[(c[ra>>2]|0)+36>>2]&63](ra)|0}else{sc=c[pa>>2]|0}if(!(nd[c[(c[r>>2]|0)+12>>2]&31](l,8192,sc)|0)){nb=C;ob=S;pb=q;qb=R;rb=T;sb=U;break g}pa=c[g>>2]|0;ra=pa+12|0;ka=c[ra>>2]|0;if((ka|0)==(c[pa+16>>2]|0)){tc=td[c[(c[pa>>2]|0)+40>>2]&63](pa)|0}else{c[ra>>2]=ka+4;tc=c[ka>>2]|0}hh(z,tc);kc=qc;lc=rc}}}while(0);ka=o+1|0;if(ka>>>0<4){R=qb;q=pb;S=ob;C=nb;o=ka;T=rb;U=sb}else{aa=ob;ba=pb;ca=rb;da=sb;Z=292;break}}h:do{if((Z|0)==27){c[j>>2]=c[j>>2]|4;uc=0;vc=S;wc=U}else if((Z|0)==116){c[j>>2]=c[j>>2]|4;uc=0;vc=S;wc=U}else if((Z|0)==174){c[j>>2]=c[j>>2]|4;uc=0;vc=S;wc=U}else if((Z|0)==198){rp()}else if((Z|0)==214){rp()}else if((Z|0)==225){rp()}else if((Z|0)==248){c[j>>2]=c[j>>2]|4;uc=0;vc=Ja;wc=Ma}else if((Z|0)==271){c[j>>2]=c[j>>2]|4;uc=0;vc=Ja;wc=Ma}else if((Z|0)==276){rp()}else if((Z|0)==290){c[j>>2]=c[j>>2]|4;uc=0;vc=Ja;wc=Ma}else if((Z|0)==292){i:do{if((ca|0)!=0){sb=ca;rb=ca+4|0;pb=ca+8|0;ob=1;j:while(1){T=a[sb]|0;if((T&1)==0){xc=(T&255)>>>1}else{xc=c[rb>>2]|0}if(!(ob>>>0<xc>>>0)){break i}T=c[g>>2]|0;do{if((T|0)==0){yc=1}else{o=c[T+12>>2]|0;if((o|0)==(c[T+16>>2]|0)){zc=td[c[(c[T>>2]|0)+36>>2]&63](T)|0}else{zc=c[o>>2]|0}if((zc|0)==-1){c[g>>2]=0;yc=1;break}else{yc=(c[g>>2]|0)==0;break}}}while(0);T=c[b>>2]|0;do{if((T|0)==0){Z=311}else{o=c[T+12>>2]|0;if((o|0)==(c[T+16>>2]|0)){Ac=td[c[(c[T>>2]|0)+36>>2]&63](T)|0}else{Ac=c[o>>2]|0}if((Ac|0)==-1){c[b>>2]=0;Z=311;break}else{if(yc){break}else{break j}}}}while(0);if((Z|0)==311){Z=0;if(yc){break}}T=c[g>>2]|0;o=c[T+12>>2]|0;if((o|0)==(c[T+16>>2]|0)){Bc=td[c[(c[T>>2]|0)+36>>2]&63](T)|0}else{Bc=c[o>>2]|0}if((a[sb]&1)==0){Cc=rb}else{Cc=c[pb>>2]|0}if((Bc|0)!=(c[Cc+(ob<<2)>>2]|0)){break}o=ob+1|0;T=c[g>>2]|0;nb=T+12|0;C=c[nb>>2]|0;if((C|0)==(c[T+16>>2]|0)){td[c[(c[T>>2]|0)+40>>2]&63](T)|0;ob=o;continue}else{c[nb>>2]=C+4;ob=o;continue}}c[j>>2]=c[j>>2]|4;uc=0;vc=aa;wc=da;break h}}while(0);if((aa|0)==(ba|0)){uc=1;vc=ba;wc=da;break}c[B>>2]=0;Hl(v,aa,ba,B);if((c[B>>2]|0)==0){uc=1;vc=aa;wc=da;break}c[j>>2]=c[j>>2]|4;uc=0;vc=aa;wc=da}}while(0);dh(z);dh(y);dh(x);dh(w);Ug(v);if((vc|0)==0){i=p;return uc|0}qd[wc&127](vc);i=p;return uc|0}function Ml(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;d=i;i=i+464|0;l=d;m=d+8|0;n=d+24|0;o=d+424|0;p=d+432|0;q=d+440|0;r=d+448|0;s=d+456|0;t=o;c[t>>2]=n;u=o+4|0;c[u>>2]=115;v=n+400|0;mh(q,h);n=q;w=c[n>>2]|0;if(!((c[4364]|0)==-1)){c[m>>2]=17456;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17456,m,114)}m=(c[17460>>2]|0)+ -1|0;x=c[w+8>>2]|0;if(!((c[w+12>>2]|0)-x>>2>>>0>m>>>0)){y=bc(4)|0;z=y;Mo(z);gd(y|0,25424,101)}w=c[x+(m<<2)>>2]|0;if((w|0)==0){y=bc(4)|0;z=y;Mo(z);gd(y|0,25424,101)}y=w;a[r]=0;z=f;f=c[z>>2]|0;c[s>>2]=f;m=c[h+4>>2]|0;h=l;x=s;c[h+0>>2]=c[x+0>>2];x=Ll(e,l,g,q,m,j,r,y,o,p,v)|0;if(x){x=k;if((a[x]&1)==0){c[k+4>>2]=0;a[x]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}x=w;if((a[r]|0)!=0){hh(k,Cd[c[(c[x>>2]|0)+44>>2]&15](y,45)|0)}r=Cd[c[(c[x>>2]|0)+44>>2]&15](y,48)|0;y=c[t>>2]|0;x=c[p>>2]|0;p=x+ -4|0;a:do{if(y>>>0<p>>>0){w=y;while(1){v=w+4|0;if((c[w>>2]|0)!=(r|0)){A=w;break a}if(v>>>0<p>>>0){w=v}else{A=v;break}}}else{A=y}}while(0);Nl(k,A,x)|0}x=e;e=c[x>>2]|0;do{if((e|0)==0){B=1}else{A=c[e+12>>2]|0;if((A|0)==(c[e+16>>2]|0)){C=td[c[(c[e>>2]|0)+36>>2]&63](e)|0}else{C=c[A>>2]|0}if((C|0)==-1){c[x>>2]=0;B=1;break}else{B=(c[x>>2]|0)==0;break}}}while(0);do{if((f|0)==0){D=29}else{C=c[f+12>>2]|0;if((C|0)==(c[f+16>>2]|0)){E=td[c[(c[f>>2]|0)+36>>2]&63](f)|0}else{E=c[C>>2]|0}if((E|0)==-1){c[z>>2]=0;D=29;break}else{if(B){break}else{D=31;break}}}}while(0);if((D|0)==29){if(B){D=31}}if((D|0)==31){c[j>>2]=c[j>>2]|2}c[b>>2]=c[x>>2];vg(c[n>>2]|0)|0;n=c[t>>2]|0;c[t>>2]=0;if((n|0)==0){i=d;return}qd[c[u>>2]&127](n);i=d;return}function Nl(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;g=b;h=d;j=a[g]|0;if((j&1)==0){k=(j&255)>>>1;l=j;m=1}else{j=c[b>>2]|0;k=c[b+4>>2]|0;l=j&255;m=(j&-2)+ -1|0}j=e-h>>2;if((j|0)==0){i=f;return b|0}if((m-k|0)>>>0<j>>>0){jh(b,m,k+j-m|0,k,k,0,0);n=a[g]|0}else{n=l}if((n&1)==0){o=b+4|0}else{o=c[b+8>>2]|0}n=o+(k<<2)|0;if((d|0)==(e|0)){p=n}else{l=k+((e+ -4+(0-h)|0)>>>2)+1|0;h=d;d=n;while(1){c[d>>2]=c[h>>2];n=h+4|0;if((n|0)==(e|0)){break}else{d=d+4|0;h=n}}p=o+(l<<2)|0}c[p>>2]=0;p=k+j|0;if((a[g]&1)==0){a[g]=p<<1;i=f;return b|0}else{c[b+4>>2]=p;i=f;return b|0}return 0}function Ol(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;n=i;i=i+176|0;o=n;p=n+16|0;q=n+32|0;r=n+40|0;s=n+56|0;t=n+72|0;u=n+88|0;v=n+104|0;w=n+112|0;x=n+128|0;y=n+144|0;z=n+160|0;if(b){b=c[d>>2]|0;if(!((c[4258]|0)==-1)){c[p>>2]=17032;c[p+4>>2]=113;c[p+8>>2]=0;Pg(17032,p,114)}p=(c[17036>>2]|0)+ -1|0;A=c[b+8>>2]|0;if(!((c[b+12>>2]|0)-A>>2>>>0>p>>>0)){B=bc(4)|0;C=B;Mo(C);gd(B|0,25424,101)}b=c[A+(p<<2)>>2]|0;if((b|0)==0){B=bc(4)|0;C=B;Mo(C);gd(B|0,25424,101)}B=b;rd[c[(c[b>>2]|0)+44>>2]&63](q,B);C=e;p=c[q>>2]|0;a[C]=p;a[C+1|0]=p>>8;a[C+2|0]=p>>16;a[C+3|0]=p>>24;p=b;rd[c[(c[p>>2]|0)+32>>2]&63](r,B);C=l;if((a[C]&1)==0){c[l+4>>2]=0;a[C]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}gh(l,0);q=r;c[C+0>>2]=c[q+0>>2];c[C+4>>2]=c[q+4>>2];c[C+8>>2]=c[q+8>>2];c[q+0>>2]=0;c[q+4>>2]=0;c[q+8>>2]=0;dh(r);rd[c[(c[p>>2]|0)+28>>2]&63](s,B);r=k;if((a[r]&1)==0){c[k+4>>2]=0;a[r]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}gh(k,0);q=s;c[r+0>>2]=c[q+0>>2];c[r+4>>2]=c[q+4>>2];c[r+8>>2]=c[q+8>>2];c[q+0>>2]=0;c[q+4>>2]=0;c[q+8>>2]=0;dh(s);s=b;c[f>>2]=td[c[(c[s>>2]|0)+12>>2]&63](B)|0;c[g>>2]=td[c[(c[s>>2]|0)+16>>2]&63](B)|0;rd[c[(c[b>>2]|0)+20>>2]&63](t,B);b=h;if((a[b]&1)==0){a[h+1|0]=0;a[b]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}Yg(h,0);q=t;c[b+0>>2]=c[q+0>>2];c[b+4>>2]=c[q+4>>2];c[b+8>>2]=c[q+8>>2];c[q+0>>2]=0;c[q+4>>2]=0;c[q+8>>2]=0;Ug(t);rd[c[(c[p>>2]|0)+24>>2]&63](u,B);p=j;if((a[p]&1)==0){c[j+4>>2]=0;a[p]=0}else{c[c[j+8>>2]>>2]=0;c[j+4>>2]=0}gh(j,0);t=u;c[p+0>>2]=c[t+0>>2];c[p+4>>2]=c[t+4>>2];c[p+8>>2]=c[t+8>>2];c[t+0>>2]=0;c[t+4>>2]=0;c[t+8>>2]=0;dh(u);D=td[c[(c[s>>2]|0)+36>>2]&63](B)|0;c[m>>2]=D;i=n;return}else{B=c[d>>2]|0;if(!((c[4242]|0)==-1)){c[o>>2]=16968;c[o+4>>2]=113;c[o+8>>2]=0;Pg(16968,o,114)}o=(c[16972>>2]|0)+ -1|0;d=c[B+8>>2]|0;if(!((c[B+12>>2]|0)-d>>2>>>0>o>>>0)){E=bc(4)|0;F=E;Mo(F);gd(E|0,25424,101)}B=c[d+(o<<2)>>2]|0;if((B|0)==0){E=bc(4)|0;F=E;Mo(F);gd(E|0,25424,101)}E=B;rd[c[(c[B>>2]|0)+44>>2]&63](v,E);F=e;e=c[v>>2]|0;a[F]=e;a[F+1|0]=e>>8;a[F+2|0]=e>>16;a[F+3|0]=e>>24;e=B;rd[c[(c[e>>2]|0)+32>>2]&63](w,E);F=l;if((a[F]&1)==0){c[l+4>>2]=0;a[F]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}gh(l,0);l=w;c[F+0>>2]=c[l+0>>2];c[F+4>>2]=c[l+4>>2];c[F+8>>2]=c[l+8>>2];c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;dh(w);rd[c[(c[e>>2]|0)+28>>2]&63](x,E);w=k;if((a[w]&1)==0){c[k+4>>2]=0;a[w]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}gh(k,0);k=x;c[w+0>>2]=c[k+0>>2];c[w+4>>2]=c[k+4>>2];c[w+8>>2]=c[k+8>>2];c[k+0>>2]=0;c[k+4>>2]=0;c[k+8>>2]=0;dh(x);x=B;c[f>>2]=td[c[(c[x>>2]|0)+12>>2]&63](E)|0;c[g>>2]=td[c[(c[x>>2]|0)+16>>2]&63](E)|0;rd[c[(c[B>>2]|0)+20>>2]&63](y,E);B=h;if((a[B]&1)==0){a[h+1|0]=0;a[B]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}Yg(h,0);h=y;c[B+0>>2]=c[h+0>>2];c[B+4>>2]=c[h+4>>2];c[B+8>>2]=c[h+8>>2];c[h+0>>2]=0;c[h+4>>2]=0;c[h+8>>2]=0;Ug(y);rd[c[(c[e>>2]|0)+24>>2]&63](z,E);e=j;if((a[e]&1)==0){c[j+4>>2]=0;a[e]=0}else{c[c[j+8>>2]>>2]=0;c[j+4>>2]=0}gh(j,0);j=z;c[e+0>>2]=c[j+0>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[j+0>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;dh(z);D=td[c[(c[x>>2]|0)+36>>2]&63](E)|0;c[m>>2]=D;i=n;return}}function Pl(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Ql(a){a=a|0;i=i;return}function Rl(b,d,e,f,g,j,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=j|0;l=+l;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;d=i;i=i+16|0;m=d;n=d+8|0;o=i;i=i+8|0;p=i;i=i+16|0;q=i;i=i+104|0;r=i;i=i+8|0;s=i;i=i+104|0;t=i;i=i+8|0;u=i;i=i+8|0;v=u;w=i;i=i+8|0;x=i;i=i+8|0;y=i;i=i+16|0;z=i;i=i+16|0;A=i;i=i+16|0;B=i;i=i+8|0;C=i;i=i+104|0;D=i;i=i+8|0;E=i;i=i+8|0;F=i;i=i+8|0;G=q;c[r>>2]=G;q=s;s=o;h[k>>3]=l;c[s>>2]=c[k>>2];c[s+4>>2]=c[k+4>>2];s=hc(G|0,100,17216,o|0)|0;do{if(s>>>0>99){do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);o=c[4338]|0;G=n;h[k>>3]=l;c[G>>2]=c[k>>2];c[G+4>>2]=c[k+4>>2];G=Mj(r,o,17216,n)|0;o=c[r>>2]|0;if((o|0)==0){rp()}H=fp(G)|0;if((H|0)!=0){I=o;J=H;K=H;L=G;break}rp()}else{I=0;J=0;K=q;L=s}}while(0);mh(t,g);s=t;q=c[s>>2]|0;if(!((c[4366]|0)==-1)){c[p>>2]=17464;c[p+4>>2]=113;c[p+8>>2]=0;Pg(17464,p,114)}p=(c[17468>>2]|0)+ -1|0;n=c[q+8>>2]|0;if(!((c[q+12>>2]|0)-n>>2>>>0>p>>>0)){M=bc(4)|0;N=M;Mo(N);gd(M|0,25424,101)}q=c[n+(p<<2)>>2]|0;if((q|0)==0){M=bc(4)|0;N=M;Mo(N);gd(M|0,25424,101)}M=q;N=c[r>>2]|0;zd[c[(c[q>>2]|0)+32>>2]&7](M,N,N+L|0,K)|0;if((L|0)==0){O=0}else{O=(a[c[r>>2]|0]|0)==45}c[u>>2]=0;u=y;c[u+0>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;u=z;c[u+0>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;r=A;c[r+0>>2]=0;c[r+4>>2]=0;c[r+8>>2]=0;Sl(f,O,t,v,w,x,y,z,A,B);t=C;C=c[B>>2]|0;if((L|0)>(C|0)){B=a[r]|0;if((B&1)==0){P=(B&255)>>>1}else{P=c[A+4>>2]|0}B=a[u]|0;if((B&1)==0){Q=(B&255)>>>1}else{Q=c[z+4>>2]|0}R=P+(L-C<<1|1)+Q|0}else{Q=a[r]|0;if((Q&1)==0){S=(Q&255)>>>1}else{S=c[A+4>>2]|0}Q=a[u]|0;if((Q&1)==0){T=(Q&255)>>>1}else{T=c[z+4>>2]|0}R=S+2+T|0}T=R+C|0;do{if(T>>>0>100){R=fp(T)|0;if((R|0)!=0){U=R;V=R;break}rp()}else{U=0;V=t}}while(0);Tl(V,D,E,c[g+4>>2]|0,K,K+L|0,M,O,v,a[w]|0,a[x]|0,y,z,A,C);c[F>>2]=c[e>>2];e=c[D>>2]|0;D=c[E>>2]|0;E=m;C=F;c[E+0>>2]=c[C+0>>2];Hj(b,m,V,e,D,g,j);if((U|0)!=0){gp(U)}Ug(A);Ug(z);Ug(y);vg(c[s>>2]|0)|0;if((J|0)!=0){gp(J)}if((I|0)==0){i=d;return}gp(I);i=d;return}function Sl(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;n=i;i=i+40|0;o=n;p=n+16|0;q=n+32|0;r=q;s=i;i=i+16|0;t=i;i=i+8|0;u=t;v=i;i=i+16|0;w=i;i=i+16|0;x=i;i=i+16|0;y=i;i=i+8|0;z=y;A=i;i=i+16|0;B=i;i=i+8|0;C=B;D=i;i=i+16|0;E=i;i=i+16|0;F=i;i=i+16|0;G=c[e>>2]|0;if(b){if(!((c[4226]|0)==-1)){c[p>>2]=16904;c[p+4>>2]=113;c[p+8>>2]=0;Pg(16904,p,114)}p=(c[16908>>2]|0)+ -1|0;b=c[G+8>>2]|0;if(!((c[G+12>>2]|0)-b>>2>>>0>p>>>0)){H=bc(4)|0;I=H;Mo(I);gd(H|0,25424,101)}e=c[b+(p<<2)>>2]|0;if((e|0)==0){H=bc(4)|0;I=H;Mo(I);gd(H|0,25424,101)}H=e;I=c[e>>2]|0;if(d){rd[c[I+44>>2]&63](r,H);r=f;p=c[q>>2]|0;a[r]=p;a[r+1|0]=p>>8;a[r+2|0]=p>>16;a[r+3|0]=p>>24;rd[c[(c[e>>2]|0)+32>>2]&63](s,H);p=l;if((a[p]&1)==0){a[l+1|0]=0;a[p]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}Yg(l,0);r=s;c[p+0>>2]=c[r+0>>2];c[p+4>>2]=c[r+4>>2];c[p+8>>2]=c[r+8>>2];c[r+0>>2]=0;c[r+4>>2]=0;c[r+8>>2]=0;Ug(s)}else{rd[c[I+40>>2]&63](u,H);u=f;I=c[t>>2]|0;a[u]=I;a[u+1|0]=I>>8;a[u+2|0]=I>>16;a[u+3|0]=I>>24;rd[c[(c[e>>2]|0)+28>>2]&63](v,H);I=l;if((a[I]&1)==0){a[l+1|0]=0;a[I]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}Yg(l,0);u=v;c[I+0>>2]=c[u+0>>2];c[I+4>>2]=c[u+4>>2];c[I+8>>2]=c[u+8>>2];c[u+0>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;Ug(v)}v=e;a[g]=td[c[(c[v>>2]|0)+12>>2]&63](H)|0;a[h]=td[c[(c[v>>2]|0)+16>>2]&63](H)|0;v=e;rd[c[(c[v>>2]|0)+20>>2]&63](w,H);u=j;if((a[u]&1)==0){a[j+1|0]=0;a[u]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}Yg(j,0);I=w;c[u+0>>2]=c[I+0>>2];c[u+4>>2]=c[I+4>>2];c[u+8>>2]=c[I+8>>2];c[I+0>>2]=0;c[I+4>>2]=0;c[I+8>>2]=0;Ug(w);rd[c[(c[v>>2]|0)+24>>2]&63](x,H);v=k;if((a[v]&1)==0){a[k+1|0]=0;a[v]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}Yg(k,0);w=x;c[v+0>>2]=c[w+0>>2];c[v+4>>2]=c[w+4>>2];c[v+8>>2]=c[w+8>>2];c[w+0>>2]=0;c[w+4>>2]=0;c[w+8>>2]=0;Ug(x);J=td[c[(c[e>>2]|0)+36>>2]&63](H)|0;c[m>>2]=J;i=n;return}else{if(!((c[4210]|0)==-1)){c[o>>2]=16840;c[o+4>>2]=113;c[o+8>>2]=0;Pg(16840,o,114)}o=(c[16844>>2]|0)+ -1|0;H=c[G+8>>2]|0;if(!((c[G+12>>2]|0)-H>>2>>>0>o>>>0)){K=bc(4)|0;L=K;Mo(L);gd(K|0,25424,101)}G=c[H+(o<<2)>>2]|0;if((G|0)==0){K=bc(4)|0;L=K;Mo(L);gd(K|0,25424,101)}K=G;L=c[G>>2]|0;if(d){rd[c[L+44>>2]&63](z,K);z=f;d=c[y>>2]|0;a[z]=d;a[z+1|0]=d>>8;a[z+2|0]=d>>16;a[z+3|0]=d>>24;rd[c[(c[G>>2]|0)+32>>2]&63](A,K);d=l;if((a[d]&1)==0){a[l+1|0]=0;a[d]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}Yg(l,0);z=A;c[d+0>>2]=c[z+0>>2];c[d+4>>2]=c[z+4>>2];c[d+8>>2]=c[z+8>>2];c[z+0>>2]=0;c[z+4>>2]=0;c[z+8>>2]=0;Ug(A)}else{rd[c[L+40>>2]&63](C,K);C=f;f=c[B>>2]|0;a[C]=f;a[C+1|0]=f>>8;a[C+2|0]=f>>16;a[C+3|0]=f>>24;rd[c[(c[G>>2]|0)+28>>2]&63](D,K);f=l;if((a[f]&1)==0){a[l+1|0]=0;a[f]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}Yg(l,0);l=D;c[f+0>>2]=c[l+0>>2];c[f+4>>2]=c[l+4>>2];c[f+8>>2]=c[l+8>>2];c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;Ug(D)}D=G;a[g]=td[c[(c[D>>2]|0)+12>>2]&63](K)|0;a[h]=td[c[(c[D>>2]|0)+16>>2]&63](K)|0;D=G;rd[c[(c[D>>2]|0)+20>>2]&63](E,K);h=j;if((a[h]&1)==0){a[j+1|0]=0;a[h]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}Yg(j,0);j=E;c[h+0>>2]=c[j+0>>2];c[h+4>>2]=c[j+4>>2];c[h+8>>2]=c[j+8>>2];c[j+0>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;Ug(E);rd[c[(c[D>>2]|0)+24>>2]&63](F,K);D=k;if((a[D]&1)==0){a[k+1|0]=0;a[D]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}Yg(k,0);k=F;c[D+0>>2]=c[k+0>>2];c[D+4>>2]=c[k+4>>2];c[D+8>>2]=c[k+8>>2];c[k+0>>2]=0;c[k+4>>2]=0;c[k+8>>2]=0;Ug(F);J=td[c[(c[G>>2]|0)+36>>2]&63](K)|0;c[m>>2]=J;i=n;return}}function Tl(d,e,f,g,h,j,k,l,m,n,o,p,q,r,s){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;r=r|0;s=s|0;var t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0;t=i;c[f>>2]=d;u=k;v=r;w=r+1|0;x=r+8|0;y=r+4|0;r=q;z=(g&512|0)==0;A=q+1|0;B=q+8|0;C=q+4|0;q=(s|0)>0;D=p;E=p+1|0;F=p+8|0;G=p+4|0;p=k+8|0;H=0-s|0;I=h;h=0;while(1){a:do{switch(a[m+h|0]|0){case 4:{J=c[f>>2]|0;K=l?I+1|0:I;b:do{if(K>>>0<j>>>0){L=K;while(1){M=a[L]|0;if(!(M<<24>>24>-1)){N=L;break b}O=L+1|0;if((b[(c[p>>2]|0)+(M<<24>>24<<1)>>1]&2048)==0){N=L;break b}if(O>>>0<j>>>0){L=O}else{N=O;break}}}else{N=K}}while(0);L=N;if(q){if(N>>>0>K>>>0){O=K+(0-L)|0;L=O>>>0<H>>>0?H:O;O=L+s|0;M=J;P=N;Q=s;while(1){R=P+ -1|0;S=a[R]|0;c[f>>2]=M+1;a[M]=S;S=Q+ -1|0;T=(S|0)>0;if(!(R>>>0>K>>>0&T)){break}M=c[f>>2]|0;Q=S;P=R}P=N+L|0;if(T){U=P;V=O;W=32}else{X=0;Y=P;Z=O}}else{U=N;V=s;W=32}if((W|0)==32){W=0;X=Cd[c[(c[u>>2]|0)+28>>2]&15](k,48)|0;Y=U;Z=V}P=c[f>>2]|0;c[f>>2]=P+1;if((Z|0)>0){Q=P;M=Z;while(1){a[Q]=X;R=M+ -1|0;S=c[f>>2]|0;c[f>>2]=S+1;if((R|0)>0){M=R;Q=S}else{_=S;break}}}else{_=P}a[_]=n;$=Y}else{$=N}if(($|0)==(K|0)){Q=Cd[c[(c[u>>2]|0)+28>>2]&15](k,48)|0;M=c[f>>2]|0;c[f>>2]=M+1;a[M]=Q}else{Q=a[D]|0;M=(Q&1)==0;if(M){aa=(Q&255)>>>1}else{aa=c[G>>2]|0}if((aa|0)==0){ba=$;ca=-1;da=0;ea=0}else{if(M){fa=E}else{fa=c[F>>2]|0}ba=$;ca=a[fa]|0;da=0;ea=0}while(1){do{if((ea|0)==(ca|0)){M=c[f>>2]|0;c[f>>2]=M+1;a[M]=o;M=da+1|0;Q=a[D]|0;O=(Q&1)==0;if(O){ga=(Q&255)>>>1}else{ga=c[G>>2]|0}if(!(M>>>0<ga>>>0)){ha=ca;ia=M;ja=0;break}if(O){ka=E}else{ka=c[F>>2]|0}if((a[ka+M|0]|0)==127){ha=-1;ia=M;ja=0;break}if(O){la=E}else{la=c[F>>2]|0}ha=a[la+M|0]|0;ia=M;ja=0}else{ha=ca;ia=da;ja=ea}}while(0);M=ba+ -1|0;O=a[M]|0;Q=c[f>>2]|0;c[f>>2]=Q+1;a[Q]=O;if((M|0)==(K|0)){break}else{ba=M;ca=ha;da=ia;ea=ja+1|0}}}P=c[f>>2]|0;if((J|0)==(P|0)){ma=K;break a}M=P+ -1|0;if(M>>>0>J>>>0){na=J;oa=M}else{ma=K;break a}while(1){M=a[na]|0;a[na]=a[oa]|0;a[oa]=M;M=na+1|0;P=oa+ -1|0;if(M>>>0<P>>>0){oa=P;na=M}else{ma=K;break}}break};case 3:{K=a[v]|0;J=(K&1)==0;if(J){pa=(K&255)>>>1}else{pa=c[y>>2]|0}if((pa|0)==0){ma=I;break a}if(J){qa=w}else{qa=c[x>>2]|0}J=a[qa]|0;K=c[f>>2]|0;c[f>>2]=K+1;a[K]=J;ma=I;break};case 0:{c[e>>2]=c[f>>2];ma=I;break};case 1:{c[e>>2]=c[f>>2];J=Cd[c[(c[u>>2]|0)+28>>2]&15](k,32)|0;K=c[f>>2]|0;c[f>>2]=K+1;a[K]=J;ma=I;break};case 2:{J=a[r]|0;K=(J&1)==0;if(K){ra=(J&255)>>>1}else{ra=c[C>>2]|0}if((ra|0)==0|z){ma=I;break a}if(K){sa=A;ta=(J&255)>>>1}else{sa=c[B>>2]|0;ta=c[C>>2]|0}J=sa+ta|0;K=c[f>>2]|0;if((sa|0)==(J|0)){ua=K}else{M=K;K=sa;while(1){a[M]=a[K]|0;P=K+1|0;O=M+1|0;if((P|0)==(J|0)){ua=O;break}else{K=P;M=O}}}c[f>>2]=ua;ma=I;break};default:{ma=I}}}while(0);M=h+1|0;if((M|0)==4){break}else{I=ma;h=M}}h=a[v]|0;v=(h&1)==0;if(v){va=(h&255)>>>1}else{va=c[y>>2]|0}if(va>>>0>1){if(v){wa=w;xa=(h&255)>>>1}else{wa=c[x>>2]|0;xa=c[y>>2]|0}y=wa+1|0;x=wa+xa|0;xa=c[f>>2]|0;if((y|0)==(x|0)){ya=xa}else{wa=xa;xa=y;while(1){a[wa]=a[xa]|0;y=xa+1|0;h=wa+1|0;if((y|0)==(x|0)){ya=h;break}else{xa=y;wa=h}}}c[f>>2]=ya}ya=g&176;if((ya|0)==32){c[e>>2]=c[f>>2];i=t;return}else if((ya|0)==16){i=t;return}else{c[e>>2]=d;i=t;return}}function Ul(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;d=i;i=i+40|0;k=d;l=d+8|0;m=d+24|0;n=d+32|0;o=n;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+16|0;s=i;i=i+16|0;t=i;i=i+16|0;u=i;i=i+8|0;v=i;i=i+104|0;w=i;i=i+8|0;x=i;i=i+8|0;y=i;i=i+8|0;mh(m,g);z=m;A=c[z>>2]|0;if(!((c[4366]|0)==-1)){c[l>>2]=17464;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17464,l,114)}l=(c[17468>>2]|0)+ -1|0;B=c[A+8>>2]|0;if(!((c[A+12>>2]|0)-B>>2>>>0>l>>>0)){C=bc(4)|0;D=C;Mo(D);gd(C|0,25424,101)}A=c[B+(l<<2)>>2]|0;if((A|0)==0){C=bc(4)|0;D=C;Mo(D);gd(C|0,25424,101)}C=A;D=j;l=a[D]|0;B=(l&1)==0;if(B){E=(l&255)>>>1}else{E=c[j+4>>2]|0}if((E|0)==0){F=0}else{if(B){G=j+1|0}else{G=c[j+8>>2]|0}B=a[G]|0;F=B<<24>>24==(Cd[c[(c[A>>2]|0)+28>>2]&15](C,45)|0)<<24>>24}c[n>>2]=0;n=r;c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;n=s;c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;A=t;c[A+0>>2]=0;c[A+4>>2]=0;c[A+8>>2]=0;Sl(f,F,m,o,p,q,r,s,t,u);m=v;v=a[D]|0;D=(v&1)==0;if(D){H=(v&255)>>>1}else{H=c[j+4>>2]|0}f=c[u>>2]|0;if((H|0)>(f|0)){if(D){I=(v&255)>>>1}else{I=c[j+4>>2]|0}D=a[A]|0;if((D&1)==0){J=(D&255)>>>1}else{J=c[t+4>>2]|0}D=a[n]|0;if((D&1)==0){K=(D&255)>>>1}else{K=c[s+4>>2]|0}L=J+(I-f<<1|1)+K|0}else{K=a[A]|0;if((K&1)==0){M=(K&255)>>>1}else{M=c[t+4>>2]|0}K=a[n]|0;if((K&1)==0){N=(K&255)>>>1}else{N=c[s+4>>2]|0}L=M+2+N|0}N=L+f|0;do{if(N>>>0>100){L=fp(N)|0;if((L|0)!=0){O=L;P=L;break}rp()}else{O=0;P=m}}while(0);if((v&1)==0){Q=j+1|0;R=(v&255)>>>1}else{Q=c[j+8>>2]|0;R=c[j+4>>2]|0}Tl(P,w,x,c[g+4>>2]|0,Q,Q+R|0,C,F,o,a[p]|0,a[q]|0,r,s,t,f);c[y>>2]=c[e>>2];e=c[w>>2]|0;w=c[x>>2]|0;x=k;f=y;c[x+0>>2]=c[f+0>>2];Hj(b,k,P,e,w,g,h);if((O|0)==0){Ug(t);Ug(s);Ug(r);S=c[z>>2]|0;T=S;vg(T)|0;i=d;return}gp(O);Ug(t);Ug(s);Ug(r);S=c[z>>2]|0;T=S;vg(T)|0;i=d;return}function Vl(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Wl(a){a=a|0;i=i;return}function Xl(b,d,e,f,g,j,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=j|0;l=+l;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0;d=i;i=i+16|0;m=d;n=d+8|0;o=i;i=i+8|0;p=i;i=i+16|0;q=i;i=i+104|0;r=i;i=i+8|0;s=i;i=i+400|0;t=i;i=i+8|0;u=i;i=i+8|0;v=u;w=i;i=i+8|0;x=i;i=i+8|0;y=i;i=i+16|0;z=i;i=i+16|0;A=i;i=i+16|0;B=i;i=i+8|0;C=i;i=i+400|0;D=i;i=i+8|0;E=i;i=i+8|0;F=i;i=i+8|0;G=q;c[r>>2]=G;q=s;s=o;h[k>>3]=l;c[s>>2]=c[k>>2];c[s+4>>2]=c[k+4>>2];s=hc(G|0,100,17216,o|0)|0;do{if(s>>>0>99){do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);o=c[4338]|0;G=n;h[k>>3]=l;c[G>>2]=c[k>>2];c[G+4>>2]=c[k+4>>2];G=Mj(r,o,17216,n)|0;o=c[r>>2]|0;if((o|0)==0){rp()}H=fp(G<<2)|0;I=H;if((H|0)!=0){J=o;K=I;L=I;M=G;break}rp()}else{J=0;K=0;L=q;M=s}}while(0);mh(t,g);s=t;q=c[s>>2]|0;if(!((c[4364]|0)==-1)){c[p>>2]=17456;c[p+4>>2]=113;c[p+8>>2]=0;Pg(17456,p,114)}p=(c[17460>>2]|0)+ -1|0;n=c[q+8>>2]|0;if(!((c[q+12>>2]|0)-n>>2>>>0>p>>>0)){N=bc(4)|0;O=N;Mo(O);gd(N|0,25424,101)}q=c[n+(p<<2)>>2]|0;if((q|0)==0){N=bc(4)|0;O=N;Mo(O);gd(N|0,25424,101)}N=q;O=c[r>>2]|0;zd[c[(c[q>>2]|0)+48>>2]&7](N,O,O+M|0,L)|0;if((M|0)==0){P=0}else{P=(a[c[r>>2]|0]|0)==45}c[u>>2]=0;u=y;c[u+0>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;u=z;c[u+0>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;r=A;c[r+0>>2]=0;c[r+4>>2]=0;c[r+8>>2]=0;Yl(f,P,t,v,w,x,y,z,A,B);t=C;C=c[B>>2]|0;if((M|0)>(C|0)){B=a[r]|0;if((B&1)==0){Q=(B&255)>>>1}else{Q=c[A+4>>2]|0}B=a[u]|0;if((B&1)==0){R=(B&255)>>>1}else{R=c[z+4>>2]|0}S=Q+(M-C<<1|1)+R|0}else{R=a[r]|0;if((R&1)==0){T=(R&255)>>>1}else{T=c[A+4>>2]|0}R=a[u]|0;if((R&1)==0){U=(R&255)>>>1}else{U=c[z+4>>2]|0}S=T+2+U|0}U=S+C|0;do{if(U>>>0>100){S=fp(U<<2)|0;T=S;if((S|0)!=0){V=T;W=T;break}rp()}else{V=0;W=t}}while(0);Zl(W,D,E,c[g+4>>2]|0,L,L+(M<<2)|0,N,P,v,c[w>>2]|0,c[x>>2]|0,y,z,A,C);c[F>>2]=c[e>>2];e=c[D>>2]|0;D=c[E>>2]|0;E=m;C=F;c[E+0>>2]=c[C+0>>2];Vj(b,m,W,e,D,g,j);if((V|0)!=0){gp(V)}dh(A);dh(z);Ug(y);vg(c[s>>2]|0)|0;if((K|0)!=0){gp(K)}if((J|0)==0){i=d;return}gp(J);i=d;return}function Yl(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;n=i;i=i+40|0;o=n;p=n+16|0;q=n+32|0;r=q;s=i;i=i+16|0;t=i;i=i+8|0;u=t;v=i;i=i+16|0;w=i;i=i+16|0;x=i;i=i+16|0;y=i;i=i+8|0;z=y;A=i;i=i+16|0;B=i;i=i+8|0;C=B;D=i;i=i+16|0;E=i;i=i+16|0;F=i;i=i+16|0;G=c[e>>2]|0;if(b){if(!((c[4258]|0)==-1)){c[p>>2]=17032;c[p+4>>2]=113;c[p+8>>2]=0;Pg(17032,p,114)}p=(c[17036>>2]|0)+ -1|0;b=c[G+8>>2]|0;if(!((c[G+12>>2]|0)-b>>2>>>0>p>>>0)){H=bc(4)|0;I=H;Mo(I);gd(H|0,25424,101)}e=c[b+(p<<2)>>2]|0;if((e|0)==0){H=bc(4)|0;I=H;Mo(I);gd(H|0,25424,101)}H=e;I=c[e>>2]|0;if(d){rd[c[I+44>>2]&63](r,H);r=f;p=c[q>>2]|0;a[r]=p;a[r+1|0]=p>>8;a[r+2|0]=p>>16;a[r+3|0]=p>>24;rd[c[(c[e>>2]|0)+32>>2]&63](s,H);p=l;if((a[p]&1)==0){c[l+4>>2]=0;a[p]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}gh(l,0);r=s;c[p+0>>2]=c[r+0>>2];c[p+4>>2]=c[r+4>>2];c[p+8>>2]=c[r+8>>2];c[r+0>>2]=0;c[r+4>>2]=0;c[r+8>>2]=0;dh(s)}else{rd[c[I+40>>2]&63](u,H);u=f;I=c[t>>2]|0;a[u]=I;a[u+1|0]=I>>8;a[u+2|0]=I>>16;a[u+3|0]=I>>24;rd[c[(c[e>>2]|0)+28>>2]&63](v,H);I=l;if((a[I]&1)==0){c[l+4>>2]=0;a[I]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}gh(l,0);u=v;c[I+0>>2]=c[u+0>>2];c[I+4>>2]=c[u+4>>2];c[I+8>>2]=c[u+8>>2];c[u+0>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;dh(v)}v=e;c[g>>2]=td[c[(c[v>>2]|0)+12>>2]&63](H)|0;c[h>>2]=td[c[(c[v>>2]|0)+16>>2]&63](H)|0;rd[c[(c[e>>2]|0)+20>>2]&63](w,H);u=j;if((a[u]&1)==0){a[j+1|0]=0;a[u]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}Yg(j,0);I=w;c[u+0>>2]=c[I+0>>2];c[u+4>>2]=c[I+4>>2];c[u+8>>2]=c[I+8>>2];c[I+0>>2]=0;c[I+4>>2]=0;c[I+8>>2]=0;Ug(w);rd[c[(c[e>>2]|0)+24>>2]&63](x,H);e=k;if((a[e]&1)==0){c[k+4>>2]=0;a[e]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}gh(k,0);w=x;c[e+0>>2]=c[w+0>>2];c[e+4>>2]=c[w+4>>2];c[e+8>>2]=c[w+8>>2];c[w+0>>2]=0;c[w+4>>2]=0;c[w+8>>2]=0;dh(x);J=td[c[(c[v>>2]|0)+36>>2]&63](H)|0;c[m>>2]=J;i=n;return}else{if(!((c[4242]|0)==-1)){c[o>>2]=16968;c[o+4>>2]=113;c[o+8>>2]=0;Pg(16968,o,114)}o=(c[16972>>2]|0)+ -1|0;H=c[G+8>>2]|0;if(!((c[G+12>>2]|0)-H>>2>>>0>o>>>0)){K=bc(4)|0;L=K;Mo(L);gd(K|0,25424,101)}G=c[H+(o<<2)>>2]|0;if((G|0)==0){K=bc(4)|0;L=K;Mo(L);gd(K|0,25424,101)}K=G;L=c[G>>2]|0;if(d){rd[c[L+44>>2]&63](z,K);z=f;d=c[y>>2]|0;a[z]=d;a[z+1|0]=d>>8;a[z+2|0]=d>>16;a[z+3|0]=d>>24;rd[c[(c[G>>2]|0)+32>>2]&63](A,K);d=l;if((a[d]&1)==0){c[l+4>>2]=0;a[d]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}gh(l,0);z=A;c[d+0>>2]=c[z+0>>2];c[d+4>>2]=c[z+4>>2];c[d+8>>2]=c[z+8>>2];c[z+0>>2]=0;c[z+4>>2]=0;c[z+8>>2]=0;dh(A)}else{rd[c[L+40>>2]&63](C,K);C=f;f=c[B>>2]|0;a[C]=f;a[C+1|0]=f>>8;a[C+2|0]=f>>16;a[C+3|0]=f>>24;rd[c[(c[G>>2]|0)+28>>2]&63](D,K);f=l;if((a[f]&1)==0){c[l+4>>2]=0;a[f]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}gh(l,0);l=D;c[f+0>>2]=c[l+0>>2];c[f+4>>2]=c[l+4>>2];c[f+8>>2]=c[l+8>>2];c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;dh(D)}D=G;c[g>>2]=td[c[(c[D>>2]|0)+12>>2]&63](K)|0;c[h>>2]=td[c[(c[D>>2]|0)+16>>2]&63](K)|0;rd[c[(c[G>>2]|0)+20>>2]&63](E,K);h=j;if((a[h]&1)==0){a[j+1|0]=0;a[h]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}Yg(j,0);j=E;c[h+0>>2]=c[j+0>>2];c[h+4>>2]=c[j+4>>2];c[h+8>>2]=c[j+8>>2];c[j+0>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;Ug(E);rd[c[(c[G>>2]|0)+24>>2]&63](F,K);G=k;if((a[G]&1)==0){c[k+4>>2]=0;a[G]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}gh(k,0);k=F;c[G+0>>2]=c[k+0>>2];c[G+4>>2]=c[k+4>>2];c[G+8>>2]=c[k+8>>2];c[k+0>>2]=0;c[k+4>>2]=0;c[k+8>>2]=0;dh(F);J=td[c[(c[D>>2]|0)+36>>2]&63](K)|0;c[m>>2]=J;i=n;return}}function Zl(b,d,e,f,g,h,j,k,l,m,n,o,p,q,r){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;r=r|0;var s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0;s=i;c[e>>2]=b;t=j;u=q;v=q+4|0;w=q+8|0;q=p;x=(f&512|0)==0;y=p+4|0;z=p+8|0;p=(r|0)>0;A=o;B=o+1|0;C=o+8|0;D=o+4|0;o=j;E=g;g=0;while(1){a:do{switch(a[l+g|0]|0){case 2:{F=a[q]|0;G=(F&1)==0;if(G){H=(F&255)>>>1}else{H=c[y>>2]|0}if((H|0)==0|x){I=E;break a}if(G){J=y;K=(F&255)>>>1}else{J=c[z>>2]|0;K=c[y>>2]|0}F=J+(K<<2)|0;G=c[e>>2]|0;if((J|0)==(F|0)){L=G}else{M=(J+(K+ -1<<2)+(0-J)|0)>>>2;N=G;O=J;while(1){c[N>>2]=c[O>>2];P=O+4|0;if((P|0)==(F|0)){break}N=N+4|0;O=P}L=G+(M+1<<2)|0}c[e>>2]=L;I=E;break};case 1:{c[d>>2]=c[e>>2];O=Cd[c[(c[t>>2]|0)+44>>2]&15](j,32)|0;N=c[e>>2]|0;c[e>>2]=N+4;c[N>>2]=O;I=E;break};case 3:{O=a[u]|0;N=(O&1)==0;if(N){Q=(O&255)>>>1}else{Q=c[v>>2]|0}if((Q|0)==0){I=E;break a}if(N){R=v}else{R=c[w>>2]|0}N=c[R>>2]|0;O=c[e>>2]|0;c[e>>2]=O+4;c[O>>2]=N;I=E;break};case 4:{N=c[e>>2]|0;O=k?E+4|0:E;b:do{if(O>>>0<h>>>0){F=O;while(1){P=F+4|0;if(!(nd[c[(c[o>>2]|0)+12>>2]&31](j,2048,c[F>>2]|0)|0)){S=F;break b}if(P>>>0<h>>>0){F=P}else{S=P;break}}}else{S=O}}while(0);if(p){do{if(S>>>0>O>>>0){M=c[e>>2]|0;G=S;F=r;while(1){T=G+ -4|0;U=M+4|0;c[M>>2]=c[T>>2];V=F+ -1|0;W=(V|0)>0;if(T>>>0>O>>>0&W){F=V;G=T;M=U}else{break}}c[e>>2]=U;if(W){X=T;Y=V;Z=34;break}M=c[e>>2]|0;c[e>>2]=M+4;_=M;$=T}else{X=S;Y=r;Z=34}}while(0);do{if((Z|0)==34){Z=0;M=Cd[c[(c[t>>2]|0)+44>>2]&15](j,48)|0;G=c[e>>2]|0;F=G+4|0;c[e>>2]=F;if((Y|0)>0){aa=F;ba=G;ca=Y}else{_=G;$=X;break}while(1){c[ba>>2]=M;F=ca+ -1|0;if((F|0)>0){ca=F;ba=aa;aa=aa+4|0}else{break}}c[e>>2]=G+(Y+1<<2);_=G+(Y<<2)|0;$=X}}while(0);c[_>>2]=m;da=$}else{da=S}if((da|0)==(O|0)){M=Cd[c[(c[t>>2]|0)+44>>2]&15](j,48)|0;F=c[e>>2]|0;P=F+4|0;c[e>>2]=P;c[F>>2]=M;ea=P}else{P=a[A]|0;M=(P&1)==0;if(M){fa=(P&255)>>>1}else{fa=c[D>>2]|0}if((fa|0)==0){ga=da;ha=-1;ia=0;ja=0}else{if(M){ka=B}else{ka=c[C>>2]|0}ga=da;ha=a[ka]|0;ia=0;ja=0}while(1){M=c[e>>2]|0;do{if((ja|0)==(ha|0)){P=M+4|0;c[e>>2]=P;c[M>>2]=n;F=ia+1|0;la=a[A]|0;ma=(la&1)==0;if(ma){na=(la&255)>>>1}else{na=c[D>>2]|0}if(!(F>>>0<na>>>0)){oa=P;pa=ha;qa=F;ra=0;break}if(ma){sa=B}else{sa=c[C>>2]|0}if((a[sa+F|0]|0)==127){oa=P;pa=-1;qa=F;ra=0;break}if(ma){ta=B}else{ta=c[C>>2]|0}oa=P;pa=a[ta+F|0]|0;qa=F;ra=0}else{oa=M;pa=ha;qa=ia;ra=ja}}while(0);M=ga+ -4|0;G=c[M>>2]|0;F=oa+4|0;c[e>>2]=F;c[oa>>2]=G;if((M|0)==(O|0)){ea=F;break}else{ga=M;ha=pa;ia=qa;ja=ra+1|0}}}if((N|0)==(ea|0)){I=O;break a}M=ea+ -4|0;if(M>>>0>N>>>0){ua=N;va=M}else{I=O;break a}while(1){M=c[ua>>2]|0;c[ua>>2]=c[va>>2];c[va>>2]=M;M=ua+4|0;F=va+ -4|0;if(M>>>0<F>>>0){va=F;ua=M}else{I=O;break}}break};case 0:{c[d>>2]=c[e>>2];I=E;break};default:{I=E}}}while(0);O=g+1|0;if((O|0)==4){break}else{E=I;g=O}}g=a[u]|0;u=(g&1)==0;if(u){wa=(g&255)>>>1}else{wa=c[v>>2]|0}if(wa>>>0>1){if(u){xa=v;ya=(g&255)>>>1}else{xa=c[w>>2]|0;ya=c[v>>2]|0}v=xa+4|0;w=xa+(ya<<2)|0;g=c[e>>2]|0;if((v|0)==(w|0)){za=g}else{u=(xa+(ya+ -1<<2)+(0-v)|0)>>>2;ya=g;xa=v;while(1){c[ya>>2]=c[xa>>2];v=xa+4|0;if((v|0)==(w|0)){break}else{xa=v;ya=ya+4|0}}za=g+(u+1<<2)|0}c[e>>2]=za}za=f&176;if((za|0)==32){c[d>>2]=c[e>>2];i=s;return}else if((za|0)==16){i=s;return}else{c[d>>2]=b;i=s;return}}function _l(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;d=i;i=i+40|0;k=d;l=d+8|0;m=d+24|0;n=d+32|0;o=n;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+16|0;s=i;i=i+16|0;t=i;i=i+16|0;u=i;i=i+8|0;v=i;i=i+400|0;w=i;i=i+8|0;x=i;i=i+8|0;y=i;i=i+8|0;mh(m,g);z=m;A=c[z>>2]|0;if(!((c[4364]|0)==-1)){c[l>>2]=17456;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17456,l,114)}l=(c[17460>>2]|0)+ -1|0;B=c[A+8>>2]|0;if(!((c[A+12>>2]|0)-B>>2>>>0>l>>>0)){C=bc(4)|0;D=C;Mo(D);gd(C|0,25424,101)}A=c[B+(l<<2)>>2]|0;if((A|0)==0){C=bc(4)|0;D=C;Mo(D);gd(C|0,25424,101)}C=A;D=j;l=a[D]|0;B=(l&1)==0;if(B){E=(l&255)>>>1}else{E=c[j+4>>2]|0}if((E|0)==0){F=0}else{if(B){G=j+4|0}else{G=c[j+8>>2]|0}B=c[G>>2]|0;F=(B|0)==(Cd[c[(c[A>>2]|0)+44>>2]&15](C,45)|0)}c[n>>2]=0;n=r;c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;n=s;c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;A=t;c[A+0>>2]=0;c[A+4>>2]=0;c[A+8>>2]=0;Yl(f,F,m,o,p,q,r,s,t,u);m=v;v=a[D]|0;D=(v&1)==0;if(D){H=(v&255)>>>1}else{H=c[j+4>>2]|0}f=c[u>>2]|0;if((H|0)>(f|0)){if(D){I=(v&255)>>>1}else{I=c[j+4>>2]|0}D=a[A]|0;if((D&1)==0){J=(D&255)>>>1}else{J=c[t+4>>2]|0}D=a[n]|0;if((D&1)==0){K=(D&255)>>>1}else{K=c[s+4>>2]|0}L=J+(I-f<<1|1)+K|0}else{K=a[A]|0;if((K&1)==0){M=(K&255)>>>1}else{M=c[t+4>>2]|0}K=a[n]|0;if((K&1)==0){N=(K&255)>>>1}else{N=c[s+4>>2]|0}L=M+2+N|0}N=L+f|0;do{if(N>>>0>100){L=fp(N<<2)|0;M=L;if((L|0)!=0){O=M;P=M;break}rp()}else{O=0;P=m}}while(0);if((v&1)==0){Q=j+4|0;R=(v&255)>>>1}else{Q=c[j+8>>2]|0;R=c[j+4>>2]|0}Zl(P,w,x,c[g+4>>2]|0,Q,Q+(R<<2)|0,C,F,o,c[p>>2]|0,c[q>>2]|0,r,s,t,f);c[y>>2]=c[e>>2];e=c[w>>2]|0;w=c[x>>2]|0;x=k;f=y;c[x+0>>2]=c[f+0>>2];Vj(b,k,P,e,w,g,h);if((O|0)==0){dh(t);dh(s);Ug(r);S=c[z>>2]|0;T=S;vg(T)|0;i=d;return}gp(O);dh(t);dh(s);Ug(r);S=c[z>>2]|0;T=S;vg(T)|0;i=d;return}function $l(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function am(a){a=a|0;i=i;return}function bm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;e=i;if((a[d]&1)==0){f=d+1|0}else{f=c[d+8>>2]|0}d=Wb(f|0,1)|0;i=e;return d>>>((d|0)!=(-1|0)|0)|0}function cm(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;d=i;i=i+16|0;j=d;k=j;c[k+0>>2]=0;c[k+4>>2]=0;c[k+8>>2]=0;l=a[h]|0;if((l&1)==0){m=h+1|0;n=h+1|0;o=(l&255)>>>1}else{l=c[h+8>>2]|0;m=l;n=l;o=c[h+4>>2]|0}h=m+o|0;do{if(n>>>0<h>>>0){o=n;do{Zg(j,a[o]|0);o=o+1|0;}while((o|0)!=(h|0));o=(e|0)==-1?-1:e<<1;if((a[k]&1)==0){p=o;q=9;break}r=o;s=c[j+8>>2]|0}else{p=(e|0)==-1?-1:e<<1;q=9}}while(0);if((q|0)==9){r=p;s=j+1|0}p=Mc(r|0,f|0,g|0,s|0)|0;s=b;c[s+0>>2]=0;c[s+4>>2]=0;c[s+8>>2]=0;s=Ep(p|0)|0;g=p+s|0;if((s|0)>0){t=p}else{Ug(j);i=d;return}do{Zg(b,a[t]|0);t=t+1|0;}while((t|0)!=(g|0));Ug(j);i=d;return}function dm(a,b){a=a|0;b=b|0;a=i;kb(((b|0)==-1?-1:b<<1)|0)|0;i=a;return}function em(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function fm(a){a=a|0;i=i;return}function gm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;e=i;if((a[d]&1)==0){f=d+1|0}else{f=c[d+8>>2]|0}d=Wb(f|0,1)|0;i=e;return d>>>((d|0)!=(-1|0)|0)|0}function hm(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;d=i;i=i+240|0;j=d;k=d+8|0;l=d+40|0;m=d+48|0;n=d+56|0;o=d+64|0;p=d+192|0;q=d+200|0;r=d+208|0;s=d+224|0;t=d+232|0;u=r;c[u+0>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;c[s+4>>2]=0;c[s>>2]=19120;v=a[h]|0;if((v&1)==0){w=h+4|0;x=h+4|0;y=(v&255)>>>1}else{v=c[h+8>>2]|0;w=v;x=v;y=c[h+4>>2]|0}h=w+(y<<2)|0;y=k;w=j;v=j;c[v>>2]=0;c[v+4>>2]=0;a:do{if(x>>>0<h>>>0){v=s;j=s;z=k+32|0;A=x;B=19120|0;while(1){c[m>>2]=A;C=(yd[c[B+12>>2]&15](v,w,A,h,m,y,z,l)|0)==2;D=c[m>>2]|0;if(C|(D|0)==(A|0)){break}if(y>>>0<(c[l>>2]|0)>>>0){C=y;do{Zg(r,a[C]|0);C=C+1|0;}while(C>>>0<(c[l>>2]|0)>>>0);E=c[m>>2]|0}else{E=D}if(!(E>>>0<h>>>0)){break a}A=E;B=c[j>>2]|0}Dl(18344)}}while(0);if((a[u]&1)==0){F=r+1|0}else{F=c[r+8>>2]|0}u=Mc(((e|0)==-1?-1:e<<1)|0,f|0,g|0,F|0)|0;F=b;c[F+0>>2]=0;c[F+4>>2]=0;c[F+8>>2]=0;c[t+4>>2]=0;c[t>>2]=19224;F=Ep(u|0)|0;g=u+F|0;f=n;e=n;c[e>>2]=0;c[e+4>>2]=0;if((F|0)<=0){Ug(r);i=d;return}F=t;e=t;t=g;n=o;E=o+128|0;o=u;u=19224|0;while(1){c[q>>2]=o;h=(yd[c[u+16>>2]&15](F,f,o,(t-o|0)>32?o+32|0:g,q,n,E,p)|0)==2;m=c[q>>2]|0;if(h|(m|0)==(o|0)){G=20;break}if(n>>>0<(c[p>>2]|0)>>>0){h=n;do{hh(b,c[h>>2]|0);h=h+4|0;}while(h>>>0<(c[p>>2]|0)>>>0);H=c[q>>2]|0}else{H=m}if(!(H>>>0<g>>>0)){G=25;break}o=H;u=c[e>>2]|0}if((G|0)==20){Dl(18344)}else if((G|0)==25){Ug(r);i=d;return}}function im(a,b){a=a|0;b=b|0;a=i;kb(((b|0)==-1?-1:b<<1)|0)|0;i=a;return}function jm(b){b=b|0;var d=0,e=0;d=i;c[b>>2]=17552;e=b+8|0;b=c[e>>2]|0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);if((b|0)==(c[4338]|0)){i=d;return}Hb(c[e>>2]|0);i=d;return}function km(a){a=a|0;a=bc(8)|0;wg(a,17344);c[a>>2]=14392;gd(a|0,14432,9)}function lm(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;e=i;i=i+448|0;f=e;g=e+16|0;h=e+32|0;j=e+48|0;k=e+64|0;l=e+80|0;m=e+96|0;n=e+112|0;o=e+128|0;p=e+144|0;q=e+160|0;r=e+176|0;s=e+192|0;t=e+208|0;u=e+224|0;v=e+240|0;w=e+256|0;x=e+272|0;y=e+288|0;z=e+304|0;A=e+320|0;B=e+336|0;C=e+352|0;D=e+368|0;E=e+384|0;F=e+400|0;G=e+416|0;H=e+432|0;c[b+4>>2]=d+ -1;c[b>>2]=17384;d=b+8|0;I=b+12|0;J=b+136|0;a[J]=1;K=b+24|0;c[I>>2]=K;c[d>>2]=K;c[b+16>>2]=J;J=28;L=K;do{if((L|0)==0){M=0}else{c[L>>2]=0;M=c[I>>2]|0}L=M+4|0;c[I>>2]=L;J=J+ -1|0;}while((J|0)!=0);Sg(b+144|0,17368,1);J=c[d>>2]|0;d=c[I>>2]|0;if((d|0)!=(J|0)){c[I>>2]=d+(~((d+ -4+(0-J)|0)>>>2)<<2)}c[22276>>2]=0;c[5568]=15864;if(!((c[3972]|0)==-1)){c[G>>2]=15888;c[G+4>>2]=113;c[G+8>>2]=0;Pg(15888,G,114)}mm(b,22272,(c[15892>>2]|0)+ -1|0);c[22268>>2]=0;c[5566]=15904;if(!((c[3982]|0)==-1)){c[F>>2]=15928;c[F+4>>2]=113;c[F+8>>2]=0;Pg(15928,F,114)}mm(b,22264,(c[15932>>2]|0)+ -1|0);c[22252>>2]=0;c[5562]=17480;c[22256>>2]=0;a[22260|0]=0;c[22256>>2]=c[(Zb()|0)>>2];if(!((c[4366]|0)==-1)){c[E>>2]=17464;c[E+4>>2]=113;c[E+8>>2]=0;Pg(17464,E,114)}mm(b,22248,(c[17468>>2]|0)+ -1|0);c[22244>>2]=0;c[5560]=18440;if(!((c[4364]|0)==-1)){c[D>>2]=17456;c[D+4>>2]=113;c[D+8>>2]=0;Pg(17456,D,114)}mm(b,22240,(c[17460>>2]|0)+ -1|0);c[22236>>2]=0;c[5558]=18656;if(!((c[4382]|0)==-1)){c[C>>2]=17528;c[C+4>>2]=113;c[C+8>>2]=0;Pg(17528,C,114)}mm(b,22232,(c[17532>>2]|0)+ -1|0);c[22220>>2]=0;c[5554]=17552;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);c[22224>>2]=c[4338];if(!((c[4384]|0)==-1)){c[B>>2]=17536;c[B+4>>2]=113;c[B+8>>2]=0;Pg(17536,B,114)}mm(b,22216,(c[17540>>2]|0)+ -1|0);c[22212>>2]=0;c[5552]=18880;if(!((c[4398]|0)==-1)){c[A>>2]=17592;c[A+4>>2]=113;c[A+8>>2]=0;Pg(17592,A,114)}mm(b,22208,(c[17596>>2]|0)+ -1|0);c[22204>>2]=0;c[5550]=19e3;if(!((c[4400]|0)==-1)){c[z>>2]=17600;c[z+4>>2]=113;c[z+8>>2]=0;Pg(17600,z,114)}mm(b,22200,(c[17604>>2]|0)+ -1|0);c[22180>>2]=0;c[5544]=17632;a[22184|0]=46;a[22185|0]=44;c[22188>>2]=0;c[22192>>2]=0;c[22196>>2]=0;if(!((c[4402]|0)==-1)){c[y>>2]=17608;c[y+4>>2]=113;c[y+8>>2]=0;Pg(17608,y,114)}mm(b,22176,(c[17612>>2]|0)+ -1|0);c[22148>>2]=0;c[5536]=17672;c[22152>>2]=46;c[22156>>2]=44;c[22160>>2]=0;c[22164>>2]=0;c[22168>>2]=0;if(!((c[4404]|0)==-1)){c[x>>2]=17616;c[x+4>>2]=113;c[x+8>>2]=0;Pg(17616,x,114)}mm(b,22144,(c[17620>>2]|0)+ -1|0);c[22140>>2]=0;c[5534]=15944;if(!((c[4e3]|0)==-1)){c[w>>2]=16e3;c[w+4>>2]=113;c[w+8>>2]=0;Pg(16e3,w,114)}mm(b,22136,(c[16004>>2]|0)+ -1|0);c[22132>>2]=0;c[5532]=16064;if(!((c[4030]|0)==-1)){c[v>>2]=16120;c[v+4>>2]=113;c[v+8>>2]=0;Pg(16120,v,114)}mm(b,22128,(c[16124>>2]|0)+ -1|0);c[22124>>2]=0;c[5530]=16136;if(!((c[4046]|0)==-1)){c[u>>2]=16184;c[u+4>>2]=113;c[u+8>>2]=0;Pg(16184,u,114)}mm(b,22120,(c[16188>>2]|0)+ -1|0);c[22116>>2]=0;c[5528]=16200;if(!((c[4062]|0)==-1)){c[t>>2]=16248;c[t+4>>2]=113;c[t+8>>2]=0;Pg(16248,t,114)}mm(b,22112,(c[16252>>2]|0)+ -1|0);c[22108>>2]=0;c[5526]=16792;if(!((c[4210]|0)==-1)){c[s>>2]=16840;c[s+4>>2]=113;c[s+8>>2]=0;Pg(16840,s,114)}mm(b,22104,(c[16844>>2]|0)+ -1|0);c[22100>>2]=0;c[5524]=16856;if(!((c[4226]|0)==-1)){c[r>>2]=16904;c[r+4>>2]=113;c[r+8>>2]=0;Pg(16904,r,114)}mm(b,22096,(c[16908>>2]|0)+ -1|0);c[22092>>2]=0;c[5522]=16920;if(!((c[4242]|0)==-1)){c[q>>2]=16968;c[q+4>>2]=113;c[q+8>>2]=0;Pg(16968,q,114)}mm(b,22088,(c[16972>>2]|0)+ -1|0);c[22084>>2]=0;c[5520]=16984;if(!((c[4258]|0)==-1)){c[p>>2]=17032;c[p+4>>2]=113;c[p+8>>2]=0;Pg(17032,p,114)}mm(b,22080,(c[17036>>2]|0)+ -1|0);c[22076>>2]=0;c[5518]=17048;if(!((c[4268]|0)==-1)){c[o>>2]=17072;c[o+4>>2]=113;c[o+8>>2]=0;Pg(17072,o,114)}mm(b,22072,(c[17076>>2]|0)+ -1|0);c[22068>>2]=0;c[5516]=17128;if(!((c[4288]|0)==-1)){c[n>>2]=17152;c[n+4>>2]=113;c[n+8>>2]=0;Pg(17152,n,114)}mm(b,22064,(c[17156>>2]|0)+ -1|0);c[22060>>2]=0;c[5514]=17184;if(!((c[4302]|0)==-1)){c[m>>2]=17208;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17208,m,114)}mm(b,22056,(c[17212>>2]|0)+ -1|0);c[22052>>2]=0;c[5512]=17232;if(!((c[4314]|0)==-1)){c[l>>2]=17256;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17256,l,114)}mm(b,22048,(c[17260>>2]|0)+ -1|0);c[22036>>2]=0;c[5508]=16280;c[22040>>2]=16328;if(!((c[4090]|0)==-1)){c[k>>2]=16360;c[k+4>>2]=113;c[k+8>>2]=0;Pg(16360,k,114)}mm(b,22032,(c[16364>>2]|0)+ -1|0);c[22020>>2]=0;c[5504]=16432;c[22024>>2]=16480;if(!((c[4128]|0)==-1)){c[j>>2]=16512;c[j+4>>2]=113;c[j+8>>2]=0;Pg(16512,j,114)}mm(b,22016,(c[16516>>2]|0)+ -1|0);c[22004>>2]=0;c[5500]=18376;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);c[22008>>2]=c[4338];c[5500]=16728;if(!((c[4186]|0)==-1)){c[h>>2]=16744;c[h+4>>2]=113;c[h+8>>2]=0;Pg(16744,h,114)}mm(b,22e3,(c[16748>>2]|0)+ -1|0);c[21988>>2]=0;c[5496]=18376;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);c[21992>>2]=c[4338];c[5496]=16760;if(!((c[4194]|0)==-1)){c[g>>2]=16776;c[g+4>>2]=113;c[g+8>>2]=0;Pg(16776,g,114)}mm(b,21984,(c[16780>>2]|0)+ -1|0);c[21980>>2]=0;c[5494]=17272;if(!((c[4324]|0)==-1)){c[f>>2]=17296;c[f+4>>2]=113;c[f+8>>2]=0;Pg(17296,f,114)}mm(b,21976,(c[17300>>2]|0)+ -1|0);c[21972>>2]=0;c[5492]=17312;if((c[4334]|0)==-1){N=c[17340>>2]|0;O=N+ -1|0;mm(b,21968,O);i=e;return}c[H>>2]=17336;c[H+4>>2]=113;c[H+8>>2]=0;Pg(17336,H,114);N=c[17340>>2]|0;O=N+ -1|0;mm(b,21968,O);i=e;return}function mm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;e=i;ug(b);f=a+8|0;g=a+12|0;a=c[g>>2]|0;h=f;j=c[h>>2]|0;k=a-j>>2;do{if(k>>>0>d>>>0){l=j}else{m=d+1|0;if(k>>>0<m>>>0){so(f,m-k|0);l=c[h>>2]|0;break}if(!(k>>>0>m>>>0)){l=j;break}n=j+(m<<2)|0;if((a|0)==(n|0)){l=j;break}c[g>>2]=a+(~((a+ -4+(0-n)|0)>>>2)<<2);l=j}}while(0);j=c[l+(d<<2)>>2]|0;if((j|0)==0){o=l;p=o+(d<<2)|0;c[p>>2]=b;i=e;return}vg(j)|0;o=c[h>>2]|0;p=o+(d<<2)|0;c[p>>2]=b;i=e;return}function nm(a){a=a|0;var b=0;b=i;om(a);mp(a);i=b;return}function om(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;d=i;c[b>>2]=17384;e=b+12|0;f=c[e>>2]|0;g=b+8|0;h=c[g>>2]|0;if((f|0)!=(h|0)){j=f;f=h;h=0;while(1){k=c[f+(h<<2)>>2]|0;if((k|0)==0){l=f;m=j}else{vg(k)|0;l=c[g>>2]|0;m=c[e>>2]|0}k=h+1|0;if(k>>>0<m-l>>2>>>0){j=m;f=l;h=k}else{break}}}Ug(b+144|0);h=c[g>>2]|0;if((h|0)==0){i=d;return}g=c[e>>2]|0;if((g|0)!=(h|0)){c[e>>2]=g+(~((g+ -4+(0-h)|0)>>>2)<<2)}if((b+24|0)==(h|0)){a[b+136|0]=0;i=d;return}else{mp(h);i=d;return}}function pm(){var b=0,d=0,e=0;b=i;if((a[17440]|0)!=0){d=c[4358]|0;i=b;return d|0}if((Ja(17440)|0)==0){d=c[4358]|0;i=b;return d|0}do{if((a[17416]|0)==0){if((Ja(17416)|0)==0){break}lm(21808,1);c[4350]=21808;c[4352]=17400;xb(17416)}}while(0);e=c[c[4352]>>2]|0;c[4356]=e;ug(e);c[4358]=17424;xb(17440);d=c[4358]|0;i=b;return d|0}function qm(a){a=a|0;var b=0,d=0;b=i;d=c[(pm()|0)>>2]|0;c[a>>2]=d;ug(d);i=b;return}function rm(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;e=c[b>>2]|0;c[a>>2]=e;ug(e);i=d;return}function sm(a){a=a|0;var b=0;b=i;vg(c[a>>2]|0)|0;i=b;return}function tm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+16|0;e=d;f=c[a>>2]|0;a=b;if(!((c[a>>2]|0)==-1)){c[e>>2]=b;c[e+4>>2]=113;c[e+8>>2]=0;Pg(a,e,114)}e=(c[b+4>>2]|0)+ -1|0;b=c[f+8>>2]|0;if(!((c[f+12>>2]|0)-b>>2>>>0>e>>>0)){g=bc(4)|0;h=g;Mo(h);gd(g|0,25424,101)}f=c[b+(e<<2)>>2]|0;if((f|0)==0){g=bc(4)|0;h=g;Mo(h);gd(g|0,25424,101)}else{i=d;return f|0}return 0}function um(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function vm(a){a=a|0;var b=0;b=i;if((a|0)==0){i=b;return}qd[c[(c[a>>2]|0)+4>>2]&127](a);i=b;return}function wm(a){a=a|0;var b=0;b=c[4362]|0;c[4362]=b+1;c[a+4>>2]=b+1;i=i;return}function xm(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function ym(a,d,e){a=a|0;d=d|0;e=e|0;var f=0;a=i;if(!(e>>>0<128)){f=0;i=a;return f|0}f=(b[(c[(Zb()|0)>>2]|0)+(e<<1)>>1]&d)<<16>>16!=0;i=a;return f|0}function zm(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0;a=i;if((d|0)==(e|0)){g=d;i=a;return g|0}else{h=d;j=f}while(1){f=c[h>>2]|0;if(f>>>0<128){k=b[(c[(Zb()|0)>>2]|0)+(f<<1)>>1]|0}else{k=0}b[j>>1]=k;f=h+4|0;if((f|0)==(e|0)){g=e;break}else{h=f;j=j+2|0}}i=a;return g|0}function Am(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;a=i;a:do{if((e|0)==(f|0)){g=e}else{h=e;while(1){j=c[h>>2]|0;if(j>>>0<128){if(!((b[(c[(Zb()|0)>>2]|0)+(j<<1)>>1]&d)<<16>>16==0)){g=h;break a}}j=h+4|0;if((j|0)==(f|0)){g=f;break}else{h=j}}}}while(0);i=a;return g|0}function Bm(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0;a=i;a:do{if((e|0)==(f|0)){g=e}else{h=e;while(1){j=c[h>>2]|0;if(!(j>>>0<128)){g=h;break a}k=h+4|0;if((b[(c[(Zb()|0)>>2]|0)+(j<<1)>>1]&d)<<16>>16==0){g=h;break a}if((k|0)==(f|0)){g=f;break}else{h=k}}}}while(0);i=a;return g|0}function Cm(a,b){a=a|0;b=b|0;var d=0;a=i;if(!(b>>>0<128)){d=b;i=a;return d|0}d=c[(c[(Pa()|0)>>2]|0)+(b<<2)>>2]|0;i=a;return d|0}function Dm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;a=i;if((b|0)==(d|0)){e=b;i=a;return e|0}else{f=b}while(1){b=c[f>>2]|0;if(b>>>0<128){g=c[(c[(Pa()|0)>>2]|0)+(b<<2)>>2]|0}else{g=b}c[f>>2]=g;b=f+4|0;if((b|0)==(d|0)){e=d;break}else{f=b}}i=a;return e|0}function Em(a,b){a=a|0;b=b|0;var d=0;a=i;if(!(b>>>0<128)){d=b;i=a;return d|0}d=c[(c[(Wc()|0)>>2]|0)+(b<<2)>>2]|0;i=a;return d|0}function Fm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;a=i;if((b|0)==(d|0)){e=b;i=a;return e|0}else{f=b}while(1){b=c[f>>2]|0;if(b>>>0<128){g=c[(c[(Wc()|0)>>2]|0)+(b<<2)>>2]|0}else{g=b}c[f>>2]=g;b=f+4|0;if((b|0)==(d|0)){e=d;break}else{f=b}}i=a;return e|0}function Gm(a,b){a=a|0;b=b|0;i=i;return b<<24>>24|0}function Hm(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;b=i;if((d|0)==(e|0)){g=d;i=b;return g|0}else{h=d;j=f}while(1){c[j>>2]=a[h]|0;f=h+1|0;if((f|0)==(e|0)){g=e;break}else{j=j+4|0;h=f}}i=b;return g|0}function Im(a,b,c){a=a|0;b=b|0;c=c|0;i=i;return(b>>>0<128?b&255:c)|0}function Jm(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0;b=i;if((d|0)==(e|0)){h=d;i=b;return h|0}j=((e+ -4+(0-d)|0)>>>2)+1|0;k=d;l=g;while(1){g=c[k>>2]|0;a[l]=g>>>0<128?g&255:f;g=k+4|0;if((g|0)==(e|0)){break}else{l=l+1|0;k=g}}h=d+(j<<2)|0;i=b;return h|0}function Km(b){b=b|0;var d=0,e=0;d=i;c[b>>2]=17480;e=c[b+8>>2]|0;do{if((e|0)!=0){if((a[b+12|0]|0)==0){break}np(e)}}while(0);mp(b);i=d;return}function Lm(b){b=b|0;var d=0,e=0;d=i;c[b>>2]=17480;e=c[b+8>>2]|0;if((e|0)==0){i=d;return}if((a[b+12|0]|0)==0){i=d;return}np(e);i=d;return}function Mm(a,b){a=a|0;b=b|0;var d=0;a=i;if(!(b<<24>>24>-1)){d=b;i=a;return d|0}d=c[(c[(Pa()|0)>>2]|0)+((b&255)<<2)>>2]&255;i=a;return d|0}function Nm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;b=i;if((d|0)==(e|0)){f=d;i=b;return f|0}else{g=d}while(1){d=a[g]|0;if(d<<24>>24>-1){h=c[(c[(Pa()|0)>>2]|0)+(d<<24>>24<<2)>>2]&255}else{h=d}a[g]=h;d=g+1|0;if((d|0)==(e|0)){f=e;break}else{g=d}}i=b;return f|0}function Om(a,b){a=a|0;b=b|0;var d=0;a=i;if(!(b<<24>>24>-1)){d=b;i=a;return d|0}d=c[(c[(Wc()|0)>>2]|0)+(b<<24>>24<<2)>>2]&255;i=a;return d|0}function Pm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;b=i;if((d|0)==(e|0)){f=d;i=b;return f|0}else{g=d}while(1){d=a[g]|0;if(d<<24>>24>-1){h=c[(c[(Wc()|0)>>2]|0)+(d<<24>>24<<2)>>2]&255}else{h=d}a[g]=h;d=g+1|0;if((d|0)==(e|0)){f=e;break}else{g=d}}i=b;return f|0}function Qm(a,b){a=a|0;b=b|0;i=i;return b|0}function Rm(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;b=i;if((c|0)==(d|0)){f=c}else{g=c;c=e;while(1){a[c]=a[g]|0;e=g+1|0;if((e|0)==(d|0)){f=d;break}else{c=c+1|0;g=e}}}i=b;return f|0}function Sm(a,b,c){a=a|0;b=b|0;c=c|0;i=i;return(b<<24>>24>-1?b:c)|0}function Tm(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;b=i;if((c|0)==(d|0)){g=c;i=b;return g|0}else{h=c;j=f}while(1){f=a[h]|0;a[j]=f<<24>>24>-1?f:e;f=h+1|0;if((f|0)==(d|0)){g=d;break}else{j=j+1|0;h=f}}i=b;return g|0}function Um(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Vm(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;c[f>>2]=d;c[j>>2]=g;i=i;return 3}function Wm(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;c[f>>2]=d;c[j>>2]=g;i=i;return 3}function Xm(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;i=i;return 3}function Ym(a){a=a|0;i=i;return 1}



function jh(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;k=i;if((1073741807-d|0)>>>0<e>>>0){Qg(0)}if((a[b]&1)==0){l=b+4|0}else{l=c[b+8>>2]|0}do{if(d>>>0<536870887){m=e+d|0;n=d<<1;o=m>>>0<n>>>0?n:m;if(o>>>0<2){p=2;break}p=o+4&-4}else{p=1073741807}}while(0);e=kp(p<<2)|0;if((g|0)!=0){Io(e,l,g)|0}o=f-h|0;if((o|0)!=(g|0)){Io(e+(j+g<<2)|0,l+(h+g<<2)|0,o-g|0)|0}if((d|0)==1){q=b+8|0;c[q>>2]=e;r=p|1;s=b;c[s>>2]=r;i=k;return}mp(l);q=b+8|0;c[q>>2]=e;r=p|1;s=b;c[s>>2]=r;i=k;return}function kh(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+16|0;f=e;g=e+8|0;h=(c[b+24>>2]|0)==0;if(h){c[b+16>>2]=d|1}else{c[b+16>>2]=d}if(((h&1|d)&c[b+20>>2]|0)==0){i=e;return}e=bc(16)|0;do{if((a[15080]|0)==0){if((Ja(15080)|0)==0){break}c[3768]=15776;kd(40,15072,q|0)|0;xb(15080)}}while(0);b=e;d=g;c[d>>2]=1;c[d+4>>2]=15072;d=f;h=g;c[d+0>>2]=c[h+0>>2];c[d+4>>2]=c[h+4>>2];Mg(b,f,15128);c[e>>2]=15096;gd(e|0,15176,36)}function lh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=i;c[a>>2]=15120;d=c[a+40>>2]|0;e=a+32|0;f=a+36|0;if((d|0)!=0){g=d;do{g=g+ -1|0;vd[c[(c[e>>2]|0)+(g<<2)>>2]&3](0,a,c[(c[f>>2]|0)+(g<<2)>>2]|0);}while((g|0)!=0)}sm(a+28|0);gp(c[e>>2]|0);gp(c[f>>2]|0);gp(c[a+48>>2]|0);gp(c[a+60>>2]|0);i=b;return}function mh(a,b){a=a|0;b=b|0;var c=0;c=i;rm(a,b+28|0);i=c;return}function nh(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;c[a+24>>2]=b;c[a+16>>2]=(b|0)==0;c[a+20>>2]=0;c[a+4>>2]=4098;c[a+12>>2]=0;c[a+8>>2]=6;b=a+28|0;e=a+32|0;a=e+40|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(a|0));qm(b);i=d;return}function oh(a){a=a|0;var b=0;b=i;c[a>>2]=14736;sm(a+4|0);mp(a);i=b;return}function ph(a){a=a|0;var b=0;b=i;c[a>>2]=14736;sm(a+4|0);i=b;return}function qh(a,b){a=a|0;b=b|0;i=i;return}function rh(a,b,c){a=a|0;b=b|0;c=c|0;i=i;return a|0}function sh(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;i=i;return}function th(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=a;c[e>>2]=0;c[e+4>>2]=0;e=a+8|0;c[e>>2]=-1;c[e+4>>2]=-1;i=i;return}function uh(a){a=a|0;i=i;return 0}function vh(a){a=a|0;i=i;return 0}function wh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;g=b;if((e|0)<=0){h=0;i=f;return h|0}j=b+12|0;k=b+16|0;l=d;d=0;while(1){m=c[j>>2]|0;if(m>>>0<(c[k>>2]|0)>>>0){c[j>>2]=m+1;n=a[m]|0}else{m=td[c[(c[g>>2]|0)+40>>2]&63](b)|0;if((m|0)==-1){h=d;o=8;break}n=m&255}a[l]=n;m=d+1|0;if((m|0)<(e|0)){l=l+1|0;d=m}else{h=m;o=8;break}}if((o|0)==8){i=f;return h|0}return 0}function xh(a){a=a|0;i=i;return-1}function yh(a){a=a|0;var b=0,e=0,f=0;b=i;if((td[c[(c[a>>2]|0)+36>>2]&63](a)|0)==-1){e=-1;i=b;return e|0}f=a+12|0;a=c[f>>2]|0;c[f>>2]=a+1;e=d[a]|0;i=b;return e|0}function zh(a,b){a=a|0;b=b|0;i=i;return-1}function Ah(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=i;h=b;if((f|0)<=0){j=0;i=g;return j|0}k=b+24|0;l=b+28|0;m=e;e=0;while(1){n=c[k>>2]|0;if(n>>>0<(c[l>>2]|0)>>>0){o=a[m]|0;c[k>>2]=n+1;a[n]=o}else{if((Cd[c[(c[h>>2]|0)+52>>2]&15](b,d[m]|0)|0)==-1){j=e;p=7;break}}o=e+1|0;if((o|0)<(f|0)){m=m+1|0;e=o}else{j=o;p=7;break}}if((p|0)==7){i=g;return j|0}return 0}function Bh(a,b){a=a|0;b=b|0;i=i;return-1}function Ch(a){a=a|0;var b=0;b=i;c[a>>2]=14800;sm(a+4|0);mp(a);i=b;return}function Dh(a){a=a|0;var b=0;b=i;c[a>>2]=14800;sm(a+4|0);i=b;return}function Eh(a,b){a=a|0;b=b|0;i=i;return}function Fh(a,b,c){a=a|0;b=b|0;c=c|0;i=i;return a|0}function Gh(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;i=i;return}function Hh(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=a;c[e>>2]=0;c[e+4>>2]=0;e=a+8|0;c[e>>2]=-1;c[e+4>>2]=-1;i=i;return}function Ih(a){a=a|0;i=i;return 0}function Jh(a){a=a|0;i=i;return 0}function Kh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;f=a;if((d|0)<=0){g=0;i=e;return g|0}h=a+12|0;j=a+16|0;k=b;b=0;while(1){l=c[h>>2]|0;if(l>>>0<(c[j>>2]|0)>>>0){c[h>>2]=l+4;m=c[l>>2]|0}else{l=td[c[(c[f>>2]|0)+40>>2]&63](a)|0;if((l|0)==-1){g=b;n=8;break}else{m=l}}c[k>>2]=m;l=b+1|0;if((l|0)>=(d|0)){g=l;n=8;break}k=k+4|0;b=l}if((n|0)==8){i=e;return g|0}return 0}function Lh(a){a=a|0;i=i;return-1}function Mh(a){a=a|0;var b=0,d=0,e=0;b=i;if((td[c[(c[a>>2]|0)+36>>2]&63](a)|0)==-1){d=-1;i=b;return d|0}e=a+12|0;a=c[e>>2]|0;c[e>>2]=a+4;d=c[a>>2]|0;i=b;return d|0}function Nh(a,b){a=a|0;b=b|0;i=i;return-1}function Oh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;f=a;if((d|0)<=0){g=0;i=e;return g|0}h=a+24|0;j=a+28|0;k=b;b=0;while(1){l=c[h>>2]|0;if(l>>>0<(c[j>>2]|0)>>>0){m=c[k>>2]|0;c[h>>2]=l+4;c[l>>2]=m}else{if((Cd[c[(c[f>>2]|0)+52>>2]&15](a,c[k>>2]|0)|0)==-1){g=b;n=8;break}}m=b+1|0;if((m|0)>=(d|0)){g=m;n=8;break}k=k+4|0;b=m}if((n|0)==8){i=e;return g|0}return 0}function Ph(a,b){a=a|0;b=b|0;i=i;return-1}function Qh(a){a=a|0;var b=0;b=i;lh(a+8|0);mp(a);i=b;return}function Rh(a){a=a|0;var b=0;b=i;lh(a+8|0);i=b;return}function Sh(a){a=a|0;var b=0,d=0,e=0;b=i;d=a;e=c[(c[a>>2]|0)+ -12>>2]|0;lh(d+(e+8)|0);mp(d+e|0);i=b;return}function Th(a){a=a|0;var b=0;b=i;lh(a+((c[(c[a>>2]|0)+ -12>>2]|0)+8)|0);i=b;return}function Uh(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;d=i;i=i+8|0;e=d;f=b;g=c[(c[f>>2]|0)+ -12>>2]|0;h=b;if((c[h+(g+24)>>2]|0)==0){i=d;return b|0}j=e;a[j]=0;c[e+4>>2]=b;do{if((c[h+(g+16)>>2]|0)==0){k=c[h+(g+72)>>2]|0;if((k|0)==0){l=g}else{Uh(k)|0;l=c[(c[f>>2]|0)+ -12>>2]|0}a[j]=1;k=c[h+(l+24)>>2]|0;if(!((td[c[(c[k>>2]|0)+24>>2]&63](k)|0)==-1)){break}k=c[(c[f>>2]|0)+ -12>>2]|0;kh(h+k|0,c[h+(k+16)>>2]|1)}}while(0);ci(e);i=d;return b|0}function Vh(a){a=a|0;var b=0;b=i;lh(a+8|0);mp(a);i=b;return}function Wh(a){a=a|0;var b=0;b=i;lh(a+8|0);i=b;return}function Xh(a){a=a|0;var b=0,d=0,e=0;b=i;d=a;e=c[(c[a>>2]|0)+ -12>>2]|0;lh(d+(e+8)|0);mp(d+e|0);i=b;return}function Yh(a){a=a|0;var b=0;b=i;lh(a+((c[(c[a>>2]|0)+ -12>>2]|0)+8)|0);i=b;return}function Zh(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;d=i;i=i+8|0;e=d;f=b;g=c[(c[f>>2]|0)+ -12>>2]|0;h=b;if((c[h+(g+24)>>2]|0)==0){i=d;return b|0}j=e;a[j]=0;c[e+4>>2]=b;do{if((c[h+(g+16)>>2]|0)==0){k=c[h+(g+72)>>2]|0;if((k|0)==0){l=g}else{Zh(k)|0;l=c[(c[f>>2]|0)+ -12>>2]|0}a[j]=1;k=c[h+(l+24)>>2]|0;if(!((td[c[(c[k>>2]|0)+24>>2]&63](k)|0)==-1)){break}k=c[(c[f>>2]|0)+ -12>>2]|0;kh(h+k|0,c[h+(k+16)>>2]|1)}}while(0);hi(e);i=d;return b|0}function _h(a){a=a|0;var b=0;b=i;lh(a+4|0);mp(a);i=b;return}function $h(a){a=a|0;var b=0;b=i;lh(a+4|0);i=b;return}function ai(a){a=a|0;var b=0,d=0,e=0;b=i;d=a;e=c[(c[a>>2]|0)+ -12>>2]|0;lh(d+(e+4)|0);mp(d+e|0);i=b;return}function bi(a){a=a|0;var b=0;b=i;lh(a+((c[(c[a>>2]|0)+ -12>>2]|0)+4)|0);i=b;return}function ci(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;d=a+4|0;a=c[d>>2]|0;e=c[(c[a>>2]|0)+ -12>>2]|0;f=a;if((c[f+(e+24)>>2]|0)==0){i=b;return}if((c[f+(e+16)>>2]|0)!=0){i=b;return}if((c[f+(e+4)>>2]&8192|0)==0){i=b;return}if(Oa()|0){i=b;return}e=c[d>>2]|0;f=c[e+((c[(c[e>>2]|0)+ -12>>2]|0)+24)>>2]|0;if(!((td[c[(c[f>>2]|0)+24>>2]&63](f)|0)==-1)){i=b;return}f=c[d>>2]|0;d=c[(c[f>>2]|0)+ -12>>2]|0;e=f;kh(e+d|0,c[e+(d+16)>>2]|1);i=b;return}function di(a){a=a|0;var b=0;b=i;lh(a+4|0);mp(a);i=b;return}function ei(a){a=a|0;var b=0;b=i;lh(a+4|0);i=b;return}function fi(a){a=a|0;var b=0,d=0,e=0;b=i;d=a;e=c[(c[a>>2]|0)+ -12>>2]|0;lh(d+(e+4)|0);mp(d+e|0);i=b;return}function gi(a){a=a|0;var b=0;b=i;lh(a+((c[(c[a>>2]|0)+ -12>>2]|0)+4)|0);i=b;return}function hi(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;d=a+4|0;a=c[d>>2]|0;e=c[(c[a>>2]|0)+ -12>>2]|0;f=a;if((c[f+(e+24)>>2]|0)==0){i=b;return}if((c[f+(e+16)>>2]|0)!=0){i=b;return}if((c[f+(e+4)>>2]&8192|0)==0){i=b;return}if(Oa()|0){i=b;return}e=c[d>>2]|0;f=c[e+((c[(c[e>>2]|0)+ -12>>2]|0)+24)>>2]|0;if(!((td[c[(c[f>>2]|0)+24>>2]&63](f)|0)==-1)){i=b;return}f=c[d>>2]|0;d=c[(c[f>>2]|0)+ -12>>2]|0;e=f;kh(e+d|0,c[e+(d+16)>>2]|1);i=b;return}function ii(a){a=a|0;i=i;return 15016}function ji(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=i;if((c|0)==1){Sg(a,15032,35);i=d;return}else{Kg(a,b,c);i=d;return}}function ki(a){a=a|0;i=i;return}function li(a){a=a|0;var b=0;b=i;Og(a);mp(a);i=b;return}function mi(a){a=a|0;var b=0;b=i;Og(a);i=b;return}function ni(a){a=a|0;var b=0;b=i;lh(a);mp(a);i=b;return}function oi(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function pi(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function qi(a){a=a|0;i=i;return}function ri(a){a=a|0;i=i;return}function si(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;a:do{if((e|0)==(f|0)){g=c;h=6}else{j=e;k=c;while(1){if((k|0)==(d|0)){l=-1;break a}m=a[k]|0;n=a[j]|0;if(m<<24>>24<n<<24>>24){l=-1;break a}if(n<<24>>24<m<<24>>24){l=1;break a}m=k+1|0;n=j+1|0;if((n|0)==(f|0)){g=m;h=6;break}else{j=n;k=m}}}}while(0);if((h|0)==6){l=(g|0)!=(d|0)|0}i=b;return l|0}function ti(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;d=i;g=e;h=f-g|0;if(h>>>0>4294967279){Qg(b)}if(h>>>0<11){a[b]=h<<1;j=b+1|0}else{k=h+16&-16;l=kp(k)|0;c[b+8>>2]=l;c[b>>2]=k|1;c[b+4>>2]=h;j=l}if((e|0)==(f|0)){m=j;a[m]=0;i=d;return}else{n=e;o=j}while(1){a[o]=a[n]|0;e=n+1|0;if((e|0)==(f|0)){break}else{o=o+1|0;n=e}}m=j+(f+(0-g))|0;a[m]=0;i=d;return}function ui(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;b=i;if((c|0)==(d|0)){e=0;i=b;return e|0}else{f=0;g=c}while(1){c=(a[g]|0)+(f<<4)|0;h=c&-268435456;j=(h>>>24|h)^c;c=g+1|0;if((c|0)==(d|0)){e=j;break}else{g=c;f=j}}i=b;return e|0}function vi(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function wi(a){a=a|0;i=i;return}function xi(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;a=i;a:do{if((e|0)==(f|0)){g=b;h=6}else{j=e;k=b;while(1){if((k|0)==(d|0)){l=-1;break a}m=c[k>>2]|0;n=c[j>>2]|0;if((m|0)<(n|0)){l=-1;break a}if((n|0)<(m|0)){l=1;break a}m=k+4|0;n=j+4|0;if((n|0)==(f|0)){g=m;h=6;break}else{j=n;k=m}}}}while(0);if((h|0)==6){l=(g|0)!=(d|0)|0}i=a;return l|0}function yi(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;d=i;g=e;h=f-g|0;j=h>>2;if(j>>>0>1073741807){Qg(b)}if(j>>>0<2){a[b]=h>>>1;k=b+4|0}else{h=j+4&-4;l=kp(h<<2)|0;c[b+8>>2]=l;c[b>>2]=h|1;c[b+4>>2]=j;k=l}if((e|0)==(f|0)){m=k;c[m>>2]=0;i=d;return}l=f+ -4+(0-g)|0;g=e;e=k;while(1){c[e>>2]=c[g>>2];j=g+4|0;if((j|0)==(f|0)){break}else{e=e+4|0;g=j}}m=k+((l>>>2)+1<<2)|0;c[m>>2]=0;i=d;return}function zi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;a=i;if((b|0)==(d|0)){e=0;i=a;return e|0}else{f=0;g=b}while(1){b=(c[g>>2]|0)+(f<<4)|0;h=b&-268435456;j=(h>>>24|h)^b;b=g+4|0;if((b|0)==(d|0)){e=j;break}else{g=b;f=j}}i=a;return e|0}function Ai(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Bi(a){a=a|0;i=i;return}function Ci(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;k=i;i=i+136|0;l=k;m=k+8|0;n=k+16|0;o=k+24|0;p=k+40|0;q=k+56|0;r=k+64|0;s=k+72|0;t=k+80|0;u=k+88|0;v=k+96|0;w=k+104|0;x=k+128|0;if((c[g+4>>2]&1|0)==0){c[q>>2]=-1;y=c[(c[d>>2]|0)+16>>2]|0;z=e;c[s>>2]=c[z>>2];c[t>>2]=c[f>>2];A=n;B=s;c[A+0>>2]=c[B+0>>2];B=m;A=t;c[B+0>>2]=c[A+0>>2];od[y&63](r,d,n,m,g,h,q);m=c[r>>2]|0;c[z>>2]=m;z=c[q>>2]|0;if((z|0)==1){a[j]=1}else if((z|0)==0){a[j]=0}else{a[j]=1;c[h>>2]=4}c[b>>2]=m;i=k;return}mh(u,g);m=u;u=c[m>>2]|0;if(!((c[4366]|0)==-1)){c[p>>2]=17464;c[p+4>>2]=113;c[p+8>>2]=0;Pg(17464,p,114)}p=(c[17468>>2]|0)+ -1|0;z=c[u+8>>2]|0;if(!((c[u+12>>2]|0)-z>>2>>>0>p>>>0)){C=bc(4)|0;D=C;Mo(D);gd(C|0,25424,101)}u=c[z+(p<<2)>>2]|0;if((u|0)==0){C=bc(4)|0;D=C;Mo(D);gd(C|0,25424,101)}C=u;vg(c[m>>2]|0)|0;mh(v,g);g=v;v=c[g>>2]|0;if(!((c[4402]|0)==-1)){c[o>>2]=17608;c[o+4>>2]=113;c[o+8>>2]=0;Pg(17608,o,114)}o=(c[17612>>2]|0)+ -1|0;m=c[v+8>>2]|0;if(!((c[v+12>>2]|0)-m>>2>>>0>o>>>0)){E=bc(4)|0;F=E;Mo(F);gd(E|0,25424,101)}v=c[m+(o<<2)>>2]|0;if((v|0)==0){E=bc(4)|0;F=E;Mo(F);gd(E|0,25424,101)}E=v;vg(c[g>>2]|0)|0;g=w;F=v;rd[c[(c[F>>2]|0)+24>>2]&63](g,E);rd[c[(c[F>>2]|0)+28>>2]&63](w+12|0,E);c[x>>2]=c[f>>2];f=w+24|0;E=l;F=x;c[E+0>>2]=c[F+0>>2];F=Di(e,l,g,f,C,h,1)|0;a[j]=(F|0)==(g|0)|0;c[b>>2]=c[e>>2];Ug(w+12|0);Ug(w);i=k;return}function Di(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0;l=i;i=i+104|0;m=(g-f|0)/12|0;n=l;do{if(m>>>0>100){o=fp(m)|0;if((o|0)!=0){p=o;q=o;break}rp()}else{p=0;q=n}}while(0);n=(f|0)==(g|0);if(n){r=0;s=m}else{o=f;t=0;u=m;m=q;while(1){v=a[o]|0;if((v&1)==0){w=(v&255)>>>1}else{w=c[o+4>>2]|0}if((w|0)==0){a[m]=2;x=t+1|0;y=u+ -1|0}else{a[m]=1;x=t;y=u}v=o+12|0;if((v|0)==(g|0)){r=x;s=y;break}else{o=v;t=x;u=y;m=m+1|0}}}m=b;b=e;e=h;y=0;u=r;r=s;a:while(1){s=c[m>>2]|0;do{if((s|0)==0){z=0}else{if((c[s+12>>2]|0)!=(c[s+16>>2]|0)){z=s;break}if((td[c[(c[s>>2]|0)+36>>2]&63](s)|0)==-1){c[m>>2]=0;z=0;break}else{z=c[m>>2]|0;break}}}while(0);s=(z|0)==0;x=c[b>>2]|0;do{if((x|0)==0){A=0}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){A=x;break}if(!((td[c[(c[x>>2]|0)+36>>2]&63](x)|0)==-1)){A=x;break}c[b>>2]=0;A=0}}while(0);B=(A|0)==0;C=c[m>>2]|0;if(!((s^B)&(r|0)!=0)){break}x=c[C+12>>2]|0;if((x|0)==(c[C+16>>2]|0)){D=td[c[(c[C>>2]|0)+36>>2]&63](C)|0}else{D=d[x]|0}x=D&255;if(k){E=x}else{E=Cd[c[(c[e>>2]|0)+12>>2]&15](h,x)|0}x=y+1|0;if(n){y=x;r=r;u=u;continue}b:do{if(k){t=0;o=f;w=u;v=r;F=q;while(1){do{if((a[F]|0)==1){G=a[o]|0;H=(G&1)==0;if(H){I=o+1|0}else{I=c[o+8>>2]|0}if(!(E<<24>>24==(a[I+y|0]|0))){a[F]=0;J=t;K=w;L=v+ -1|0;break}if(H){M=(G&255)>>>1}else{M=c[o+4>>2]|0}if((M|0)!=(x|0)){J=1;K=w;L=v;break}a[F]=2;J=1;K=w+1|0;L=v+ -1|0}else{J=t;K=w;L=v}}while(0);G=o+12|0;if((G|0)==(g|0)){N=J;O=K;P=L;break b}t=J;o=G;w=K;v=L;F=F+1|0}}else{F=0;v=f;w=u;o=r;t=q;while(1){do{if((a[t]|0)==1){G=v;if((a[G]&1)==0){Q=v+1|0}else{Q=c[v+8>>2]|0}if(!(E<<24>>24==(Cd[c[(c[e>>2]|0)+12>>2]&15](h,a[Q+y|0]|0)|0)<<24>>24)){a[t]=0;R=F;S=w;T=o+ -1|0;break}H=a[G]|0;if((H&1)==0){U=(H&255)>>>1}else{U=c[v+4>>2]|0}if((U|0)!=(x|0)){R=1;S=w;T=o;break}a[t]=2;R=1;S=w+1|0;T=o+ -1|0}else{R=F;S=w;T=o}}while(0);H=v+12|0;if((H|0)==(g|0)){N=R;O=S;P=T;break b}F=R;v=H;w=S;o=T;t=t+1|0}}}while(0);if(!N){y=x;u=O;r=P;continue}s=c[m>>2]|0;t=s+12|0;o=c[t>>2]|0;if((o|0)==(c[s+16>>2]|0)){td[c[(c[s>>2]|0)+40>>2]&63](s)|0}else{c[t>>2]=o+1}if((P+O|0)>>>0<2){y=x;u=O;r=P;continue}else{V=f;W=O;X=q}while(1){do{if((a[X]|0)==2){o=a[V]|0;if((o&1)==0){Y=(o&255)>>>1}else{Y=c[V+4>>2]|0}if((Y|0)==(x|0)){Z=W;break}a[X]=0;Z=W+ -1|0}else{Z=W}}while(0);o=V+12|0;if((o|0)==(g|0)){y=x;u=Z;r=P;continue a}else{V=o;W=Z;X=X+1|0}}}do{if((C|0)==0){_=0}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){_=C;break}if((td[c[(c[C>>2]|0)+36>>2]&63](C)|0)==-1){c[m>>2]=0;_=0;break}else{_=c[m>>2]|0;break}}}while(0);m=(_|0)==0;do{if(B){$=78}else{if((c[A+12>>2]|0)!=(c[A+16>>2]|0)){if(m){break}else{$=80;break}}if((td[c[(c[A>>2]|0)+36>>2]&63](A)|0)==-1){c[b>>2]=0;$=78;break}else{if(m){break}else{$=80;break}}}}while(0);if(($|0)==78){if(m){$=80}}if(($|0)==80){c[j>>2]=c[j>>2]|2}c:do{if(n){$=85}else{if((a[q]|0)==2){aa=f;break}else{ba=f;ca=q}while(1){m=ba+12|0;b=ca+1|0;if((m|0)==(g|0)){$=85;break c}if((a[b]|0)==2){aa=m;break}else{ca=b;ba=m}}}}while(0);if(($|0)==85){c[j>>2]=c[j>>2]|4;aa=g}if((p|0)==0){i=l;return aa|0}gp(p);i=l;return aa|0}function Ei(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];Fi(a,0,k,j,f,g,h);i=b;return}function Fi(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;e=i;i=i+256|0;l=e;m=e+32|0;n=e+40|0;o=e+56|0;p=e+72|0;q=e+80|0;r=e+240|0;s=e+248|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==8){u=16}else if((t|0)==64){u=8}else{u=10}t=l;vj(n,h,t,m);h=o;c[h+0>>2]=0;c[h+4>>2]=0;c[h+8>>2]=0;Wg(o,10,0);if((a[h]&1)==0){l=o+1|0;v=l;w=o+8|0;x=l}else{l=o+8|0;v=o+1|0;w=l;x=c[l>>2]|0}c[p>>2]=x;l=q;c[r>>2]=l;c[s>>2]=0;y=f;f=g;g=o;z=o+4|0;A=a[m]|0;m=c[y>>2]|0;B=x;a:while(1){do{if((m|0)==0){C=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){C=m;break}if(!((td[c[(c[m>>2]|0)+36>>2]&63](m)|0)==-1)){C=m;break}c[y>>2]=0;C=0}}while(0);x=(C|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=18}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){if(x){F=D;break}else{G=D;H=B;break a}}if((td[c[(c[D>>2]|0)+36>>2]&63](D)|0)==-1){c[f>>2]=0;E=18;break}else{if(x){F=D;break}else{G=D;H=B;break a}}}}while(0);if((E|0)==18){E=0;if(x){G=0;H=B;break}else{F=0}}D=a[h]|0;I=(D&1)==0;if(I){J=(D&255)>>>1}else{J=c[z>>2]|0}if(((c[p>>2]|0)-B|0)==(J|0)){if(I){K=(D&255)>>>1;L=(D&255)>>>1}else{D=c[z>>2]|0;K=D;L=D}Wg(o,L<<1,0);if((a[h]&1)==0){M=10}else{M=(c[g>>2]&-2)+ -1|0}Wg(o,M,0);if((a[h]&1)==0){N=v}else{N=c[w>>2]|0}c[p>>2]=N+K;O=N}else{O=B}D=C+12|0;I=c[D>>2]|0;P=C+16|0;if((I|0)==(c[P>>2]|0)){Q=td[c[(c[C>>2]|0)+36>>2]&63](C)|0}else{Q=d[I]|0}if((Xi(Q&255,u,O,p,s,A,n,l,r,t)|0)!=0){G=F;H=O;break}I=c[D>>2]|0;if((I|0)==(c[P>>2]|0)){td[c[(c[C>>2]|0)+40>>2]&63](C)|0;m=C;B=O;continue}else{c[D>>2]=I+1;m=C;B=O;continue}}O=a[n]|0;if((O&1)==0){R=(O&255)>>>1}else{R=c[n+4>>2]|0}do{if((R|0)!=0){O=c[r>>2]|0;if((O-q|0)>=160){break}B=c[s>>2]|0;c[r>>2]=O+4;c[O>>2]=B}}while(0);c[k>>2]=qo(H,c[p>>2]|0,j,u)|0;Hl(n,l,c[r>>2]|0,j);do{if((C|0)==0){S=0}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){S=C;break}if(!((td[c[(c[C>>2]|0)+36>>2]&63](C)|0)==-1)){S=C;break}c[y>>2]=0;S=0}}while(0);y=(S|0)==0;do{if((G|0)==0){E=54}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(!y){break}T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}if((td[c[(c[G>>2]|0)+36>>2]&63](G)|0)==-1){c[f>>2]=0;E=54;break}if(!(y^(G|0)==0)){break}T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}}while(0);do{if((E|0)==54){if(y){break}T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}function Gi(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];Hi(a,0,k,j,f,g,h);i=b;return}function Hi(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;e=i;i=i+256|0;l=e;m=e+32|0;n=e+40|0;o=e+56|0;p=e+72|0;q=e+80|0;r=e+240|0;s=e+248|0;t=c[h+4>>2]&74;if((t|0)==64){u=8}else if((t|0)==0){u=0}else if((t|0)==8){u=16}else{u=10}t=l;vj(n,h,t,m);h=o;c[h+0>>2]=0;c[h+4>>2]=0;c[h+8>>2]=0;Wg(o,10,0);if((a[h]&1)==0){l=o+1|0;v=l;w=o+8|0;x=l}else{l=o+8|0;v=o+1|0;w=l;x=c[l>>2]|0}c[p>>2]=x;l=q;c[r>>2]=l;c[s>>2]=0;y=f;f=g;g=o;z=o+4|0;A=a[m]|0;m=c[y>>2]|0;B=x;a:while(1){do{if((m|0)==0){C=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){C=m;break}if(!((td[c[(c[m>>2]|0)+36>>2]&63](m)|0)==-1)){C=m;break}c[y>>2]=0;C=0}}while(0);x=(C|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=18}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){if(x){F=D;break}else{G=D;H=B;break a}}if((td[c[(c[D>>2]|0)+36>>2]&63](D)|0)==-1){c[f>>2]=0;E=18;break}else{if(x){F=D;break}else{G=D;H=B;break a}}}}while(0);if((E|0)==18){E=0;if(x){G=0;H=B;break}else{F=0}}D=a[h]|0;I=(D&1)==0;if(I){K=(D&255)>>>1}else{K=c[z>>2]|0}if(((c[p>>2]|0)-B|0)==(K|0)){if(I){L=(D&255)>>>1;M=(D&255)>>>1}else{D=c[z>>2]|0;L=D;M=D}Wg(o,M<<1,0);if((a[h]&1)==0){N=10}else{N=(c[g>>2]&-2)+ -1|0}Wg(o,N,0);if((a[h]&1)==0){O=v}else{O=c[w>>2]|0}c[p>>2]=O+L;P=O}else{P=B}D=C+12|0;I=c[D>>2]|0;Q=C+16|0;if((I|0)==(c[Q>>2]|0)){R=td[c[(c[C>>2]|0)+36>>2]&63](C)|0}else{R=d[I]|0}if((Xi(R&255,u,P,p,s,A,n,l,r,t)|0)!=0){G=F;H=P;break}I=c[D>>2]|0;if((I|0)==(c[Q>>2]|0)){td[c[(c[C>>2]|0)+40>>2]&63](C)|0;m=C;B=P;continue}else{c[D>>2]=I+1;m=C;B=P;continue}}P=a[n]|0;if((P&1)==0){S=(P&255)>>>1}else{S=c[n+4>>2]|0}do{if((S|0)!=0){P=c[r>>2]|0;if((P-q|0)>=160){break}B=c[s>>2]|0;c[r>>2]=P+4;c[P>>2]=B}}while(0);s=po(H,c[p>>2]|0,j,u)|0;u=k;c[u>>2]=s;c[u+4>>2]=J;Hl(n,l,c[r>>2]|0,j);do{if((C|0)==0){T=0}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){T=C;break}if(!((td[c[(c[C>>2]|0)+36>>2]&63](C)|0)==-1)){T=C;break}c[y>>2]=0;T=0}}while(0);y=(T|0)==0;do{if((G|0)==0){E=54}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(!y){break}U=b;c[U>>2]=T;Ug(o);Ug(n);i=e;return}if((td[c[(c[G>>2]|0)+36>>2]&63](G)|0)==-1){c[f>>2]=0;E=54;break}if(!(y^(G|0)==0)){break}U=b;c[U>>2]=T;Ug(o);Ug(n);i=e;return}}while(0);do{if((E|0)==54){if(y){break}U=b;c[U>>2]=T;Ug(o);Ug(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;U=b;c[U>>2]=T;Ug(o);Ug(n);i=e;return}function Ii(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];Ji(a,0,k,j,f,g,h);i=b;return}function Ji(e,f,g,h,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;f=i;i=i+256|0;m=f;n=f+32|0;o=f+40|0;p=f+56|0;q=f+72|0;r=f+80|0;s=f+240|0;t=f+248|0;u=c[j+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==8){v=16}else if((u|0)==64){v=8}else{v=10}u=m;vj(o,j,u,n);j=p;c[j+0>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;Wg(p,10,0);if((a[j]&1)==0){m=p+1|0;w=m;x=p+8|0;y=m}else{m=p+8|0;w=p+1|0;x=m;y=c[m>>2]|0}c[q>>2]=y;m=r;c[s>>2]=m;c[t>>2]=0;z=g;g=h;h=p;A=p+4|0;B=a[n]|0;n=c[z>>2]|0;C=y;a:while(1){do{if((n|0)==0){D=0}else{if((c[n+12>>2]|0)!=(c[n+16>>2]|0)){D=n;break}if(!((td[c[(c[n>>2]|0)+36>>2]&63](n)|0)==-1)){D=n;break}c[z>>2]=0;D=0}}while(0);y=(D|0)==0;E=c[g>>2]|0;do{if((E|0)==0){F=18}else{if((c[E+12>>2]|0)!=(c[E+16>>2]|0)){if(y){G=E;break}else{H=E;I=C;break a}}if((td[c[(c[E>>2]|0)+36>>2]&63](E)|0)==-1){c[g>>2]=0;F=18;break}else{if(y){G=E;break}else{H=E;I=C;break a}}}}while(0);if((F|0)==18){F=0;if(y){H=0;I=C;break}else{G=0}}E=a[j]|0;J=(E&1)==0;if(J){K=(E&255)>>>1}else{K=c[A>>2]|0}if(((c[q>>2]|0)-C|0)==(K|0)){if(J){L=(E&255)>>>1;M=(E&255)>>>1}else{E=c[A>>2]|0;L=E;M=E}Wg(p,M<<1,0);if((a[j]&1)==0){N=10}else{N=(c[h>>2]&-2)+ -1|0}Wg(p,N,0);if((a[j]&1)==0){O=w}else{O=c[x>>2]|0}c[q>>2]=O+L;P=O}else{P=C}E=D+12|0;J=c[E>>2]|0;Q=D+16|0;if((J|0)==(c[Q>>2]|0)){R=td[c[(c[D>>2]|0)+36>>2]&63](D)|0}else{R=d[J]|0}if((Xi(R&255,v,P,q,t,B,o,m,s,u)|0)!=0){H=G;I=P;break}J=c[E>>2]|0;if((J|0)==(c[Q>>2]|0)){td[c[(c[D>>2]|0)+40>>2]&63](D)|0;n=D;C=P;continue}else{c[E>>2]=J+1;n=D;C=P;continue}}P=a[o]|0;if((P&1)==0){S=(P&255)>>>1}else{S=c[o+4>>2]|0}do{if((S|0)!=0){P=c[s>>2]|0;if((P-r|0)>=160){break}C=c[t>>2]|0;c[s>>2]=P+4;c[P>>2]=C}}while(0);b[l>>1]=oo(I,c[q>>2]|0,k,v)|0;Hl(o,m,c[s>>2]|0,k);do{if((D|0)==0){T=0}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){T=D;break}if(!((td[c[(c[D>>2]|0)+36>>2]&63](D)|0)==-1)){T=D;break}c[z>>2]=0;T=0}}while(0);z=(T|0)==0;do{if((H|0)==0){F=54}else{if((c[H+12>>2]|0)!=(c[H+16>>2]|0)){if(!z){break}U=e;c[U>>2]=T;Ug(p);Ug(o);i=f;return}if((td[c[(c[H>>2]|0)+36>>2]&63](H)|0)==-1){c[g>>2]=0;F=54;break}if(!(z^(H|0)==0)){break}U=e;c[U>>2]=T;Ug(p);Ug(o);i=f;return}}while(0);do{if((F|0)==54){if(z){break}U=e;c[U>>2]=T;Ug(p);Ug(o);i=f;return}}while(0);c[k>>2]=c[k>>2]|2;U=e;c[U>>2]=T;Ug(p);Ug(o);i=f;return}function Ki(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];Li(a,0,k,j,f,g,h);i=b;return}function Li(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;e=i;i=i+256|0;l=e;m=e+32|0;n=e+40|0;o=e+56|0;p=e+72|0;q=e+80|0;r=e+240|0;s=e+248|0;t=c[h+4>>2]&74;if((t|0)==8){u=16}else if((t|0)==64){u=8}else if((t|0)==0){u=0}else{u=10}t=l;vj(n,h,t,m);h=o;c[h+0>>2]=0;c[h+4>>2]=0;c[h+8>>2]=0;Wg(o,10,0);if((a[h]&1)==0){l=o+1|0;v=l;w=o+8|0;x=l}else{l=o+8|0;v=o+1|0;w=l;x=c[l>>2]|0}c[p>>2]=x;l=q;c[r>>2]=l;c[s>>2]=0;y=f;f=g;g=o;z=o+4|0;A=a[m]|0;m=c[y>>2]|0;B=x;a:while(1){do{if((m|0)==0){C=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){C=m;break}if(!((td[c[(c[m>>2]|0)+36>>2]&63](m)|0)==-1)){C=m;break}c[y>>2]=0;C=0}}while(0);x=(C|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=18}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){if(x){F=D;break}else{G=D;H=B;break a}}if((td[c[(c[D>>2]|0)+36>>2]&63](D)|0)==-1){c[f>>2]=0;E=18;break}else{if(x){F=D;break}else{G=D;H=B;break a}}}}while(0);if((E|0)==18){E=0;if(x){G=0;H=B;break}else{F=0}}D=a[h]|0;I=(D&1)==0;if(I){J=(D&255)>>>1}else{J=c[z>>2]|0}if(((c[p>>2]|0)-B|0)==(J|0)){if(I){K=(D&255)>>>1;L=(D&255)>>>1}else{D=c[z>>2]|0;K=D;L=D}Wg(o,L<<1,0);if((a[h]&1)==0){M=10}else{M=(c[g>>2]&-2)+ -1|0}Wg(o,M,0);if((a[h]&1)==0){N=v}else{N=c[w>>2]|0}c[p>>2]=N+K;O=N}else{O=B}D=C+12|0;I=c[D>>2]|0;P=C+16|0;if((I|0)==(c[P>>2]|0)){Q=td[c[(c[C>>2]|0)+36>>2]&63](C)|0}else{Q=d[I]|0}if((Xi(Q&255,u,O,p,s,A,n,l,r,t)|0)!=0){G=F;H=O;break}I=c[D>>2]|0;if((I|0)==(c[P>>2]|0)){td[c[(c[C>>2]|0)+40>>2]&63](C)|0;m=C;B=O;continue}else{c[D>>2]=I+1;m=C;B=O;continue}}O=a[n]|0;if((O&1)==0){R=(O&255)>>>1}else{R=c[n+4>>2]|0}do{if((R|0)!=0){O=c[r>>2]|0;if((O-q|0)>=160){break}B=c[s>>2]|0;c[r>>2]=O+4;c[O>>2]=B}}while(0);c[k>>2]=no(H,c[p>>2]|0,j,u)|0;Hl(n,l,c[r>>2]|0,j);do{if((C|0)==0){S=0}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){S=C;break}if(!((td[c[(c[C>>2]|0)+36>>2]&63](C)|0)==-1)){S=C;break}c[y>>2]=0;S=0}}while(0);y=(S|0)==0;do{if((G|0)==0){E=54}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(!y){break}T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}if((td[c[(c[G>>2]|0)+36>>2]&63](G)|0)==-1){c[f>>2]=0;E=54;break}if(!(y^(G|0)==0)){break}T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}}while(0);do{if((E|0)==54){if(y){break}T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}function Mi(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];Ni(a,0,k,j,f,g,h);i=b;return}function Ni(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;e=i;i=i+256|0;l=e;m=e+32|0;n=e+40|0;o=e+56|0;p=e+72|0;q=e+80|0;r=e+240|0;s=e+248|0;t=c[h+4>>2]&74;if((t|0)==8){u=16}else if((t|0)==0){u=0}else if((t|0)==64){u=8}else{u=10}t=l;vj(n,h,t,m);h=o;c[h+0>>2]=0;c[h+4>>2]=0;c[h+8>>2]=0;Wg(o,10,0);if((a[h]&1)==0){l=o+1|0;v=l;w=o+8|0;x=l}else{l=o+8|0;v=o+1|0;w=l;x=c[l>>2]|0}c[p>>2]=x;l=q;c[r>>2]=l;c[s>>2]=0;y=f;f=g;g=o;z=o+4|0;A=a[m]|0;m=c[y>>2]|0;B=x;a:while(1){do{if((m|0)==0){C=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){C=m;break}if(!((td[c[(c[m>>2]|0)+36>>2]&63](m)|0)==-1)){C=m;break}c[y>>2]=0;C=0}}while(0);x=(C|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=18}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){if(x){F=D;break}else{G=D;H=B;break a}}if((td[c[(c[D>>2]|0)+36>>2]&63](D)|0)==-1){c[f>>2]=0;E=18;break}else{if(x){F=D;break}else{G=D;H=B;break a}}}}while(0);if((E|0)==18){E=0;if(x){G=0;H=B;break}else{F=0}}D=a[h]|0;I=(D&1)==0;if(I){J=(D&255)>>>1}else{J=c[z>>2]|0}if(((c[p>>2]|0)-B|0)==(J|0)){if(I){K=(D&255)>>>1;L=(D&255)>>>1}else{D=c[z>>2]|0;K=D;L=D}Wg(o,L<<1,0);if((a[h]&1)==0){M=10}else{M=(c[g>>2]&-2)+ -1|0}Wg(o,M,0);if((a[h]&1)==0){N=v}else{N=c[w>>2]|0}c[p>>2]=N+K;O=N}else{O=B}D=C+12|0;I=c[D>>2]|0;P=C+16|0;if((I|0)==(c[P>>2]|0)){Q=td[c[(c[C>>2]|0)+36>>2]&63](C)|0}else{Q=d[I]|0}if((Xi(Q&255,u,O,p,s,A,n,l,r,t)|0)!=0){G=F;H=O;break}I=c[D>>2]|0;if((I|0)==(c[P>>2]|0)){td[c[(c[C>>2]|0)+40>>2]&63](C)|0;m=C;B=O;continue}else{c[D>>2]=I+1;m=C;B=O;continue}}O=a[n]|0;if((O&1)==0){R=(O&255)>>>1}else{R=c[n+4>>2]|0}do{if((R|0)!=0){O=c[r>>2]|0;if((O-q|0)>=160){break}B=c[s>>2]|0;c[r>>2]=O+4;c[O>>2]=B}}while(0);c[k>>2]=mo(H,c[p>>2]|0,j,u)|0;Hl(n,l,c[r>>2]|0,j);do{if((C|0)==0){S=0}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){S=C;break}if(!((td[c[(c[C>>2]|0)+36>>2]&63](C)|0)==-1)){S=C;break}c[y>>2]=0;S=0}}while(0);y=(S|0)==0;do{if((G|0)==0){E=54}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(!y){break}T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}if((td[c[(c[G>>2]|0)+36>>2]&63](G)|0)==-1){c[f>>2]=0;E=54;break}if(!(y^(G|0)==0)){break}T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}}while(0);do{if((E|0)==54){if(y){break}T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;T=b;c[T>>2]=S;Ug(o);Ug(n);i=e;return}function Oi(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];Pi(a,0,k,j,f,g,h);i=b;return}function Pi(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;e=i;i=i+256|0;l=e;m=e+32|0;n=e+40|0;o=e+56|0;p=e+72|0;q=e+80|0;r=e+240|0;s=e+248|0;t=c[h+4>>2]&74;if((t|0)==64){u=8}else if((t|0)==8){u=16}else if((t|0)==0){u=0}else{u=10}t=l;vj(n,h,t,m);h=o;c[h+0>>2]=0;c[h+4>>2]=0;c[h+8>>2]=0;Wg(o,10,0);if((a[h]&1)==0){l=o+1|0;v=l;w=o+8|0;x=l}else{l=o+8|0;v=o+1|0;w=l;x=c[l>>2]|0}c[p>>2]=x;l=q;c[r>>2]=l;c[s>>2]=0;y=f;f=g;g=o;z=o+4|0;A=a[m]|0;m=c[y>>2]|0;B=x;a:while(1){do{if((m|0)==0){C=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){C=m;break}if(!((td[c[(c[m>>2]|0)+36>>2]&63](m)|0)==-1)){C=m;break}c[y>>2]=0;C=0}}while(0);x=(C|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=18}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){if(x){F=D;break}else{G=D;H=B;break a}}if((td[c[(c[D>>2]|0)+36>>2]&63](D)|0)==-1){c[f>>2]=0;E=18;break}else{if(x){F=D;break}else{G=D;H=B;break a}}}}while(0);if((E|0)==18){E=0;if(x){G=0;H=B;break}else{F=0}}D=a[h]|0;I=(D&1)==0;if(I){K=(D&255)>>>1}else{K=c[z>>2]|0}if(((c[p>>2]|0)-B|0)==(K|0)){if(I){L=(D&255)>>>1;M=(D&255)>>>1}else{D=c[z>>2]|0;L=D;M=D}Wg(o,M<<1,0);if((a[h]&1)==0){N=10}else{N=(c[g>>2]&-2)+ -1|0}Wg(o,N,0);if((a[h]&1)==0){O=v}else{O=c[w>>2]|0}c[p>>2]=O+L;P=O}else{P=B}D=C+12|0;I=c[D>>2]|0;Q=C+16|0;if((I|0)==(c[Q>>2]|0)){R=td[c[(c[C>>2]|0)+36>>2]&63](C)|0}else{R=d[I]|0}if((Xi(R&255,u,P,p,s,A,n,l,r,t)|0)!=0){G=F;H=P;break}I=c[D>>2]|0;if((I|0)==(c[Q>>2]|0)){td[c[(c[C>>2]|0)+40>>2]&63](C)|0;m=C;B=P;continue}else{c[D>>2]=I+1;m=C;B=P;continue}}P=a[n]|0;if((P&1)==0){S=(P&255)>>>1}else{S=c[n+4>>2]|0}do{if((S|0)!=0){P=c[r>>2]|0;if((P-q|0)>=160){break}B=c[s>>2]|0;c[r>>2]=P+4;c[P>>2]=B}}while(0);s=lo(H,c[p>>2]|0,j,u)|0;u=k;c[u>>2]=s;c[u+4>>2]=J;Hl(n,l,c[r>>2]|0,j);do{if((C|0)==0){T=0}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){T=C;break}if(!((td[c[(c[C>>2]|0)+36>>2]&63](C)|0)==-1)){T=C;break}c[y>>2]=0;T=0}}while(0);y=(T|0)==0;do{if((G|0)==0){E=54}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(!y){break}U=b;c[U>>2]=T;Ug(o);Ug(n);i=e;return}if((td[c[(c[G>>2]|0)+36>>2]&63](G)|0)==-1){c[f>>2]=0;E=54;break}if(!(y^(G|0)==0)){break}U=b;c[U>>2]=T;Ug(o);Ug(n);i=e;return}}while(0);do{if((E|0)==54){if(y){break}U=b;c[U>>2]=T;Ug(o);Ug(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;U=b;c[U>>2]=T;Ug(o);Ug(n);i=e;return}function Qi(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];Ri(a,0,k,j,f,g,h);i=b;return}function Ri(b,e,f,h,j,k,l){b=b|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0;e=i;i=i+280|0;m=e+32|0;n=e+40|0;o=e+48|0;p=e+64|0;q=e+80|0;r=e+88|0;s=e+248|0;t=e+256|0;u=e+264|0;v=e+272|0;w=e;wj(o,j,w,m,n);j=p;c[j+0>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;Wg(p,10,0);if((a[j]&1)==0){x=p+1|0;y=x;z=p+8|0;A=x}else{x=p+8|0;y=p+1|0;z=x;A=c[x>>2]|0}c[q>>2]=A;x=r;c[s>>2]=x;c[t>>2]=0;a[u]=1;a[v]=69;B=f;f=h;h=p;C=p+4|0;D=a[m]|0;m=a[n]|0;n=c[B>>2]|0;E=A;a:while(1){do{if((n|0)==0){F=0}else{if((c[n+12>>2]|0)!=(c[n+16>>2]|0)){F=n;break}if(!((td[c[(c[n>>2]|0)+36>>2]&63](n)|0)==-1)){F=n;break}c[B>>2]=0;F=0}}while(0);A=(F|0)==0;G=c[f>>2]|0;do{if((G|0)==0){H=14}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(A){I=G;break}else{J=G;K=E;break a}}if((td[c[(c[G>>2]|0)+36>>2]&63](G)|0)==-1){c[f>>2]=0;H=14;break}else{if(A){I=G;break}else{J=G;K=E;break a}}}}while(0);if((H|0)==14){H=0;if(A){J=0;K=E;break}else{I=0}}G=a[j]|0;L=(G&1)==0;if(L){M=(G&255)>>>1}else{M=c[C>>2]|0}if(((c[q>>2]|0)-E|0)==(M|0)){if(L){N=(G&255)>>>1;O=(G&255)>>>1}else{G=c[C>>2]|0;N=G;O=G}Wg(p,O<<1,0);if((a[j]&1)==0){P=10}else{P=(c[h>>2]&-2)+ -1|0}Wg(p,P,0);if((a[j]&1)==0){Q=y}else{Q=c[z>>2]|0}c[q>>2]=Q+N;R=Q}else{R=E}G=F+12|0;L=c[G>>2]|0;S=F+16|0;if((L|0)==(c[S>>2]|0)){T=td[c[(c[F>>2]|0)+36>>2]&63](F)|0}else{T=d[L]|0}if((xj(T&255,u,v,R,q,D,m,o,x,s,t,w)|0)!=0){J=I;K=R;break}L=c[G>>2]|0;if((L|0)==(c[S>>2]|0)){td[c[(c[F>>2]|0)+40>>2]&63](F)|0;n=F;E=R;continue}else{c[G>>2]=L+1;n=F;E=R;continue}}R=a[o]|0;if((R&1)==0){U=(R&255)>>>1}else{U=c[o+4>>2]|0}do{if((U|0)!=0){if((a[u]|0)==0){break}R=c[s>>2]|0;if((R-r|0)>=160){break}E=c[t>>2]|0;c[s>>2]=R+4;c[R>>2]=E}}while(0);g[l>>2]=+ko(K,c[q>>2]|0,k);Hl(o,x,c[s>>2]|0,k);do{if((F|0)==0){V=0}else{if((c[F+12>>2]|0)!=(c[F+16>>2]|0)){V=F;break}if(!((td[c[(c[F>>2]|0)+36>>2]&63](F)|0)==-1)){V=F;break}c[B>>2]=0;V=0}}while(0);B=(V|0)==0;do{if((J|0)==0){H=51}else{if((c[J+12>>2]|0)!=(c[J+16>>2]|0)){if(!B){break}W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}if((td[c[(c[J>>2]|0)+36>>2]&63](J)|0)==-1){c[f>>2]=0;H=51;break}if(!(B^(J|0)==0)){break}W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}}while(0);do{if((H|0)==51){if(B){break}W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}function Si(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];Ti(a,0,k,j,f,g,h);i=b;return}function Ti(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0;e=i;i=i+280|0;m=e+32|0;n=e+40|0;o=e+48|0;p=e+64|0;q=e+80|0;r=e+88|0;s=e+248|0;t=e+256|0;u=e+264|0;v=e+272|0;w=e;wj(o,j,w,m,n);j=p;c[j+0>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;Wg(p,10,0);if((a[j]&1)==0){x=p+1|0;y=x;z=p+8|0;A=x}else{x=p+8|0;y=p+1|0;z=x;A=c[x>>2]|0}c[q>>2]=A;x=r;c[s>>2]=x;c[t>>2]=0;a[u]=1;a[v]=69;B=f;f=g;g=p;C=p+4|0;D=a[m]|0;m=a[n]|0;n=c[B>>2]|0;E=A;a:while(1){do{if((n|0)==0){F=0}else{if((c[n+12>>2]|0)!=(c[n+16>>2]|0)){F=n;break}if(!((td[c[(c[n>>2]|0)+36>>2]&63](n)|0)==-1)){F=n;break}c[B>>2]=0;F=0}}while(0);A=(F|0)==0;G=c[f>>2]|0;do{if((G|0)==0){H=14}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(A){I=G;break}else{J=G;K=E;break a}}if((td[c[(c[G>>2]|0)+36>>2]&63](G)|0)==-1){c[f>>2]=0;H=14;break}else{if(A){I=G;break}else{J=G;K=E;break a}}}}while(0);if((H|0)==14){H=0;if(A){J=0;K=E;break}else{I=0}}G=a[j]|0;L=(G&1)==0;if(L){M=(G&255)>>>1}else{M=c[C>>2]|0}if(((c[q>>2]|0)-E|0)==(M|0)){if(L){N=(G&255)>>>1;O=(G&255)>>>1}else{G=c[C>>2]|0;N=G;O=G}Wg(p,O<<1,0);if((a[j]&1)==0){P=10}else{P=(c[g>>2]&-2)+ -1|0}Wg(p,P,0);if((a[j]&1)==0){Q=y}else{Q=c[z>>2]|0}c[q>>2]=Q+N;R=Q}else{R=E}G=F+12|0;L=c[G>>2]|0;S=F+16|0;if((L|0)==(c[S>>2]|0)){T=td[c[(c[F>>2]|0)+36>>2]&63](F)|0}else{T=d[L]|0}if((xj(T&255,u,v,R,q,D,m,o,x,s,t,w)|0)!=0){J=I;K=R;break}L=c[G>>2]|0;if((L|0)==(c[S>>2]|0)){td[c[(c[F>>2]|0)+40>>2]&63](F)|0;n=F;E=R;continue}else{c[G>>2]=L+1;n=F;E=R;continue}}R=a[o]|0;if((R&1)==0){U=(R&255)>>>1}else{U=c[o+4>>2]|0}do{if((U|0)!=0){if((a[u]|0)==0){break}R=c[s>>2]|0;if((R-r|0)>=160){break}E=c[t>>2]|0;c[s>>2]=R+4;c[R>>2]=E}}while(0);h[l>>3]=+jo(K,c[q>>2]|0,k);Hl(o,x,c[s>>2]|0,k);do{if((F|0)==0){V=0}else{if((c[F+12>>2]|0)!=(c[F+16>>2]|0)){V=F;break}if(!((td[c[(c[F>>2]|0)+36>>2]&63](F)|0)==-1)){V=F;break}c[B>>2]=0;V=0}}while(0);B=(V|0)==0;do{if((J|0)==0){H=51}else{if((c[J+12>>2]|0)!=(c[J+16>>2]|0)){if(!B){break}W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}if((td[c[(c[J>>2]|0)+36>>2]&63](J)|0)==-1){c[f>>2]=0;H=51;break}if(!(B^(J|0)==0)){break}W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}}while(0);do{if((H|0)==51){if(B){break}W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}function Ui(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];Vi(a,0,k,j,f,g,h);i=b;return}function Vi(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0;e=i;i=i+280|0;m=e+32|0;n=e+40|0;o=e+48|0;p=e+64|0;q=e+80|0;r=e+88|0;s=e+248|0;t=e+256|0;u=e+264|0;v=e+272|0;w=e;wj(o,j,w,m,n);j=p;c[j+0>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;Wg(p,10,0);if((a[j]&1)==0){x=p+1|0;y=x;z=p+8|0;A=x}else{x=p+8|0;y=p+1|0;z=x;A=c[x>>2]|0}c[q>>2]=A;x=r;c[s>>2]=x;c[t>>2]=0;a[u]=1;a[v]=69;B=f;f=g;g=p;C=p+4|0;D=a[m]|0;m=a[n]|0;n=c[B>>2]|0;E=A;a:while(1){do{if((n|0)==0){F=0}else{if((c[n+12>>2]|0)!=(c[n+16>>2]|0)){F=n;break}if(!((td[c[(c[n>>2]|0)+36>>2]&63](n)|0)==-1)){F=n;break}c[B>>2]=0;F=0}}while(0);A=(F|0)==0;G=c[f>>2]|0;do{if((G|0)==0){H=14}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(A){I=G;break}else{J=G;K=E;break a}}if((td[c[(c[G>>2]|0)+36>>2]&63](G)|0)==-1){c[f>>2]=0;H=14;break}else{if(A){I=G;break}else{J=G;K=E;break a}}}}while(0);if((H|0)==14){H=0;if(A){J=0;K=E;break}else{I=0}}G=a[j]|0;L=(G&1)==0;if(L){M=(G&255)>>>1}else{M=c[C>>2]|0}if(((c[q>>2]|0)-E|0)==(M|0)){if(L){N=(G&255)>>>1;O=(G&255)>>>1}else{G=c[C>>2]|0;N=G;O=G}Wg(p,O<<1,0);if((a[j]&1)==0){P=10}else{P=(c[g>>2]&-2)+ -1|0}Wg(p,P,0);if((a[j]&1)==0){Q=y}else{Q=c[z>>2]|0}c[q>>2]=Q+N;R=Q}else{R=E}G=F+12|0;L=c[G>>2]|0;S=F+16|0;if((L|0)==(c[S>>2]|0)){T=td[c[(c[F>>2]|0)+36>>2]&63](F)|0}else{T=d[L]|0}if((xj(T&255,u,v,R,q,D,m,o,x,s,t,w)|0)!=0){J=I;K=R;break}L=c[G>>2]|0;if((L|0)==(c[S>>2]|0)){td[c[(c[F>>2]|0)+40>>2]&63](F)|0;n=F;E=R;continue}else{c[G>>2]=L+1;n=F;E=R;continue}}R=a[o]|0;if((R&1)==0){U=(R&255)>>>1}else{U=c[o+4>>2]|0}do{if((U|0)!=0){if((a[u]|0)==0){break}R=c[s>>2]|0;if((R-r|0)>=160){break}E=c[t>>2]|0;c[s>>2]=R+4;c[R>>2]=E}}while(0);h[l>>3]=+io(K,c[q>>2]|0,k);Hl(o,x,c[s>>2]|0,k);do{if((F|0)==0){V=0}else{if((c[F+12>>2]|0)!=(c[F+16>>2]|0)){V=F;break}if(!((td[c[(c[F>>2]|0)+36>>2]&63](F)|0)==-1)){V=F;break}c[B>>2]=0;V=0}}while(0);B=(V|0)==0;do{if((J|0)==0){H=51}else{if((c[J+12>>2]|0)!=(c[J+16>>2]|0)){if(!B){break}W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}if((td[c[(c[J>>2]|0)+36>>2]&63](J)|0)==-1){c[f>>2]=0;H=51;break}if(!(B^(J|0)==0)){break}W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}}while(0);do{if((H|0)==51){if(B){break}W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;W=b;c[W>>2]=V;Ug(p);Ug(o);i=e;return}function Wi(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0;e=i;i=i+8|0;l=e;m=i;i=i+16|0;n=i;i=i+32|0;o=i;i=i+16|0;p=i;i=i+8|0;q=i;i=i+16|0;r=i;i=i+160|0;s=o;c[s+0>>2]=0;c[s+4>>2]=0;c[s+8>>2]=0;mh(p,h);h=p;p=c[h>>2]|0;if(!((c[4366]|0)==-1)){c[m>>2]=17464;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17464,m,114)}m=(c[17468>>2]|0)+ -1|0;t=c[p+8>>2]|0;if(!((c[p+12>>2]|0)-t>>2>>>0>m>>>0)){u=bc(4)|0;v=u;Mo(v);gd(u|0,25424,101)}p=c[t+(m<<2)>>2]|0;if((p|0)==0){u=bc(4)|0;v=u;Mo(v);gd(u|0,25424,101)}u=n;zd[c[(c[p>>2]|0)+32>>2]&7](p,16008,16034|0,u)|0;vg(c[h>>2]|0)|0;h=q;c[h+0>>2]=0;c[h+4>>2]=0;c[h+8>>2]=0;Wg(q,10,0);if((a[h]&1)==0){p=q+1|0;w=p;x=q+8|0;y=p}else{p=q+8|0;w=q+1|0;x=p;y=c[p>>2]|0}p=f;f=g;g=q;v=q+4|0;m=n+24|0;t=n+25|0;z=r;A=n+26|0;B=n;n=o+4|0;C=c[p>>2]|0;D=y;E=r;r=0;F=y;a:while(1){do{if((C|0)==0){G=0}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){G=C;break}if(!((td[c[(c[C>>2]|0)+36>>2]&63](C)|0)==-1)){G=C;break}c[p>>2]=0;G=0}}while(0);y=(G|0)==0;H=c[f>>2]|0;do{if((H|0)==0){I=19}else{if((c[H+12>>2]|0)!=(c[H+16>>2]|0)){if(y){break}else{J=F;break a}}if((td[c[(c[H>>2]|0)+36>>2]&63](H)|0)==-1){c[f>>2]=0;I=19;break}else{if(y){break}else{J=F;break a}}}}while(0);if((I|0)==19){I=0;if(y){J=F;break}}H=a[h]|0;K=(H&1)==0;if(K){L=(H&255)>>>1}else{L=c[v>>2]|0}if((D-F|0)==(L|0)){if(K){M=(H&255)>>>1;N=(H&255)>>>1}else{H=c[v>>2]|0;M=H;N=H}Wg(q,N<<1,0);if((a[h]&1)==0){O=10}else{O=(c[g>>2]&-2)+ -1|0}Wg(q,O,0);if((a[h]&1)==0){P=w}else{P=c[x>>2]|0}Q=P+M|0;R=P}else{Q=D;R=F}H=c[G+12>>2]|0;if((H|0)==(c[G+16>>2]|0)){S=td[c[(c[G>>2]|0)+36>>2]&63](G)|0}else{S=d[H]|0}H=S&255;K=(Q|0)==(R|0);do{if(K){T=(a[m]|0)==H<<24>>24;if(!T){if(!((a[t]|0)==H<<24>>24)){I=40;break}}a[Q]=T?43:45;U=Q+1|0;V=E;W=0}else{I=40}}while(0);do{if((I|0)==40){I=0;y=a[s]|0;if((y&1)==0){X=(y&255)>>>1}else{X=c[n>>2]|0}if((X|0)!=0&H<<24>>24==0){if((E-z|0)>=160){U=Q;V=E;W=r;break}c[E>>2]=r;U=Q;V=E+4|0;W=0;break}else{Y=u}while(1){y=Y+1|0;if((a[Y]|0)==H<<24>>24){Z=Y;break}if((y|0)==(A|0)){Z=A;break}else{Y=y}}y=Z-B|0;if((y|0)>23){J=R;break a}if((y|0)<22){a[Q]=a[16008+y|0]|0;U=Q+1|0;V=E;W=r+1|0;break}if(K){J=Q;break a}if((Q-R|0)>=3){J=R;break a}if((a[Q+ -1|0]|0)!=48){J=R;break a}a[Q]=a[16008+y|0]|0;U=Q+1|0;V=E;W=0}}while(0);K=c[p>>2]|0;H=K+12|0;y=c[H>>2]|0;if((y|0)==(c[K+16>>2]|0)){td[c[(c[K>>2]|0)+40>>2]&63](K)|0;C=K;D=U;E=V;r=W;F=R;continue}else{c[H>>2]=y+1;C=K;D=U;E=V;r=W;F=R;continue}}a[J+3|0]=0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);R=c[4338]|0;c[l>>2]=k;if((Yi(J,R,16048,l)|0)!=1){c[j>>2]=4}l=c[p>>2]|0;do{if((l|0)==0){_=0}else{if((c[l+12>>2]|0)!=(c[l+16>>2]|0)){_=l;break}if(!((td[c[(c[l>>2]|0)+36>>2]&63](l)|0)==-1)){_=l;break}c[p>>2]=0;_=0}}while(0);p=(_|0)==0;l=c[f>>2]|0;do{if((l|0)==0){I=72}else{if((c[l+12>>2]|0)!=(c[l+16>>2]|0)){if(!p){break}$=b;c[$>>2]=_;Ug(q);Ug(o);i=e;return}if((td[c[(c[l>>2]|0)+36>>2]&63](l)|0)==-1){c[f>>2]=0;I=72;break}if(!(p^(l|0)==0)){break}$=b;c[$>>2]=_;Ug(q);Ug(o);i=e;return}}while(0);do{if((I|0)==72){if(p){break}$=b;c[$>>2]=_;Ug(q);Ug(o);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;$=b;c[$>>2]=_;Ug(q);Ug(o);i=e;return}function Xi(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0;n=i;o=c[f>>2]|0;p=(o|0)==(e|0);do{if(p){q=(a[m+24|0]|0)==b<<24>>24;if(!q){if(!((a[m+25|0]|0)==b<<24>>24)){break}}c[f>>2]=e+1;a[e]=q?43:45;c[g>>2]=0;r=0;i=n;return r|0}}while(0);q=a[j]|0;if((q&1)==0){s=(q&255)>>>1}else{s=c[j+4>>2]|0}if((s|0)!=0&b<<24>>24==h<<24>>24){h=c[l>>2]|0;if((h-k|0)>=160){r=0;i=n;return r|0}k=c[g>>2]|0;c[l>>2]=h+4;c[h>>2]=k;c[g>>2]=0;r=0;i=n;return r|0}k=m+26|0;h=m;while(1){l=h+1|0;if((a[h]|0)==b<<24>>24){t=h;break}if((l|0)==(k|0)){t=k;break}else{h=l}}h=t-m|0;if((h|0)>23){r=-1;i=n;return r|0}do{if((d|0)==10|(d|0)==8){if((h|0)<(d|0)){break}else{r=-1}i=n;return r|0}else if((d|0)==16){if((h|0)<22){break}if(p){r=-1;i=n;return r|0}if((o-e|0)>=3){r=-1;i=n;return r|0}if((a[o+ -1|0]|0)!=48){r=-1;i=n;return r|0}c[g>>2]=0;m=a[16008+h|0]|0;c[f>>2]=o+1;a[o]=m;r=0;i=n;return r|0}}while(0);e=a[16008+h|0]|0;c[f>>2]=o+1;a[o]=e;c[g>>2]=(c[g>>2]|0)+1;r=0;i=n;return r|0}function Yi(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+16|0;g=f;c[g>>2]=e;e=fc(b|0)|0;b=Ga(a|0,d|0,g|0)|0;if((e|0)==0){i=f;return b|0}fc(e|0)|0;i=f;return b|0}function Zi(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function _i(a){a=a|0;i=i;return}function $i(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;k=i;i=i+136|0;l=k;m=k+8|0;n=k+16|0;o=k+24|0;p=k+40|0;q=k+56|0;r=k+64|0;s=k+72|0;t=k+80|0;u=k+88|0;v=k+96|0;w=k+104|0;x=k+128|0;if((c[g+4>>2]&1|0)==0){c[q>>2]=-1;y=c[(c[d>>2]|0)+16>>2]|0;z=e;c[s>>2]=c[z>>2];c[t>>2]=c[f>>2];A=n;B=s;c[A+0>>2]=c[B+0>>2];B=m;A=t;c[B+0>>2]=c[A+0>>2];od[y&63](r,d,n,m,g,h,q);m=c[r>>2]|0;c[z>>2]=m;z=c[q>>2]|0;if((z|0)==1){a[j]=1}else if((z|0)==0){a[j]=0}else{a[j]=1;c[h>>2]=4}c[b>>2]=m;i=k;return}mh(u,g);m=u;u=c[m>>2]|0;if(!((c[4364]|0)==-1)){c[p>>2]=17456;c[p+4>>2]=113;c[p+8>>2]=0;Pg(17456,p,114)}p=(c[17460>>2]|0)+ -1|0;z=c[u+8>>2]|0;if(!((c[u+12>>2]|0)-z>>2>>>0>p>>>0)){C=bc(4)|0;D=C;Mo(D);gd(C|0,25424,101)}u=c[z+(p<<2)>>2]|0;if((u|0)==0){C=bc(4)|0;D=C;Mo(D);gd(C|0,25424,101)}C=u;vg(c[m>>2]|0)|0;mh(v,g);g=v;v=c[g>>2]|0;if(!((c[4404]|0)==-1)){c[o>>2]=17616;c[o+4>>2]=113;c[o+8>>2]=0;Pg(17616,o,114)}o=(c[17620>>2]|0)+ -1|0;m=c[v+8>>2]|0;if(!((c[v+12>>2]|0)-m>>2>>>0>o>>>0)){E=bc(4)|0;F=E;Mo(F);gd(E|0,25424,101)}v=c[m+(o<<2)>>2]|0;if((v|0)==0){E=bc(4)|0;F=E;Mo(F);gd(E|0,25424,101)}E=v;vg(c[g>>2]|0)|0;g=w;F=v;rd[c[(c[F>>2]|0)+24>>2]&63](g,E);rd[c[(c[F>>2]|0)+28>>2]&63](w+12|0,E);c[x>>2]=c[f>>2];f=w+24|0;E=l;F=x;c[E+0>>2]=c[F+0>>2];F=aj(e,l,g,f,C,h,1)|0;a[j]=(F|0)==(g|0)|0;c[b>>2]=c[e>>2];dh(w+12|0);dh(w);i=k;return}function aj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0;k=i;i=i+104|0;l=(f-e|0)/12|0;m=k;do{if(l>>>0>100){n=fp(l)|0;if((n|0)!=0){o=n;p=n;break}rp()}else{o=0;p=m}}while(0);m=(e|0)==(f|0);if(m){q=0;r=l}else{n=e;s=0;t=l;l=p;while(1){u=a[n]|0;if((u&1)==0){v=(u&255)>>>1}else{v=c[n+4>>2]|0}if((v|0)==0){a[l]=2;w=s+1|0;x=t+ -1|0}else{a[l]=1;w=s;x=t}u=n+12|0;if((u|0)==(f|0)){q=w;r=x;break}else{n=u;s=w;t=x;l=l+1|0}}}l=b;b=d;d=g;x=0;t=q;q=r;a:while(1){r=c[l>>2]|0;do{if((r|0)==0){y=1}else{w=c[r+12>>2]|0;if((w|0)==(c[r+16>>2]|0)){z=td[c[(c[r>>2]|0)+36>>2]&63](r)|0}else{z=c[w>>2]|0}if((z|0)==-1){c[l>>2]=0;y=1;break}else{y=(c[l>>2]|0)==0;break}}}while(0);r=c[b>>2]|0;do{if((r|0)==0){A=0;B=1}else{w=c[r+12>>2]|0;if((w|0)==(c[r+16>>2]|0)){C=td[c[(c[r>>2]|0)+36>>2]&63](r)|0}else{C=c[w>>2]|0}if(!((C|0)==-1)){A=r;B=0;break}c[b>>2]=0;A=0;B=1}}while(0);D=c[l>>2]|0;if(!((y^B)&(q|0)!=0)){break}r=c[D+12>>2]|0;if((r|0)==(c[D+16>>2]|0)){E=td[c[(c[D>>2]|0)+36>>2]&63](D)|0}else{E=c[r>>2]|0}if(j){F=E}else{F=Cd[c[(c[d>>2]|0)+28>>2]&15](g,E)|0}r=x+1|0;if(m){x=r;q=q;t=t;continue}b:do{if(j){w=0;s=e;n=t;v=q;u=p;while(1){do{if((a[u]|0)==1){G=a[s]|0;H=(G&1)==0;if(H){I=s+4|0}else{I=c[s+8>>2]|0}if((F|0)!=(c[I+(x<<2)>>2]|0)){a[u]=0;J=w;K=n;L=v+ -1|0;break}if(H){M=(G&255)>>>1}else{M=c[s+4>>2]|0}if((M|0)!=(r|0)){J=1;K=n;L=v;break}a[u]=2;J=1;K=n+1|0;L=v+ -1|0}else{J=w;K=n;L=v}}while(0);G=s+12|0;if((G|0)==(f|0)){N=J;O=K;P=L;break b}w=J;s=G;n=K;v=L;u=u+1|0}}else{u=0;v=e;n=t;s=q;w=p;while(1){do{if((a[w]|0)==1){G=v;if((a[G]&1)==0){Q=v+4|0}else{Q=c[v+8>>2]|0}if((F|0)!=(Cd[c[(c[d>>2]|0)+28>>2]&15](g,c[Q+(x<<2)>>2]|0)|0)){a[w]=0;R=u;S=n;T=s+ -1|0;break}H=a[G]|0;if((H&1)==0){U=(H&255)>>>1}else{U=c[v+4>>2]|0}if((U|0)!=(r|0)){R=1;S=n;T=s;break}a[w]=2;R=1;S=n+1|0;T=s+ -1|0}else{R=u;S=n;T=s}}while(0);H=v+12|0;if((H|0)==(f|0)){N=R;O=S;P=T;break b}u=R;v=H;n=S;s=T;w=w+1|0}}}while(0);if(!N){x=r;t=O;q=P;continue}w=c[l>>2]|0;s=w+12|0;n=c[s>>2]|0;if((n|0)==(c[w+16>>2]|0)){td[c[(c[w>>2]|0)+40>>2]&63](w)|0}else{c[s>>2]=n+4}if((P+O|0)>>>0<2){x=r;t=O;q=P;continue}else{V=e;W=O;X=p}while(1){do{if((a[X]|0)==2){n=a[V]|0;if((n&1)==0){Y=(n&255)>>>1}else{Y=c[V+4>>2]|0}if((Y|0)==(r|0)){Z=W;break}a[X]=0;Z=W+ -1|0}else{Z=W}}while(0);n=V+12|0;if((n|0)==(f|0)){x=r;t=Z;q=P;continue a}else{V=n;W=Z;X=X+1|0}}}do{if((D|0)==0){_=1}else{X=c[D+12>>2]|0;if((X|0)==(c[D+16>>2]|0)){$=td[c[(c[D>>2]|0)+36>>2]&63](D)|0}else{$=c[X>>2]|0}if(($|0)==-1){c[l>>2]=0;_=1;break}else{_=(c[l>>2]|0)==0;break}}}while(0);do{if((A|0)==0){aa=85}else{l=c[A+12>>2]|0;if((l|0)==(c[A+16>>2]|0)){ba=td[c[(c[A>>2]|0)+36>>2]&63](A)|0}else{ba=c[l>>2]|0}if((ba|0)==-1){c[b>>2]=0;aa=85;break}else{if(_){break}else{aa=87;break}}}}while(0);if((aa|0)==85){if(_){aa=87}}if((aa|0)==87){c[h>>2]=c[h>>2]|2}c:do{if(m){aa=92}else{if((a[p]|0)==2){ca=e;break}else{da=e;ea=p}while(1){_=da+12|0;b=ea+1|0;if((_|0)==(f|0)){aa=92;break c}if((a[b]|0)==2){ca=_;break}else{ea=b;da=_}}}}while(0);if((aa|0)==92){c[h>>2]=c[h>>2]|4;ca=f}if((o|0)==0){i=k;return ca|0}gp(o);i=k;return ca|0}function bj(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];cj(a,0,k,j,f,g,h);i=b;return}function cj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;d=i;i=i+328|0;k=d;l=d+104|0;m=d+112|0;n=d+128|0;o=d+144|0;p=d+152|0;q=d+312|0;r=d+320|0;s=c[g+4>>2]&74;if((s|0)==0){t=0}else if((s|0)==8){t=16}else if((s|0)==64){t=8}else{t=10}s=k;yj(m,g,s,l);g=n;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;Wg(n,10,0);if((a[g]&1)==0){k=n+1|0;u=k;v=n+8|0;w=k}else{k=n+8|0;u=n+1|0;v=k;w=c[k>>2]|0}c[o>>2]=w;k=p;c[q>>2]=k;c[r>>2]=0;x=e;e=f;f=n;y=n+4|0;z=c[l>>2]|0;l=c[x>>2]|0;A=w;a:while(1){do{if((l|0)==0){B=0;C=1}else{w=c[l+12>>2]|0;if((w|0)==(c[l+16>>2]|0)){D=td[c[(c[l>>2]|0)+36>>2]&63](l)|0}else{D=c[w>>2]|0}if(!((D|0)==-1)){B=l;C=0;break}c[x>>2]=0;B=0;C=1}}while(0);w=c[e>>2]|0;do{if((w|0)==0){E=21}else{F=c[w+12>>2]|0;if((F|0)==(c[w+16>>2]|0)){G=td[c[(c[w>>2]|0)+36>>2]&63](w)|0}else{G=c[F>>2]|0}if((G|0)==-1){c[e>>2]=0;E=21;break}else{if(C){H=w;break}else{I=w;J=A;break a}}}}while(0);if((E|0)==21){E=0;if(C){I=0;J=A;break}else{H=0}}w=a[g]|0;F=(w&1)==0;if(F){K=(w&255)>>>1}else{K=c[y>>2]|0}if(((c[o>>2]|0)-A|0)==(K|0)){if(F){L=(w&255)>>>1;M=(w&255)>>>1}else{w=c[y>>2]|0;L=w;M=w}Wg(n,M<<1,0);if((a[g]&1)==0){N=10}else{N=(c[f>>2]&-2)+ -1|0}Wg(n,N,0);if((a[g]&1)==0){O=u}else{O=c[v>>2]|0}c[o>>2]=O+L;P=O}else{P=A}w=B+12|0;F=c[w>>2]|0;Q=B+16|0;if((F|0)==(c[Q>>2]|0)){R=td[c[(c[B>>2]|0)+36>>2]&63](B)|0}else{R=c[F>>2]|0}if((uj(R,t,P,o,r,z,m,k,q,s)|0)!=0){I=H;J=P;break}F=c[w>>2]|0;if((F|0)==(c[Q>>2]|0)){td[c[(c[B>>2]|0)+40>>2]&63](B)|0;l=B;A=P;continue}else{c[w>>2]=F+4;l=B;A=P;continue}}P=a[m]|0;if((P&1)==0){S=(P&255)>>>1}else{S=c[m+4>>2]|0}do{if((S|0)!=0){P=c[q>>2]|0;if((P-p|0)>=160){break}A=c[r>>2]|0;c[q>>2]=P+4;c[P>>2]=A}}while(0);c[j>>2]=qo(J,c[o>>2]|0,h,t)|0;Hl(m,k,c[q>>2]|0,h);do{if((B|0)==0){T=0;U=1}else{q=c[B+12>>2]|0;if((q|0)==(c[B+16>>2]|0)){V=td[c[(c[B>>2]|0)+36>>2]&63](B)|0}else{V=c[q>>2]|0}if(!((V|0)==-1)){T=B;U=0;break}c[x>>2]=0;T=0;U=1}}while(0);do{if((I|0)==0){E=60}else{x=c[I+12>>2]|0;if((x|0)==(c[I+16>>2]|0)){W=td[c[(c[I>>2]|0)+36>>2]&63](I)|0}else{W=c[x>>2]|0}if((W|0)==-1){c[e>>2]=0;E=60;break}if(!U){break}X=b;c[X>>2]=T;Ug(n);Ug(m);i=d;return}}while(0);do{if((E|0)==60){if(U){break}X=b;c[X>>2]=T;Ug(n);Ug(m);i=d;return}}while(0);c[h>>2]=c[h>>2]|2;X=b;c[X>>2]=T;Ug(n);Ug(m);i=d;return}function dj(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];ej(a,0,k,j,f,g,h);i=b;return}function ej(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;d=i;i=i+328|0;k=d;l=d+104|0;m=d+112|0;n=d+128|0;o=d+144|0;p=d+152|0;q=d+312|0;r=d+320|0;s=c[g+4>>2]&74;if((s|0)==64){t=8}else if((s|0)==0){t=0}else if((s|0)==8){t=16}else{t=10}s=k;yj(m,g,s,l);g=n;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;Wg(n,10,0);if((a[g]&1)==0){k=n+1|0;u=k;v=n+8|0;w=k}else{k=n+8|0;u=n+1|0;v=k;w=c[k>>2]|0}c[o>>2]=w;k=p;c[q>>2]=k;c[r>>2]=0;x=e;e=f;f=n;y=n+4|0;z=c[l>>2]|0;l=c[x>>2]|0;A=w;a:while(1){do{if((l|0)==0){B=0;C=1}else{w=c[l+12>>2]|0;if((w|0)==(c[l+16>>2]|0)){D=td[c[(c[l>>2]|0)+36>>2]&63](l)|0}else{D=c[w>>2]|0}if(!((D|0)==-1)){B=l;C=0;break}c[x>>2]=0;B=0;C=1}}while(0);w=c[e>>2]|0;do{if((w|0)==0){E=21}else{F=c[w+12>>2]|0;if((F|0)==(c[w+16>>2]|0)){G=td[c[(c[w>>2]|0)+36>>2]&63](w)|0}else{G=c[F>>2]|0}if((G|0)==-1){c[e>>2]=0;E=21;break}else{if(C){H=w;break}else{I=w;K=A;break a}}}}while(0);if((E|0)==21){E=0;if(C){I=0;K=A;break}else{H=0}}w=a[g]|0;F=(w&1)==0;if(F){L=(w&255)>>>1}else{L=c[y>>2]|0}if(((c[o>>2]|0)-A|0)==(L|0)){if(F){M=(w&255)>>>1;N=(w&255)>>>1}else{w=c[y>>2]|0;M=w;N=w}Wg(n,N<<1,0);if((a[g]&1)==0){O=10}else{O=(c[f>>2]&-2)+ -1|0}Wg(n,O,0);if((a[g]&1)==0){P=u}else{P=c[v>>2]|0}c[o>>2]=P+M;Q=P}else{Q=A}w=B+12|0;F=c[w>>2]|0;R=B+16|0;if((F|0)==(c[R>>2]|0)){S=td[c[(c[B>>2]|0)+36>>2]&63](B)|0}else{S=c[F>>2]|0}if((uj(S,t,Q,o,r,z,m,k,q,s)|0)!=0){I=H;K=Q;break}F=c[w>>2]|0;if((F|0)==(c[R>>2]|0)){td[c[(c[B>>2]|0)+40>>2]&63](B)|0;l=B;A=Q;continue}else{c[w>>2]=F+4;l=B;A=Q;continue}}Q=a[m]|0;if((Q&1)==0){T=(Q&255)>>>1}else{T=c[m+4>>2]|0}do{if((T|0)!=0){Q=c[q>>2]|0;if((Q-p|0)>=160){break}A=c[r>>2]|0;c[q>>2]=Q+4;c[Q>>2]=A}}while(0);r=po(K,c[o>>2]|0,h,t)|0;t=j;c[t>>2]=r;c[t+4>>2]=J;Hl(m,k,c[q>>2]|0,h);do{if((B|0)==0){U=0;V=1}else{q=c[B+12>>2]|0;if((q|0)==(c[B+16>>2]|0)){W=td[c[(c[B>>2]|0)+36>>2]&63](B)|0}else{W=c[q>>2]|0}if(!((W|0)==-1)){U=B;V=0;break}c[x>>2]=0;U=0;V=1}}while(0);do{if((I|0)==0){E=60}else{x=c[I+12>>2]|0;if((x|0)==(c[I+16>>2]|0)){X=td[c[(c[I>>2]|0)+36>>2]&63](I)|0}else{X=c[x>>2]|0}if((X|0)==-1){c[e>>2]=0;E=60;break}if(!V){break}Y=b;c[Y>>2]=U;Ug(n);Ug(m);i=d;return}}while(0);do{if((E|0)==60){if(V){break}Y=b;c[Y>>2]=U;Ug(n);Ug(m);i=d;return}}while(0);c[h>>2]=c[h>>2]|2;Y=b;c[Y>>2]=U;Ug(n);Ug(m);i=d;return}function fj(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];gj(a,0,k,j,f,g,h);i=b;return}function gj(d,e,f,g,h,j,k){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;e=i;i=i+328|0;l=e;m=e+104|0;n=e+112|0;o=e+128|0;p=e+144|0;q=e+152|0;r=e+312|0;s=e+320|0;t=c[h+4>>2]&74;if((t|0)==8){u=16}else if((t|0)==0){u=0}else if((t|0)==64){u=8}else{u=10}t=l;yj(n,h,t,m);h=o;c[h+0>>2]=0;c[h+4>>2]=0;c[h+8>>2]=0;Wg(o,10,0);if((a[h]&1)==0){l=o+1|0;v=l;w=o+8|0;x=l}else{l=o+8|0;v=o+1|0;w=l;x=c[l>>2]|0}c[p>>2]=x;l=q;c[r>>2]=l;c[s>>2]=0;y=f;f=g;g=o;z=o+4|0;A=c[m>>2]|0;m=c[y>>2]|0;B=x;a:while(1){do{if((m|0)==0){C=0;D=1}else{x=c[m+12>>2]|0;if((x|0)==(c[m+16>>2]|0)){E=td[c[(c[m>>2]|0)+36>>2]&63](m)|0}else{E=c[x>>2]|0}if(!((E|0)==-1)){C=m;D=0;break}c[y>>2]=0;C=0;D=1}}while(0);x=c[f>>2]|0;do{if((x|0)==0){F=21}else{G=c[x+12>>2]|0;if((G|0)==(c[x+16>>2]|0)){H=td[c[(c[x>>2]|0)+36>>2]&63](x)|0}else{H=c[G>>2]|0}if((H|0)==-1){c[f>>2]=0;F=21;break}else{if(D){I=x;break}else{J=x;K=B;break a}}}}while(0);if((F|0)==21){F=0;if(D){J=0;K=B;break}else{I=0}}x=a[h]|0;G=(x&1)==0;if(G){L=(x&255)>>>1}else{L=c[z>>2]|0}if(((c[p>>2]|0)-B|0)==(L|0)){if(G){M=(x&255)>>>1;N=(x&255)>>>1}else{x=c[z>>2]|0;M=x;N=x}Wg(o,N<<1,0);if((a[h]&1)==0){O=10}else{O=(c[g>>2]&-2)+ -1|0}Wg(o,O,0);if((a[h]&1)==0){P=v}else{P=c[w>>2]|0}c[p>>2]=P+M;Q=P}else{Q=B}x=C+12|0;G=c[x>>2]|0;R=C+16|0;if((G|0)==(c[R>>2]|0)){S=td[c[(c[C>>2]|0)+36>>2]&63](C)|0}else{S=c[G>>2]|0}if((uj(S,u,Q,p,s,A,n,l,r,t)|0)!=0){J=I;K=Q;break}G=c[x>>2]|0;if((G|0)==(c[R>>2]|0)){td[c[(c[C>>2]|0)+40>>2]&63](C)|0;m=C;B=Q;continue}else{c[x>>2]=G+4;m=C;B=Q;continue}}Q=a[n]|0;if((Q&1)==0){T=(Q&255)>>>1}else{T=c[n+4>>2]|0}do{if((T|0)!=0){Q=c[r>>2]|0;if((Q-q|0)>=160){break}B=c[s>>2]|0;c[r>>2]=Q+4;c[Q>>2]=B}}while(0);b[k>>1]=oo(K,c[p>>2]|0,j,u)|0;Hl(n,l,c[r>>2]|0,j);do{if((C|0)==0){U=0;V=1}else{r=c[C+12>>2]|0;if((r|0)==(c[C+16>>2]|0)){W=td[c[(c[C>>2]|0)+36>>2]&63](C)|0}else{W=c[r>>2]|0}if(!((W|0)==-1)){U=C;V=0;break}c[y>>2]=0;U=0;V=1}}while(0);do{if((J|0)==0){F=60}else{y=c[J+12>>2]|0;if((y|0)==(c[J+16>>2]|0)){X=td[c[(c[J>>2]|0)+36>>2]&63](J)|0}else{X=c[y>>2]|0}if((X|0)==-1){c[f>>2]=0;F=60;break}if(!V){break}Y=d;c[Y>>2]=U;Ug(o);Ug(n);i=e;return}}while(0);do{if((F|0)==60){if(V){break}Y=d;c[Y>>2]=U;Ug(o);Ug(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;Y=d;c[Y>>2]=U;Ug(o);Ug(n);i=e;return}function hj(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];ij(a,0,k,j,f,g,h);i=b;return}function ij(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;d=i;i=i+328|0;k=d;l=d+104|0;m=d+112|0;n=d+128|0;o=d+144|0;p=d+152|0;q=d+312|0;r=d+320|0;s=c[g+4>>2]&74;if((s|0)==64){t=8}else if((s|0)==8){t=16}else if((s|0)==0){t=0}else{t=10}s=k;yj(m,g,s,l);g=n;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;Wg(n,10,0);if((a[g]&1)==0){k=n+1|0;u=k;v=n+8|0;w=k}else{k=n+8|0;u=n+1|0;v=k;w=c[k>>2]|0}c[o>>2]=w;k=p;c[q>>2]=k;c[r>>2]=0;x=e;e=f;f=n;y=n+4|0;z=c[l>>2]|0;l=c[x>>2]|0;A=w;a:while(1){do{if((l|0)==0){B=0;C=1}else{w=c[l+12>>2]|0;if((w|0)==(c[l+16>>2]|0)){D=td[c[(c[l>>2]|0)+36>>2]&63](l)|0}else{D=c[w>>2]|0}if(!((D|0)==-1)){B=l;C=0;break}c[x>>2]=0;B=0;C=1}}while(0);w=c[e>>2]|0;do{if((w|0)==0){E=21}else{F=c[w+12>>2]|0;if((F|0)==(c[w+16>>2]|0)){G=td[c[(c[w>>2]|0)+36>>2]&63](w)|0}else{G=c[F>>2]|0}if((G|0)==-1){c[e>>2]=0;E=21;break}else{if(C){H=w;break}else{I=w;J=A;break a}}}}while(0);if((E|0)==21){E=0;if(C){I=0;J=A;break}else{H=0}}w=a[g]|0;F=(w&1)==0;if(F){K=(w&255)>>>1}else{K=c[y>>2]|0}if(((c[o>>2]|0)-A|0)==(K|0)){if(F){L=(w&255)>>>1;M=(w&255)>>>1}else{w=c[y>>2]|0;L=w;M=w}Wg(n,M<<1,0);if((a[g]&1)==0){N=10}else{N=(c[f>>2]&-2)+ -1|0}Wg(n,N,0);if((a[g]&1)==0){O=u}else{O=c[v>>2]|0}c[o>>2]=O+L;P=O}else{P=A}w=B+12|0;F=c[w>>2]|0;Q=B+16|0;if((F|0)==(c[Q>>2]|0)){R=td[c[(c[B>>2]|0)+36>>2]&63](B)|0}else{R=c[F>>2]|0}if((uj(R,t,P,o,r,z,m,k,q,s)|0)!=0){I=H;J=P;break}F=c[w>>2]|0;if((F|0)==(c[Q>>2]|0)){td[c[(c[B>>2]|0)+40>>2]&63](B)|0;l=B;A=P;continue}else{c[w>>2]=F+4;l=B;A=P;continue}}P=a[m]|0;if((P&1)==0){S=(P&255)>>>1}else{S=c[m+4>>2]|0}do{if((S|0)!=0){P=c[q>>2]|0;if((P-p|0)>=160){break}A=c[r>>2]|0;c[q>>2]=P+4;c[P>>2]=A}}while(0);c[j>>2]=no(J,c[o>>2]|0,h,t)|0;Hl(m,k,c[q>>2]|0,h);do{if((B|0)==0){T=0;U=1}else{q=c[B+12>>2]|0;if((q|0)==(c[B+16>>2]|0)){V=td[c[(c[B>>2]|0)+36>>2]&63](B)|0}else{V=c[q>>2]|0}if(!((V|0)==-1)){T=B;U=0;break}c[x>>2]=0;T=0;U=1}}while(0);do{if((I|0)==0){E=60}else{x=c[I+12>>2]|0;if((x|0)==(c[I+16>>2]|0)){W=td[c[(c[I>>2]|0)+36>>2]&63](I)|0}else{W=c[x>>2]|0}if((W|0)==-1){c[e>>2]=0;E=60;break}if(!U){break}X=b;c[X>>2]=T;Ug(n);Ug(m);i=d;return}}while(0);do{if((E|0)==60){if(U){break}X=b;c[X>>2]=T;Ug(n);Ug(m);i=d;return}}while(0);c[h>>2]=c[h>>2]|2;X=b;c[X>>2]=T;Ug(n);Ug(m);i=d;return}function jj(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];kj(a,0,k,j,f,g,h);i=b;return}function kj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;d=i;i=i+328|0;k=d;l=d+104|0;m=d+112|0;n=d+128|0;o=d+144|0;p=d+152|0;q=d+312|0;r=d+320|0;s=c[g+4>>2]&74;if((s|0)==64){t=8}else if((s|0)==0){t=0}else if((s|0)==8){t=16}else{t=10}s=k;yj(m,g,s,l);g=n;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;Wg(n,10,0);if((a[g]&1)==0){k=n+1|0;u=k;v=n+8|0;w=k}else{k=n+8|0;u=n+1|0;v=k;w=c[k>>2]|0}c[o>>2]=w;k=p;c[q>>2]=k;c[r>>2]=0;x=e;e=f;f=n;y=n+4|0;z=c[l>>2]|0;l=c[x>>2]|0;A=w;a:while(1){do{if((l|0)==0){B=0;C=1}else{w=c[l+12>>2]|0;if((w|0)==(c[l+16>>2]|0)){D=td[c[(c[l>>2]|0)+36>>2]&63](l)|0}else{D=c[w>>2]|0}if(!((D|0)==-1)){B=l;C=0;break}c[x>>2]=0;B=0;C=1}}while(0);w=c[e>>2]|0;do{if((w|0)==0){E=21}else{F=c[w+12>>2]|0;if((F|0)==(c[w+16>>2]|0)){G=td[c[(c[w>>2]|0)+36>>2]&63](w)|0}else{G=c[F>>2]|0}if((G|0)==-1){c[e>>2]=0;E=21;break}else{if(C){H=w;break}else{I=w;J=A;break a}}}}while(0);if((E|0)==21){E=0;if(C){I=0;J=A;break}else{H=0}}w=a[g]|0;F=(w&1)==0;if(F){K=(w&255)>>>1}else{K=c[y>>2]|0}if(((c[o>>2]|0)-A|0)==(K|0)){if(F){L=(w&255)>>>1;M=(w&255)>>>1}else{w=c[y>>2]|0;L=w;M=w}Wg(n,M<<1,0);if((a[g]&1)==0){N=10}else{N=(c[f>>2]&-2)+ -1|0}Wg(n,N,0);if((a[g]&1)==0){O=u}else{O=c[v>>2]|0}c[o>>2]=O+L;P=O}else{P=A}w=B+12|0;F=c[w>>2]|0;Q=B+16|0;if((F|0)==(c[Q>>2]|0)){R=td[c[(c[B>>2]|0)+36>>2]&63](B)|0}else{R=c[F>>2]|0}if((uj(R,t,P,o,r,z,m,k,q,s)|0)!=0){I=H;J=P;break}F=c[w>>2]|0;if((F|0)==(c[Q>>2]|0)){td[c[(c[B>>2]|0)+40>>2]&63](B)|0;l=B;A=P;continue}else{c[w>>2]=F+4;l=B;A=P;continue}}P=a[m]|0;if((P&1)==0){S=(P&255)>>>1}else{S=c[m+4>>2]|0}do{if((S|0)!=0){P=c[q>>2]|0;if((P-p|0)>=160){break}A=c[r>>2]|0;c[q>>2]=P+4;c[P>>2]=A}}while(0);c[j>>2]=mo(J,c[o>>2]|0,h,t)|0;Hl(m,k,c[q>>2]|0,h);do{if((B|0)==0){T=0;U=1}else{q=c[B+12>>2]|0;if((q|0)==(c[B+16>>2]|0)){V=td[c[(c[B>>2]|0)+36>>2]&63](B)|0}else{V=c[q>>2]|0}if(!((V|0)==-1)){T=B;U=0;break}c[x>>2]=0;T=0;U=1}}while(0);do{if((I|0)==0){E=60}else{x=c[I+12>>2]|0;if((x|0)==(c[I+16>>2]|0)){W=td[c[(c[I>>2]|0)+36>>2]&63](I)|0}else{W=c[x>>2]|0}if((W|0)==-1){c[e>>2]=0;E=60;break}if(!U){break}X=b;c[X>>2]=T;Ug(n);Ug(m);i=d;return}}while(0);do{if((E|0)==60){if(U){break}X=b;c[X>>2]=T;Ug(n);Ug(m);i=d;return}}while(0);c[h>>2]=c[h>>2]|2;X=b;c[X>>2]=T;Ug(n);Ug(m);i=d;return}function lj(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];mj(a,0,k,j,f,g,h);i=b;return}function mj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;d=i;i=i+328|0;k=d;l=d+104|0;m=d+112|0;n=d+128|0;o=d+144|0;p=d+152|0;q=d+312|0;r=d+320|0;s=c[g+4>>2]&74;if((s|0)==0){t=0}else if((s|0)==64){t=8}else if((s|0)==8){t=16}else{t=10}s=k;yj(m,g,s,l);g=n;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;Wg(n,10,0);if((a[g]&1)==0){k=n+1|0;u=k;v=n+8|0;w=k}else{k=n+8|0;u=n+1|0;v=k;w=c[k>>2]|0}c[o>>2]=w;k=p;c[q>>2]=k;c[r>>2]=0;x=e;e=f;f=n;y=n+4|0;z=c[l>>2]|0;l=c[x>>2]|0;A=w;a:while(1){do{if((l|0)==0){B=0;C=1}else{w=c[l+12>>2]|0;if((w|0)==(c[l+16>>2]|0)){D=td[c[(c[l>>2]|0)+36>>2]&63](l)|0}else{D=c[w>>2]|0}if(!((D|0)==-1)){B=l;C=0;break}c[x>>2]=0;B=0;C=1}}while(0);w=c[e>>2]|0;do{if((w|0)==0){E=21}else{F=c[w+12>>2]|0;if((F|0)==(c[w+16>>2]|0)){G=td[c[(c[w>>2]|0)+36>>2]&63](w)|0}else{G=c[F>>2]|0}if((G|0)==-1){c[e>>2]=0;E=21;break}else{if(C){H=w;break}else{I=w;K=A;break a}}}}while(0);if((E|0)==21){E=0;if(C){I=0;K=A;break}else{H=0}}w=a[g]|0;F=(w&1)==0;if(F){L=(w&255)>>>1}else{L=c[y>>2]|0}if(((c[o>>2]|0)-A|0)==(L|0)){if(F){M=(w&255)>>>1;N=(w&255)>>>1}else{w=c[y>>2]|0;M=w;N=w}Wg(n,N<<1,0);if((a[g]&1)==0){O=10}else{O=(c[f>>2]&-2)+ -1|0}Wg(n,O,0);if((a[g]&1)==0){P=u}else{P=c[v>>2]|0}c[o>>2]=P+M;Q=P}else{Q=A}w=B+12|0;F=c[w>>2]|0;R=B+16|0;if((F|0)==(c[R>>2]|0)){S=td[c[(c[B>>2]|0)+36>>2]&63](B)|0}else{S=c[F>>2]|0}if((uj(S,t,Q,o,r,z,m,k,q,s)|0)!=0){I=H;K=Q;break}F=c[w>>2]|0;if((F|0)==(c[R>>2]|0)){td[c[(c[B>>2]|0)+40>>2]&63](B)|0;l=B;A=Q;continue}else{c[w>>2]=F+4;l=B;A=Q;continue}}Q=a[m]|0;if((Q&1)==0){T=(Q&255)>>>1}else{T=c[m+4>>2]|0}do{if((T|0)!=0){Q=c[q>>2]|0;if((Q-p|0)>=160){break}A=c[r>>2]|0;c[q>>2]=Q+4;c[Q>>2]=A}}while(0);r=lo(K,c[o>>2]|0,h,t)|0;t=j;c[t>>2]=r;c[t+4>>2]=J;Hl(m,k,c[q>>2]|0,h);do{if((B|0)==0){U=0;V=1}else{q=c[B+12>>2]|0;if((q|0)==(c[B+16>>2]|0)){W=td[c[(c[B>>2]|0)+36>>2]&63](B)|0}else{W=c[q>>2]|0}if(!((W|0)==-1)){U=B;V=0;break}c[x>>2]=0;U=0;V=1}}while(0);do{if((I|0)==0){E=60}else{x=c[I+12>>2]|0;if((x|0)==(c[I+16>>2]|0)){X=td[c[(c[I>>2]|0)+36>>2]&63](I)|0}else{X=c[x>>2]|0}if((X|0)==-1){c[e>>2]=0;E=60;break}if(!V){break}Y=b;c[Y>>2]=U;Ug(n);Ug(m);i=d;return}}while(0);do{if((E|0)==60){if(V){break}Y=b;c[Y>>2]=U;Ug(n);Ug(m);i=d;return}}while(0);c[h>>2]=c[h>>2]|2;Y=b;c[Y>>2]=U;Ug(n);Ug(m);i=d;return}function nj(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];oj(a,0,k,j,f,g,h);i=b;return}function oj(b,d,e,f,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0;d=i;i=i+376|0;l=d+128|0;m=d+136|0;n=d+144|0;o=d+160|0;p=d+176|0;q=d+184|0;r=d+344|0;s=d+352|0;t=d+360|0;u=d+368|0;v=d;zj(n,h,v,l,m);h=o;c[h+0>>2]=0;c[h+4>>2]=0;c[h+8>>2]=0;Wg(o,10,0);if((a[h]&1)==0){w=o+1|0;x=w;y=o+8|0;z=w}else{w=o+8|0;x=o+1|0;y=w;z=c[w>>2]|0}c[p>>2]=z;w=q;c[r>>2]=w;c[s>>2]=0;a[t]=1;a[u]=69;A=e;e=f;f=o;B=o+4|0;C=c[l>>2]|0;l=c[m>>2]|0;m=c[A>>2]|0;D=z;a:while(1){do{if((m|0)==0){E=0;F=1}else{z=c[m+12>>2]|0;if((z|0)==(c[m+16>>2]|0)){G=td[c[(c[m>>2]|0)+36>>2]&63](m)|0}else{G=c[z>>2]|0}if(!((G|0)==-1)){E=m;F=0;break}c[A>>2]=0;E=0;F=1}}while(0);z=c[e>>2]|0;do{if((z|0)==0){H=17}else{I=c[z+12>>2]|0;if((I|0)==(c[z+16>>2]|0)){J=td[c[(c[z>>2]|0)+36>>2]&63](z)|0}else{J=c[I>>2]|0}if((J|0)==-1){c[e>>2]=0;H=17;break}else{if(F){K=z;break}else{L=z;M=D;break a}}}}while(0);if((H|0)==17){H=0;if(F){L=0;M=D;break}else{K=0}}z=a[h]|0;I=(z&1)==0;if(I){N=(z&255)>>>1}else{N=c[B>>2]|0}if(((c[p>>2]|0)-D|0)==(N|0)){if(I){O=(z&255)>>>1;P=(z&255)>>>1}else{z=c[B>>2]|0;O=z;P=z}Wg(o,P<<1,0);if((a[h]&1)==0){Q=10}else{Q=(c[f>>2]&-2)+ -1|0}Wg(o,Q,0);if((a[h]&1)==0){R=x}else{R=c[y>>2]|0}c[p>>2]=R+O;S=R}else{S=D}z=E+12|0;I=c[z>>2]|0;T=E+16|0;if((I|0)==(c[T>>2]|0)){U=td[c[(c[E>>2]|0)+36>>2]&63](E)|0}else{U=c[I>>2]|0}if((Aj(U,t,u,S,p,C,l,n,w,r,s,v)|0)!=0){L=K;M=S;break}I=c[z>>2]|0;if((I|0)==(c[T>>2]|0)){td[c[(c[E>>2]|0)+40>>2]&63](E)|0;m=E;D=S;continue}else{c[z>>2]=I+4;m=E;D=S;continue}}S=a[n]|0;if((S&1)==0){V=(S&255)>>>1}else{V=c[n+4>>2]|0}do{if((V|0)!=0){if((a[t]|0)==0){break}S=c[r>>2]|0;if((S-q|0)>=160){break}D=c[s>>2]|0;c[r>>2]=S+4;c[S>>2]=D}}while(0);g[k>>2]=+ko(M,c[p>>2]|0,j);Hl(n,w,c[r>>2]|0,j);do{if((E|0)==0){W=0;X=1}else{r=c[E+12>>2]|0;if((r|0)==(c[E+16>>2]|0)){Y=td[c[(c[E>>2]|0)+36>>2]&63](E)|0}else{Y=c[r>>2]|0}if(!((Y|0)==-1)){W=E;X=0;break}c[A>>2]=0;W=0;X=1}}while(0);do{if((L|0)==0){H=57}else{A=c[L+12>>2]|0;if((A|0)==(c[L+16>>2]|0)){Z=td[c[(c[L>>2]|0)+36>>2]&63](L)|0}else{Z=c[A>>2]|0}if((Z|0)==-1){c[e>>2]=0;H=57;break}if(!X){break}_=b;c[_>>2]=W;Ug(o);Ug(n);i=d;return}}while(0);do{if((H|0)==57){if(X){break}_=b;c[_>>2]=W;Ug(o);Ug(n);i=d;return}}while(0);c[j>>2]=c[j>>2]|2;_=b;c[_>>2]=W;Ug(o);Ug(n);i=d;return}function pj(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];qj(a,0,k,j,f,g,h);i=b;return}function qj(b,d,e,f,g,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0;d=i;i=i+376|0;l=d+128|0;m=d+136|0;n=d+144|0;o=d+160|0;p=d+176|0;q=d+184|0;r=d+344|0;s=d+352|0;t=d+360|0;u=d+368|0;v=d;zj(n,g,v,l,m);g=o;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;Wg(o,10,0);if((a[g]&1)==0){w=o+1|0;x=w;y=o+8|0;z=w}else{w=o+8|0;x=o+1|0;y=w;z=c[w>>2]|0}c[p>>2]=z;w=q;c[r>>2]=w;c[s>>2]=0;a[t]=1;a[u]=69;A=e;e=f;f=o;B=o+4|0;C=c[l>>2]|0;l=c[m>>2]|0;m=c[A>>2]|0;D=z;a:while(1){do{if((m|0)==0){E=0;F=1}else{z=c[m+12>>2]|0;if((z|0)==(c[m+16>>2]|0)){G=td[c[(c[m>>2]|0)+36>>2]&63](m)|0}else{G=c[z>>2]|0}if(!((G|0)==-1)){E=m;F=0;break}c[A>>2]=0;E=0;F=1}}while(0);z=c[e>>2]|0;do{if((z|0)==0){H=17}else{I=c[z+12>>2]|0;if((I|0)==(c[z+16>>2]|0)){J=td[c[(c[z>>2]|0)+36>>2]&63](z)|0}else{J=c[I>>2]|0}if((J|0)==-1){c[e>>2]=0;H=17;break}else{if(F){K=z;break}else{L=z;M=D;break a}}}}while(0);if((H|0)==17){H=0;if(F){L=0;M=D;break}else{K=0}}z=a[g]|0;I=(z&1)==0;if(I){N=(z&255)>>>1}else{N=c[B>>2]|0}if(((c[p>>2]|0)-D|0)==(N|0)){if(I){O=(z&255)>>>1;P=(z&255)>>>1}else{z=c[B>>2]|0;O=z;P=z}Wg(o,P<<1,0);if((a[g]&1)==0){Q=10}else{Q=(c[f>>2]&-2)+ -1|0}Wg(o,Q,0);if((a[g]&1)==0){R=x}else{R=c[y>>2]|0}c[p>>2]=R+O;S=R}else{S=D}z=E+12|0;I=c[z>>2]|0;T=E+16|0;if((I|0)==(c[T>>2]|0)){U=td[c[(c[E>>2]|0)+36>>2]&63](E)|0}else{U=c[I>>2]|0}if((Aj(U,t,u,S,p,C,l,n,w,r,s,v)|0)!=0){L=K;M=S;break}I=c[z>>2]|0;if((I|0)==(c[T>>2]|0)){td[c[(c[E>>2]|0)+40>>2]&63](E)|0;m=E;D=S;continue}else{c[z>>2]=I+4;m=E;D=S;continue}}S=a[n]|0;if((S&1)==0){V=(S&255)>>>1}else{V=c[n+4>>2]|0}do{if((V|0)!=0){if((a[t]|0)==0){break}S=c[r>>2]|0;if((S-q|0)>=160){break}D=c[s>>2]|0;c[r>>2]=S+4;c[S>>2]=D}}while(0);h[k>>3]=+jo(M,c[p>>2]|0,j);Hl(n,w,c[r>>2]|0,j);do{if((E|0)==0){W=0;X=1}else{r=c[E+12>>2]|0;if((r|0)==(c[E+16>>2]|0)){Y=td[c[(c[E>>2]|0)+36>>2]&63](E)|0}else{Y=c[r>>2]|0}if(!((Y|0)==-1)){W=E;X=0;break}c[A>>2]=0;W=0;X=1}}while(0);do{if((L|0)==0){H=57}else{A=c[L+12>>2]|0;if((A|0)==(c[L+16>>2]|0)){Z=td[c[(c[L>>2]|0)+36>>2]&63](L)|0}else{Z=c[A>>2]|0}if((Z|0)==-1){c[e>>2]=0;H=57;break}if(!X){break}_=b;c[_>>2]=W;Ug(o);Ug(n);i=d;return}}while(0);do{if((H|0)==57){if(X){break}_=b;c[_>>2]=W;Ug(o);Ug(n);i=d;return}}while(0);c[j>>2]=c[j>>2]|2;_=b;c[_>>2]=W;Ug(o);Ug(n);i=d;return}function rj(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;b=i;i=i+32|0;j=b;k=b+8|0;l=b+16|0;m=b+24|0;c[l>>2]=c[d>>2];c[m>>2]=c[e>>2];e=k;d=l;c[e+0>>2]=c[d+0>>2];d=j;e=m;c[d+0>>2]=c[e+0>>2];sj(a,0,k,j,f,g,h);i=b;return}function sj(b,d,e,f,g,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0;d=i;i=i+376|0;l=d+128|0;m=d+136|0;n=d+144|0;o=d+160|0;p=d+176|0;q=d+184|0;r=d+344|0;s=d+352|0;t=d+360|0;u=d+368|0;v=d;zj(n,g,v,l,m);g=o;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;Wg(o,10,0);if((a[g]&1)==0){w=o+1|0;x=w;y=o+8|0;z=w}else{w=o+8|0;x=o+1|0;y=w;z=c[w>>2]|0}c[p>>2]=z;w=q;c[r>>2]=w;c[s>>2]=0;a[t]=1;a[u]=69;A=e;e=f;f=o;B=o+4|0;C=c[l>>2]|0;l=c[m>>2]|0;m=c[A>>2]|0;D=z;a:while(1){do{if((m|0)==0){E=0;F=1}else{z=c[m+12>>2]|0;if((z|0)==(c[m+16>>2]|0)){G=td[c[(c[m>>2]|0)+36>>2]&63](m)|0}else{G=c[z>>2]|0}if(!((G|0)==-1)){E=m;F=0;break}c[A>>2]=0;E=0;F=1}}while(0);z=c[e>>2]|0;do{if((z|0)==0){H=17}else{I=c[z+12>>2]|0;if((I|0)==(c[z+16>>2]|0)){J=td[c[(c[z>>2]|0)+36>>2]&63](z)|0}else{J=c[I>>2]|0}if((J|0)==-1){c[e>>2]=0;H=17;break}else{if(F){K=z;break}else{L=z;M=D;break a}}}}while(0);if((H|0)==17){H=0;if(F){L=0;M=D;break}else{K=0}}z=a[g]|0;I=(z&1)==0;if(I){N=(z&255)>>>1}else{N=c[B>>2]|0}if(((c[p>>2]|0)-D|0)==(N|0)){if(I){O=(z&255)>>>1;P=(z&255)>>>1}else{z=c[B>>2]|0;O=z;P=z}Wg(o,P<<1,0);if((a[g]&1)==0){Q=10}else{Q=(c[f>>2]&-2)+ -1|0}Wg(o,Q,0);if((a[g]&1)==0){R=x}else{R=c[y>>2]|0}c[p>>2]=R+O;S=R}else{S=D}z=E+12|0;I=c[z>>2]|0;T=E+16|0;if((I|0)==(c[T>>2]|0)){U=td[c[(c[E>>2]|0)+36>>2]&63](E)|0}else{U=c[I>>2]|0}if((Aj(U,t,u,S,p,C,l,n,w,r,s,v)|0)!=0){L=K;M=S;break}I=c[z>>2]|0;if((I|0)==(c[T>>2]|0)){td[c[(c[E>>2]|0)+40>>2]&63](E)|0;m=E;D=S;continue}else{c[z>>2]=I+4;m=E;D=S;continue}}S=a[n]|0;if((S&1)==0){V=(S&255)>>>1}else{V=c[n+4>>2]|0}do{if((V|0)!=0){if((a[t]|0)==0){break}S=c[r>>2]|0;if((S-q|0)>=160){break}D=c[s>>2]|0;c[r>>2]=S+4;c[S>>2]=D}}while(0);h[k>>3]=+io(M,c[p>>2]|0,j);Hl(n,w,c[r>>2]|0,j);do{if((E|0)==0){W=0;X=1}else{r=c[E+12>>2]|0;if((r|0)==(c[E+16>>2]|0)){Y=td[c[(c[E>>2]|0)+36>>2]&63](E)|0}else{Y=c[r>>2]|0}if(!((Y|0)==-1)){W=E;X=0;break}c[A>>2]=0;W=0;X=1}}while(0);do{if((L|0)==0){H=57}else{A=c[L+12>>2]|0;if((A|0)==(c[L+16>>2]|0)){Z=td[c[(c[L>>2]|0)+36>>2]&63](L)|0}else{Z=c[A>>2]|0}if((Z|0)==-1){c[e>>2]=0;H=57;break}if(!X){break}_=b;c[_>>2]=W;Ug(o);Ug(n);i=d;return}}while(0);do{if((H|0)==57){if(X){break}_=b;c[_>>2]=W;Ug(o);Ug(n);i=d;return}}while(0);c[j>>2]=c[j>>2]|2;_=b;c[_>>2]=W;Ug(o);Ug(n);i=d;return}function tj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0;d=i;i=i+8|0;k=d;l=i;i=i+16|0;m=i;i=i+104|0;n=i;i=i+16|0;o=i;i=i+8|0;p=i;i=i+16|0;q=i;i=i+160|0;r=n;c[r+0>>2]=0;c[r+4>>2]=0;c[r+8>>2]=0;mh(o,g);g=o;o=c[g>>2]|0;if(!((c[4364]|0)==-1)){c[l>>2]=17456;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17456,l,114)}l=(c[17460>>2]|0)+ -1|0;s=c[o+8>>2]|0;if(!((c[o+12>>2]|0)-s>>2>>>0>l>>>0)){t=bc(4)|0;u=t;Mo(u);gd(t|0,25424,101)}o=c[s+(l<<2)>>2]|0;if((o|0)==0){t=bc(4)|0;u=t;Mo(u);gd(t|0,25424,101)}t=m;zd[c[(c[o>>2]|0)+48>>2]&7](o,16008,16034|0,t)|0;vg(c[g>>2]|0)|0;g=p;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;Wg(p,10,0);if((a[g]&1)==0){o=p+1|0;v=o;w=p+8|0;x=o}else{o=p+8|0;v=p+1|0;w=o;x=c[o>>2]|0}o=e;e=f;f=p;u=p+4|0;l=m+96|0;s=m+100|0;y=q;z=m+104|0;A=m;m=n+4|0;B=c[o>>2]|0;C=x;D=q;q=0;E=x;a:while(1){do{if((B|0)==0){F=0;G=1}else{x=c[B+12>>2]|0;if((x|0)==(c[B+16>>2]|0)){H=td[c[(c[B>>2]|0)+36>>2]&63](B)|0}else{H=c[x>>2]|0}if(!((H|0)==-1)){F=B;G=0;break}c[o>>2]=0;F=0;G=1}}while(0);x=c[e>>2]|0;do{if((x|0)==0){I=22}else{J=c[x+12>>2]|0;if((J|0)==(c[x+16>>2]|0)){K=td[c[(c[x>>2]|0)+36>>2]&63](x)|0}else{K=c[J>>2]|0}if((K|0)==-1){c[e>>2]=0;I=22;break}else{if(G){break}else{L=E;break a}}}}while(0);if((I|0)==22){I=0;if(G){L=E;break}}x=a[g]|0;J=(x&1)==0;if(J){M=(x&255)>>>1}else{M=c[u>>2]|0}if((C-E|0)==(M|0)){if(J){N=(x&255)>>>1;O=(x&255)>>>1}else{x=c[u>>2]|0;N=x;O=x}Wg(p,O<<1,0);if((a[g]&1)==0){P=10}else{P=(c[f>>2]&-2)+ -1|0}Wg(p,P,0);if((a[g]&1)==0){Q=v}else{Q=c[w>>2]|0}R=Q+N|0;S=Q}else{R=C;S=E}x=c[F+12>>2]|0;if((x|0)==(c[F+16>>2]|0)){T=td[c[(c[F>>2]|0)+36>>2]&63](F)|0}else{T=c[x>>2]|0}x=(R|0)==(S|0);do{if(x){J=(c[l>>2]|0)==(T|0);if(!J){if((c[s>>2]|0)!=(T|0)){I=43;break}}a[R]=J?43:45;U=R+1|0;V=D;W=0}else{I=43}}while(0);do{if((I|0)==43){I=0;J=a[r]|0;if((J&1)==0){X=(J&255)>>>1}else{X=c[m>>2]|0}if((X|0)!=0&(T|0)==0){if((D-y|0)>=160){U=R;V=D;W=q;break}c[D>>2]=q;U=R;V=D+4|0;W=0;break}else{Y=t}while(1){J=Y+4|0;if((c[Y>>2]|0)==(T|0)){Z=Y;break}if((J|0)==(z|0)){Z=z;break}else{Y=J}}J=Z-A|0;_=J>>2;if((J|0)>92){L=S;break a}if((J|0)<88){a[R]=a[16008+_|0]|0;U=R+1|0;V=D;W=q+1|0;break}if(x){L=R;break a}if((R-S|0)>=3){L=S;break a}if((a[R+ -1|0]|0)!=48){L=S;break a}a[R]=a[16008+_|0]|0;U=R+1|0;V=D;W=0}}while(0);x=c[o>>2]|0;_=x+12|0;J=c[_>>2]|0;if((J|0)==(c[x+16>>2]|0)){td[c[(c[x>>2]|0)+40>>2]&63](x)|0;B=x;C=U;D=V;q=W;E=S;continue}else{c[_>>2]=J+4;B=x;C=U;D=V;q=W;E=S;continue}}a[L+3|0]=0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);S=c[4338]|0;c[k>>2]=j;if((Yi(L,S,16048,k)|0)!=1){c[h>>2]=4}k=c[o>>2]|0;do{if((k|0)==0){$=0;aa=1}else{S=c[k+12>>2]|0;if((S|0)==(c[k+16>>2]|0)){ba=td[c[(c[k>>2]|0)+36>>2]&63](k)|0}else{ba=c[S>>2]|0}if(!((ba|0)==-1)){$=k;aa=0;break}c[o>>2]=0;$=0;aa=1}}while(0);o=c[e>>2]|0;do{if((o|0)==0){I=78}else{k=c[o+12>>2]|0;if((k|0)==(c[o+16>>2]|0)){ca=td[c[(c[o>>2]|0)+36>>2]&63](o)|0}else{ca=c[k>>2]|0}if((ca|0)==-1){c[e>>2]=0;I=78;break}if(!aa){break}da=b;c[da>>2]=$;Ug(p);Ug(n);i=d;return}}while(0);do{if((I|0)==78){if(aa){break}da=b;c[da>>2]=$;Ug(p);Ug(n);i=d;return}}while(0);c[h>>2]=c[h>>2]|2;da=b;c[da>>2]=$;Ug(p);Ug(n);i=d;return}function uj(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0;n=i;o=c[f>>2]|0;p=(o|0)==(e|0);do{if(p){q=(c[m+96>>2]|0)==(b|0);if(!q){if((c[m+100>>2]|0)!=(b|0)){break}}c[f>>2]=e+1;a[e]=q?43:45;c[g>>2]=0;r=0;i=n;return r|0}}while(0);q=a[j]|0;if((q&1)==0){s=(q&255)>>>1}else{s=c[j+4>>2]|0}if((s|0)!=0&(b|0)==(h|0)){h=c[l>>2]|0;if((h-k|0)>=160){r=0;i=n;return r|0}k=c[g>>2]|0;c[l>>2]=h+4;c[h>>2]=k;c[g>>2]=0;r=0;i=n;return r|0}k=m+104|0;h=m;while(1){l=h+4|0;if((c[h>>2]|0)==(b|0)){t=h;break}if((l|0)==(k|0)){t=k;break}else{h=l}}h=t-m|0;m=h>>2;if((h|0)>92){r=-1;i=n;return r|0}do{if((d|0)==16){if((h|0)<88){break}if(p){r=-1;i=n;return r|0}if((o-e|0)>=3){r=-1;i=n;return r|0}if((a[o+ -1|0]|0)!=48){r=-1;i=n;return r|0}c[g>>2]=0;t=a[16008+m|0]|0;c[f>>2]=o+1;a[o]=t;r=0;i=n;return r|0}else if((d|0)==10|(d|0)==8){if((m|0)<(d|0)){break}else{r=-1}i=n;return r|0}}while(0);d=a[16008+m|0]|0;c[f>>2]=o+1;a[o]=d;c[g>>2]=(c[g>>2]|0)+1;r=0;i=n;return r|0}function vj(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=i;i=i+40|0;h=g;j=g+16|0;k=g+32|0;mh(k,d);d=k;k=c[d>>2]|0;if(!((c[4366]|0)==-1)){c[j>>2]=17464;c[j+4>>2]=113;c[j+8>>2]=0;Pg(17464,j,114)}j=(c[17468>>2]|0)+ -1|0;l=c[k+8>>2]|0;if(!((c[k+12>>2]|0)-l>>2>>>0>j>>>0)){m=bc(4)|0;n=m;Mo(n);gd(m|0,25424,101)}k=c[l+(j<<2)>>2]|0;if((k|0)==0){m=bc(4)|0;n=m;Mo(n);gd(m|0,25424,101)}zd[c[(c[k>>2]|0)+32>>2]&7](k,16008,16034|0,e)|0;e=c[d>>2]|0;if(!((c[4402]|0)==-1)){c[h>>2]=17608;c[h+4>>2]=113;c[h+8>>2]=0;Pg(17608,h,114)}h=(c[17612>>2]|0)+ -1|0;k=c[e+8>>2]|0;if(!((c[e+12>>2]|0)-k>>2>>>0>h>>>0)){o=bc(4)|0;p=o;Mo(p);gd(o|0,25424,101)}e=c[k+(h<<2)>>2]|0;if((e|0)==0){o=bc(4)|0;p=o;Mo(p);gd(o|0,25424,101)}else{o=e;a[f]=td[c[(c[e>>2]|0)+16>>2]&63](o)|0;rd[c[(c[e>>2]|0)+20>>2]&63](b,o);vg(c[d>>2]|0)|0;i=g;return}}function wj(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;h=i;i=i+40|0;j=h;k=h+16|0;l=h+32|0;mh(l,d);d=l;l=c[d>>2]|0;if(!((c[4366]|0)==-1)){c[k>>2]=17464;c[k+4>>2]=113;c[k+8>>2]=0;Pg(17464,k,114)}k=(c[17468>>2]|0)+ -1|0;m=c[l+8>>2]|0;if(!((c[l+12>>2]|0)-m>>2>>>0>k>>>0)){n=bc(4)|0;o=n;Mo(o);gd(n|0,25424,101)}l=c[m+(k<<2)>>2]|0;if((l|0)==0){n=bc(4)|0;o=n;Mo(o);gd(n|0,25424,101)}zd[c[(c[l>>2]|0)+32>>2]&7](l,16008,16040|0,e)|0;e=c[d>>2]|0;if(!((c[4402]|0)==-1)){c[j>>2]=17608;c[j+4>>2]=113;c[j+8>>2]=0;Pg(17608,j,114)}j=(c[17612>>2]|0)+ -1|0;l=c[e+8>>2]|0;if(!((c[e+12>>2]|0)-l>>2>>>0>j>>>0)){p=bc(4)|0;q=p;Mo(q);gd(p|0,25424,101)}e=c[l+(j<<2)>>2]|0;if((e|0)==0){p=bc(4)|0;q=p;Mo(q);gd(p|0,25424,101)}else{p=e;q=e;a[f]=td[c[(c[q>>2]|0)+12>>2]&63](p)|0;a[g]=td[c[(c[q>>2]|0)+16>>2]&63](p)|0;rd[c[(c[e>>2]|0)+20>>2]&63](b,p);vg(c[d>>2]|0)|0;i=h;return}}function xj(b,d,e,f,g,h,j,k,l,m,n,o){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0;p=i;if(b<<24>>24==h<<24>>24){if((a[d]|0)==0){q=-1;i=p;return q|0}a[d]=0;h=c[g>>2]|0;c[g>>2]=h+1;a[h]=46;h=a[k]|0;if((h&1)==0){r=(h&255)>>>1}else{r=c[k+4>>2]|0}if((r|0)==0){q=0;i=p;return q|0}r=c[m>>2]|0;if((r-l|0)>=160){q=0;i=p;return q|0}h=c[n>>2]|0;c[m>>2]=r+4;c[r>>2]=h;q=0;i=p;return q|0}do{if(b<<24>>24==j<<24>>24){h=a[k]|0;if((h&1)==0){s=(h&255)>>>1}else{s=c[k+4>>2]|0}if((s|0)==0){break}if((a[d]|0)==0){q=-1;i=p;return q|0}h=c[m>>2]|0;if((h-l|0)>=160){q=0;i=p;return q|0}r=c[n>>2]|0;c[m>>2]=h+4;c[h>>2]=r;c[n>>2]=0;q=0;i=p;return q|0}}while(0);s=o+32|0;j=o;while(1){r=j+1|0;if((a[j]|0)==b<<24>>24){t=j;break}if((r|0)==(s|0)){t=s;break}else{j=r}}j=t-o|0;if((j|0)>31){q=-1;i=p;return q|0}o=a[16008+j|0]|0;if((j|0)==24|(j|0)==25){t=c[g>>2]|0;do{if((t|0)!=(f|0)){if((a[t+ -1|0]&95|0)==(a[e]&127|0)){break}else{q=-1}i=p;return q|0}}while(0);c[g>>2]=t+1;a[t]=o;q=0;i=p;return q|0}else if((j|0)==23|(j|0)==22){a[e]=80;t=c[g>>2]|0;c[g>>2]=t+1;a[t]=o;q=0;i=p;return q|0}else{t=o&95;do{if((t|0)==(a[e]|0)){a[e]=t|128;if((a[d]|0)==0){break}a[d]=0;f=a[k]|0;if((f&1)==0){u=(f&255)>>>1}else{u=c[k+4>>2]|0}if((u|0)==0){break}f=c[m>>2]|0;if((f-l|0)>=160){break}s=c[n>>2]|0;c[m>>2]=f+4;c[f>>2]=s}}while(0);m=c[g>>2]|0;c[g>>2]=m+1;a[m]=o;if((j|0)>21){q=0;i=p;return q|0}c[n>>2]=(c[n>>2]|0)+1;q=0;i=p;return q|0}return 0}function yj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;i=i+40|0;g=f;h=f+16|0;j=f+32|0;mh(j,b);b=j;j=c[b>>2]|0;if(!((c[4364]|0)==-1)){c[h>>2]=17456;c[h+4>>2]=113;c[h+8>>2]=0;Pg(17456,h,114)}h=(c[17460>>2]|0)+ -1|0;k=c[j+8>>2]|0;if(!((c[j+12>>2]|0)-k>>2>>>0>h>>>0)){l=bc(4)|0;m=l;Mo(m);gd(l|0,25424,101)}j=c[k+(h<<2)>>2]|0;if((j|0)==0){l=bc(4)|0;m=l;Mo(m);gd(l|0,25424,101)}zd[c[(c[j>>2]|0)+48>>2]&7](j,16008,16034|0,d)|0;d=c[b>>2]|0;if(!((c[4404]|0)==-1)){c[g>>2]=17616;c[g+4>>2]=113;c[g+8>>2]=0;Pg(17616,g,114)}g=(c[17620>>2]|0)+ -1|0;j=c[d+8>>2]|0;if(!((c[d+12>>2]|0)-j>>2>>>0>g>>>0)){n=bc(4)|0;o=n;Mo(o);gd(n|0,25424,101)}d=c[j+(g<<2)>>2]|0;if((d|0)==0){n=bc(4)|0;o=n;Mo(o);gd(n|0,25424,101)}else{n=d;c[e>>2]=td[c[(c[d>>2]|0)+16>>2]&63](n)|0;rd[c[(c[d>>2]|0)+20>>2]&63](a,n);vg(c[b>>2]|0)|0;i=f;return}}function zj(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=i;i=i+40|0;h=g;j=g+16|0;k=g+32|0;mh(k,b);b=k;k=c[b>>2]|0;if(!((c[4364]|0)==-1)){c[j>>2]=17456;c[j+4>>2]=113;c[j+8>>2]=0;Pg(17456,j,114)}j=(c[17460>>2]|0)+ -1|0;l=c[k+8>>2]|0;if(!((c[k+12>>2]|0)-l>>2>>>0>j>>>0)){m=bc(4)|0;n=m;Mo(n);gd(m|0,25424,101)}k=c[l+(j<<2)>>2]|0;if((k|0)==0){m=bc(4)|0;n=m;Mo(n);gd(m|0,25424,101)}zd[c[(c[k>>2]|0)+48>>2]&7](k,16008,16040|0,d)|0;d=c[b>>2]|0;if(!((c[4404]|0)==-1)){c[h>>2]=17616;c[h+4>>2]=113;c[h+8>>2]=0;Pg(17616,h,114)}h=(c[17620>>2]|0)+ -1|0;k=c[d+8>>2]|0;if(!((c[d+12>>2]|0)-k>>2>>>0>h>>>0)){o=bc(4)|0;p=o;Mo(p);gd(o|0,25424,101)}d=c[k+(h<<2)>>2]|0;if((d|0)==0){o=bc(4)|0;p=o;Mo(p);gd(o|0,25424,101)}else{o=d;p=d;c[e>>2]=td[c[(c[p>>2]|0)+12>>2]&63](o)|0;c[f>>2]=td[c[(c[p>>2]|0)+16>>2]&63](o)|0;rd[c[(c[d>>2]|0)+20>>2]&63](a,o);vg(c[b>>2]|0)|0;i=g;return}}function Aj(b,d,e,f,g,h,j,k,l,m,n,o){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0;p=i;if((b|0)==(h|0)){if((a[d]|0)==0){q=-1;i=p;return q|0}a[d]=0;h=c[g>>2]|0;c[g>>2]=h+1;a[h]=46;h=a[k]|0;if((h&1)==0){r=(h&255)>>>1}else{r=c[k+4>>2]|0}if((r|0)==0){q=0;i=p;return q|0}r=c[m>>2]|0;if((r-l|0)>=160){q=0;i=p;return q|0}h=c[n>>2]|0;c[m>>2]=r+4;c[r>>2]=h;q=0;i=p;return q|0}do{if((b|0)==(j|0)){h=a[k]|0;if((h&1)==0){s=(h&255)>>>1}else{s=c[k+4>>2]|0}if((s|0)==0){break}if((a[d]|0)==0){q=-1;i=p;return q|0}h=c[m>>2]|0;if((h-l|0)>=160){q=0;i=p;return q|0}r=c[n>>2]|0;c[m>>2]=h+4;c[h>>2]=r;c[n>>2]=0;q=0;i=p;return q|0}}while(0);s=o+128|0;j=o;while(1){r=j+4|0;if((c[j>>2]|0)==(b|0)){t=j;break}if((r|0)==(s|0)){t=s;break}else{j=r}}j=t-o|0;o=j>>2;if((j|0)>124){q=-1;i=p;return q|0}t=a[16008+o|0]|0;do{if((o|0)==23|(o|0)==22){a[e]=80}else if((o|0)==24|(o|0)==25){s=c[g>>2]|0;do{if((s|0)!=(f|0)){if((a[s+ -1|0]&95|0)==(a[e]&127|0)){break}else{q=-1}i=p;return q|0}}while(0);c[g>>2]=s+1;a[s]=t;q=0;i=p;return q|0}else{b=t&95;if((b|0)!=(a[e]|0)){break}a[e]=b|128;if((a[d]|0)==0){break}a[d]=0;b=a[k]|0;if((b&1)==0){u=(b&255)>>>1}else{u=c[k+4>>2]|0}if((u|0)==0){break}b=c[m>>2]|0;if((b-l|0)>=160){break}r=c[n>>2]|0;c[m>>2]=b+4;c[b>>2]=r}}while(0);m=c[g>>2]|0;c[g>>2]=m+1;a[m]=t;if((j|0)>84){q=0;i=p;return q|0}c[n>>2]=(c[n>>2]|0)+1;q=0;i=p;return q|0}function Bj(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Cj(a){a=a|0;i=i;return}function Dj(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;j=i;i=i+56|0;k=j;l=j+8|0;m=j+24|0;n=j+32|0;o=j+40|0;if((c[f+4>>2]&1|0)==0){p=c[(c[d>>2]|0)+24>>2]|0;c[m>>2]=c[e>>2];q=h&1;r=k;s=m;c[r+0>>2]=c[s+0>>2];Bd[p&15](b,d,k,f,g,q);i=j;return}mh(n,f);f=n;n=c[f>>2]|0;if(!((c[4402]|0)==-1)){c[l>>2]=17608;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17608,l,114)}l=(c[17612>>2]|0)+ -1|0;q=c[n+8>>2]|0;if(!((c[n+12>>2]|0)-q>>2>>>0>l>>>0)){t=bc(4)|0;u=t;Mo(u);gd(t|0,25424,101)}n=c[q+(l<<2)>>2]|0;if((n|0)==0){t=bc(4)|0;u=t;Mo(u);gd(t|0,25424,101)}t=n;vg(c[f>>2]|0)|0;f=c[n>>2]|0;if(h){rd[c[f+24>>2]&63](o,t)}else{rd[c[f+28>>2]&63](o,t)}t=o;f=a[t]|0;if((f&1)==0){h=o+1|0;v=h;w=h;x=o+8|0}else{h=o+8|0;v=c[h>>2]|0;w=o+1|0;x=h}h=e;e=o+4|0;n=f;f=v;while(1){if((n&1)==0){y=w;z=(n&255)>>>1}else{y=c[x>>2]|0;z=c[e>>2]|0}if((f|0)==(y+z|0)){break}v=a[f]|0;u=c[h>>2]|0;do{if((u|0)!=0){l=u+24|0;q=c[l>>2]|0;if((q|0)!=(c[u+28>>2]|0)){c[l>>2]=q+1;a[q]=v;break}if(!((Cd[c[(c[u>>2]|0)+52>>2]&15](u,v&255)|0)==-1)){break}c[h>>2]=0}}while(0);n=a[t]|0;f=f+1|0}c[b>>2]=c[h>>2];Ug(o);i=j;return}function Ej(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;d=i;i=i+16|0;j=d;k=d+8|0;l=i;i=i+8|0;m=i;i=i+16|0;n=i;i=i+24|0;o=i;i=i+8|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=l;a[s+0|0]=a[16256|0]|0;a[s+1|0]=a[16257|0]|0;a[s+2|0]=a[16258|0]|0;a[s+3|0]=a[16259|0]|0;a[s+4|0]=a[16260|0]|0;a[s+5|0]=a[16261|0]|0;t=l+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=t}else{a[t]=43;w=l+2|0}if((v&512|0)==0){x=w}else{a[w]=35;x=w+1|0}a[x]=108;w=x+1|0;x=v&74;do{if((x|0)==8){if((v&16384|0)==0){a[w]=120;break}else{a[w]=88;break}}else if((x|0)==64){a[w]=111}else{a[w]=100}}while(0);w=m;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);x=c[4338]|0;c[k>>2]=h;h=Fj(w,12,x,s,k)|0;k=m+h|0;s=c[u>>2]&176;do{if((s|0)==32){y=k}else if((s|0)==16){u=a[w]|0;if(u<<24>>24==43|u<<24>>24==45){y=m+1|0;break}if(!((h|0)>1&u<<24>>24==48)){z=20;break}u=a[m+1|0]|0;if(!(u<<24>>24==88|u<<24>>24==120)){z=20;break}y=m+2|0}else{z=20}}while(0);if((z|0)==20){y=w}z=n;mh(q,f);Gj(w,y,k,z,o,p,q);vg(c[q>>2]|0)|0;c[r>>2]=c[e>>2];e=c[o>>2]|0;o=c[p>>2]|0;p=j;q=r;c[p+0>>2]=c[q+0>>2];Hj(b,j,z,e,o,f,g);i=d;return}function Fj(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;i=i+16|0;h=g;c[h>>2]=f;f=fc(d|0)|0;d=Pb(a|0,b|0,e|0,h|0)|0;if((f|0)==0){i=g;return d|0}fc(f|0)|0;i=g;return d|0}function Gj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0;k=i;i=i+48|0;l=k;m=k+16|0;n=k+32|0;o=j;j=c[o>>2]|0;if(!((c[4366]|0)==-1)){c[m>>2]=17464;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17464,m,114)}m=(c[17468>>2]|0)+ -1|0;p=c[j+8>>2]|0;if(!((c[j+12>>2]|0)-p>>2>>>0>m>>>0)){q=bc(4)|0;r=q;Mo(r);gd(q|0,25424,101)}j=c[p+(m<<2)>>2]|0;if((j|0)==0){q=bc(4)|0;r=q;Mo(r);gd(q|0,25424,101)}q=j;r=c[o>>2]|0;if(!((c[4402]|0)==-1)){c[l>>2]=17608;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17608,l,114)}l=(c[17612>>2]|0)+ -1|0;o=c[r+8>>2]|0;if(!((c[r+12>>2]|0)-o>>2>>>0>l>>>0)){s=bc(4)|0;t=s;Mo(t);gd(s|0,25424,101)}r=c[o+(l<<2)>>2]|0;if((r|0)==0){s=bc(4)|0;t=s;Mo(t);gd(s|0,25424,101)}s=r;rd[c[(c[r>>2]|0)+20>>2]&63](n,s);t=n;l=a[t]|0;if((l&1)==0){u=(l&255)>>>1}else{u=c[n+4>>2]|0}do{if((u|0)==0){zd[c[(c[j>>2]|0)+32>>2]&7](q,b,e,f)|0;c[h>>2]=f+(e-b)}else{c[h>>2]=f;l=a[b]|0;if(l<<24>>24==43|l<<24>>24==45){o=Cd[c[(c[j>>2]|0)+28>>2]&15](q,l)|0;l=c[h>>2]|0;c[h>>2]=l+1;a[l]=o;v=b+1|0}else{v=b}do{if((e-v|0)>1){if((a[v]|0)!=48){w=v;break}o=v+1|0;l=a[o]|0;if(!(l<<24>>24==88|l<<24>>24==120)){w=v;break}l=j;m=Cd[c[(c[l>>2]|0)+28>>2]&15](q,48)|0;p=c[h>>2]|0;c[h>>2]=p+1;a[p]=m;m=Cd[c[(c[l>>2]|0)+28>>2]&15](q,a[o]|0)|0;o=c[h>>2]|0;c[h>>2]=o+1;a[o]=m;w=v+2|0}else{w=v}}while(0);do{if((w|0)!=(e|0)){m=e+ -1|0;if(m>>>0>w>>>0){x=w;y=m}else{break}do{m=a[x]|0;a[x]=a[y]|0;a[y]=m;x=x+1|0;y=y+ -1|0;}while(x>>>0<y>>>0)}}while(0);m=td[c[(c[r>>2]|0)+16>>2]&63](s)|0;if(w>>>0<e>>>0){o=n+1|0;l=j;p=n+4|0;z=n+8|0;A=0;B=0;C=w;while(1){D=(a[t]&1)==0;do{if((a[(D?o:c[z>>2]|0)+B|0]|0)==0){E=A;F=B}else{if((A|0)!=(a[(D?o:c[z>>2]|0)+B|0]|0)){E=A;F=B;break}G=c[h>>2]|0;c[h>>2]=G+1;a[G]=m;G=a[t]|0;if((G&1)==0){H=(G&255)>>>1}else{H=c[p>>2]|0}E=0;F=(B>>>0<(H+ -1|0)>>>0)+B|0}}while(0);D=Cd[c[(c[l>>2]|0)+28>>2]&15](q,a[C]|0)|0;G=c[h>>2]|0;c[h>>2]=G+1;a[G]=D;D=C+1|0;if(D>>>0<e>>>0){A=E+1|0;B=F;C=D}else{break}}}C=f+(w-b)|0;B=c[h>>2]|0;if((C|0)==(B|0)){break}A=B+ -1|0;if(A>>>0>C>>>0){I=C;J=A}else{break}do{A=a[I]|0;a[I]=a[J]|0;a[J]=A;I=I+1|0;J=J+ -1|0;}while(I>>>0<J>>>0)}}while(0);if((d|0)==(e|0)){K=c[h>>2]|0;c[g>>2]=K;Ug(n);i=k;return}else{K=f+(d-b)|0;c[g>>2]=K;Ug(n);i=k;return}}function Hj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+16|0;l=k;m=d;d=c[m>>2]|0;if((d|0)==0){c[b>>2]=0;i=k;return}n=g;g=e;o=n-g|0;p=h+12|0;h=c[p>>2]|0;q=(h|0)>(o|0)?h-o|0:0;o=f;h=o-g|0;do{if((h|0)>0){if((nd[c[(c[d>>2]|0)+48>>2]&31](d,e,h)|0)==(h|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);do{if((q|0)>0){Tg(l,q,j);if((a[l]&1)==0){r=l+1|0}else{r=c[l+8>>2]|0}if((nd[c[(c[d>>2]|0)+48>>2]&31](d,r,q)|0)==(q|0)){Ug(l);break}c[m>>2]=0;c[b>>2]=0;Ug(l);i=k;return}}while(0);l=n-o|0;do{if((l|0)>0){if((nd[c[(c[d>>2]|0)+48>>2]&31](d,f,l)|0)==(l|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);c[p>>2]=0;c[b>>2]=d;i=k;return}function Ij(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;d=i;i=i+16|0;k=d;l=d+8|0;m=i;i=i+8|0;n=i;i=i+24|0;o=i;i=i+48|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=i;i=i+8|0;t=m;c[t>>2]=37;c[t+4>>2]=0;t=m;m=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=m}else{a[m]=43;w=t+2|0}if((v&512|0)==0){x=w}else{a[w]=35;x=w+1|0}w=x+2|0;a[x]=108;a[x+1|0]=108;x=v&74;do{if((x|0)==8){if((v&16384|0)==0){a[w]=120;break}else{a[w]=88;break}}else if((x|0)==64){a[w]=111}else{a[w]=100}}while(0);w=n;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);x=c[4338]|0;v=l;c[v>>2]=h;c[v+4>>2]=j;j=Fj(w,22,x,t,l)|0;l=n+j|0;t=c[u>>2]&176;do{if((t|0)==32){y=l}else if((t|0)==16){u=a[w]|0;if(u<<24>>24==43|u<<24>>24==45){y=n+1|0;break}if(!((j|0)>1&u<<24>>24==48)){z=20;break}u=a[n+1|0]|0;if(!(u<<24>>24==88|u<<24>>24==120)){z=20;break}y=n+2|0}else{z=20}}while(0);if((z|0)==20){y=w}z=o;mh(r,f);Gj(w,y,l,z,p,q,r);vg(c[r>>2]|0)|0;c[s>>2]=c[e>>2];e=c[p>>2]|0;p=c[q>>2]|0;q=k;r=s;c[q+0>>2]=c[r+0>>2];Hj(b,k,z,e,p,f,g);i=d;return}function Jj(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;d=i;i=i+16|0;j=d;k=d+8|0;l=i;i=i+8|0;m=i;i=i+16|0;n=i;i=i+24|0;o=i;i=i+8|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=l;a[s+0|0]=a[16256|0]|0;a[s+1|0]=a[16257|0]|0;a[s+2|0]=a[16258|0]|0;a[s+3|0]=a[16259|0]|0;a[s+4|0]=a[16260|0]|0;a[s+5|0]=a[16261|0]|0;t=l+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=t}else{a[t]=43;w=l+2|0}if((v&512|0)==0){x=w}else{a[w]=35;x=w+1|0}a[x]=108;w=x+1|0;x=v&74;do{if((x|0)==64){a[w]=111}else if((x|0)==8){if((v&16384|0)==0){a[w]=120;break}else{a[w]=88;break}}else{a[w]=117}}while(0);w=m;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);v=c[4338]|0;c[k>>2]=h;h=Fj(w,12,v,s,k)|0;k=m+h|0;s=c[u>>2]&176;do{if((s|0)==16){u=a[w]|0;if(u<<24>>24==43|u<<24>>24==45){y=m+1|0;break}if(!((h|0)>1&u<<24>>24==48)){z=20;break}u=a[m+1|0]|0;if(!(u<<24>>24==88|u<<24>>24==120)){z=20;break}y=m+2|0}else if((s|0)==32){y=k}else{z=20}}while(0);if((z|0)==20){y=w}z=n;mh(q,f);Gj(w,y,k,z,o,p,q);vg(c[q>>2]|0)|0;c[r>>2]=c[e>>2];e=c[o>>2]|0;o=c[p>>2]|0;p=j;q=r;c[p+0>>2]=c[q+0>>2];Hj(b,j,z,e,o,f,g);i=d;return}function Kj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;d=i;i=i+16|0;k=d;l=d+8|0;m=i;i=i+8|0;n=i;i=i+24|0;o=i;i=i+48|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=i;i=i+8|0;t=m;c[t>>2]=37;c[t+4>>2]=0;t=m;m=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=m}else{a[m]=43;w=t+2|0}if((v&512|0)==0){x=w}else{a[w]=35;x=w+1|0}w=x+2|0;a[x]=108;a[x+1|0]=108;x=v&74;do{if((x|0)==8){if((v&16384|0)==0){a[w]=120;break}else{a[w]=88;break}}else if((x|0)==64){a[w]=111}else{a[w]=117}}while(0);w=n;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);x=c[4338]|0;v=l;c[v>>2]=h;c[v+4>>2]=j;j=Fj(w,23,x,t,l)|0;l=n+j|0;t=c[u>>2]&176;do{if((t|0)==32){y=l}else if((t|0)==16){u=a[w]|0;if(u<<24>>24==43|u<<24>>24==45){y=n+1|0;break}if(!((j|0)>1&u<<24>>24==48)){z=20;break}u=a[n+1|0]|0;if(!(u<<24>>24==88|u<<24>>24==120)){z=20;break}y=n+2|0}else{z=20}}while(0);if((z|0)==20){y=w}z=o;mh(r,f);Gj(w,y,l,z,p,q,r);vg(c[r>>2]|0)|0;c[s>>2]=c[e>>2];e=c[p>>2]|0;p=c[q>>2]|0;q=k;r=s;c[q+0>>2]=c[r+0>>2];Hj(b,k,z,e,p,f,g);i=d;return}function Lj(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;d=i;i=i+24|0;l=d;m=d+8|0;n=i;i=i+16|0;o=i;i=i+8|0;p=i;i=i+16|0;q=i;i=i+8|0;r=i;i=i+32|0;s=i;i=i+8|0;t=i;i=i+64|0;u=i;i=i+8|0;v=i;i=i+8|0;w=i;i=i+8|0;x=i;i=i+8|0;y=i;i=i+8|0;z=q;c[z>>2]=37;c[z+4>>2]=0;z=q;q=z+1|0;A=f+4|0;B=c[A>>2]|0;if((B&2048|0)==0){C=q}else{a[q]=43;C=z+2|0}if((B&1024|0)==0){D=C}else{a[C]=35;D=C+1|0}C=B&260;q=B>>>14;do{if((C|0)==260){if((q&1|0)==0){a[D]=97;E=0;break}else{a[D]=65;E=0;break}}else{a[D]=46;B=D+2|0;a[D+1|0]=42;if((C|0)==256){if((q&1|0)==0){a[B]=101;E=1;break}else{a[B]=69;E=1;break}}else if((C|0)==4){if((q&1|0)==0){a[B]=102;E=1;break}else{a[B]=70;E=1;break}}else{if((q&1|0)==0){a[B]=103;E=1;break}else{a[B]=71;E=1;break}}}}while(0);q=r;c[s>>2]=q;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);r=c[4338]|0;if(E){c[p>>2]=c[f+8>>2];C=p+4|0;h[k>>3]=j;c[C>>2]=c[k>>2];c[C+4>>2]=c[k+4>>2];F=Fj(q,30,r,z,p)|0}else{p=o;h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];F=Fj(q,30,r,z,o)|0}do{if((F|0)>29){o=(a[17360]|0)==0;if(E){do{if(o){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);r=c[4338]|0;c[n>>2]=c[f+8>>2];p=n+4|0;h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];G=Mj(s,r,z,n)|0}else{do{if(o){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);o=c[4338]|0;c[m>>2]=c[f+8>>2];r=m+4|0;h[k>>3]=j;c[r>>2]=c[k>>2];c[r+4>>2]=c[k+4>>2];G=Mj(s,o,z,m)|0}o=c[s>>2]|0;if((o|0)!=0){H=o;I=o;J=G;break}rp()}else{H=c[s>>2]|0;I=0;J=F}}while(0);F=H+J|0;s=c[A>>2]&176;do{if((s|0)==32){K=F}else if((s|0)==16){A=a[H]|0;if(A<<24>>24==43|A<<24>>24==45){K=H+1|0;break}if(!((J|0)>1&A<<24>>24==48)){L=44;break}A=a[H+1|0]|0;if(!(A<<24>>24==88|A<<24>>24==120)){L=44;break}K=H+2|0}else{L=44}}while(0);if((L|0)==44){K=H}do{if((H|0)==(q|0)){M=q;N=0;O=t}else{L=fp(J<<1)|0;if((L|0)!=0){M=H;N=L;O=L;break}rp()}}while(0);mh(w,f);Nj(M,K,F,O,u,v,w);vg(c[w>>2]|0)|0;w=e;c[y>>2]=c[w>>2];e=c[u>>2]|0;u=c[v>>2]|0;v=l;F=y;c[v+0>>2]=c[F+0>>2];Hj(x,l,O,e,u,f,g);g=c[x>>2]|0;c[w>>2]=g;c[b>>2]=g;if((N|0)!=0){gp(N)}if((I|0)==0){i=d;return}gp(I);i=d;return}function Mj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+16|0;g=f;c[g>>2]=e;e=fc(b|0)|0;b=Mb(a|0,d|0,g|0)|0;if((e|0)==0){i=f;return b|0}fc(e|0)|0;i=f;return b|0}function Nj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;k=i;i=i+48|0;l=k;m=k+16|0;n=k+32|0;o=j;j=c[o>>2]|0;if(!((c[4366]|0)==-1)){c[m>>2]=17464;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17464,m,114)}m=(c[17468>>2]|0)+ -1|0;p=c[j+8>>2]|0;if(!((c[j+12>>2]|0)-p>>2>>>0>m>>>0)){q=bc(4)|0;r=q;Mo(r);gd(q|0,25424,101)}j=c[p+(m<<2)>>2]|0;if((j|0)==0){q=bc(4)|0;r=q;Mo(r);gd(q|0,25424,101)}q=j;r=c[o>>2]|0;if(!((c[4402]|0)==-1)){c[l>>2]=17608;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17608,l,114)}l=(c[17612>>2]|0)+ -1|0;o=c[r+8>>2]|0;if(!((c[r+12>>2]|0)-o>>2>>>0>l>>>0)){s=bc(4)|0;t=s;Mo(t);gd(s|0,25424,101)}r=c[o+(l<<2)>>2]|0;if((r|0)==0){s=bc(4)|0;t=s;Mo(t);gd(s|0,25424,101)}s=r;rd[c[(c[r>>2]|0)+20>>2]&63](n,s);c[h>>2]=f;t=a[b]|0;if(t<<24>>24==43|t<<24>>24==45){l=Cd[c[(c[j>>2]|0)+28>>2]&15](q,t)|0;t=c[h>>2]|0;c[h>>2]=t+1;a[t]=l;u=b+1|0}else{u=b}l=e;a:do{if((l-u|0)>1){if((a[u]|0)!=48){v=14;break}t=u+1|0;o=a[t]|0;if(!(o<<24>>24==88|o<<24>>24==120)){v=14;break}o=j;m=Cd[c[(c[o>>2]|0)+28>>2]&15](q,48)|0;p=c[h>>2]|0;c[h>>2]=p+1;a[p]=m;m=u+2|0;p=Cd[c[(c[o>>2]|0)+28>>2]&15](q,a[t]|0)|0;t=c[h>>2]|0;c[h>>2]=t+1;a[t]=p;if(m>>>0<e>>>0){w=m}else{x=m;y=m;break}while(1){p=a[w]|0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);t=w+1|0;if((vb(p<<24>>24|0,c[4338]|0)|0)==0){x=m;y=w;break a}if(t>>>0<e>>>0){w=t}else{x=m;y=t;break}}}else{v=14}}while(0);b:do{if((v|0)==14){if(u>>>0<e>>>0){z=u}else{x=u;y=u;break}while(1){w=a[z]|0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);p=z+1|0;if((Fb(w<<24>>24|0,c[4338]|0)|0)==0){x=u;y=z;break b}if(p>>>0<e>>>0){z=p}else{x=u;y=p;break}}}}while(0);u=n;z=a[u]|0;if((z&1)==0){A=(z&255)>>>1}else{A=c[n+4>>2]|0}do{if((A|0)==0){zd[c[(c[j>>2]|0)+32>>2]&7](q,x,y,c[h>>2]|0)|0;c[h>>2]=(c[h>>2]|0)+(y-x)}else{do{if((x|0)!=(y|0)){z=y+ -1|0;if(z>>>0>x>>>0){B=x;C=z}else{break}do{z=a[B]|0;a[B]=a[C]|0;a[C]=z;B=B+1|0;C=C+ -1|0;}while(B>>>0<C>>>0)}}while(0);w=td[c[(c[r>>2]|0)+16>>2]&63](s)|0;if(x>>>0<y>>>0){z=n+1|0;v=n+4|0;p=n+8|0;m=j;t=0;o=0;D=x;while(1){E=(a[u]&1)==0;do{if((a[(E?z:c[p>>2]|0)+o|0]|0)>0){if((t|0)!=(a[(E?z:c[p>>2]|0)+o|0]|0)){F=t;G=o;break}H=c[h>>2]|0;c[h>>2]=H+1;a[H]=w;H=a[u]|0;if((H&1)==0){I=(H&255)>>>1}else{I=c[v>>2]|0}F=0;G=(o>>>0<(I+ -1|0)>>>0)+o|0}else{F=t;G=o}}while(0);E=Cd[c[(c[m>>2]|0)+28>>2]&15](q,a[D]|0)|0;H=c[h>>2]|0;c[h>>2]=H+1;a[H]=E;E=D+1|0;if(E>>>0<y>>>0){t=F+1|0;o=G;D=E}else{break}}}D=f+(x-b)|0;o=c[h>>2]|0;if((D|0)==(o|0)){break}t=o+ -1|0;if(t>>>0>D>>>0){J=D;K=t}else{break}do{t=a[J]|0;a[J]=a[K]|0;a[K]=t;J=J+1|0;K=K+ -1|0;}while(J>>>0<K>>>0)}}while(0);c:do{if(y>>>0<e>>>0){K=j;J=y;while(1){x=a[J]|0;if(x<<24>>24==46){break}G=Cd[c[(c[K>>2]|0)+28>>2]&15](q,x)|0;x=c[h>>2]|0;c[h>>2]=x+1;a[x]=G;G=J+1|0;if(G>>>0<e>>>0){J=G}else{L=G;break c}}K=td[c[(c[r>>2]|0)+12>>2]&63](s)|0;G=c[h>>2]|0;c[h>>2]=G+1;a[G]=K;L=J+1|0}else{L=y}}while(0);zd[c[(c[j>>2]|0)+32>>2]&7](q,L,e,c[h>>2]|0)|0;q=(c[h>>2]|0)+(l-L)|0;c[h>>2]=q;if((d|0)==(e|0)){M=q;c[g>>2]=M;Ug(n);i=k;return}M=f+(d-b)|0;c[g>>2]=M;Ug(n);i=k;return}function Oj(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;d=i;i=i+16|0;l=d;m=d+8|0;n=i;i=i+16|0;o=i;i=i+8|0;p=i;i=i+16|0;q=i;i=i+8|0;r=i;i=i+32|0;s=i;i=i+8|0;t=i;i=i+64|0;u=i;i=i+8|0;v=i;i=i+8|0;w=i;i=i+8|0;x=i;i=i+8|0;y=i;i=i+8|0;z=q;c[z>>2]=37;c[z+4>>2]=0;z=q;q=z+1|0;A=f+4|0;B=c[A>>2]|0;if((B&2048|0)==0){C=q}else{a[q]=43;C=z+2|0}if((B&1024|0)==0){D=C}else{a[C]=35;D=C+1|0}C=B&260;q=B>>>14;do{if((C|0)==260){a[D]=76;B=D+1|0;if((q&1|0)==0){a[B]=97;E=0;break}else{a[B]=65;E=0;break}}else{a[D]=46;a[D+1|0]=42;a[D+2|0]=76;B=D+3|0;if((C|0)==4){if((q&1|0)==0){a[B]=102;E=1;break}else{a[B]=70;E=1;break}}else if((C|0)==256){if((q&1|0)==0){a[B]=101;E=1;break}else{a[B]=69;E=1;break}}else{if((q&1|0)==0){a[B]=103;E=1;break}else{a[B]=71;E=1;break}}}}while(0);q=r;c[s>>2]=q;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);r=c[4338]|0;if(E){c[p>>2]=c[f+8>>2];C=p+4|0;h[k>>3]=j;c[C>>2]=c[k>>2];c[C+4>>2]=c[k+4>>2];F=Fj(q,30,r,z,p)|0}else{p=o;h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];F=Fj(q,30,r,z,o)|0}do{if((F|0)>29){o=(a[17360]|0)==0;if(E){do{if(o){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);r=c[4338]|0;c[n>>2]=c[f+8>>2];p=n+4|0;h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];G=Mj(s,r,z,n)|0}else{do{if(o){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);o=c[4338]|0;r=m;h[k>>3]=j;c[r>>2]=c[k>>2];c[r+4>>2]=c[k+4>>2];G=Mj(s,o,z,m)|0}o=c[s>>2]|0;if((o|0)!=0){H=o;I=o;J=G;break}rp()}else{H=c[s>>2]|0;I=0;J=F}}while(0);F=H+J|0;s=c[A>>2]&176;do{if((s|0)==16){A=a[H]|0;if(A<<24>>24==43|A<<24>>24==45){K=H+1|0;break}if(!((J|0)>1&A<<24>>24==48)){L=44;break}A=a[H+1|0]|0;if(!(A<<24>>24==88|A<<24>>24==120)){L=44;break}K=H+2|0}else if((s|0)==32){K=F}else{L=44}}while(0);if((L|0)==44){K=H}do{if((H|0)==(q|0)){M=q;N=0;O=t}else{L=fp(J<<1)|0;if((L|0)!=0){M=H;N=L;O=L;break}rp()}}while(0);mh(w,f);Nj(M,K,F,O,u,v,w);vg(c[w>>2]|0)|0;w=e;c[y>>2]=c[w>>2];e=c[u>>2]|0;u=c[v>>2]|0;v=l;F=y;c[v+0>>2]=c[F+0>>2];Hj(x,l,O,e,u,f,g);g=c[x>>2]|0;c[w>>2]=g;c[b>>2]=g;if((N|0)!=0){gp(N)}if((I|0)==0){i=d;return}gp(I);i=d;return}function Pj(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;d=i;i=i+16|0;j=d;k=d+8|0;l=i;i=i+16|0;m=i;i=i+8|0;n=i;i=i+24|0;o=i;i=i+40|0;p=i;i=i+8|0;q=i;i=i+8|0;r=m;a[r+0|0]=a[16264|0]|0;a[r+1|0]=a[16265|0]|0;a[r+2|0]=a[16266|0]|0;a[r+3|0]=a[16267|0]|0;a[r+4|0]=a[16268|0]|0;a[r+5|0]=a[16269|0]|0;m=n;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);s=c[4338]|0;c[k>>2]=h;h=Fj(m,20,s,r,k)|0;k=n+h|0;r=c[f+4>>2]&176;do{if((r|0)==32){t=k}else if((r|0)==16){s=a[m]|0;if(s<<24>>24==43|s<<24>>24==45){t=n+1|0;break}if(!((h|0)>1&s<<24>>24==48)){u=10;break}s=a[n+1|0]|0;if(!(s<<24>>24==88|s<<24>>24==120)){u=10;break}t=n+2|0}else{u=10}}while(0);if((u|0)==10){t=m}u=o;mh(p,f);r=p;p=c[r>>2]|0;if(!((c[4366]|0)==-1)){c[l>>2]=17464;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17464,l,114)}l=(c[17468>>2]|0)+ -1|0;s=c[p+8>>2]|0;if(!((c[p+12>>2]|0)-s>>2>>>0>l>>>0)){v=bc(4)|0;w=v;Mo(w);gd(v|0,25424,101)}p=c[s+(l<<2)>>2]|0;if((p|0)==0){v=bc(4)|0;w=v;Mo(w);gd(v|0,25424,101)}vg(c[r>>2]|0)|0;zd[c[(c[p>>2]|0)+32>>2]&7](p,m,k,u)|0;m=o+h|0;if((t|0)==(k|0)){x=m;y=e;z=c[y>>2]|0;A=q;c[A>>2]=z;B=j;C=j;D=q;c[C+0>>2]=c[D+0>>2];Hj(b,j,u,x,m,f,g);E=j;i=d;return}x=o+(t-n)|0;y=e;z=c[y>>2]|0;A=q;c[A>>2]=z;B=j;C=j;D=q;c[C+0>>2]=c[D+0>>2];Hj(b,j,u,x,m,f,g);E=j;i=d;return}function Qj(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Rj(a){a=a|0;i=i;return}function Sj(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;j=i;i=i+56|0;k=j;l=j+8|0;m=j+24|0;n=j+32|0;o=j+40|0;if((c[f+4>>2]&1|0)==0){p=c[(c[d>>2]|0)+24>>2]|0;c[m>>2]=c[e>>2];q=h&1;r=k;s=m;c[r+0>>2]=c[s+0>>2];Bd[p&15](b,d,k,f,g,q);i=j;return}mh(n,f);f=n;n=c[f>>2]|0;if(!((c[4404]|0)==-1)){c[l>>2]=17616;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17616,l,114)}l=(c[17620>>2]|0)+ -1|0;q=c[n+8>>2]|0;if(!((c[n+12>>2]|0)-q>>2>>>0>l>>>0)){t=bc(4)|0;u=t;Mo(u);gd(t|0,25424,101)}n=c[q+(l<<2)>>2]|0;if((n|0)==0){t=bc(4)|0;u=t;Mo(u);gd(t|0,25424,101)}t=n;vg(c[f>>2]|0)|0;f=c[n>>2]|0;if(h){rd[c[f+24>>2]&63](o,t)}else{rd[c[f+28>>2]&63](o,t)}t=o;f=a[t]|0;if((f&1)==0){h=o+4|0;v=h;w=o+8|0;x=h}else{h=o+8|0;v=c[h>>2]|0;w=h;x=o+4|0}h=e;e=f;f=v;while(1){if((e&1)==0){y=x;z=(e&255)>>>1}else{y=c[w>>2]|0;z=c[x>>2]|0}if((f|0)==(y+(z<<2)|0)){break}v=c[f>>2]|0;n=c[h>>2]|0;do{if((n|0)!=0){u=n+24|0;l=c[u>>2]|0;if((l|0)==(c[n+28>>2]|0)){A=Cd[c[(c[n>>2]|0)+52>>2]&15](n,v)|0}else{c[u>>2]=l+4;c[l>>2]=v;A=v}if(!((A|0)==-1)){break}c[h>>2]=0}}while(0);e=a[t]|0;f=f+4|0}c[b>>2]=c[h>>2];dh(o);i=j;return}function Tj(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;d=i;i=i+16|0;j=d;k=d+8|0;l=i;i=i+8|0;m=i;i=i+16|0;n=i;i=i+88|0;o=i;i=i+8|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=l;a[s+0|0]=a[16256|0]|0;a[s+1|0]=a[16257|0]|0;a[s+2|0]=a[16258|0]|0;a[s+3|0]=a[16259|0]|0;a[s+4|0]=a[16260|0]|0;a[s+5|0]=a[16261|0]|0;t=l+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=t}else{a[t]=43;w=l+2|0}if((v&512|0)==0){x=w}else{a[w]=35;x=w+1|0}a[x]=108;w=x+1|0;x=v&74;do{if((x|0)==8){if((v&16384|0)==0){a[w]=120;break}else{a[w]=88;break}}else if((x|0)==64){a[w]=111}else{a[w]=100}}while(0);w=m;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);x=c[4338]|0;c[k>>2]=h;h=Fj(w,12,x,s,k)|0;k=m+h|0;s=c[u>>2]&176;do{if((s|0)==16){u=a[w]|0;if(u<<24>>24==43|u<<24>>24==45){y=m+1|0;break}if(!((h|0)>1&u<<24>>24==48)){z=20;break}u=a[m+1|0]|0;if(!(u<<24>>24==88|u<<24>>24==120)){z=20;break}y=m+2|0}else if((s|0)==32){y=k}else{z=20}}while(0);if((z|0)==20){y=w}z=n;mh(q,f);Uj(w,y,k,z,o,p,q);vg(c[q>>2]|0)|0;c[r>>2]=c[e>>2];e=c[o>>2]|0;o=c[p>>2]|0;p=j;q=r;c[p+0>>2]=c[q+0>>2];Vj(b,j,z,e,o,f,g);i=d;return}function Uj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;k=i;i=i+48|0;l=k;m=k+16|0;n=k+32|0;o=j;j=c[o>>2]|0;if(!((c[4364]|0)==-1)){c[m>>2]=17456;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17456,m,114)}m=(c[17460>>2]|0)+ -1|0;p=c[j+8>>2]|0;if(!((c[j+12>>2]|0)-p>>2>>>0>m>>>0)){q=bc(4)|0;r=q;Mo(r);gd(q|0,25424,101)}j=c[p+(m<<2)>>2]|0;if((j|0)==0){q=bc(4)|0;r=q;Mo(r);gd(q|0,25424,101)}q=j;r=c[o>>2]|0;if(!((c[4404]|0)==-1)){c[l>>2]=17616;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17616,l,114)}l=(c[17620>>2]|0)+ -1|0;o=c[r+8>>2]|0;if(!((c[r+12>>2]|0)-o>>2>>>0>l>>>0)){s=bc(4)|0;t=s;Mo(t);gd(s|0,25424,101)}r=c[o+(l<<2)>>2]|0;if((r|0)==0){s=bc(4)|0;t=s;Mo(t);gd(s|0,25424,101)}s=r;rd[c[(c[r>>2]|0)+20>>2]&63](n,s);t=n;l=a[t]|0;if((l&1)==0){u=(l&255)>>>1}else{u=c[n+4>>2]|0}do{if((u|0)==0){zd[c[(c[j>>2]|0)+48>>2]&7](q,b,e,f)|0;l=f+(e-b<<2)|0;c[h>>2]=l;v=l}else{c[h>>2]=f;l=a[b]|0;if(l<<24>>24==43|l<<24>>24==45){o=Cd[c[(c[j>>2]|0)+44>>2]&15](q,l)|0;l=c[h>>2]|0;c[h>>2]=l+4;c[l>>2]=o;w=b+1|0}else{w=b}do{if((e-w|0)>1){if((a[w]|0)!=48){x=w;break}o=w+1|0;l=a[o]|0;if(!(l<<24>>24==88|l<<24>>24==120)){x=w;break}l=j;m=Cd[c[(c[l>>2]|0)+44>>2]&15](q,48)|0;p=c[h>>2]|0;c[h>>2]=p+4;c[p>>2]=m;m=Cd[c[(c[l>>2]|0)+44>>2]&15](q,a[o]|0)|0;o=c[h>>2]|0;c[h>>2]=o+4;c[o>>2]=m;x=w+2|0}else{x=w}}while(0);do{if((x|0)!=(e|0)){m=e+ -1|0;if(m>>>0>x>>>0){y=x;z=m}else{break}do{m=a[y]|0;a[y]=a[z]|0;a[z]=m;y=y+1|0;z=z+ -1|0;}while(y>>>0<z>>>0)}}while(0);m=td[c[(c[r>>2]|0)+16>>2]&63](s)|0;if(x>>>0<e>>>0){o=n+1|0;l=j;p=n+4|0;A=n+8|0;B=0;C=0;D=x;while(1){E=(a[t]&1)==0;do{if((a[(E?o:c[A>>2]|0)+C|0]|0)==0){F=B;G=C}else{if((B|0)!=(a[(E?o:c[A>>2]|0)+C|0]|0)){F=B;G=C;break}H=c[h>>2]|0;c[h>>2]=H+4;c[H>>2]=m;H=a[t]|0;if((H&1)==0){I=(H&255)>>>1}else{I=c[p>>2]|0}F=0;G=(C>>>0<(I+ -1|0)>>>0)+C|0}}while(0);E=Cd[c[(c[l>>2]|0)+44>>2]&15](q,a[D]|0)|0;H=c[h>>2]|0;J=H+4|0;c[h>>2]=J;c[H>>2]=E;E=D+1|0;if(E>>>0<e>>>0){B=F+1|0;C=G;D=E}else{K=J;break}}}else{K=c[h>>2]|0}D=f+(x-b<<2)|0;if((D|0)==(K|0)){v=K;break}C=K+ -4|0;if(C>>>0>D>>>0){L=D;M=C}else{v=K;break}while(1){C=c[L>>2]|0;c[L>>2]=c[M>>2];c[M>>2]=C;C=L+4|0;D=M+ -4|0;if(C>>>0<D>>>0){M=D;L=C}else{v=K;break}}}}while(0);if((d|0)==(e|0)){N=v;c[g>>2]=N;Ug(n);i=k;return}N=f+(d-b<<2)|0;c[g>>2]=N;Ug(n);i=k;return}function Vj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+16|0;l=k;m=d;d=c[m>>2]|0;if((d|0)==0){c[b>>2]=0;i=k;return}n=g;g=e;o=n-g>>2;p=h+12|0;h=c[p>>2]|0;q=(h|0)>(o|0)?h-o|0:0;o=f;h=o-g|0;g=h>>2;do{if((h|0)>0){if((nd[c[(c[d>>2]|0)+48>>2]&31](d,e,g)|0)==(g|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);do{if((q|0)>0){ch(l,q,j);if((a[l]&1)==0){r=l+4|0}else{r=c[l+8>>2]|0}if((nd[c[(c[d>>2]|0)+48>>2]&31](d,r,q)|0)==(q|0)){dh(l);break}c[m>>2]=0;c[b>>2]=0;dh(l);i=k;return}}while(0);l=n-o|0;o=l>>2;do{if((l|0)>0){if((nd[c[(c[d>>2]|0)+48>>2]&31](d,f,o)|0)==(o|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);c[p>>2]=0;c[b>>2]=d;i=k;return}function Wj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;d=i;i=i+16|0;k=d;l=d+8|0;m=i;i=i+8|0;n=i;i=i+24|0;o=i;i=i+168|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=i;i=i+8|0;t=m;c[t>>2]=37;c[t+4>>2]=0;t=m;m=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=m}else{a[m]=43;w=t+2|0}if((v&512|0)==0){x=w}else{a[w]=35;x=w+1|0}w=x+2|0;a[x]=108;a[x+1|0]=108;x=v&74;do{if((x|0)==64){a[w]=111}else if((x|0)==8){if((v&16384|0)==0){a[w]=120;break}else{a[w]=88;break}}else{a[w]=100}}while(0);w=n;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);v=c[4338]|0;x=l;c[x>>2]=h;c[x+4>>2]=j;j=Fj(w,22,v,t,l)|0;l=n+j|0;t=c[u>>2]&176;do{if((t|0)==16){u=a[w]|0;if(u<<24>>24==43|u<<24>>24==45){y=n+1|0;break}if(!((j|0)>1&u<<24>>24==48)){z=20;break}u=a[n+1|0]|0;if(!(u<<24>>24==88|u<<24>>24==120)){z=20;break}y=n+2|0}else if((t|0)==32){y=l}else{z=20}}while(0);if((z|0)==20){y=w}z=o;mh(r,f);Uj(w,y,l,z,p,q,r);vg(c[r>>2]|0)|0;c[s>>2]=c[e>>2];e=c[p>>2]|0;p=c[q>>2]|0;q=k;r=s;c[q+0>>2]=c[r+0>>2];Vj(b,k,z,e,p,f,g);i=d;return}function Xj(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;d=i;i=i+16|0;j=d;k=d+8|0;l=i;i=i+8|0;m=i;i=i+16|0;n=i;i=i+88|0;o=i;i=i+8|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=l;a[s+0|0]=a[16256|0]|0;a[s+1|0]=a[16257|0]|0;a[s+2|0]=a[16258|0]|0;a[s+3|0]=a[16259|0]|0;a[s+4|0]=a[16260|0]|0;a[s+5|0]=a[16261|0]|0;t=l+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=t}else{a[t]=43;w=l+2|0}if((v&512|0)==0){x=w}else{a[w]=35;x=w+1|0}a[x]=108;w=x+1|0;x=v&74;do{if((x|0)==64){a[w]=111}else if((x|0)==8){if((v&16384|0)==0){a[w]=120;break}else{a[w]=88;break}}else{a[w]=117}}while(0);w=m;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);v=c[4338]|0;c[k>>2]=h;h=Fj(w,12,v,s,k)|0;k=m+h|0;s=c[u>>2]&176;do{if((s|0)==16){u=a[w]|0;if(u<<24>>24==43|u<<24>>24==45){y=m+1|0;break}if(!((h|0)>1&u<<24>>24==48)){z=20;break}u=a[m+1|0]|0;if(!(u<<24>>24==88|u<<24>>24==120)){z=20;break}y=m+2|0}else if((s|0)==32){y=k}else{z=20}}while(0);if((z|0)==20){y=w}z=n;mh(q,f);Uj(w,y,k,z,o,p,q);vg(c[q>>2]|0)|0;c[r>>2]=c[e>>2];e=c[o>>2]|0;o=c[p>>2]|0;p=j;q=r;c[p+0>>2]=c[q+0>>2];Vj(b,j,z,e,o,f,g);i=d;return}function Yj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;d=i;i=i+16|0;k=d;l=d+8|0;m=i;i=i+8|0;n=i;i=i+24|0;o=i;i=i+176|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=i;i=i+8|0;t=m;c[t>>2]=37;c[t+4>>2]=0;t=m;m=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=m}else{a[m]=43;w=t+2|0}if((v&512|0)==0){x=w}else{a[w]=35;x=w+1|0}w=x+2|0;a[x]=108;a[x+1|0]=108;x=v&74;do{if((x|0)==64){a[w]=111}else if((x|0)==8){if((v&16384|0)==0){a[w]=120;break}else{a[w]=88;break}}else{a[w]=117}}while(0);w=n;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);v=c[4338]|0;x=l;c[x>>2]=h;c[x+4>>2]=j;j=Fj(w,23,v,t,l)|0;l=n+j|0;t=c[u>>2]&176;do{if((t|0)==16){u=a[w]|0;if(u<<24>>24==43|u<<24>>24==45){y=n+1|0;break}if(!((j|0)>1&u<<24>>24==48)){z=20;break}u=a[n+1|0]|0;if(!(u<<24>>24==88|u<<24>>24==120)){z=20;break}y=n+2|0}else if((t|0)==32){y=l}else{z=20}}while(0);if((z|0)==20){y=w}z=o;mh(r,f);Uj(w,y,l,z,p,q,r);vg(c[r>>2]|0)|0;c[s>>2]=c[e>>2];e=c[p>>2]|0;p=c[q>>2]|0;q=k;r=s;c[q+0>>2]=c[r+0>>2];Vj(b,k,z,e,p,f,g);i=d;return}function Zj(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;d=i;i=i+24|0;l=d;m=d+8|0;n=i;i=i+16|0;o=i;i=i+8|0;p=i;i=i+16|0;q=i;i=i+8|0;r=i;i=i+32|0;s=i;i=i+8|0;t=i;i=i+232|0;u=i;i=i+8|0;v=i;i=i+8|0;w=i;i=i+8|0;x=i;i=i+8|0;y=i;i=i+8|0;z=q;c[z>>2]=37;c[z+4>>2]=0;z=q;q=z+1|0;A=f+4|0;B=c[A>>2]|0;if((B&2048|0)==0){C=q}else{a[q]=43;C=z+2|0}if((B&1024|0)==0){D=C}else{a[C]=35;D=C+1|0}C=B&260;q=B>>>14;do{if((C|0)==260){if((q&1|0)==0){a[D]=97;E=0;break}else{a[D]=65;E=0;break}}else{a[D]=46;B=D+2|0;a[D+1|0]=42;if((C|0)==256){if((q&1|0)==0){a[B]=101;E=1;break}else{a[B]=69;E=1;break}}else if((C|0)==4){if((q&1|0)==0){a[B]=102;E=1;break}else{a[B]=70;E=1;break}}else{if((q&1|0)==0){a[B]=103;E=1;break}else{a[B]=71;E=1;break}}}}while(0);q=r;c[s>>2]=q;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);r=c[4338]|0;if(E){c[p>>2]=c[f+8>>2];C=p+4|0;h[k>>3]=j;c[C>>2]=c[k>>2];c[C+4>>2]=c[k+4>>2];F=Fj(q,30,r,z,p)|0}else{p=o;h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];F=Fj(q,30,r,z,o)|0}do{if((F|0)>29){o=(a[17360]|0)==0;if(E){do{if(o){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);r=c[4338]|0;c[n>>2]=c[f+8>>2];p=n+4|0;h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];G=Mj(s,r,z,n)|0}else{do{if(o){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);o=c[4338]|0;c[m>>2]=c[f+8>>2];r=m+4|0;h[k>>3]=j;c[r>>2]=c[k>>2];c[r+4>>2]=c[k+4>>2];G=Mj(s,o,z,m)|0}o=c[s>>2]|0;if((o|0)!=0){H=o;I=o;J=G;break}rp()}else{H=c[s>>2]|0;I=0;J=F}}while(0);F=H+J|0;s=c[A>>2]&176;do{if((s|0)==16){A=a[H]|0;if(A<<24>>24==43|A<<24>>24==45){K=H+1|0;break}if(!((J|0)>1&A<<24>>24==48)){L=44;break}A=a[H+1|0]|0;if(!(A<<24>>24==88|A<<24>>24==120)){L=44;break}K=H+2|0}else if((s|0)==32){K=F}else{L=44}}while(0);if((L|0)==44){K=H}do{if((H|0)==(q|0)){M=q;N=0;O=t}else{L=fp(J<<3)|0;s=L;if((L|0)!=0){M=H;N=s;O=s;break}rp()}}while(0);mh(w,f);_j(M,K,F,O,u,v,w);vg(c[w>>2]|0)|0;w=e;c[y>>2]=c[w>>2];e=c[u>>2]|0;u=c[v>>2]|0;v=l;F=y;c[v+0>>2]=c[F+0>>2];Vj(x,l,O,e,u,f,g);g=c[x>>2]|0;c[w>>2]=g;c[b>>2]=g;if((N|0)!=0){gp(N)}if((I|0)==0){i=d;return}gp(I);i=d;return}function _j(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0;k=i;i=i+48|0;l=k;m=k+16|0;n=k+32|0;o=j;j=c[o>>2]|0;if(!((c[4364]|0)==-1)){c[m>>2]=17456;c[m+4>>2]=113;c[m+8>>2]=0;Pg(17456,m,114)}m=(c[17460>>2]|0)+ -1|0;p=c[j+8>>2]|0;if(!((c[j+12>>2]|0)-p>>2>>>0>m>>>0)){q=bc(4)|0;r=q;Mo(r);gd(q|0,25424,101)}j=c[p+(m<<2)>>2]|0;if((j|0)==0){q=bc(4)|0;r=q;Mo(r);gd(q|0,25424,101)}q=j;r=c[o>>2]|0;if(!((c[4404]|0)==-1)){c[l>>2]=17616;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17616,l,114)}l=(c[17620>>2]|0)+ -1|0;o=c[r+8>>2]|0;if(!((c[r+12>>2]|0)-o>>2>>>0>l>>>0)){s=bc(4)|0;t=s;Mo(t);gd(s|0,25424,101)}r=c[o+(l<<2)>>2]|0;if((r|0)==0){s=bc(4)|0;t=s;Mo(t);gd(s|0,25424,101)}s=r;rd[c[(c[r>>2]|0)+20>>2]&63](n,s);c[h>>2]=f;t=a[b]|0;if(t<<24>>24==43|t<<24>>24==45){l=Cd[c[(c[j>>2]|0)+44>>2]&15](q,t)|0;t=c[h>>2]|0;c[h>>2]=t+4;c[t>>2]=l;u=b+1|0}else{u=b}l=e;a:do{if((l-u|0)>1){if((a[u]|0)!=48){v=14;break}t=u+1|0;o=a[t]|0;if(!(o<<24>>24==88|o<<24>>24==120)){v=14;break}o=j;m=Cd[c[(c[o>>2]|0)+44>>2]&15](q,48)|0;p=c[h>>2]|0;c[h>>2]=p+4;c[p>>2]=m;m=u+2|0;p=Cd[c[(c[o>>2]|0)+44>>2]&15](q,a[t]|0)|0;t=c[h>>2]|0;c[h>>2]=t+4;c[t>>2]=p;if(m>>>0<e>>>0){w=m}else{x=m;y=m;break}while(1){p=a[w]|0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);t=w+1|0;if((vb(p<<24>>24|0,c[4338]|0)|0)==0){x=m;y=w;break a}if(t>>>0<e>>>0){w=t}else{x=m;y=t;break}}}else{v=14}}while(0);b:do{if((v|0)==14){if(u>>>0<e>>>0){z=u}else{x=u;y=u;break}while(1){w=a[z]|0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);p=z+1|0;if((Fb(w<<24>>24|0,c[4338]|0)|0)==0){x=u;y=z;break b}if(p>>>0<e>>>0){z=p}else{x=u;y=p;break}}}}while(0);u=n;z=a[u]|0;if((z&1)==0){A=(z&255)>>>1}else{A=c[n+4>>2]|0}do{if((A|0)==0){zd[c[(c[j>>2]|0)+48>>2]&7](q,x,y,c[h>>2]|0)|0;z=(c[h>>2]|0)+(y-x<<2)|0;c[h>>2]=z;B=z}else{do{if((x|0)!=(y|0)){z=y+ -1|0;if(z>>>0>x>>>0){C=x;D=z}else{break}do{z=a[C]|0;a[C]=a[D]|0;a[D]=z;C=C+1|0;D=D+ -1|0;}while(C>>>0<D>>>0)}}while(0);w=td[c[(c[r>>2]|0)+16>>2]&63](s)|0;if(x>>>0<y>>>0){z=n+1|0;v=n+4|0;p=n+8|0;m=j;t=0;o=0;E=x;while(1){F=(a[u]&1)==0;do{if((a[(F?z:c[p>>2]|0)+o|0]|0)>0){if((t|0)!=(a[(F?z:c[p>>2]|0)+o|0]|0)){G=t;H=o;break}I=c[h>>2]|0;c[h>>2]=I+4;c[I>>2]=w;I=a[u]|0;if((I&1)==0){J=(I&255)>>>1}else{J=c[v>>2]|0}G=0;H=(o>>>0<(J+ -1|0)>>>0)+o|0}else{G=t;H=o}}while(0);F=Cd[c[(c[m>>2]|0)+44>>2]&15](q,a[E]|0)|0;I=c[h>>2]|0;K=I+4|0;c[h>>2]=K;c[I>>2]=F;F=E+1|0;if(F>>>0<y>>>0){t=G+1|0;o=H;E=F}else{L=K;break}}}else{L=c[h>>2]|0}E=f+(x-b<<2)|0;if((E|0)==(L|0)){B=L;break}o=L+ -4|0;if(o>>>0>E>>>0){M=E;N=o}else{B=L;break}while(1){o=c[M>>2]|0;c[M>>2]=c[N>>2];c[N>>2]=o;o=M+4|0;E=N+ -4|0;if(o>>>0<E>>>0){N=E;M=o}else{B=L;break}}}}while(0);c:do{if(y>>>0<e>>>0){L=j;M=y;while(1){N=a[M]|0;if(N<<24>>24==46){break}x=Cd[c[(c[L>>2]|0)+44>>2]&15](q,N)|0;N=c[h>>2]|0;H=N+4|0;c[h>>2]=H;c[N>>2]=x;x=M+1|0;if(x>>>0<e>>>0){M=x}else{O=H;P=x;break c}}L=td[c[(c[r>>2]|0)+12>>2]&63](s)|0;x=c[h>>2]|0;H=x+4|0;c[h>>2]=H;c[x>>2]=L;O=H;P=M+1|0}else{O=B;P=y}}while(0);zd[c[(c[j>>2]|0)+48>>2]&7](q,P,e,O)|0;O=(c[h>>2]|0)+(l-P<<2)|0;c[h>>2]=O;if((d|0)==(e|0)){Q=O;c[g>>2]=Q;Ug(n);i=k;return}Q=f+(d-b<<2)|0;c[g>>2]=Q;Ug(n);i=k;return}function $j(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;d=i;i=i+16|0;l=d;m=d+8|0;n=i;i=i+16|0;o=i;i=i+8|0;p=i;i=i+16|0;q=i;i=i+8|0;r=i;i=i+32|0;s=i;i=i+8|0;t=i;i=i+232|0;u=i;i=i+8|0;v=i;i=i+8|0;w=i;i=i+8|0;x=i;i=i+8|0;y=i;i=i+8|0;z=q;c[z>>2]=37;c[z+4>>2]=0;z=q;q=z+1|0;A=f+4|0;B=c[A>>2]|0;if((B&2048|0)==0){C=q}else{a[q]=43;C=z+2|0}if((B&1024|0)==0){D=C}else{a[C]=35;D=C+1|0}C=B&260;q=B>>>14;do{if((C|0)==260){a[D]=76;B=D+1|0;if((q&1|0)==0){a[B]=97;E=0;break}else{a[B]=65;E=0;break}}else{a[D]=46;a[D+1|0]=42;a[D+2|0]=76;B=D+3|0;if((C|0)==4){if((q&1|0)==0){a[B]=102;E=1;break}else{a[B]=70;E=1;break}}else if((C|0)==256){if((q&1|0)==0){a[B]=101;E=1;break}else{a[B]=69;E=1;break}}else{if((q&1|0)==0){a[B]=103;E=1;break}else{a[B]=71;E=1;break}}}}while(0);q=r;c[s>>2]=q;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);r=c[4338]|0;if(E){c[p>>2]=c[f+8>>2];C=p+4|0;h[k>>3]=j;c[C>>2]=c[k>>2];c[C+4>>2]=c[k+4>>2];F=Fj(q,30,r,z,p)|0}else{p=o;h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];F=Fj(q,30,r,z,o)|0}do{if((F|0)>29){o=(a[17360]|0)==0;if(E){do{if(o){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);r=c[4338]|0;c[n>>2]=c[f+8>>2];p=n+4|0;h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];G=Mj(s,r,z,n)|0}else{do{if(o){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);o=c[4338]|0;r=m;h[k>>3]=j;c[r>>2]=c[k>>2];c[r+4>>2]=c[k+4>>2];G=Mj(s,o,z,m)|0}o=c[s>>2]|0;if((o|0)!=0){H=o;I=o;J=G;break}rp()}else{H=c[s>>2]|0;I=0;J=F}}while(0);F=H+J|0;s=c[A>>2]&176;do{if((s|0)==16){A=a[H]|0;if(A<<24>>24==43|A<<24>>24==45){K=H+1|0;break}if(!((J|0)>1&A<<24>>24==48)){L=44;break}A=a[H+1|0]|0;if(!(A<<24>>24==88|A<<24>>24==120)){L=44;break}K=H+2|0}else if((s|0)==32){K=F}else{L=44}}while(0);if((L|0)==44){K=H}do{if((H|0)==(q|0)){M=q;N=0;O=t}else{L=fp(J<<3)|0;s=L;if((L|0)!=0){M=H;N=s;O=s;break}rp()}}while(0);mh(w,f);_j(M,K,F,O,u,v,w);vg(c[w>>2]|0)|0;w=e;c[y>>2]=c[w>>2];e=c[u>>2]|0;u=c[v>>2]|0;v=l;F=y;c[v+0>>2]=c[F+0>>2];Vj(x,l,O,e,u,f,g);g=c[x>>2]|0;c[w>>2]=g;c[b>>2]=g;if((N|0)!=0){gp(N)}if((I|0)==0){i=d;return}gp(I);i=d;return}function ak(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;d=i;i=i+16|0;j=d;k=d+8|0;l=i;i=i+16|0;m=i;i=i+8|0;n=i;i=i+24|0;o=i;i=i+152|0;p=i;i=i+8|0;q=i;i=i+8|0;r=m;a[r+0|0]=a[16264|0]|0;a[r+1|0]=a[16265|0]|0;a[r+2|0]=a[16266|0]|0;a[r+3|0]=a[16267|0]|0;a[r+4|0]=a[16268|0]|0;a[r+5|0]=a[16269|0]|0;m=n;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);s=c[4338]|0;c[k>>2]=h;h=Fj(m,20,s,r,k)|0;k=n+h|0;r=c[f+4>>2]&176;do{if((r|0)==16){s=a[m]|0;if(s<<24>>24==43|s<<24>>24==45){t=n+1|0;break}if(!((h|0)>1&s<<24>>24==48)){u=10;break}s=a[n+1|0]|0;if(!(s<<24>>24==88|s<<24>>24==120)){u=10;break}t=n+2|0}else if((r|0)==32){t=k}else{u=10}}while(0);if((u|0)==10){t=m}mh(p,f);u=p;p=c[u>>2]|0;if(!((c[4364]|0)==-1)){c[l>>2]=17456;c[l+4>>2]=113;c[l+8>>2]=0;Pg(17456,l,114)}l=(c[17460>>2]|0)+ -1|0;r=c[p+8>>2]|0;if(!((c[p+12>>2]|0)-r>>2>>>0>l>>>0)){v=bc(4)|0;w=v;Mo(w);gd(v|0,25424,101)}p=c[r+(l<<2)>>2]|0;if((p|0)==0){v=bc(4)|0;w=v;Mo(w);gd(v|0,25424,101)}vg(c[u>>2]|0)|0;u=o;zd[c[(c[p>>2]|0)+48>>2]&7](p,m,k,u)|0;m=o+(h<<2)|0;if((t|0)==(k|0)){x=m;y=e;z=c[y>>2]|0;A=q;c[A>>2]=z;B=j;C=j;D=q;c[C+0>>2]=c[D+0>>2];Vj(b,j,u,x,m,f,g);E=j;i=d;return}x=o+(t-n<<2)|0;y=e;z=c[y>>2]|0;A=q;c[A>>2]=z;B=j;C=j;D=q;c[C+0>>2]=c[D+0>>2];Vj(b,j,u,x,m,f,g);E=j;i=d;return}



function Zm(a){a=a|0;i=i;return 1}function _m(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;b=d-c|0;i=i;return(b>>>0<e>>>0?b:e)|0}function $m(a){a=a|0;i=i;return 1}function an(a){a=a|0;var b=0;b=i;jm(a);mp(a);i=b;return}function bn(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;l=i;i=i+8|0;m=l;n=m;o=i;i=i+8|0;p=(e|0)==(f|0);a:do{if(p){c[k>>2]=h;c[g>>2]=e;q=e}else{r=e;while(1){s=r+4|0;if((c[r>>2]|0)==0){t=r;break}if((s|0)==(f|0)){t=f;break}else{r=s}}c[k>>2]=h;c[g>>2]=e;if(p|(h|0)==(j|0)){q=e;break}r=d;s=j;u=b+8|0;v=o;w=e;x=h;y=t;while(1){z=r;A=c[z+4>>2]|0;B=m;c[B>>2]=c[z>>2];c[B+4>>2]=A;A=fc(c[u>>2]|0)|0;B=Fo(x,g,y-w>>2,s-x|0,d)|0;if((A|0)!=0){fc(A|0)|0}if((B|0)==0){C=1;D=33;break}else if((B|0)==-1){D=10;break}A=(c[k>>2]|0)+B|0;c[k>>2]=A;if((A|0)==(j|0)){D=31;break}if((y|0)==(f|0)){E=c[g>>2]|0;F=A;G=f}else{A=fc(c[u>>2]|0)|0;B=Eo(v,0,d)|0;if((A|0)!=0){fc(A|0)|0}if((B|0)==-1){C=2;D=33;break}A=c[k>>2]|0;if(B>>>0>(s-A|0)>>>0){C=1;D=33;break}b:do{if((B|0)!=0){z=A;H=B;I=v;while(1){J=a[I]|0;c[k>>2]=z+1;a[z]=J;J=H+ -1|0;if((J|0)==0){break b}z=c[k>>2]|0;I=I+1|0;H=J}}}while(0);B=(c[g>>2]|0)+4|0;c[g>>2]=B;c:do{if((B|0)==(f|0)){K=f}else{A=B;while(1){H=A+4|0;if((c[A>>2]|0)==0){K=A;break c}if((H|0)==(f|0)){K=f;break}else{A=H}}}}while(0);E=B;F=c[k>>2]|0;G=K}if((E|0)==(f|0)|(F|0)==(j|0)){q=E;break a}else{w=E;x=F;y=G}}if((D|0)==10){c[k>>2]=x;d:do{if((w|0)==(c[g>>2]|0)){L=w}else{y=w;v=x;while(1){s=c[y>>2]|0;r=fc(c[u>>2]|0)|0;A=Eo(v,s,n)|0;if((r|0)!=0){fc(r|0)|0}if((A|0)==-1){L=y;break d}r=(c[k>>2]|0)+A|0;c[k>>2]=r;A=y+4|0;if((A|0)==(c[g>>2]|0)){L=A;break}else{y=A;v=r}}}}while(0);c[g>>2]=L;C=2;i=l;return C|0}else if((D|0)==31){q=c[g>>2]|0;break}else if((D|0)==33){i=l;return C|0}}}while(0);C=(q|0)!=(f|0)|0;i=l;return C|0}function cn(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;l=i;i=i+8|0;m=l;n=m;o=(e|0)==(f|0);a:do{if(o){c[k>>2]=h;c[g>>2]=e;p=e}else{q=e;while(1){r=q+1|0;if((a[q]|0)==0){s=q;break}if((r|0)==(f|0)){s=f;break}else{q=r}}c[k>>2]=h;c[g>>2]=e;if(o|(h|0)==(j|0)){p=e;break}q=d;r=j;t=b+8|0;u=e;v=h;w=s;while(1){x=q;y=c[x+4>>2]|0;z=m;c[z>>2]=c[x>>2];c[z+4>>2]=y;A=w;y=fc(c[t>>2]|0)|0;z=Bo(v,g,A-u|0,r-v>>2,d)|0;if((y|0)!=0){fc(y|0)|0}if((z|0)==0){B=2;C=32;break}else if((z|0)==-1){C=10;break}y=(c[k>>2]|0)+(z<<2)|0;c[k>>2]=y;if((y|0)==(j|0)){C=30;break}z=c[g>>2]|0;if((w|0)==(f|0)){D=z;E=y;F=f}else{x=fc(c[t>>2]|0)|0;G=Ao(y,z,1,d)|0;if((x|0)!=0){fc(x|0)|0}if((G|0)!=0){B=2;C=32;break}c[k>>2]=(c[k>>2]|0)+4;G=(c[g>>2]|0)+1|0;c[g>>2]=G;b:do{if((G|0)==(f|0)){H=f}else{x=G;while(1){z=x+1|0;if((a[x]|0)==0){H=x;break b}if((z|0)==(f|0)){H=f;break}else{x=z}}}}while(0);D=G;E=c[k>>2]|0;F=H}if((D|0)==(f|0)|(E|0)==(j|0)){p=D;break a}else{u=D;v=E;w=F}}if((C|0)==10){c[k>>2]=v;c:do{if((u|0)==(c[g>>2]|0)){I=u}else{w=u;r=v;while(1){q=fc(c[t>>2]|0)|0;x=Ao(r,w,A-w|0,n)|0;if((q|0)!=0){fc(q|0)|0}if((x|0)==-1){C=15;break}else if((x|0)==-2){C=16;break}else if((x|0)==0){J=w+1|0}else{J=w+x|0}x=(c[k>>2]|0)+4|0;c[k>>2]=x;if((J|0)==(c[g>>2]|0)){I=J;break c}else{w=J;r=x}}if((C|0)==15){c[g>>2]=w;B=2;i=l;return B|0}else if((C|0)==16){c[g>>2]=w;B=1;i=l;return B|0}}}while(0);c[g>>2]=I;B=(I|0)!=(f|0)|0;i=l;return B|0}else if((C|0)==30){p=c[g>>2]|0;break}else if((C|0)==32){i=l;return B|0}}}while(0);B=(p|0)!=(f|0)|0;i=l;return B|0}function dn(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0;h=i;i=i+8|0;c[g>>2]=e;e=h;j=fc(c[b+8>>2]|0)|0;b=Eo(e,0,d)|0;if((j|0)!=0){fc(j|0)|0}if((b|0)==0|(b|0)==-1){k=2;i=h;return k|0}j=b+ -1|0;b=c[g>>2]|0;if(j>>>0>(f-b|0)>>>0){k=1;i=h;return k|0}if((j|0)==0){k=0;i=h;return k|0}else{l=b;m=j;n=e}while(1){e=a[n]|0;c[g>>2]=l+1;a[l]=e;e=m+ -1|0;if((e|0)==0){k=0;break}l=c[g>>2]|0;n=n+1|0;m=e}i=h;return k|0}function en(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=i;d=a+8|0;a=fc(c[d>>2]|0)|0;e=Do(0,0,4)|0;if((a|0)!=0){fc(a|0)|0}do{if((e|0)==0){a=c[d>>2]|0;if((a|0)==0){f=1;break}g=fc(a|0)|0;if((g|0)==0){f=0;break}fc(g|0)|0;f=0}else{f=-1}}while(0);i=b;return f|0}function fn(a){a=a|0;i=i;return 0}function gn(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;g=i;if((f|0)==0|(d|0)==(e|0)){h=0;i=g;return h|0}j=e;k=a+8|0;a=d;d=0;l=0;while(1){m=fc(c[k>>2]|0)|0;n=zo(a,j-a|0,b)|0;if((m|0)!=0){fc(m|0)|0}if((n|0)==0){o=a+1|0;p=1}else if((n|0)==-2|(n|0)==-1){h=d;q=9;break}else{o=a+n|0;p=n}n=p+d|0;m=l+1|0;if(m>>>0>=f>>>0|(o|0)==(e|0)){h=n;q=9;break}else{a=o;d=n;l=m}}if((q|0)==9){i=g;return h|0}return 0}function hn(a){a=a|0;var b=0,d=0,e=0;b=i;d=c[a+8>>2]|0;do{if((d|0)==0){e=1}else{a=fc(d|0)|0;if((a|0)==0){e=4;break}fc(a|0)|0;e=4}}while(0);i=b;return e|0}function jn(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function kn(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=ln(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d>>1<<1);c[j>>2]=g+((c[k>>2]|0)-g);i=b;return l|0}function ln(d,f,g,h,j,k,l,m){d=d|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0;n=i;c[g>>2]=d;c[k>>2]=h;do{if((m&2|0)!=0){if((j-h|0)<3){o=1;i=n;return o|0}else{c[k>>2]=h+1;a[h]=-17;d=c[k>>2]|0;c[k>>2]=d+1;a[d]=-69;d=c[k>>2]|0;c[k>>2]=d+1;a[d]=-65;break}}}while(0);h=f;m=c[g>>2]|0;if(!(m>>>0<f>>>0)){o=0;i=n;return o|0}d=j;j=m;a:while(1){m=b[j>>1]|0;p=m&65535;if(p>>>0>l>>>0){o=2;q=26;break}do{if((m&65535)<128){r=c[k>>2]|0;if((d-r|0)<1){o=1;q=26;break a}c[k>>2]=r+1;a[r]=m}else{if((m&65535)<2048){r=c[k>>2]|0;if((d-r|0)<2){o=1;q=26;break a}c[k>>2]=r+1;a[r]=p>>>6|192;r=c[k>>2]|0;c[k>>2]=r+1;a[r]=p&63|128;break}if((m&65535)<55296){r=c[k>>2]|0;if((d-r|0)<3){o=1;q=26;break a}c[k>>2]=r+1;a[r]=p>>>12|224;r=c[k>>2]|0;c[k>>2]=r+1;a[r]=p>>>6&63|128;r=c[k>>2]|0;c[k>>2]=r+1;a[r]=p&63|128;break}if(!((m&65535)<56320)){if((m&65535)<57344){o=2;q=26;break a}r=c[k>>2]|0;if((d-r|0)<3){o=1;q=26;break a}c[k>>2]=r+1;a[r]=p>>>12|224;r=c[k>>2]|0;c[k>>2]=r+1;a[r]=p>>>6&63|128;r=c[k>>2]|0;c[k>>2]=r+1;a[r]=p&63|128;break}if((h-j|0)<4){o=1;q=26;break a}r=j+2|0;s=e[r>>1]|0;if((s&64512|0)!=56320){o=2;q=26;break a}if((d-(c[k>>2]|0)|0)<4){o=1;q=26;break a}t=p&960;if(((t<<10)+65536|p<<10&64512|s&1023)>>>0>l>>>0){o=2;q=26;break a}c[g>>2]=r;r=(t>>>6)+1|0;t=c[k>>2]|0;c[k>>2]=t+1;a[t]=r>>>2|240;t=c[k>>2]|0;c[k>>2]=t+1;a[t]=p>>>2&15|r<<4&48|128;r=c[k>>2]|0;c[k>>2]=r+1;a[r]=p<<4&48|s>>>6&15|128;r=c[k>>2]|0;c[k>>2]=r+1;a[r]=s&63|128}}while(0);p=(c[g>>2]|0)+2|0;c[g>>2]=p;if(p>>>0<f>>>0){j=p}else{o=0;q=26;break}}if((q|0)==26){i=n;return o|0}return 0}function mn(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=nn(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d);c[j>>2]=g+((c[k>>2]|0)-g>>1<<1);i=b;return l|0}function nn(e,f,g,h,j,k,l,m){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;n=i;c[g>>2]=e;c[k>>2]=h;h=c[g>>2]|0;do{if((m&4|0)==0){o=h}else{if((f-h|0)<=2){o=h;break}if(!((a[h]|0)==-17)){o=h;break}if(!((a[h+1|0]|0)==-69)){o=h;break}if(!((a[h+2|0]|0)==-65)){o=h;break}e=h+3|0;c[g>>2]=e;o=e}}while(0);a:do{if(o>>>0<f>>>0){h=f;m=j;e=o;p=c[k>>2]|0;b:while(1){if(!(p>>>0<j>>>0)){q=e;break a}r=a[e]|0;s=r&255;if(s>>>0>l>>>0){t=2;u=41;break}do{if(r<<24>>24>-1){b[p>>1]=r&255;c[g>>2]=e+1}else{if((r&255)<194){t=2;u=41;break b}if((r&255)<224){if((h-e|0)<2){t=1;u=41;break b}v=d[e+1|0]|0;if((v&192|0)!=128){t=2;u=41;break b}w=v&63|s<<6&1984;if(w>>>0>l>>>0){t=2;u=41;break b}b[p>>1]=w;c[g>>2]=e+2;break}if((r&255)<240){if((h-e|0)<3){t=1;u=41;break b}w=a[e+1|0]|0;v=a[e+2|0]|0;if((s|0)==224){if(!((w&-32)<<24>>24==-96)){t=2;u=41;break b}}else if((s|0)==237){if(!((w&-32)<<24>>24==-128)){t=2;u=41;break b}}else{if(!((w&-64)<<24>>24==-128)){t=2;u=41;break b}}x=v&255;if((x&192|0)!=128){t=2;u=41;break b}v=(w&255)<<6&4032|s<<12|x&63;if((v&65535)>>>0>l>>>0){t=2;u=41;break b}b[p>>1]=v;c[g>>2]=e+3;break}if(!((r&255)<245)){t=2;u=41;break b}if((h-e|0)<4){t=1;u=41;break b}v=a[e+1|0]|0;x=a[e+2|0]|0;w=a[e+3|0]|0;if((s|0)==240){if(!((v+112<<24>>24&255)<48)){t=2;u=41;break b}}else if((s|0)==244){if(!((v&-16)<<24>>24==-128)){t=2;u=41;break b}}else{if(!((v&-64)<<24>>24==-128)){t=2;u=41;break b}}y=x&255;if((y&192|0)!=128){t=2;u=41;break b}x=w&255;if((x&192|0)!=128){t=2;u=41;break b}if((m-p|0)<4){t=1;u=41;break b}w=s&7;z=v&255;v=y<<6;A=x&63;if((z<<12&258048|w<<18|v&4032|A)>>>0>l>>>0){t=2;u=41;break b}b[p>>1]=z<<2&60|y>>>4&3|((z>>>4&3|w<<2)<<6)+16320|55296;w=p+2|0;c[k>>2]=w;b[w>>1]=A|v&960|56320;c[g>>2]=(c[g>>2]|0)+4}}while(0);s=(c[k>>2]|0)+2|0;c[k>>2]=s;r=c[g>>2]|0;if(r>>>0<f>>>0){e=r;p=s}else{q=r;break a}}if((u|0)==41){i=n;return t|0}}else{q=o}}while(0);t=q>>>0<f>>>0|0;i=n;return t|0}function on(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;i=i;return 3}function pn(a){a=a|0;i=i;return 0}function qn(a){a=a|0;i=i;return 0}function rn(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;b=i;a=sn(c,d,e,1114111,0)|0;i=b;return a|0}function sn(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;h=i;do{if((g&4|0)==0){j=b}else{if((c-b|0)<=2){j=b;break}if(!((a[b]|0)==-17)){j=b;break}if(!((a[b+1|0]|0)==-69)){j=b;break}j=(a[b+2|0]|0)==-65?b+3|0:b}}while(0);a:do{if(j>>>0<c>>>0&(e|0)!=0){g=c;k=j;l=0;b:while(1){m=a[k]|0;n=m&255;if(n>>>0>f>>>0){o=k;break a}do{if(m<<24>>24>-1){p=k+1|0;q=l}else{if((m&255)<194){o=k;break a}if((m&255)<224){if((g-k|0)<2){o=k;break a}r=d[k+1|0]|0;if((r&192|0)!=128){o=k;break a}if((r&63|n<<6&1984)>>>0>f>>>0){o=k;break a}p=k+2|0;q=l;break}if((m&255)<240){s=k;if((g-s|0)<3){o=k;break a}r=a[k+1|0]|0;t=a[k+2|0]|0;if((n|0)==237){if(!((r&-32)<<24>>24==-128)){u=23;break b}}else if((n|0)==224){if(!((r&-32)<<24>>24==-96)){u=21;break b}}else{if(!((r&-64)<<24>>24==-128)){u=25;break b}}v=t&255;if((v&192|0)!=128){o=k;break a}if(((r&255)<<6&4032|n<<12&61440|v&63)>>>0>f>>>0){o=k;break a}p=k+3|0;q=l;break}if(!((m&255)<245)){o=k;break a}w=k;if((g-w|0)<4){o=k;break a}if((e-l|0)>>>0<2){o=k;break a}v=a[k+1|0]|0;r=a[k+2|0]|0;t=a[k+3|0]|0;if((n|0)==244){if(!((v&-16)<<24>>24==-128)){u=36;break b}}else if((n|0)==240){if(!((v+112<<24>>24&255)<48)){u=34;break b}}else{if(!((v&-64)<<24>>24==-128)){u=38;break b}}x=r&255;if((x&192|0)!=128){o=k;break a}r=t&255;if((r&192|0)!=128){o=k;break a}if(((v&255)<<12&258048|n<<18&1835008|x<<6&4032|r&63)>>>0>f>>>0){o=k;break a}p=k+4|0;q=l+1|0}}while(0);n=q+1|0;if(p>>>0<c>>>0&n>>>0<e>>>0){k=p;l=n}else{o=p;break a}}if((u|0)==21){y=s-b|0;i=h;return y|0}else if((u|0)==23){y=s-b|0;i=h;return y|0}else if((u|0)==25){y=s-b|0;i=h;return y|0}else if((u|0)==34){y=w-b|0;i=h;return y|0}else if((u|0)==36){y=w-b|0;i=h;return y|0}else if((u|0)==38){y=w-b|0;i=h;return y|0}}else{o=j}}while(0);y=o-b|0;i=h;return y|0}function tn(a){a=a|0;i=i;return 4}function un(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function vn(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=wn(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d>>2<<2);c[j>>2]=g+((c[k>>2]|0)-g);i=b;return l|0}function wn(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0;l=i;c[e>>2]=b;c[h>>2]=f;do{if((k&2|0)!=0){if((g-f|0)<3){m=1;i=l;return m|0}else{c[h>>2]=f+1;a[f]=-17;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=-69;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=-65;break}}}while(0);f=c[e>>2]|0;if(!(f>>>0<d>>>0)){m=0;i=l;return m|0}k=g;g=f;a:while(1){f=c[g>>2]|0;if((f&-2048|0)==55296|f>>>0>j>>>0){m=2;n=19;break}do{if(f>>>0<128){b=c[h>>2]|0;if((k-b|0)<1){m=1;n=19;break a}c[h>>2]=b+1;a[b]=f}else{if(f>>>0<2048){b=c[h>>2]|0;if((k-b|0)<2){m=1;n=19;break a}c[h>>2]=b+1;a[b]=f>>>6|192;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=f&63|128;break}b=c[h>>2]|0;o=k-b|0;if(f>>>0<65536){if((o|0)<3){m=1;n=19;break a}c[h>>2]=b+1;a[b]=f>>>12|224;p=c[h>>2]|0;c[h>>2]=p+1;a[p]=f>>>6&63|128;p=c[h>>2]|0;c[h>>2]=p+1;a[p]=f&63|128;break}else{if((o|0)<4){m=1;n=19;break a}c[h>>2]=b+1;a[b]=f>>>18|240;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=f>>>12&63|128;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=f>>>6&63|128;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=f&63|128;break}}}while(0);f=(c[e>>2]|0)+4|0;c[e>>2]=f;if(f>>>0<d>>>0){g=f}else{m=0;n=19;break}}if((n|0)==19){i=l;return m|0}return 0}function xn(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=yn(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d);c[j>>2]=g+((c[k>>2]|0)-g>>2<<2);i=b;return l|0}function yn(b,e,f,g,h,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;m=i;c[f>>2]=b;c[j>>2]=g;g=c[f>>2]|0;do{if((l&4|0)==0){n=g}else{if((e-g|0)<=2){n=g;break}if(!((a[g]|0)==-17)){n=g;break}if(!((a[g+1|0]|0)==-69)){n=g;break}if(!((a[g+2|0]|0)==-65)){n=g;break}b=g+3|0;c[f>>2]=b;n=b}}while(0);a:do{if(n>>>0<e>>>0){g=e;l=n;b=c[j>>2]|0;while(1){if(!(b>>>0<h>>>0)){o=l;p=39;break a}q=a[l]|0;r=q&255;do{if(q<<24>>24>-1){if(r>>>0>k>>>0){s=2;break a}c[b>>2]=r;c[f>>2]=l+1}else{if((q&255)<194){s=2;break a}if((q&255)<224){if((g-l|0)<2){s=1;break a}t=d[l+1|0]|0;if((t&192|0)!=128){s=2;break a}u=t&63|r<<6&1984;if(u>>>0>k>>>0){s=2;break a}c[b>>2]=u;c[f>>2]=l+2;break}if((q&255)<240){if((g-l|0)<3){s=1;break a}u=a[l+1|0]|0;t=a[l+2|0]|0;if((r|0)==224){if(!((u&-32)<<24>>24==-96)){s=2;break a}}else if((r|0)==237){if(!((u&-32)<<24>>24==-128)){s=2;break a}}else{if(!((u&-64)<<24>>24==-128)){s=2;break a}}v=t&255;if((v&192|0)!=128){s=2;break a}t=(u&255)<<6&4032|r<<12&61440|v&63;if(t>>>0>k>>>0){s=2;break a}c[b>>2]=t;c[f>>2]=l+3;break}if(!((q&255)<245)){s=2;break a}if((g-l|0)<4){s=1;break a}t=a[l+1|0]|0;v=a[l+2|0]|0;u=a[l+3|0]|0;if((r|0)==244){if(!((t&-16)<<24>>24==-128)){s=2;break a}}else if((r|0)==240){if(!((t+112<<24>>24&255)<48)){s=2;break a}}else{if(!((t&-64)<<24>>24==-128)){s=2;break a}}w=v&255;if((w&192|0)!=128){s=2;break a}v=u&255;if((v&192|0)!=128){s=2;break a}u=(t&255)<<12&258048|r<<18&1835008|w<<6&4032|v&63;if(u>>>0>k>>>0){s=2;break a}c[b>>2]=u;c[f>>2]=l+4}}while(0);r=(c[j>>2]|0)+4|0;c[j>>2]=r;q=c[f>>2]|0;if(q>>>0<e>>>0){l=q;b=r}else{o=q;p=39;break}}}else{o=n;p=39}}while(0);if((p|0)==39){s=o>>>0<e>>>0|0}i=m;return s|0}function zn(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;i=i;return 3}function An(a){a=a|0;i=i;return 0}function Bn(a){a=a|0;i=i;return 0}function Cn(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;b=i;a=Dn(c,d,e,1114111,0)|0;i=b;return a|0}function Dn(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;h=i;do{if((g&4|0)==0){j=b}else{if((c-b|0)<=2){j=b;break}if(!((a[b]|0)==-17)){j=b;break}if(!((a[b+1|0]|0)==-69)){j=b;break}j=(a[b+2|0]|0)==-65?b+3|0:b}}while(0);a:do{if(j>>>0<c>>>0&(e|0)!=0){g=c;k=j;l=1;b:while(1){m=a[k]|0;n=m&255;do{if(m<<24>>24>-1){if(n>>>0>f>>>0){o=k;break a}p=k+1|0}else{if((m&255)<194){o=k;break a}if((m&255)<224){if((g-k|0)<2){o=k;break a}q=d[k+1|0]|0;if((q&192|0)!=128){o=k;break a}if((q&63|n<<6&1984)>>>0>f>>>0){o=k;break a}p=k+2|0;break}if((m&255)<240){r=k;if((g-r|0)<3){o=k;break a}q=a[k+1|0]|0;s=a[k+2|0]|0;if((n|0)==224){if(!((q&-32)<<24>>24==-96)){t=21;break b}}else if((n|0)==237){if(!((q&-32)<<24>>24==-128)){t=23;break b}}else{if(!((q&-64)<<24>>24==-128)){t=25;break b}}u=s&255;if((u&192|0)!=128){o=k;break a}if(((q&255)<<6&4032|n<<12&61440|u&63)>>>0>f>>>0){o=k;break a}p=k+3|0;break}if(!((m&255)<245)){o=k;break a}v=k;if((g-v|0)<4){o=k;break a}u=a[k+1|0]|0;q=a[k+2|0]|0;s=a[k+3|0]|0;if((n|0)==240){if(!((u+112<<24>>24&255)<48)){t=33;break b}}else if((n|0)==244){if(!((u&-16)<<24>>24==-128)){t=35;break b}}else{if(!((u&-64)<<24>>24==-128)){t=37;break b}}w=q&255;if((w&192|0)!=128){o=k;break a}q=s&255;if((q&192|0)!=128){o=k;break a}if(((u&255)<<12&258048|n<<18&1835008|w<<6&4032|q&63)>>>0>f>>>0){o=k;break a}p=k+4|0}}while(0);if(!(p>>>0<c>>>0&l>>>0<e>>>0)){o=p;break a}k=p;l=l+1|0}if((t|0)==21){x=r-b|0;i=h;return x|0}else if((t|0)==23){x=r-b|0;i=h;return x|0}else if((t|0)==25){x=r-b|0;i=h;return x|0}else if((t|0)==33){x=v-b|0;i=h;return x|0}else if((t|0)==35){x=v-b|0;i=h;return x|0}else if((t|0)==37){x=v-b|0;i=h;return x|0}}else{o=j}}while(0);x=o-b|0;i=h;return x|0}function En(a){a=a|0;i=i;return 4}function Fn(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Gn(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Hn(a){a=a|0;var b=0;b=i;c[a>>2]=17632;Ug(a+12|0);mp(a);i=b;return}function In(a){a=a|0;var b=0;b=i;c[a>>2]=17632;Ug(a+12|0);i=b;return}function Jn(a){a=a|0;var b=0;b=i;c[a>>2]=17672;Ug(a+16|0);mp(a);i=b;return}function Kn(a){a=a|0;var b=0;b=i;c[a>>2]=17672;Ug(a+16|0);i=b;return}function Ln(b){b=b|0;i=i;return a[b+8|0]|0}function Mn(a){a=a|0;i=i;return c[a+8>>2]|0}function Nn(b){b=b|0;i=i;return a[b+9|0]|0}function On(a){a=a|0;i=i;return c[a+12>>2]|0}function Pn(a,b){a=a|0;b=b|0;var c=0;c=i;Rg(a,b+12|0);i=c;return}function Qn(a,b){a=a|0;b=b|0;var c=0;c=i;Rg(a,b+16|0);i=c;return}function Rn(a,b){a=a|0;b=b|0;b=i;Sg(a,17704,4);i=b;return}function Sn(a,b){a=a|0;b=b|0;b=i;bh(a,17712,Ho(17712)|0);i=b;return}function Tn(a,b){a=a|0;b=b|0;b=i;Sg(a,17736,5);i=b;return}function Un(a,b){a=a|0;b=b|0;b=i;bh(a,17744,Ho(17744)|0);i=b;return}function Vn(b){b=b|0;var d=0;b=i;if((a[17776]|0)!=0){d=c[4442]|0;i=b;return d|0}if((Ja(17776)|0)==0){d=c[4442]|0;i=b;return d|0}do{if((a[24976]|0)==0){if((Ja(24976)|0)==0){break}Fp(24808,0,168)|0;kd(117,0,q|0)|0;xb(24976)}}while(0);Vg(24808,24984)|0;Vg(24820|0,24992)|0;Vg(24832|0,25e3)|0;Vg(24844|0,25008)|0;Vg(24856|0,25024)|0;Vg(24868|0,25040)|0;Vg(24880|0,25048)|0;Vg(24892|0,25064)|0;Vg(24904|0,25072)|0;Vg(24916|0,25080)|0;Vg(24928|0,25088)|0;Vg(24940|0,25096)|0;Vg(24952|0,25104)|0;Vg(24964|0,25112)|0;c[4442]=24808;xb(17776);d=c[4442]|0;i=b;return d|0}function Wn(b){b=b|0;var d=0;b=i;if((a[17792]|0)!=0){d=c[4446]|0;i=b;return d|0}if((Ja(17792)|0)==0){d=c[4446]|0;i=b;return d|0}do{if((a[24440]|0)==0){if((Ja(24440)|0)==0){break}Fp(24272,0,168)|0;kd(118,0,q|0)|0;xb(24440)}}while(0);eh(24272,24448)|0;eh(24284|0,24480)|0;eh(24296|0,24512)|0;eh(24308|0,24544)|0;eh(24320|0,24584)|0;eh(24332|0,24624)|0;eh(24344|0,24656)|0;eh(24356|0,24696)|0;eh(24368|0,24712)|0;eh(24380|0,24728)|0;eh(24392|0,24744)|0;eh(24404|0,24760)|0;eh(24416|0,24776)|0;eh(24428|0,24792)|0;c[4446]=24272;xb(17792);d=c[4446]|0;i=b;return d|0}function Xn(b){b=b|0;var d=0;b=i;if((a[17808]|0)!=0){d=c[4450]|0;i=b;return d|0}if((Ja(17808)|0)==0){d=c[4450]|0;i=b;return d|0}do{if((a[24048]|0)==0){if((Ja(24048)|0)==0){break}Fp(23760,0,288)|0;kd(119,0,q|0)|0;xb(24048)}}while(0);Vg(23760,24056)|0;Vg(23772|0,24064)|0;Vg(23784|0,24080)|0;Vg(23796|0,24088)|0;Vg(23808|0,24096)|0;Vg(23820|0,24104)|0;Vg(23832|0,24112)|0;Vg(23844|0,24120)|0;Vg(23856|0,24128)|0;Vg(23868|0,24144)|0;Vg(23880|0,24152)|0;Vg(23892|0,24168)|0;Vg(23904|0,24184)|0;Vg(23916|0,24192)|0;Vg(23928|0,24200)|0;Vg(23940|0,24208)|0;Vg(23952|0,24096)|0;Vg(23964|0,24216)|0;Vg(23976|0,24224)|0;Vg(23988|0,24232)|0;Vg(24e3|0,24240)|0;Vg(24012|0,24248)|0;Vg(24024|0,24256)|0;Vg(24036|0,24264)|0;c[4450]=23760;xb(17808);d=c[4450]|0;i=b;return d|0}function Yn(b){b=b|0;var d=0;b=i;if((a[17824]|0)!=0){d=c[4454]|0;i=b;return d|0}if((Ja(17824)|0)==0){d=c[4454]|0;i=b;return d|0}do{if((a[23208]|0)==0){if((Ja(23208)|0)==0){break}Fp(22920,0,288)|0;kd(120,0,q|0)|0;xb(23208)}}while(0);eh(22920,23216)|0;eh(22932|0,23248)|0;eh(22944|0,23288)|0;eh(22956|0,23312)|0;eh(22968|0,23632)|0;eh(22980|0,23336)|0;eh(22992|0,23360)|0;eh(23004|0,23384)|0;eh(23016|0,23416)|0;eh(23028|0,23456)|0;eh(23040|0,23488)|0;eh(23052|0,23528)|0;eh(23064|0,23568)|0;eh(23076|0,23584)|0;eh(23088|0,23600)|0;eh(23100|0,23616)|0;eh(23112|0,23632)|0;eh(23124|0,23648)|0;eh(23136|0,23664)|0;eh(23148|0,23680)|0;eh(23160|0,23696)|0;eh(23172|0,23712)|0;eh(23184|0,23728)|0;eh(23196|0,23744)|0;c[4454]=22920;xb(17824);d=c[4454]|0;i=b;return d|0}function Zn(b){b=b|0;var d=0;b=i;if((a[17840]|0)!=0){d=c[4458]|0;i=b;return d|0}if((Ja(17840)|0)==0){d=c[4458]|0;i=b;return d|0}do{if((a[22896]|0)==0){if((Ja(22896)|0)==0){break}Fp(22608,0,288)|0;kd(121,0,q|0)|0;xb(22896)}}while(0);Vg(22608,22904)|0;Vg(22620|0,22912)|0;c[4458]=22608;xb(17840);d=c[4458]|0;i=b;return d|0}function _n(b){b=b|0;var d=0;b=i;if((a[17856]|0)!=0){d=c[4462]|0;i=b;return d|0}if((Ja(17856)|0)==0){d=c[4462]|0;i=b;return d|0}do{if((a[22568]|0)==0){if((Ja(22568)|0)==0){break}Fp(22280,0,288)|0;kd(122,0,q|0)|0;xb(22568)}}while(0);eh(22280,22576)|0;eh(22292|0,22592)|0;c[4462]=22280;xb(17856);d=c[4462]|0;i=b;return d|0}function $n(b){b=b|0;b=i;do{if((a[17880]|0)==0){if((Ja(17880)|0)==0){break}Sg(17864,17888,8);kd(123,17864,q|0)|0;xb(17880)}}while(0);i=b;return 17864}function ao(b){b=b|0;b=i;if((a[17920]|0)!=0){i=b;return 17904}if((Ja(17920)|0)==0){i=b;return 17904}bh(17904,17928,Ho(17928)|0);kd(124,17904,q|0)|0;xb(17920);i=b;return 17904}function bo(b){b=b|0;b=i;do{if((a[17984]|0)==0){if((Ja(17984)|0)==0){break}Sg(17968,17992,8);kd(123,17968,q|0)|0;xb(17984)}}while(0);i=b;return 17968}function co(b){b=b|0;b=i;if((a[18024]|0)!=0){i=b;return 18008}if((Ja(18024)|0)==0){i=b;return 18008}bh(18008,18032,Ho(18032)|0);kd(124,18008,q|0)|0;xb(18024);i=b;return 18008}function eo(b){b=b|0;b=i;do{if((a[18088]|0)==0){if((Ja(18088)|0)==0){break}Sg(18072,18096,20);kd(123,18072,q|0)|0;xb(18088)}}while(0);i=b;return 18072}function fo(b){b=b|0;b=i;if((a[18136]|0)!=0){i=b;return 18120}if((Ja(18136)|0)==0){i=b;return 18120}bh(18120,18144,Ho(18144)|0);kd(124,18120,q|0)|0;xb(18136);i=b;return 18120}function go(b){b=b|0;b=i;do{if((a[18248]|0)==0){if((Ja(18248)|0)==0){break}Sg(18232,18256,11);kd(123,18232,q|0)|0;xb(18248)}}while(0);i=b;return 18232}function ho(b){b=b|0;b=i;if((a[18288]|0)!=0){i=b;return 18272}if((Ja(18288)|0)==0){i=b;return 18272}bh(18272,18296,Ho(18296)|0);kd(124,18272,q|0)|0;xb(18288);i=b;return 18272}function io(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0.0,j=0,k=0,l=0.0;f=i;i=i+8|0;g=f;if((b|0)==(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}j=ic()|0;k=c[j>>2]|0;c[j>>2]=0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);l=+Ap(b,g,c[4338]|0);b=c[j>>2]|0;if((b|0)==0){c[j>>2]=k}if((c[g>>2]|0)!=(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}if((b|0)!=34){h=l;i=f;return+h}c[e>>2]=4;h=l;i=f;return+h}function jo(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0.0,j=0,k=0,l=0.0;f=i;i=i+8|0;g=f;if((b|0)==(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}j=ic()|0;k=c[j>>2]|0;c[j>>2]=0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);l=+Ap(b,g,c[4338]|0);b=c[j>>2]|0;if((b|0)==0){c[j>>2]=k}if((c[g>>2]|0)!=(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}if((b|0)!=34){h=l;i=f;return+h}c[e>>2]=4;h=l;i=f;return+h}function ko(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0.0,j=0,k=0,l=0.0;f=i;i=i+8|0;g=f;if((b|0)==(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}j=ic()|0;k=c[j>>2]|0;c[j>>2]=0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);l=+Ap(b,g,c[4338]|0);b=c[j>>2]|0;if((b|0)==0){c[j>>2]=k}if((c[g>>2]|0)!=(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}if((b|0)==34){c[e>>2]=4}h=l;i=f;return+h}function lo(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;i=i+8|0;h=g;do{if((b|0)==(d|0)){c[e>>2]=4;j=0;k=0}else{if((a[b]|0)==45){c[e>>2]=4;j=0;k=0;break}l=ic()|0;m=c[l>>2]|0;c[l>>2]=0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);n=Rb(b|0,h|0,f|0,c[4338]|0)|0;o=c[l>>2]|0;if((o|0)==0){c[l>>2]=m}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;k=0;break}if((o|0)!=34){j=n;k=J;break}c[e>>2]=4;j=-1;k=-1}}while(0);J=k;i=g;return j|0}function mo(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((a[b]|0)==45){c[e>>2]=4;j=0;i=g;return j|0}k=ic()|0;l=c[k>>2]|0;c[k>>2]=0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);m=Rb(b|0,h|0,f|0,c[4338]|0)|0;f=J;b=c[k>>2]|0;if((b|0)==0){c[k>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((b|0)==34|(f>>>0>0|(f|0)==0&m>>>0>4294967295)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=m;i=g;return j|0}return 0}function no(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((a[b]|0)==45){c[e>>2]=4;j=0;i=g;return j|0}k=ic()|0;l=c[k>>2]|0;c[k>>2]=0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);m=Rb(b|0,h|0,f|0,c[4338]|0)|0;f=J;b=c[k>>2]|0;if((b|0)==0){c[k>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((b|0)==34|(f>>>0>0|(f|0)==0&m>>>0>4294967295)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=m;i=g;return j|0}return 0}function oo(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((a[b]|0)==45){c[e>>2]=4;j=0;i=g;return j|0}k=ic()|0;l=c[k>>2]|0;c[k>>2]=0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);m=Rb(b|0,h|0,f|0,c[4338]|0)|0;f=J;b=c[k>>2]|0;if((b|0)==0){c[k>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((b|0)==34|(f>>>0>0|(f|0)==0&m>>>0>65535)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=m&65535;i=g;return j|0}return 0}function po(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;g=i;i=i+8|0;h=g;if((b|0)==(d|0)){c[e>>2]=4;j=0;k=0;J=k;i=g;return j|0}l=ic()|0;m=c[l>>2]|0;c[l>>2]=0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);n=jb(b|0,h|0,f|0,c[4338]|0)|0;f=J;b=c[l>>2]|0;if((b|0)==0){c[l>>2]=m}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;k=0;J=k;i=g;return j|0}if((b|0)==34){c[e>>2]=4;e=(f|0)>0|(f|0)==0&n>>>0>0;J=e?2147483647:-2147483648;i=g;return(e?-1:0)|0}else{j=n;k=f;J=k;i=g;return j|0}return 0}function qo(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}k=ic()|0;l=c[k>>2]|0;c[k>>2]=0;do{if((a[17360]|0)==0){if((Ja(17360)|0)==0){break}c[4338]=Eb(2147483647,17368,0)|0;xb(17360)}}while(0);m=jb(b|0,h|0,f|0,c[4338]|0)|0;f=J;b=c[k>>2]|0;if((b|0)==0){c[k>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}do{if((b|0)==34){c[e>>2]=4;if((f|0)>0|(f|0)==0&m>>>0>0){j=2147483647}else{break}i=g;return j|0}else{if((f|0)<-1|(f|0)==-1&m>>>0<2147483648){c[e>>2]=4;break}if((f|0)>0|(f|0)==0&m>>>0>2147483647){c[e>>2]=4;j=2147483647;i=g;return j|0}else{j=m;i=g;return j|0}}}while(0);j=-2147483648;i=g;return j|0}function ro(a){a=a|0;var b=0,e=0,f=0,g=0,h=0;b=i;e=a+4|0;f=e;g=d[f]|d[f+1|0]<<8|d[f+2|0]<<16|d[f+3|0]<<24;f=e+4|0;e=d[f]|d[f+1|0]<<8|d[f+2|0]<<16|d[f+3|0]<<24;f=(c[a>>2]|0)+(e>>1)|0;a=f;if((e&1|0)==0){h=g;qd[h&127](a);i=b;return}else{h=c[(c[f>>2]|0)+g>>2]|0;qd[h&127](a);i=b;return}}function so(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;e=i;f=b+8|0;g=b+4|0;h=c[g>>2]|0;j=c[f>>2]|0;k=h;if(!(j-k>>2>>>0<d>>>0)){l=d;m=h;do{if((m|0)==0){n=0}else{c[m>>2]=0;n=c[g>>2]|0}m=n+4|0;c[g>>2]=m;l=l+ -1|0;}while((l|0)!=0);i=e;return}l=b+16|0;m=b;n=c[m>>2]|0;h=k-n>>2;k=h+d|0;if(k>>>0>1073741823){km(0)}o=j-n|0;do{if(o>>2>>>0<536870911){n=o>>1;j=n>>>0<k>>>0?k:n;if((j|0)==0){p=0;q=0;break}n=b+128|0;if(!((a[n]|0)==0&j>>>0<29)){r=j;s=11;break}a[n]=1;p=j;q=l}else{r=1073741823;s=11}}while(0);if((s|0)==11){p=r;q=kp(r<<2)|0}r=d;d=q+(h<<2)|0;do{if((d|0)==0){t=0}else{c[d>>2]=0;t=d}d=t+4|0;r=r+ -1|0;}while((r|0)!=0);r=c[m>>2]|0;t=(c[g>>2]|0)-r|0;s=q+(h-(t>>2)<<2)|0;h=r;Cp(s|0,h|0,t|0)|0;c[m>>2]=s;c[g>>2]=d;c[f>>2]=q+(p<<2);if((r|0)==0){i=e;return}if((l|0)==(r|0)){a[b+128|0]=0;i=e;return}else{mp(h);i=e;return}}function to(a){a=a|0;a=i;dh(22556|0);dh(22544|0);dh(22532|0);dh(22520|0);dh(22508|0);dh(22496|0);dh(22484|0);dh(22472|0);dh(22460|0);dh(22448|0);dh(22436|0);dh(22424|0);dh(22412|0);dh(22400|0);dh(22388|0);dh(22376|0);dh(22364|0);dh(22352|0);dh(22340|0);dh(22328|0);dh(22316|0);dh(22304|0);dh(22292|0);dh(22280);i=a;return}function uo(a){a=a|0;a=i;Ug(22884|0);Ug(22872|0);Ug(22860|0);Ug(22848|0);Ug(22836|0);Ug(22824|0);Ug(22812|0);Ug(22800|0);Ug(22788|0);Ug(22776|0);Ug(22764|0);Ug(22752|0);Ug(22740|0);Ug(22728|0);Ug(22716|0);Ug(22704|0);Ug(22692|0);Ug(22680|0);Ug(22668|0);Ug(22656|0);Ug(22644|0);Ug(22632|0);Ug(22620|0);Ug(22608);i=a;return}function vo(a){a=a|0;a=i;dh(23196|0);dh(23184|0);dh(23172|0);dh(23160|0);dh(23148|0);dh(23136|0);dh(23124|0);dh(23112|0);dh(23100|0);dh(23088|0);dh(23076|0);dh(23064|0);dh(23052|0);dh(23040|0);dh(23028|0);dh(23016|0);dh(23004|0);dh(22992|0);dh(22980|0);dh(22968|0);dh(22956|0);dh(22944|0);dh(22932|0);dh(22920);i=a;return}function wo(a){a=a|0;a=i;Ug(24036|0);Ug(24024|0);Ug(24012|0);Ug(24e3|0);Ug(23988|0);Ug(23976|0);Ug(23964|0);Ug(23952|0);Ug(23940|0);Ug(23928|0);Ug(23916|0);Ug(23904|0);Ug(23892|0);Ug(23880|0);Ug(23868|0);Ug(23856|0);Ug(23844|0);Ug(23832|0);Ug(23820|0);Ug(23808|0);Ug(23796|0);Ug(23784|0);Ug(23772|0);Ug(23760);i=a;return}function xo(a){a=a|0;a=i;dh(24428|0);dh(24416|0);dh(24404|0);dh(24392|0);dh(24380|0);dh(24368|0);dh(24356|0);dh(24344|0);dh(24332|0);dh(24320|0);dh(24308|0);dh(24296|0);dh(24284|0);dh(24272);i=a;return}function yo(a){a=a|0;a=i;Ug(24964|0);Ug(24952|0);Ug(24940|0);Ug(24928|0);Ug(24916|0);Ug(24904|0);Ug(24892|0);Ug(24880|0);Ug(24868|0);Ug(24856|0);Ug(24844|0);Ug(24832|0);Ug(24820|0);Ug(24808);i=a;return}function zo(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=Ao(0,a,b,(c|0)!=0?c:25328)|0;i=d;return e|0}function Ao(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;i=i+8|0;h=g;c[h>>2]=b;j=(f|0)==0?25336:f;f=c[j>>2]|0;a:do{if((d|0)==0){if((f|0)==0){k=0}else{break}i=g;return k|0}else{if((b|0)==0){l=h;c[h>>2]=l;m=l}else{m=b}if((e|0)==0){k=-2;i=g;return k|0}do{if((f|0)==0){l=a[d]|0;n=l&255;if(l<<24>>24>-1){c[m>>2]=n;k=l<<24>>24!=0|0;i=g;return k|0}else{l=n+ -194|0;if(l>>>0>50){break a}o=e+ -1|0;p=c[25120+(l<<2)>>2]|0;q=d+1|0;break}}else{o=e;p=f;q=d}}while(0);b:do{if((o|0)==0){r=p}else{l=a[q]|0;n=(l&255)>>>3;if((n+ -16|n+(p>>26))>>>0>7){break a}else{s=o;t=l;u=p;v=q}while(1){v=v+1|0;u=(t&255)+ -128|u<<6;s=s+ -1|0;if((u|0)>=0){break}if((s|0)==0){r=u;break b}t=a[v]|0;if(((t&255)+ -128|0)>>>0>63){break a}}c[j>>2]=0;c[m>>2]=u;k=e-s|0;i=g;return k|0}}while(0);c[j>>2]=r;k=-2;i=g;return k|0}}while(0);c[j>>2]=0;c[(ic()|0)>>2]=84;k=-1;i=g;return k|0}function Bo(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;g=i;i=i+1032|0;h=g+1024|0;j=c[b>>2]|0;c[h>>2]=j;k=(a|0)!=0;l=g;m=k?e:256;e=k?a:l;a:do{if((j|0)==0|(m|0)==0){n=d;o=m;p=j;q=0;r=e}else{a=d;s=m;t=j;u=0;v=e;while(1){w=a>>>2;x=w>>>0>=s>>>0;if(!(x|a>>>0>131)){n=a;o=s;p=t;q=u;r=v;break a}y=x?s:w;z=a-y|0;w=Co(v,h,y,f)|0;if((w|0)==-1){break}if((v|0)==(l|0)){A=s;B=l}else{A=s-w|0;B=v+(w<<2)|0}y=w+u|0;w=c[h>>2]|0;if((w|0)==0|(A|0)==0){n=z;o=A;p=w;q=y;r=B;break a}else{a=z;s=A;t=w;u=y;v=B}}n=z;o=0;p=c[h>>2]|0;q=-1;r=v}}while(0);b:do{if((p|0)==0){C=q}else{if((o|0)==0|(n|0)==0){C=q;break}else{D=n;E=o;F=p;G=q;H=r}while(1){I=Ao(H,F,D,f)|0;if((I+2|0)>>>0<3){break}z=(c[h>>2]|0)+I|0;c[h>>2]=z;B=E+ -1|0;A=G+1|0;if((B|0)==0|(D|0)==(I|0)){C=A;break b}else{D=D-I|0;E=B;F=z;G=A;H=H+4|0}}if((I|0)==-1){C=-1;break}else if((I|0)==0){c[h>>2]=0;C=G;break}else{c[f>>2]=0;C=G;break}}}while(0);if(!k){i=g;return C|0}c[b>>2]=c[h>>2];i=g;return C|0}function Co(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0;h=i;j=c[e>>2]|0;do{if((g|0)==0){k=5}else{l=g;m=c[l>>2]|0;if((m|0)==0){k=5;break}if((b|0)==0){n=f;o=m;p=j;k=16;break}c[l>>2]=0;q=b;r=f;s=m;t=j;k=36}}while(0);if((k|0)==5){if((b|0)==0){u=f;v=j;k=7}else{w=b;x=f;y=j;k=6}}a:while(1){if((k|0)==6){k=0;if((x|0)==0){z=f;k=53;break}else{A=w;B=x;C=y}while(1){j=a[C]|0;do{if(((j&255)+ -1|0)>>>0<127){if((C&3|0)==0&B>>>0>3){D=A;E=B;F=C}else{G=A;H=B;I=j;J=C;break}while(1){K=c[F>>2]|0;if(((K+ -16843009|K)&-2139062144|0)!=0){k=30;break}c[D>>2]=K&255;c[D+4>>2]=d[F+1|0]|0;c[D+8>>2]=d[F+2|0]|0;L=F+4|0;M=D+16|0;c[D+12>>2]=d[F+3|0]|0;N=E+ -4|0;if(N>>>0>3){D=M;E=N;F=L}else{k=31;break}}if((k|0)==30){k=0;G=D;H=E;I=K&255;J=F;break}else if((k|0)==31){k=0;G=M;H=N;I=a[L]|0;J=L;break}}else{G=A;H=B;I=j;J=C}}while(0);O=I&255;if(!((O+ -1|0)>>>0<127)){break}c[G>>2]=O;j=H+ -1|0;if((j|0)==0){z=f;k=53;break a}else{A=G+4|0;B=j;C=J+1|0}}j=O+ -194|0;if(j>>>0>50){P=G;Q=H;R=J;k=47;break}q=G;r=H;s=c[25120+(j<<2)>>2]|0;t=J+1|0;k=36;continue}else if((k|0)==7){k=0;j=a[v]|0;do{if(((j&255)+ -1|0)>>>0<127){if((v&3|0)!=0){S=u;T=j;U=v;break}g=c[v>>2]|0;if(((g+ -16843009|g)&-2139062144|0)==0){m=u;l=v;while(1){V=l+4|0;W=m+ -4|0;X=c[V>>2]|0;if(((X+ -16843009|X)&-2139062144|0)==0){l=V;m=W}else{Y=W;Z=X;_=V;break}}}else{Y=u;Z=g;_=v}S=Y;T=Z&255;U=_}else{S=u;T=j;U=v}}while(0);j=T&255;if((j+ -1|0)>>>0<127){u=S+ -1|0;v=U+1|0;k=7;continue}m=j+ -194|0;if(m>>>0>50){P=b;Q=S;R=U;k=47;break}n=S;o=c[25120+(m<<2)>>2]|0;p=U+1|0;k=16;continue}else if((k|0)==16){k=0;m=(d[p]|0)>>>3;if((m+ -16|m+(o>>26))>>>0>7){k=17;break}m=p+1|0;do{if((o&33554432|0)==0){$=m}else{if(((d[m]|0)+ -128|0)>>>0>63){k=20;break a}j=p+2|0;if((o&524288|0)==0){$=j;break}if(((d[j]|0)+ -128|0)>>>0>63){k=23;break a}$=p+3|0}}while(0);u=n+ -1|0;v=$;k=7;continue}else if((k|0)==36){k=0;m=d[t]|0;j=m>>>3;if((j+ -16|j+(s>>26))>>>0>7){k=37;break}j=t+1|0;aa=m+ -128|s<<6;do{if((aa|0)<0){m=(d[j]|0)+ -128|0;if(m>>>0>63){k=40;break a}l=t+2|0;ba=m|aa<<6;if((ba|0)>=0){ca=ba;da=l;break}m=(d[l]|0)+ -128|0;if(m>>>0>63){k=43;break a}ca=m|ba<<6;da=t+3|0}else{ca=aa;da=j}}while(0);c[q>>2]=ca;w=q+4|0;x=r+ -1|0;y=da;k=6;continue}}if((k|0)==17){ea=b;fa=n;ga=o;ha=p+ -1|0;k=46}else if((k|0)==20){ea=b;fa=n;ga=o;ha=p+ -1|0;k=46}else if((k|0)==23){ea=b;fa=n;ga=o;ha=p+ -1|0;k=46}else if((k|0)==37){ea=q;fa=r;ga=s;ha=t+ -1|0;k=46}else if((k|0)==40){ea=q;fa=r;ga=aa;ha=t+ -1|0;k=46}else if((k|0)==43){ea=q;fa=r;ga=ba;ha=t+ -1|0;k=46}else if((k|0)==53){i=h;return z|0}if((k|0)==46){if((ga|0)==0){P=ea;Q=fa;R=ha;k=47}else{ia=ea;ja=ha}}do{if((k|0)==47){if((a[R]|0)!=0){ia=P;ja=R;break}if((P|0)!=0){c[P>>2]=0;c[e>>2]=0}z=f-Q|0;i=h;return z|0}}while(0);c[(ic()|0)>>2]=84;if((ia|0)==0){z=-1;i=h;return z|0}c[e>>2]=ja;z=-1;i=h;return z|0}function Do(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;g=i;i=i+8|0;h=g;c[h>>2]=b;if((e|0)==0){j=0;i=g;return j|0}do{if((f|0)!=0){if((b|0)==0){k=h;c[h>>2]=k;l=k}else{l=b}k=a[e]|0;m=k&255;if(k<<24>>24>-1){c[l>>2]=m;j=k<<24>>24!=0|0;i=g;return j|0}k=m+ -194|0;if(k>>>0>50){break}m=e+1|0;n=c[25120+(k<<2)>>2]|0;if(f>>>0<4){if((n&-2147483648>>>((f*6|0)+ -6|0)|0)!=0){break}}k=d[m]|0;m=k>>>3;if((m+ -16|m+(n>>26))>>>0>7){break}m=k+ -128|n<<6;if((m|0)>=0){c[l>>2]=m;j=2;i=g;return j|0}n=(d[e+2|0]|0)+ -128|0;if(n>>>0>63){break}k=n|m<<6;if((k|0)>=0){c[l>>2]=k;j=3;i=g;return j|0}m=(d[e+3|0]|0)+ -128|0;if(m>>>0>63){break}c[l>>2]=m|k<<6;j=4;i=g;return j|0}}while(0);c[(ic()|0)>>2]=84;j=-1;i=g;return j|0}function Eo(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;e=i;if((b|0)==0){f=1;i=e;return f|0}if(d>>>0<128){a[b]=d;f=1;i=e;return f|0}if(d>>>0<2048){a[b]=d>>>6|192;a[b+1|0]=d&63|128;f=2;i=e;return f|0}if(d>>>0<55296|(d+ -57344|0)>>>0<8192){a[b]=d>>>12|224;a[b+1|0]=d>>>6&63|128;a[b+2|0]=d&63|128;f=3;i=e;return f|0}if((d+ -65536|0)>>>0<1048576){a[b]=d>>>18|240;a[b+1|0]=d>>>12&63|128;a[b+2|0]=d>>>6&63|128;a[b+3|0]=d&63|128;f=4;i=e;return f|0}else{c[(ic()|0)>>2]=84;f=-1;i=e;return f|0}return 0}function Fo(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;f=i;i=i+264|0;g=f+256|0;h=f;j=c[b>>2]|0;c[g>>2]=j;k=(a|0)!=0;l=k?e:256;e=k?a:h;a:do{if((j|0)==0|(l|0)==0){m=d;n=l;o=j;p=0;q=e}else{a=d;r=l;s=j;t=0;u=e;while(1){v=a>>>0>=r>>>0;if(!(v|a>>>0>32)){m=a;n=r;o=s;p=t;q=u;break a}w=v?r:a;x=a-w|0;v=Go(u,g,w,0)|0;if((v|0)==-1){break}if((u|0)==(h|0)){y=r;z=h}else{y=r-v|0;z=u+v|0}w=v+t|0;v=c[g>>2]|0;if((v|0)==0|(y|0)==0){m=x;n=y;o=v;p=w;q=z;break a}else{a=x;r=y;s=v;t=w;u=z}}m=x;n=0;o=c[g>>2]|0;p=-1;q=u}}while(0);b:do{if((o|0)==0){A=p}else{if((n|0)==0|(m|0)==0){A=p;break}else{B=m;C=n;D=o;E=p;F=q}while(1){G=Eo(F,c[D>>2]|0,0)|0;if((G+1|0)>>>0<2){break}x=(c[g>>2]|0)+4|0;c[g>>2]=x;z=B+ -1|0;y=E+1|0;if((C|0)==(G|0)|(z|0)==0){A=y;break b}else{B=z;C=C-G|0;D=x;E=y;F=F+G|0}}if((G|0)!=0){A=-1;break}c[g>>2]=0;A=E}}while(0);if(!k){i=f;return A|0}c[b>>2]=c[g>>2];i=f;return A|0}function Go(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;f=i;i=i+8|0;g=f;if((b|0)==0){h=c[d>>2]|0;j=g;k=c[h>>2]|0;if((k|0)==0){l=0;i=f;return l|0}else{m=0;n=k;o=h}while(1){if(n>>>0>127){h=Eo(j,n,0)|0;if((h|0)==-1){l=-1;p=26;break}else{q=h}}else{q=1}h=q+m|0;k=o+4|0;r=c[k>>2]|0;if((r|0)==0){l=h;p=26;break}else{m=h;n=r;o=k}}if((p|0)==26){i=f;return l|0}}a:do{if(e>>>0>3){o=b;n=e;m=c[d>>2]|0;while(1){q=c[m>>2]|0;if((q|0)==0){s=o;t=n;break a}if(q>>>0>127){j=Eo(o,q,0)|0;if((j|0)==-1){l=-1;break}u=o+j|0;v=n-j|0;w=m}else{a[o]=q;u=o+1|0;v=n+ -1|0;w=c[d>>2]|0}q=w+4|0;c[d>>2]=q;if(v>>>0>3){o=u;n=v;m=q}else{s=u;t=v;break a}}i=f;return l|0}else{s=b;t=e}}while(0);b:do{if((t|0)==0){x=0}else{b=g;v=s;u=t;w=c[d>>2]|0;while(1){m=c[w>>2]|0;if((m|0)==0){p=24;break}if(m>>>0>127){n=Eo(b,m,0)|0;if((n|0)==-1){l=-1;p=26;break}if(n>>>0>u>>>0){p=20;break}Eo(v,c[w>>2]|0,0)|0;y=v+n|0;z=u-n|0;A=w}else{a[v]=m;y=v+1|0;z=u+ -1|0;A=c[d>>2]|0}m=A+4|0;c[d>>2]=m;if((z|0)==0){x=0;break b}else{v=y;u=z;w=m}}if((p|0)==20){l=e-u|0;i=f;return l|0}else if((p|0)==24){a[v]=0;x=u;break}else if((p|0)==26){i=f;return l|0}}}while(0);c[d>>2]=0;l=e-x|0;i=f;return l|0}function Ho(a){a=a|0;var b=0,d=0;b=i;d=a;while(1){if((c[d>>2]|0)==0){break}else{d=d+4|0}}i=b;return d-a>>2|0}function Io(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;if((d|0)==0){i=e;return a|0}else{f=d;g=b;h=a}while(1){b=f+ -1|0;c[h>>2]=c[g>>2];if((b|0)==0){break}else{h=h+4|0;g=g+4|0;f=b}}i=e;return a|0}function Jo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;f=(d|0)==0;do{if(a-b>>2>>>0<d>>>0){if(f){break}else{g=d}do{g=g+ -1|0;c[a+(g<<2)>>2]=c[b+(g<<2)>>2];}while((g|0)!=0)}else{if(f){break}else{h=b;j=a;k=d}while(1){l=k+ -1|0;c[j>>2]=c[h>>2];if((l|0)==0){break}else{k=l;j=j+4|0;h=h+4|0}}}}while(0);i=e;return a|0}function Ko(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;if((d|0)!=0){f=d;d=a;while(1){g=f+ -1|0;c[d>>2]=b;if((g|0)==0){break}else{d=d+4|0;f=g}}}i=e;return a|0}function Lo(a){a=a|0;i=i;return}function Mo(a){a=a|0;c[a>>2]=25352;i=i;return}function No(a){a=a|0;var b=0;b=i;hb(a|0);mp(a);i=b;return}function Oo(a){a=a|0;var b=0;b=i;hb(a|0);i=b;return}function Po(a){a=a|0;i=i;return 25368}function Qo(a){a=a|0;i=i;return}function Ro(a){a=a|0;i=i;return}function So(a){a=a|0;i=i;return}function To(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Uo(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Vo(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function Wo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;i=i+56|0;f=e;if((a|0)==(b|0)){g=1;i=e;return g|0}if((b|0)==0){g=0;i=e;return g|0}h=_o(b,25480,25536,0)|0;b=h;if((h|0)==0){g=0;i=e;return g|0}j=f+0|0;k=j+56|0;do{c[j>>2]=0;j=j+4|0}while((j|0)<(k|0));c[f>>2]=b;c[f+8>>2]=a;c[f+12>>2]=-1;c[f+48>>2]=1;Ed[c[(c[h>>2]|0)+28>>2]&7](b,f,c[d>>2]|0,1);if((c[f+24>>2]|0)!=1){g=0;i=e;return g|0}c[d>>2]=c[f+16>>2];g=1;i=e;return g|0}function Xo(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;if((c[d+8>>2]|0)!=(b|0)){i=g;return}b=d+16|0;h=c[b>>2]|0;if((h|0)==0){c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;i=g;return}if((h|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1;c[d+24>>2]=2;a[d+54|0]=1;i=g;return}e=d+24|0;if((c[e>>2]|0)!=2){i=g;return}c[e>>2]=f;i=g;return}function Yo(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;if((b|0)!=(c[d+8>>2]|0)){h=c[b+8>>2]|0;Ed[c[(c[h>>2]|0)+28>>2]&7](h,d,e,f);i=g;return}h=d+16|0;b=c[h>>2]|0;if((b|0)==0){c[h>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;i=g;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1;c[d+24>>2]=2;a[d+54|0]=1;i=g;return}e=d+24|0;if((c[e>>2]|0)!=2){i=g;return}c[e>>2]=f;i=g;return}function Zo(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;if((b|0)==(c[d+8>>2]|0)){h=d+16|0;j=c[h>>2]|0;if((j|0)==0){c[h>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;i=g;return}if((j|0)!=(e|0)){j=d+36|0;c[j>>2]=(c[j>>2]|0)+1;c[d+24>>2]=2;a[d+54|0]=1;i=g;return}j=d+24|0;if((c[j>>2]|0)!=2){i=g;return}c[j>>2]=f;i=g;return}j=c[b+12>>2]|0;h=b+(j<<3)+16|0;k=c[b+20>>2]|0;l=k>>8;if((k&1|0)==0){m=l}else{m=c[(c[e>>2]|0)+l>>2]|0}l=c[b+16>>2]|0;Ed[c[(c[l>>2]|0)+28>>2]&7](l,d,e+m|0,(k&2|0)!=0?f:2);if((j|0)<=1){i=g;return}j=d+54|0;k=e;m=b+24|0;while(1){b=c[m+4>>2]|0;l=b>>8;if((b&1|0)==0){n=l}else{n=c[(c[k>>2]|0)+l>>2]|0}l=c[m>>2]|0;Ed[c[(c[l>>2]|0)+28>>2]&7](l,d,e+n|0,(b&2|0)!=0?f:2);if((a[j]|0)!=0){o=16;break}b=m+8|0;if(b>>>0<h>>>0){m=b}else{o=16;break}}if((o|0)==16){i=g;return}}function _o(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;h=i;i=i+56|0;j=h;k=c[d>>2]|0;l=d+(c[k+ -8>>2]|0)|0;m=c[k+ -4>>2]|0;k=m;c[j>>2]=f;c[j+4>>2]=d;c[j+8>>2]=e;c[j+12>>2]=g;g=j+16|0;e=j+20|0;d=j+24|0;n=j+28|0;o=j+32|0;p=j+40|0;q=(m|0)==(f|0);f=g;r=f+0|0;s=r+36|0;do{c[r>>2]=0;r=r+4|0}while((r|0)<(s|0));b[f+36>>1]=0;a[f+38|0]=0;if(q){c[j+48>>2]=1;Bd[c[(c[m>>2]|0)+20>>2]&15](k,j,l,l,1,0);t=(c[d>>2]|0)==1?l:0;i=h;return t|0}pd[c[(c[m>>2]|0)+24>>2]&3](k,j,l,1,0);l=c[j+36>>2]|0;if((l|0)==1){do{if((c[d>>2]|0)!=1){if((c[p>>2]|0)!=0){t=0;i=h;return t|0}if((c[n>>2]|0)!=1){t=0;i=h;return t|0}if((c[o>>2]|0)==1){break}else{t=0}i=h;return t|0}}while(0);t=c[g>>2]|0;i=h;return t|0}else if((l|0)==0){if((c[p>>2]|0)!=1){t=0;i=h;return t|0}if((c[n>>2]|0)!=1){t=0;i=h;return t|0}t=(c[o>>2]|0)==1?c[e>>2]|0:0;i=h;return t|0}else{t=0;i=h;return t|0}return 0}function $o(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;h=i;j=b;if((j|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){i=h;return}k=d+28|0;if((c[k>>2]|0)==1){i=h;return}c[k>>2]=f;i=h;return}if((j|0)==(c[d>>2]|0)){do{if((c[d+16>>2]|0)!=(e|0)){j=d+20|0;if((c[j>>2]|0)==(e|0)){break}c[d+32>>2]=f;k=d+44|0;if((c[k>>2]|0)==4){i=h;return}l=c[b+12>>2]|0;m=b+(l<<3)+16|0;a:do{if((l|0)>0){n=d+52|0;o=d+53|0;p=d+54|0;q=b+8|0;r=d+24|0;s=e;t=0;u=0;v=b+16|0;b:while(1){a[n]=0;a[o]=0;w=c[v+4>>2]|0;x=w>>8;if((w&1|0)==0){y=x}else{y=c[(c[s>>2]|0)+x>>2]|0}x=c[v>>2]|0;Bd[c[(c[x>>2]|0)+20>>2]&15](x,d,e,e+y|0,2-(w>>>1&1)|0,g);if((a[p]|0)!=0){z=t;A=u;break}do{if((a[o]|0)==0){B=t;C=u}else{if((a[n]|0)==0){if((c[q>>2]&1|0)==0){z=t;A=1;break b}else{B=t;C=1;break}}if((c[r>>2]|0)==1){D=27;break a}if((c[q>>2]&2|0)==0){D=27;break a}else{B=1;C=1}}}while(0);w=v+8|0;if(w>>>0<m>>>0){t=B;u=C;v=w}else{z=B;A=C;break}}if(z){E=A;D=26}else{F=A;D=23}}else{F=0;D=23}}while(0);do{if((D|0)==23){c[j>>2]=e;m=d+40|0;c[m>>2]=(c[m>>2]|0)+1;if((c[d+36>>2]|0)!=1){E=F;D=26;break}if((c[d+24>>2]|0)!=2){E=F;D=26;break}a[d+54|0]=1;if(F){D=27}else{D=28}}}while(0);if((D|0)==26){if(E){D=27}else{D=28}}if((D|0)==27){c[k>>2]=3;i=h;return}else if((D|0)==28){c[k>>2]=4;i=h;return}}}while(0);if((f|0)!=1){i=h;return}c[d+32>>2]=1;i=h;return}E=c[b+12>>2]|0;F=b+(E<<3)+16|0;A=c[b+20>>2]|0;z=A>>8;if((A&1|0)==0){G=z}else{G=c[(c[e>>2]|0)+z>>2]|0}z=c[b+16>>2]|0;pd[c[(c[z>>2]|0)+24>>2]&3](z,d,e+G|0,(A&2|0)!=0?f:2,g);A=b+24|0;if((E|0)<=1){i=h;return}E=c[b+8>>2]|0;do{if((E&2|0)==0){b=d+36|0;if((c[b>>2]|0)==1){break}if((E&1|0)==0){G=d+54|0;z=e;C=A;while(1){if((a[G]|0)!=0){D=53;break}if((c[b>>2]|0)==1){D=53;break}B=c[C+4>>2]|0;y=B>>8;if((B&1|0)==0){H=y}else{H=c[(c[z>>2]|0)+y>>2]|0}y=c[C>>2]|0;pd[c[(c[y>>2]|0)+24>>2]&3](y,d,e+H|0,(B&2|0)!=0?f:2,g);B=C+8|0;if(B>>>0<F>>>0){C=B}else{D=53;break}}if((D|0)==53){i=h;return}}C=d+24|0;z=d+54|0;G=e;k=A;while(1){if((a[z]|0)!=0){D=53;break}if((c[b>>2]|0)==1){if((c[C>>2]|0)==1){D=53;break}}B=c[k+4>>2]|0;y=B>>8;if((B&1|0)==0){I=y}else{I=c[(c[G>>2]|0)+y>>2]|0}y=c[k>>2]|0;pd[c[(c[y>>2]|0)+24>>2]&3](y,d,e+I|0,(B&2|0)!=0?f:2,g);B=k+8|0;if(B>>>0<F>>>0){k=B}else{D=53;break}}if((D|0)==53){i=h;return}}}while(0);I=d+54|0;H=e;E=A;while(1){if((a[I]|0)!=0){D=53;break}A=c[E+4>>2]|0;k=A>>8;if((A&1|0)==0){J=k}else{J=c[(c[H>>2]|0)+k>>2]|0}k=c[E>>2]|0;pd[c[(c[k>>2]|0)+24>>2]&3](k,d,e+J|0,(A&2|0)!=0?f:2,g);A=E+8|0;if(A>>>0<F>>>0){E=A}else{D=53;break}}if((D|0)==53){i=h;return}}function ap(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;h=i;j=b;if((j|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){i=h;return}k=d+28|0;if((c[k>>2]|0)==1){i=h;return}c[k>>2]=f;i=h;return}if((j|0)!=(c[d>>2]|0)){j=c[b+8>>2]|0;pd[c[(c[j>>2]|0)+24>>2]&3](j,d,e,f,g);i=h;return}do{if((c[d+16>>2]|0)!=(e|0)){j=d+20|0;if((c[j>>2]|0)==(e|0)){break}c[d+32>>2]=f;k=d+44|0;if((c[k>>2]|0)==4){i=h;return}l=d+52|0;a[l]=0;m=d+53|0;a[m]=0;n=c[b+8>>2]|0;Bd[c[(c[n>>2]|0)+20>>2]&15](n,d,e,e,1,g);if((a[m]|0)==0){o=0;p=13}else{if((a[l]|0)==0){o=1;p=13}}a:do{if((p|0)==13){c[j>>2]=e;l=d+40|0;c[l>>2]=(c[l>>2]|0)+1;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){p=16;break}a[d+54|0]=1;if(o){break a}}else{p=16}}while(0);if((p|0)==16){if(o){break}}c[k>>2]=4;i=h;return}}while(0);c[k>>2]=3;i=h;return}}while(0);if((f|0)!=1){i=h;return}c[d+32>>2]=1;i=h;return}function bp(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;g=i;if((c[d+8>>2]|0)==(b|0)){if((c[d+4>>2]|0)!=(e|0)){i=g;return}h=d+28|0;if((c[h>>2]|0)==1){i=g;return}c[h>>2]=f;i=g;return}if((c[d>>2]|0)!=(b|0)){i=g;return}do{if((c[d+16>>2]|0)!=(e|0)){b=d+20|0;if((c[b>>2]|0)==(e|0)){break}c[d+32>>2]=f;c[b>>2]=e;b=d+40|0;c[b>>2]=(c[b>>2]|0)+1;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){break}a[d+54|0]=1}}while(0);c[d+44>>2]=4;i=g;return}}while(0);if((f|0)!=1){i=g;return}c[d+32>>2]=1;i=g;return}function cp(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;j=i;if((b|0)!=(c[d+8>>2]|0)){k=d+52|0;l=a[k]|0;m=d+53|0;n=a[m]|0;o=c[b+12>>2]|0;p=b+(o<<3)+16|0;a[k]=0;a[m]=0;q=c[b+20>>2]|0;r=q>>8;if((q&1|0)==0){s=r}else{s=c[(c[f>>2]|0)+r>>2]|0}r=c[b+16>>2]|0;Bd[c[(c[r>>2]|0)+20>>2]&15](r,d,e,f+s|0,(q&2|0)!=0?g:2,h);a:do{if((o|0)>1){q=d+24|0;s=b+8|0;r=d+54|0;t=f;u=b+24|0;do{if((a[r]|0)!=0){break a}do{if((a[k]|0)==0){if((a[m]|0)==0){break}if((c[s>>2]&1|0)==0){break a}}else{if((c[q>>2]|0)==1){break a}if((c[s>>2]&2|0)==0){break a}}}while(0);a[k]=0;a[m]=0;v=c[u+4>>2]|0;w=v>>8;if((v&1|0)==0){x=w}else{x=c[(c[t>>2]|0)+w>>2]|0}w=c[u>>2]|0;Bd[c[(c[w>>2]|0)+20>>2]&15](w,d,e,f+x|0,(v&2|0)!=0?g:2,h);u=u+8|0;}while(u>>>0<p>>>0)}}while(0);a[k]=l;a[m]=n;i=j;return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){i=j;return}a[d+52|0]=1;f=d+16|0;n=c[f>>2]|0;if((n|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){i=j;return}a[d+54|0]=1;i=j;return}if((n|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1;a[d+54|0]=1;i=j;return}e=d+24|0;n=c[e>>2]|0;if((n|0)==2){c[e>>2]=g;y=g}else{y=n}if(!((c[d+48>>2]|0)==1&(y|0)==1)){i=j;return}a[d+54|0]=1;i=j;return}function dp(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;if((b|0)!=(c[d+8>>2]|0)){k=c[b+8>>2]|0;Bd[c[(c[k>>2]|0)+20>>2]&15](k,d,e,f,g,h);i=j;return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){i=j;return}a[d+52|0]=1;f=d+16|0;h=c[f>>2]|0;if((h|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){i=j;return}a[d+54|0]=1;i=j;return}if((h|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1;a[d+54|0]=1;i=j;return}e=d+24|0;h=c[e>>2]|0;if((h|0)==2){c[e>>2]=g;l=g}else{l=h}if(!((c[d+48>>2]|0)==1&(l|0)==1)){i=j;return}a[d+54|0]=1;i=j;return}function ep(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0;h=i;if((c[d+8>>2]|0)!=(b|0)){i=h;return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){i=h;return}a[d+52|0]=1;f=d+16|0;b=c[f>>2]|0;if((b|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){i=h;return}a[d+54|0]=1;i=h;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1;a[d+54|0]=1;i=h;return}e=d+24|0;b=c[e>>2]|0;if((b|0)==2){c[e>>2]=g;j=g}else{j=b}if(!((c[d+48>>2]|0)==1&(j|0)==1)){i=h;return}a[d+54|0]=1;i=h;return}function fp(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0;b=i;do{if(a>>>0<245){if(a>>>0<11){d=16}else{d=a+11&-8}e=d>>>3;f=c[6446]|0;g=f>>>e;if((g&3|0)!=0){h=(g&1^1)+e|0;j=h<<1;k=25824+(j<<2)|0;l=25824+(j+2<<2)|0;j=c[l>>2]|0;m=j+8|0;n=c[m>>2]|0;do{if((k|0)==(n|0)){c[6446]=f&~(1<<h)}else{if(n>>>0<(c[25800>>2]|0)>>>0){wc()}o=n+12|0;if((c[o>>2]|0)==(j|0)){c[o>>2]=k;c[l>>2]=n;break}else{wc()}}}while(0);n=h<<3;c[j+4>>2]=n|3;l=j+(n|4)|0;c[l>>2]=c[l>>2]|1;p=m;i=b;return p|0}if(!(d>>>0>(c[25792>>2]|0)>>>0)){q=d;break}if((g|0)!=0){l=2<<e;n=g<<e&(l|0-l);l=(n&0-n)+ -1|0;n=l>>>12&16;k=l>>>n;l=k>>>5&8;o=k>>>l;k=o>>>2&4;r=o>>>k;o=r>>>1&2;s=r>>>o;r=s>>>1&1;t=(l|n|k|o|r)+(s>>>r)|0;r=t<<1;s=25824+(r<<2)|0;o=25824+(r+2<<2)|0;r=c[o>>2]|0;k=r+8|0;n=c[k>>2]|0;do{if((s|0)==(n|0)){c[6446]=f&~(1<<t)}else{if(n>>>0<(c[25800>>2]|0)>>>0){wc()}l=n+12|0;if((c[l>>2]|0)==(r|0)){c[l>>2]=s;c[o>>2]=n;break}else{wc()}}}while(0);n=t<<3;o=n-d|0;c[r+4>>2]=d|3;s=r;f=s+d|0;c[s+(d|4)>>2]=o|1;c[s+n>>2]=o;n=c[25792>>2]|0;if((n|0)!=0){s=c[25804>>2]|0;e=n>>>3;n=e<<1;g=25824+(n<<2)|0;m=c[6446]|0;j=1<<e;do{if((m&j|0)==0){c[6446]=m|j;u=25824+(n+2<<2)|0;v=g}else{e=25824+(n+2<<2)|0;h=c[e>>2]|0;if(!(h>>>0<(c[25800>>2]|0)>>>0)){u=e;v=h;break}wc()}}while(0);c[u>>2]=s;c[v+12>>2]=s;c[s+8>>2]=v;c[s+12>>2]=g}c[25792>>2]=o;c[25804>>2]=f;p=k;i=b;return p|0}n=c[25788>>2]|0;if((n|0)==0){q=d;break}j=(n&0-n)+ -1|0;n=j>>>12&16;m=j>>>n;j=m>>>5&8;r=m>>>j;m=r>>>2&4;t=r>>>m;r=t>>>1&2;h=t>>>r;t=h>>>1&1;e=c[26088+((j|n|m|r|t)+(h>>>t)<<2)>>2]|0;t=(c[e+4>>2]&-8)-d|0;h=e;r=e;while(1){e=c[h+16>>2]|0;if((e|0)==0){m=c[h+20>>2]|0;if((m|0)==0){break}else{w=m}}else{w=e}e=(c[w+4>>2]&-8)-d|0;m=e>>>0<t>>>0;t=m?e:t;h=w;r=m?w:r}h=r;k=c[25800>>2]|0;if(h>>>0<k>>>0){wc()}f=h+d|0;o=f;if(!(h>>>0<f>>>0)){wc()}f=c[r+24>>2]|0;g=c[r+12>>2]|0;do{if((g|0)==(r|0)){s=r+20|0;m=c[s>>2]|0;if((m|0)==0){e=r+16|0;n=c[e>>2]|0;if((n|0)==0){x=0;break}else{y=n;z=e}}else{y=m;z=s}while(1){s=y+20|0;m=c[s>>2]|0;if((m|0)!=0){z=s;y=m;continue}m=y+16|0;s=c[m>>2]|0;if((s|0)==0){break}else{y=s;z=m}}if(z>>>0<k>>>0){wc()}else{c[z>>2]=0;x=y;break}}else{m=c[r+8>>2]|0;if(m>>>0<k>>>0){wc()}s=m+12|0;if((c[s>>2]|0)!=(r|0)){wc()}e=g+8|0;if((c[e>>2]|0)==(r|0)){c[s>>2]=g;c[e>>2]=m;x=g;break}else{wc()}}}while(0);a:do{if((f|0)!=0){g=c[r+28>>2]|0;k=26088+(g<<2)|0;do{if((r|0)==(c[k>>2]|0)){c[k>>2]=x;if((x|0)!=0){break}c[25788>>2]=c[25788>>2]&~(1<<g);break a}else{if(f>>>0<(c[25800>>2]|0)>>>0){wc()}m=f+16|0;if((c[m>>2]|0)==(r|0)){c[m>>2]=x}else{c[f+20>>2]=x}if((x|0)==0){break a}}}while(0);if(x>>>0<(c[25800>>2]|0)>>>0){wc()}c[x+24>>2]=f;g=c[r+16>>2]|0;do{if((g|0)!=0){if(g>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[x+16>>2]=g;c[g+24>>2]=x;break}}}while(0);g=c[r+20>>2]|0;if((g|0)==0){break}if(g>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[x+20>>2]=g;c[g+24>>2]=x;break}}}while(0);if(t>>>0<16){f=t+d|0;c[r+4>>2]=f|3;g=h+(f+4)|0;c[g>>2]=c[g>>2]|1}else{c[r+4>>2]=d|3;c[h+(d|4)>>2]=t|1;c[h+(t+d)>>2]=t;g=c[25792>>2]|0;if((g|0)!=0){f=c[25804>>2]|0;k=g>>>3;g=k<<1;m=25824+(g<<2)|0;e=c[6446]|0;s=1<<k;do{if((e&s|0)==0){c[6446]=e|s;A=25824+(g+2<<2)|0;B=m}else{k=25824+(g+2<<2)|0;n=c[k>>2]|0;if(!(n>>>0<(c[25800>>2]|0)>>>0)){A=k;B=n;break}wc()}}while(0);c[A>>2]=f;c[B+12>>2]=f;c[f+8>>2]=B;c[f+12>>2]=m}c[25792>>2]=t;c[25804>>2]=o}p=r+8|0;i=b;return p|0}else{if(a>>>0>4294967231){q=-1;break}g=a+11|0;s=g&-8;e=c[25788>>2]|0;if((e|0)==0){q=s;break}h=0-s|0;n=g>>>8;do{if((n|0)==0){C=0}else{if(s>>>0>16777215){C=31;break}g=(n+1048320|0)>>>16&8;k=n<<g;j=(k+520192|0)>>>16&4;l=k<<j;k=(l+245760|0)>>>16&2;D=14-(j|g|k)+(l<<k>>>15)|0;C=s>>>(D+7|0)&1|D<<1}}while(0);n=c[26088+(C<<2)>>2]|0;b:do{if((n|0)==0){E=h;F=0;G=0}else{if((C|0)==31){H=0}else{H=25-(C>>>1)|0}r=h;o=0;t=s<<H;m=n;f=0;while(1){D=c[m+4>>2]&-8;k=D-s|0;if(k>>>0<r>>>0){if((D|0)==(s|0)){E=k;F=m;G=m;break b}else{I=k;J=m}}else{I=r;J=f}k=c[m+20>>2]|0;D=c[m+(t>>>31<<2)+16>>2]|0;l=(k|0)==0|(k|0)==(D|0)?o:k;if((D|0)==0){E=I;F=l;G=J;break}else{r=I;o=l;t=t<<1;m=D;f=J}}}}while(0);if((F|0)==0&(G|0)==0){n=2<<C;h=e&(n|0-n);if((h|0)==0){q=s;break}n=(h&0-h)+ -1|0;h=n>>>12&16;f=n>>>h;n=f>>>5&8;m=f>>>n;f=m>>>2&4;t=m>>>f;m=t>>>1&2;o=t>>>m;t=o>>>1&1;K=c[26088+((n|h|f|m|t)+(o>>>t)<<2)>>2]|0}else{K=F}if((K|0)==0){L=E;M=G}else{t=E;o=K;m=G;while(1){f=(c[o+4>>2]&-8)-s|0;h=f>>>0<t>>>0;n=h?f:t;f=h?o:m;h=c[o+16>>2]|0;if((h|0)!=0){N=f;O=n;m=N;o=h;t=O;continue}h=c[o+20>>2]|0;if((h|0)==0){L=n;M=f;break}else{N=f;O=n;o=h;m=N;t=O}}}if((M|0)==0){q=s;break}if(!(L>>>0<((c[25792>>2]|0)-s|0)>>>0)){q=s;break}t=M;m=c[25800>>2]|0;if(t>>>0<m>>>0){wc()}o=t+s|0;e=o;if(!(t>>>0<o>>>0)){wc()}h=c[M+24>>2]|0;n=c[M+12>>2]|0;do{if((n|0)==(M|0)){f=M+20|0;r=c[f>>2]|0;if((r|0)==0){D=M+16|0;l=c[D>>2]|0;if((l|0)==0){P=0;break}else{Q=l;R=D}}else{Q=r;R=f}while(1){f=Q+20|0;r=c[f>>2]|0;if((r|0)!=0){R=f;Q=r;continue}r=Q+16|0;f=c[r>>2]|0;if((f|0)==0){break}else{Q=f;R=r}}if(R>>>0<m>>>0){wc()}else{c[R>>2]=0;P=Q;break}}else{r=c[M+8>>2]|0;if(r>>>0<m>>>0){wc()}f=r+12|0;if((c[f>>2]|0)!=(M|0)){wc()}D=n+8|0;if((c[D>>2]|0)==(M|0)){c[f>>2]=n;c[D>>2]=r;P=n;break}else{wc()}}}while(0);c:do{if((h|0)!=0){n=c[M+28>>2]|0;m=26088+(n<<2)|0;do{if((M|0)==(c[m>>2]|0)){c[m>>2]=P;if((P|0)!=0){break}c[25788>>2]=c[25788>>2]&~(1<<n);break c}else{if(h>>>0<(c[25800>>2]|0)>>>0){wc()}r=h+16|0;if((c[r>>2]|0)==(M|0)){c[r>>2]=P}else{c[h+20>>2]=P}if((P|0)==0){break c}}}while(0);if(P>>>0<(c[25800>>2]|0)>>>0){wc()}c[P+24>>2]=h;n=c[M+16>>2]|0;do{if((n|0)!=0){if(n>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[P+16>>2]=n;c[n+24>>2]=P;break}}}while(0);n=c[M+20>>2]|0;if((n|0)==0){break}if(n>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[P+20>>2]=n;c[n+24>>2]=P;break}}}while(0);d:do{if(L>>>0<16){h=L+s|0;c[M+4>>2]=h|3;n=t+(h+4)|0;c[n>>2]=c[n>>2]|1}else{c[M+4>>2]=s|3;c[t+(s|4)>>2]=L|1;c[t+(L+s)>>2]=L;n=L>>>3;if(L>>>0<256){h=n<<1;m=25824+(h<<2)|0;r=c[6446]|0;D=1<<n;do{if((r&D|0)==0){c[6446]=r|D;S=25824+(h+2<<2)|0;T=m}else{n=25824+(h+2<<2)|0;f=c[n>>2]|0;if(!(f>>>0<(c[25800>>2]|0)>>>0)){S=n;T=f;break}wc()}}while(0);c[S>>2]=e;c[T+12>>2]=e;c[t+(s+8)>>2]=T;c[t+(s+12)>>2]=m;break}h=o;D=L>>>8;do{if((D|0)==0){U=0}else{if(L>>>0>16777215){U=31;break}r=(D+1048320|0)>>>16&8;f=D<<r;n=(f+520192|0)>>>16&4;l=f<<n;f=(l+245760|0)>>>16&2;k=14-(n|r|f)+(l<<f>>>15)|0;U=L>>>(k+7|0)&1|k<<1}}while(0);D=26088+(U<<2)|0;c[t+(s+28)>>2]=U;c[t+(s+20)>>2]=0;c[t+(s+16)>>2]=0;m=c[25788>>2]|0;k=1<<U;if((m&k|0)==0){c[25788>>2]=m|k;c[D>>2]=h;c[t+(s+24)>>2]=D;c[t+(s+12)>>2]=h;c[t+(s+8)>>2]=h;break}k=c[D>>2]|0;if((U|0)==31){V=0}else{V=25-(U>>>1)|0}e:do{if((c[k+4>>2]&-8|0)==(L|0)){W=k}else{D=L<<V;m=k;while(1){X=m+(D>>>31<<2)+16|0;f=c[X>>2]|0;if((f|0)==0){break}if((c[f+4>>2]&-8|0)==(L|0)){W=f;break e}else{D=D<<1;m=f}}if(X>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[X>>2]=h;c[t+(s+24)>>2]=m;c[t+(s+12)>>2]=h;c[t+(s+8)>>2]=h;break d}}}while(0);k=W+8|0;D=c[k>>2]|0;f=c[25800>>2]|0;if(W>>>0<f>>>0){wc()}if(D>>>0<f>>>0){wc()}else{c[D+12>>2]=h;c[k>>2]=h;c[t+(s+8)>>2]=D;c[t+(s+12)>>2]=W;c[t+(s+24)>>2]=0;break}}}while(0);p=M+8|0;i=b;return p|0}}while(0);M=c[25792>>2]|0;if(!(q>>>0>M>>>0)){W=M-q|0;X=c[25804>>2]|0;if(W>>>0>15){L=X;c[25804>>2]=L+q;c[25792>>2]=W;c[L+(q+4)>>2]=W|1;c[L+M>>2]=W;c[X+4>>2]=q|3}else{c[25792>>2]=0;c[25804>>2]=0;c[X+4>>2]=M|3;W=X+(M+4)|0;c[W>>2]=c[W>>2]|1}p=X+8|0;i=b;return p|0}X=c[25796>>2]|0;if(q>>>0<X>>>0){W=X-q|0;c[25796>>2]=W;X=c[25808>>2]|0;M=X;c[25808>>2]=M+q;c[M+(q+4)>>2]=W|1;c[X+4>>2]=q|3;p=X+8|0;i=b;return p|0}do{if((c[6564]|0)==0){X=_a(30)|0;if((X+ -1&X|0)==0){c[26264>>2]=X;c[26260>>2]=X;c[26268>>2]=-1;c[26272>>2]=-1;c[26276>>2]=0;c[26228>>2]=0;c[6564]=(Ub(0)|0)&-16^1431655768;break}else{wc()}}}while(0);X=q+48|0;W=c[26264>>2]|0;M=q+47|0;L=W+M|0;V=0-W|0;W=L&V;if(!(W>>>0>q>>>0)){p=0;i=b;return p|0}U=c[26224>>2]|0;do{if((U|0)!=0){T=c[26216>>2]|0;S=T+W|0;if(S>>>0<=T>>>0|S>>>0>U>>>0){p=0}else{break}i=b;return p|0}}while(0);f:do{if((c[26228>>2]&4|0)==0){U=c[25808>>2]|0;g:do{if((U|0)==0){Y=182}else{S=U;T=26232|0;while(1){Z=T;P=c[Z>>2]|0;if(!(P>>>0>S>>>0)){_=T+4|0;if((P+(c[_>>2]|0)|0)>>>0>S>>>0){break}}P=c[T+8>>2]|0;if((P|0)==0){Y=182;break g}else{T=P}}if((T|0)==0){Y=182;break}S=L-(c[25796>>2]|0)&V;if(!(S>>>0<2147483647)){$=0;break}h=Ua(S|0)|0;P=(h|0)==((c[Z>>2]|0)+(c[_>>2]|0)|0);aa=h;ba=S;ca=P?h:-1;da=P?S:0;Y=191}}while(0);do{if((Y|0)==182){U=Ua(0)|0;if((U|0)==(-1|0)){$=0;break}S=U;P=c[26260>>2]|0;h=P+ -1|0;if((h&S|0)==0){ea=W}else{ea=W-S+(h+S&0-P)|0}P=c[26216>>2]|0;S=P+ea|0;if(!(ea>>>0>q>>>0&ea>>>0<2147483647)){$=0;break}h=c[26224>>2]|0;if((h|0)!=0){if(S>>>0<=P>>>0|S>>>0>h>>>0){$=0;break}}h=Ua(ea|0)|0;S=(h|0)==(U|0);aa=h;ba=ea;ca=S?U:-1;da=S?ea:0;Y=191}}while(0);h:do{if((Y|0)==191){S=0-ba|0;if((ca|0)!=(-1|0)){fa=ca;ga=da;Y=202;break f}do{if((aa|0)!=(-1|0)&ba>>>0<2147483647&ba>>>0<X>>>0){U=c[26264>>2]|0;h=M-ba+U&0-U;if(!(h>>>0<2147483647)){ha=ba;break}if((Ua(h|0)|0)==(-1|0)){Ua(S|0)|0;$=da;break h}else{ha=h+ba|0;break}}else{ha=ba}}while(0);if((aa|0)==(-1|0)){$=da}else{fa=aa;ga=ha;Y=202;break f}}}while(0);c[26228>>2]=c[26228>>2]|4;ia=$;Y=199}else{ia=0;Y=199}}while(0);do{if((Y|0)==199){if(!(W>>>0<2147483647)){break}$=Ua(W|0)|0;ha=Ua(0)|0;if(!((ha|0)!=(-1|0)&($|0)!=(-1|0)&$>>>0<ha>>>0)){break}aa=ha-$|0;ha=aa>>>0>(q+40|0)>>>0;if(ha){fa=$;ga=ha?aa:ia;Y=202}}}while(0);do{if((Y|0)==202){ia=(c[26216>>2]|0)+ga|0;c[26216>>2]=ia;if(ia>>>0>(c[26220>>2]|0)>>>0){c[26220>>2]=ia}ia=c[25808>>2]|0;i:do{if((ia|0)==0){W=c[25800>>2]|0;if((W|0)==0|fa>>>0<W>>>0){c[25800>>2]=fa}c[26232>>2]=fa;c[26236>>2]=ga;c[26244>>2]=0;c[25820>>2]=c[6564];c[25816>>2]=-1;W=0;do{aa=W<<1;ha=25824+(aa<<2)|0;c[25824+(aa+3<<2)>>2]=ha;c[25824+(aa+2<<2)>>2]=ha;W=W+1|0;}while((W|0)!=32);W=fa+8|0;if((W&7|0)==0){ja=0}else{ja=0-W&7}W=ga+ -40-ja|0;c[25808>>2]=fa+ja;c[25796>>2]=W;c[fa+(ja+4)>>2]=W|1;c[fa+(ga+ -36)>>2]=40;c[25812>>2]=c[26272>>2]}else{W=26232|0;while(1){ka=c[W>>2]|0;la=W+4|0;ma=c[la>>2]|0;if((fa|0)==(ka+ma|0)){Y=214;break}ha=c[W+8>>2]|0;if((ha|0)==0){break}else{W=ha}}do{if((Y|0)==214){if((c[W+12>>2]&8|0)!=0){break}ha=ia;if(!(ha>>>0>=ka>>>0&ha>>>0<fa>>>0)){break}c[la>>2]=ma+ga;aa=(c[25796>>2]|0)+ga|0;$=ia+8|0;if(($&7|0)==0){na=0}else{na=0-$&7}$=aa-na|0;c[25808>>2]=ha+na;c[25796>>2]=$;c[ha+(na+4)>>2]=$|1;c[ha+(aa+4)>>2]=40;c[25812>>2]=c[26272>>2];break i}}while(0);if(fa>>>0<(c[25800>>2]|0)>>>0){c[25800>>2]=fa}W=fa+ga|0;aa=26232|0;while(1){oa=aa;if((c[oa>>2]|0)==(W|0)){Y=224;break}ha=c[aa+8>>2]|0;if((ha|0)==0){break}else{aa=ha}}do{if((Y|0)==224){if((c[aa+12>>2]&8|0)!=0){break}c[oa>>2]=fa;W=aa+4|0;c[W>>2]=(c[W>>2]|0)+ga;W=fa+8|0;if((W&7|0)==0){pa=0}else{pa=0-W&7}W=fa+(ga+8)|0;if((W&7|0)==0){qa=0}else{qa=0-W&7}W=fa+(qa+ga)|0;ha=W;$=pa+q|0;da=fa+$|0;ba=da;M=W-(fa+pa)-q|0;c[fa+(pa+4)>>2]=q|3;j:do{if((ha|0)==(c[25808>>2]|0)){X=(c[25796>>2]|0)+M|0;c[25796>>2]=X;c[25808>>2]=ba;c[fa+($+4)>>2]=X|1}else{if((ha|0)==(c[25804>>2]|0)){X=(c[25792>>2]|0)+M|0;c[25792>>2]=X;c[25804>>2]=ba;c[fa+($+4)>>2]=X|1;c[fa+(X+$)>>2]=X;break}X=ga+4|0;ca=c[fa+(X+qa)>>2]|0;if((ca&3|0)==1){ea=ca&-8;_=ca>>>3;k:do{if(ca>>>0<256){Z=c[fa+((qa|8)+ga)>>2]|0;V=c[fa+(ga+12+qa)>>2]|0;L=25824+(_<<1<<2)|0;do{if((Z|0)!=(L|0)){if(Z>>>0<(c[25800>>2]|0)>>>0){wc()}if((c[Z+12>>2]|0)==(ha|0)){break}wc()}}while(0);if((V|0)==(Z|0)){c[6446]=c[6446]&~(1<<_);break}do{if((V|0)==(L|0)){ra=V+8|0}else{if(V>>>0<(c[25800>>2]|0)>>>0){wc()}S=V+8|0;if((c[S>>2]|0)==(ha|0)){ra=S;break}wc()}}while(0);c[Z+12>>2]=V;c[ra>>2]=Z}else{L=W;S=c[fa+((qa|24)+ga)>>2]|0;T=c[fa+(ga+12+qa)>>2]|0;do{if((T|0)==(L|0)){h=qa|16;U=fa+(X+h)|0;P=c[U>>2]|0;if((P|0)==0){Q=fa+(h+ga)|0;h=c[Q>>2]|0;if((h|0)==0){sa=0;break}else{ta=h;ua=Q}}else{ta=P;ua=U}while(1){U=ta+20|0;P=c[U>>2]|0;if((P|0)!=0){ua=U;ta=P;continue}P=ta+16|0;U=c[P>>2]|0;if((U|0)==0){break}else{ta=U;ua=P}}if(ua>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[ua>>2]=0;sa=ta;break}}else{P=c[fa+((qa|8)+ga)>>2]|0;if(P>>>0<(c[25800>>2]|0)>>>0){wc()}U=P+12|0;if((c[U>>2]|0)!=(L|0)){wc()}Q=T+8|0;if((c[Q>>2]|0)==(L|0)){c[U>>2]=T;c[Q>>2]=P;sa=T;break}else{wc()}}}while(0);if((S|0)==0){break}T=c[fa+(ga+28+qa)>>2]|0;Z=26088+(T<<2)|0;do{if((L|0)==(c[Z>>2]|0)){c[Z>>2]=sa;if((sa|0)!=0){break}c[25788>>2]=c[25788>>2]&~(1<<T);break k}else{if(S>>>0<(c[25800>>2]|0)>>>0){wc()}V=S+16|0;if((c[V>>2]|0)==(L|0)){c[V>>2]=sa}else{c[S+20>>2]=sa}if((sa|0)==0){break k}}}while(0);if(sa>>>0<(c[25800>>2]|0)>>>0){wc()}c[sa+24>>2]=S;L=qa|16;T=c[fa+(L+ga)>>2]|0;do{if((T|0)!=0){if(T>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[sa+16>>2]=T;c[T+24>>2]=sa;break}}}while(0);T=c[fa+(X+L)>>2]|0;if((T|0)==0){break}if(T>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[sa+20>>2]=T;c[T+24>>2]=sa;break}}}while(0);va=fa+((ea|qa)+ga)|0;wa=ea+M|0}else{va=ha;wa=M}X=va+4|0;c[X>>2]=c[X>>2]&-2;c[fa+($+4)>>2]=wa|1;c[fa+(wa+$)>>2]=wa;X=wa>>>3;if(wa>>>0<256){_=X<<1;ca=25824+(_<<2)|0;T=c[6446]|0;S=1<<X;do{if((T&S|0)==0){c[6446]=T|S;xa=25824+(_+2<<2)|0;ya=ca}else{X=25824+(_+2<<2)|0;Z=c[X>>2]|0;if(!(Z>>>0<(c[25800>>2]|0)>>>0)){xa=X;ya=Z;break}wc()}}while(0);c[xa>>2]=ba;c[ya+12>>2]=ba;c[fa+($+8)>>2]=ya;c[fa+($+12)>>2]=ca;break}_=da;S=wa>>>8;do{if((S|0)==0){za=0}else{if(wa>>>0>16777215){za=31;break}T=(S+1048320|0)>>>16&8;ea=S<<T;Z=(ea+520192|0)>>>16&4;X=ea<<Z;ea=(X+245760|0)>>>16&2;V=14-(Z|T|ea)+(X<<ea>>>15)|0;za=wa>>>(V+7|0)&1|V<<1}}while(0);S=26088+(za<<2)|0;c[fa+($+28)>>2]=za;c[fa+($+20)>>2]=0;c[fa+($+16)>>2]=0;ca=c[25788>>2]|0;V=1<<za;if((ca&V|0)==0){c[25788>>2]=ca|V;c[S>>2]=_;c[fa+($+24)>>2]=S;c[fa+($+12)>>2]=_;c[fa+($+8)>>2]=_;break}V=c[S>>2]|0;if((za|0)==31){Aa=0}else{Aa=25-(za>>>1)|0}l:do{if((c[V+4>>2]&-8|0)==(wa|0)){Ba=V}else{S=wa<<Aa;ca=V;while(1){Ca=ca+(S>>>31<<2)+16|0;ea=c[Ca>>2]|0;if((ea|0)==0){break}if((c[ea+4>>2]&-8|0)==(wa|0)){Ba=ea;break l}else{S=S<<1;ca=ea}}if(Ca>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[Ca>>2]=_;c[fa+($+24)>>2]=ca;c[fa+($+12)>>2]=_;c[fa+($+8)>>2]=_;break j}}}while(0);V=Ba+8|0;S=c[V>>2]|0;L=c[25800>>2]|0;if(Ba>>>0<L>>>0){wc()}if(S>>>0<L>>>0){wc()}else{c[S+12>>2]=_;c[V>>2]=_;c[fa+($+8)>>2]=S;c[fa+($+12)>>2]=Ba;c[fa+($+24)>>2]=0;break}}}while(0);p=fa+(pa|8)|0;i=b;return p|0}}while(0);aa=ia;$=26232|0;while(1){Da=c[$>>2]|0;if(!(Da>>>0>aa>>>0)){Ea=c[$+4>>2]|0;Fa=Da+Ea|0;if(Fa>>>0>aa>>>0){break}}$=c[$+8>>2]|0}$=Da+(Ea+ -39)|0;if(($&7|0)==0){Ga=0}else{Ga=0-$&7}$=Da+(Ea+ -47+Ga)|0;da=$>>>0<(ia+16|0)>>>0?aa:$;$=da+8|0;ba=$;M=fa+8|0;if((M&7|0)==0){Ha=0}else{Ha=0-M&7}M=ga+ -40-Ha|0;c[25808>>2]=fa+Ha;c[25796>>2]=M;c[fa+(Ha+4)>>2]=M|1;c[fa+(ga+ -36)>>2]=40;c[25812>>2]=c[26272>>2];c[da+4>>2]=27;c[$+0>>2]=c[26232>>2];c[$+4>>2]=c[26236>>2];c[$+8>>2]=c[26240>>2];c[$+12>>2]=c[26244>>2];c[26232>>2]=fa;c[26236>>2]=ga;c[26244>>2]=0;c[26240>>2]=ba;ba=da+28|0;c[ba>>2]=7;if((da+32|0)>>>0<Fa>>>0){$=ba;while(1){ba=$+4|0;c[ba>>2]=7;if(($+8|0)>>>0<Fa>>>0){$=ba}else{break}}}if((da|0)==(aa|0)){break}$=da-ia|0;ba=aa+($+4)|0;c[ba>>2]=c[ba>>2]&-2;c[ia+4>>2]=$|1;c[aa+$>>2]=$;ba=$>>>3;if($>>>0<256){M=ba<<1;ha=25824+(M<<2)|0;W=c[6446]|0;m=1<<ba;do{if((W&m|0)==0){c[6446]=W|m;Ia=25824+(M+2<<2)|0;Ja=ha}else{ba=25824+(M+2<<2)|0;S=c[ba>>2]|0;if(!(S>>>0<(c[25800>>2]|0)>>>0)){Ia=ba;Ja=S;break}wc()}}while(0);c[Ia>>2]=ia;c[Ja+12>>2]=ia;c[ia+8>>2]=Ja;c[ia+12>>2]=ha;break}M=ia;m=$>>>8;do{if((m|0)==0){Ka=0}else{if($>>>0>16777215){Ka=31;break}W=(m+1048320|0)>>>16&8;aa=m<<W;da=(aa+520192|0)>>>16&4;S=aa<<da;aa=(S+245760|0)>>>16&2;ba=14-(da|W|aa)+(S<<aa>>>15)|0;Ka=$>>>(ba+7|0)&1|ba<<1}}while(0);m=26088+(Ka<<2)|0;c[ia+28>>2]=Ka;c[ia+20>>2]=0;c[ia+16>>2]=0;ha=c[25788>>2]|0;ba=1<<Ka;if((ha&ba|0)==0){c[25788>>2]=ha|ba;c[m>>2]=M;c[ia+24>>2]=m;c[ia+12>>2]=ia;c[ia+8>>2]=ia;break}ba=c[m>>2]|0;if((Ka|0)==31){La=0}else{La=25-(Ka>>>1)|0}m:do{if((c[ba+4>>2]&-8|0)==($|0)){Ma=ba}else{m=$<<La;ha=ba;while(1){Na=ha+(m>>>31<<2)+16|0;aa=c[Na>>2]|0;if((aa|0)==0){break}if((c[aa+4>>2]&-8|0)==($|0)){Ma=aa;break m}else{m=m<<1;ha=aa}}if(Na>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[Na>>2]=M;c[ia+24>>2]=ha;c[ia+12>>2]=ia;c[ia+8>>2]=ia;break i}}}while(0);$=Ma+8|0;ba=c[$>>2]|0;m=c[25800>>2]|0;if(Ma>>>0<m>>>0){wc()}if(ba>>>0<m>>>0){wc()}else{c[ba+12>>2]=M;c[$>>2]=M;c[ia+8>>2]=ba;c[ia+12>>2]=Ma;c[ia+24>>2]=0;break}}}while(0);ia=c[25796>>2]|0;if(!(ia>>>0>q>>>0)){break}ba=ia-q|0;c[25796>>2]=ba;ia=c[25808>>2]|0;$=ia;c[25808>>2]=$+q;c[$+(q+4)>>2]=ba|1;c[ia+4>>2]=q|3;p=ia+8|0;i=b;return p|0}}while(0);c[(ic()|0)>>2]=12;p=0;i=b;return p|0}function gp(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0;b=i;if((a|0)==0){i=b;return}d=a+ -8|0;e=d;f=c[25800>>2]|0;if(d>>>0<f>>>0){wc()}g=c[a+ -4>>2]|0;h=g&3;if((h|0)==1){wc()}j=g&-8;k=a+(j+ -8)|0;l=k;a:do{if((g&1|0)==0){m=c[d>>2]|0;if((h|0)==0){i=b;return}n=-8-m|0;o=a+n|0;p=o;q=m+j|0;if(o>>>0<f>>>0){wc()}if((p|0)==(c[25804>>2]|0)){r=a+(j+ -4)|0;if((c[r>>2]&3|0)!=3){s=p;t=q;break}c[25792>>2]=q;c[r>>2]=c[r>>2]&-2;c[a+(n+4)>>2]=q|1;c[k>>2]=q;i=b;return}r=m>>>3;if(m>>>0<256){m=c[a+(n+8)>>2]|0;u=c[a+(n+12)>>2]|0;v=25824+(r<<1<<2)|0;do{if((m|0)!=(v|0)){if(m>>>0<f>>>0){wc()}if((c[m+12>>2]|0)==(p|0)){break}wc()}}while(0);if((u|0)==(m|0)){c[6446]=c[6446]&~(1<<r);s=p;t=q;break}do{if((u|0)==(v|0)){w=u+8|0}else{if(u>>>0<f>>>0){wc()}x=u+8|0;if((c[x>>2]|0)==(p|0)){w=x;break}wc()}}while(0);c[m+12>>2]=u;c[w>>2]=m;s=p;t=q;break}v=o;r=c[a+(n+24)>>2]|0;x=c[a+(n+12)>>2]|0;do{if((x|0)==(v|0)){y=a+(n+20)|0;z=c[y>>2]|0;if((z|0)==0){A=a+(n+16)|0;B=c[A>>2]|0;if((B|0)==0){C=0;break}else{D=B;E=A}}else{D=z;E=y}while(1){y=D+20|0;z=c[y>>2]|0;if((z|0)!=0){E=y;D=z;continue}z=D+16|0;y=c[z>>2]|0;if((y|0)==0){break}else{D=y;E=z}}if(E>>>0<f>>>0){wc()}else{c[E>>2]=0;C=D;break}}else{z=c[a+(n+8)>>2]|0;if(z>>>0<f>>>0){wc()}y=z+12|0;if((c[y>>2]|0)!=(v|0)){wc()}A=x+8|0;if((c[A>>2]|0)==(v|0)){c[y>>2]=x;c[A>>2]=z;C=x;break}else{wc()}}}while(0);if((r|0)==0){s=p;t=q;break}x=c[a+(n+28)>>2]|0;o=26088+(x<<2)|0;do{if((v|0)==(c[o>>2]|0)){c[o>>2]=C;if((C|0)!=0){break}c[25788>>2]=c[25788>>2]&~(1<<x);s=p;t=q;break a}else{if(r>>>0<(c[25800>>2]|0)>>>0){wc()}m=r+16|0;if((c[m>>2]|0)==(v|0)){c[m>>2]=C}else{c[r+20>>2]=C}if((C|0)==0){s=p;t=q;break a}}}while(0);if(C>>>0<(c[25800>>2]|0)>>>0){wc()}c[C+24>>2]=r;v=c[a+(n+16)>>2]|0;do{if((v|0)!=0){if(v>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[C+16>>2]=v;c[v+24>>2]=C;break}}}while(0);v=c[a+(n+20)>>2]|0;if((v|0)==0){s=p;t=q;break}if(v>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[C+20>>2]=v;c[v+24>>2]=C;s=p;t=q;break}}else{s=e;t=j}}while(0);e=s;if(!(e>>>0<k>>>0)){wc()}C=a+(j+ -4)|0;f=c[C>>2]|0;if((f&1|0)==0){wc()}do{if((f&2|0)==0){if((l|0)==(c[25808>>2]|0)){D=(c[25796>>2]|0)+t|0;c[25796>>2]=D;c[25808>>2]=s;c[s+4>>2]=D|1;if((s|0)!=(c[25804>>2]|0)){i=b;return}c[25804>>2]=0;c[25792>>2]=0;i=b;return}if((l|0)==(c[25804>>2]|0)){D=(c[25792>>2]|0)+t|0;c[25792>>2]=D;c[25804>>2]=s;c[s+4>>2]=D|1;c[e+D>>2]=D;i=b;return}D=(f&-8)+t|0;E=f>>>3;b:do{if(f>>>0<256){w=c[a+j>>2]|0;h=c[a+(j|4)>>2]|0;d=25824+(E<<1<<2)|0;do{if((w|0)!=(d|0)){if(w>>>0<(c[25800>>2]|0)>>>0){wc()}if((c[w+12>>2]|0)==(l|0)){break}wc()}}while(0);if((h|0)==(w|0)){c[6446]=c[6446]&~(1<<E);break}do{if((h|0)==(d|0)){F=h+8|0}else{if(h>>>0<(c[25800>>2]|0)>>>0){wc()}g=h+8|0;if((c[g>>2]|0)==(l|0)){F=g;break}wc()}}while(0);c[w+12>>2]=h;c[F>>2]=w}else{d=k;g=c[a+(j+16)>>2]|0;v=c[a+(j|4)>>2]|0;do{if((v|0)==(d|0)){r=a+(j+12)|0;x=c[r>>2]|0;if((x|0)==0){o=a+(j+8)|0;m=c[o>>2]|0;if((m|0)==0){G=0;break}else{H=m;I=o}}else{H=x;I=r}while(1){r=H+20|0;x=c[r>>2]|0;if((x|0)!=0){I=r;H=x;continue}x=H+16|0;r=c[x>>2]|0;if((r|0)==0){break}else{H=r;I=x}}if(I>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[I>>2]=0;G=H;break}}else{x=c[a+j>>2]|0;if(x>>>0<(c[25800>>2]|0)>>>0){wc()}r=x+12|0;if((c[r>>2]|0)!=(d|0)){wc()}o=v+8|0;if((c[o>>2]|0)==(d|0)){c[r>>2]=v;c[o>>2]=x;G=v;break}else{wc()}}}while(0);if((g|0)==0){break}v=c[a+(j+20)>>2]|0;w=26088+(v<<2)|0;do{if((d|0)==(c[w>>2]|0)){c[w>>2]=G;if((G|0)!=0){break}c[25788>>2]=c[25788>>2]&~(1<<v);break b}else{if(g>>>0<(c[25800>>2]|0)>>>0){wc()}h=g+16|0;if((c[h>>2]|0)==(d|0)){c[h>>2]=G}else{c[g+20>>2]=G}if((G|0)==0){break b}}}while(0);if(G>>>0<(c[25800>>2]|0)>>>0){wc()}c[G+24>>2]=g;d=c[a+(j+8)>>2]|0;do{if((d|0)!=0){if(d>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[G+16>>2]=d;c[d+24>>2]=G;break}}}while(0);d=c[a+(j+12)>>2]|0;if((d|0)==0){break}if(d>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[G+20>>2]=d;c[d+24>>2]=G;break}}}while(0);c[s+4>>2]=D|1;c[e+D>>2]=D;if((s|0)!=(c[25804>>2]|0)){J=D;break}c[25792>>2]=D;i=b;return}else{c[C>>2]=f&-2;c[s+4>>2]=t|1;c[e+t>>2]=t;J=t}}while(0);t=J>>>3;if(J>>>0<256){e=t<<1;f=25824+(e<<2)|0;C=c[6446]|0;G=1<<t;do{if((C&G|0)==0){c[6446]=C|G;K=25824+(e+2<<2)|0;L=f}else{t=25824+(e+2<<2)|0;j=c[t>>2]|0;if(!(j>>>0<(c[25800>>2]|0)>>>0)){K=t;L=j;break}wc()}}while(0);c[K>>2]=s;c[L+12>>2]=s;c[s+8>>2]=L;c[s+12>>2]=f;i=b;return}f=s;L=J>>>8;do{if((L|0)==0){M=0}else{if(J>>>0>16777215){M=31;break}K=(L+1048320|0)>>>16&8;e=L<<K;G=(e+520192|0)>>>16&4;C=e<<G;e=(C+245760|0)>>>16&2;j=14-(G|K|e)+(C<<e>>>15)|0;M=J>>>(j+7|0)&1|j<<1}}while(0);L=26088+(M<<2)|0;c[s+28>>2]=M;c[s+20>>2]=0;c[s+16>>2]=0;j=c[25788>>2]|0;e=1<<M;c:do{if((j&e|0)==0){c[25788>>2]=j|e;c[L>>2]=f;c[s+24>>2]=L;c[s+12>>2]=s;c[s+8>>2]=s}else{C=c[L>>2]|0;if((M|0)==31){N=0}else{N=25-(M>>>1)|0}d:do{if((c[C+4>>2]&-8|0)==(J|0)){O=C}else{K=J<<N;G=C;while(1){P=G+(K>>>31<<2)+16|0;t=c[P>>2]|0;if((t|0)==0){break}if((c[t+4>>2]&-8|0)==(J|0)){O=t;break d}else{K=K<<1;G=t}}if(P>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[P>>2]=f;c[s+24>>2]=G;c[s+12>>2]=s;c[s+8>>2]=s;break c}}}while(0);C=O+8|0;D=c[C>>2]|0;K=c[25800>>2]|0;if(O>>>0<K>>>0){wc()}if(D>>>0<K>>>0){wc()}else{c[D+12>>2]=f;c[C>>2]=f;c[s+8>>2]=D;c[s+12>>2]=O;c[s+24>>2]=0;break}}}while(0);s=(c[25816>>2]|0)+ -1|0;c[25816>>2]=s;if((s|0)==0){Q=26240|0}else{i=b;return}while(1){s=c[Q>>2]|0;if((s|0)==0){break}else{Q=s+8|0}}c[25816>>2]=-1;i=b;return}function hp(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;if((a|0)==0){e=fp(b)|0;i=d;return e|0}if(b>>>0>4294967231){c[(ic()|0)>>2]=12;e=0;i=d;return e|0}if(b>>>0<11){f=16}else{f=b+11&-8}g=ip(a+ -8|0,f)|0;if((g|0)!=0){e=g+8|0;i=d;return e|0}g=fp(b)|0;if((g|0)==0){e=0;i=d;return e|0}f=c[a+ -4>>2]|0;h=(f&-8)-((f&3|0)==0?8:4)|0;Cp(g|0,a|0,(h>>>0<b>>>0?h:b)|0)|0;gp(a);e=g;i=d;return e|0}function ip(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;d=i;e=a+4|0;f=c[e>>2]|0;g=f&-8;h=a;j=h+g|0;k=j;l=c[25800>>2]|0;if(h>>>0<l>>>0){wc()}m=f&3;if(!((m|0)!=1&h>>>0<j>>>0)){wc()}n=h+(g|4)|0;o=c[n>>2]|0;if((o&1|0)==0){wc()}if((m|0)==0){if(b>>>0<256){p=0;i=d;return p|0}do{if(!(g>>>0<(b+4|0)>>>0)){if((g-b|0)>>>0>c[26264>>2]<<1>>>0){break}else{p=a}i=d;return p|0}}while(0);p=0;i=d;return p|0}if(!(g>>>0<b>>>0)){m=g-b|0;if(!(m>>>0>15)){p=a;i=d;return p|0}c[e>>2]=f&1|b|2;c[h+(b+4)>>2]=m|3;c[n>>2]=c[n>>2]|1;jp(h+b|0,m);p=a;i=d;return p|0}if((k|0)==(c[25808>>2]|0)){m=(c[25796>>2]|0)+g|0;if(!(m>>>0>b>>>0)){p=0;i=d;return p|0}n=m-b|0;c[e>>2]=f&1|b|2;c[h+(b+4)>>2]=n|1;c[25808>>2]=h+b;c[25796>>2]=n;p=a;i=d;return p|0}if((k|0)==(c[25804>>2]|0)){n=(c[25792>>2]|0)+g|0;if(n>>>0<b>>>0){p=0;i=d;return p|0}m=n-b|0;if(m>>>0>15){c[e>>2]=f&1|b|2;c[h+(b+4)>>2]=m|1;c[h+n>>2]=m;q=h+(n+4)|0;c[q>>2]=c[q>>2]&-2;r=h+b|0;s=m}else{c[e>>2]=f&1|n|2;f=h+(n+4)|0;c[f>>2]=c[f>>2]|1;r=0;s=0}c[25792>>2]=s;c[25804>>2]=r;p=a;i=d;return p|0}if((o&2|0)!=0){p=0;i=d;return p|0}r=(o&-8)+g|0;if(r>>>0<b>>>0){p=0;i=d;return p|0}s=r-b|0;f=o>>>3;a:do{if(o>>>0<256){n=c[h+(g+8)>>2]|0;m=c[h+(g+12)>>2]|0;q=25824+(f<<1<<2)|0;do{if((n|0)!=(q|0)){if(n>>>0<l>>>0){wc()}if((c[n+12>>2]|0)==(k|0)){break}wc()}}while(0);if((m|0)==(n|0)){c[6446]=c[6446]&~(1<<f);break}do{if((m|0)==(q|0)){t=m+8|0}else{if(m>>>0<l>>>0){wc()}u=m+8|0;if((c[u>>2]|0)==(k|0)){t=u;break}wc()}}while(0);c[n+12>>2]=m;c[t>>2]=n}else{q=j;u=c[h+(g+24)>>2]|0;v=c[h+(g+12)>>2]|0;do{if((v|0)==(q|0)){w=h+(g+20)|0;x=c[w>>2]|0;if((x|0)==0){y=h+(g+16)|0;z=c[y>>2]|0;if((z|0)==0){A=0;break}else{B=z;C=y}}else{B=x;C=w}while(1){w=B+20|0;x=c[w>>2]|0;if((x|0)!=0){C=w;B=x;continue}x=B+16|0;w=c[x>>2]|0;if((w|0)==0){break}else{B=w;C=x}}if(C>>>0<l>>>0){wc()}else{c[C>>2]=0;A=B;break}}else{x=c[h+(g+8)>>2]|0;if(x>>>0<l>>>0){wc()}w=x+12|0;if((c[w>>2]|0)!=(q|0)){wc()}y=v+8|0;if((c[y>>2]|0)==(q|0)){c[w>>2]=v;c[y>>2]=x;A=v;break}else{wc()}}}while(0);if((u|0)==0){break}v=c[h+(g+28)>>2]|0;n=26088+(v<<2)|0;do{if((q|0)==(c[n>>2]|0)){c[n>>2]=A;if((A|0)!=0){break}c[25788>>2]=c[25788>>2]&~(1<<v);break a}else{if(u>>>0<(c[25800>>2]|0)>>>0){wc()}m=u+16|0;if((c[m>>2]|0)==(q|0)){c[m>>2]=A}else{c[u+20>>2]=A}if((A|0)==0){break a}}}while(0);if(A>>>0<(c[25800>>2]|0)>>>0){wc()}c[A+24>>2]=u;q=c[h+(g+16)>>2]|0;do{if((q|0)!=0){if(q>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[A+16>>2]=q;c[q+24>>2]=A;break}}}while(0);q=c[h+(g+20)>>2]|0;if((q|0)==0){break}if(q>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[A+20>>2]=q;c[q+24>>2]=A;break}}}while(0);if(s>>>0<16){c[e>>2]=r|c[e>>2]&1|2;A=h+(r|4)|0;c[A>>2]=c[A>>2]|1;p=a;i=d;return p|0}else{c[e>>2]=c[e>>2]&1|b|2;c[h+(b+4)>>2]=s|3;e=h+(r|4)|0;c[e>>2]=c[e>>2]|1;jp(h+b|0,s);p=a;i=d;return p|0}return 0}function jp(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;d=i;e=a;f=e+b|0;g=f;h=c[a+4>>2]|0;a:do{if((h&1|0)==0){j=c[a>>2]|0;if((h&3|0)==0){i=d;return}k=e+(0-j)|0;l=k;m=j+b|0;n=c[25800>>2]|0;if(k>>>0<n>>>0){wc()}if((l|0)==(c[25804>>2]|0)){o=e+(b+4)|0;if((c[o>>2]&3|0)!=3){p=l;q=m;break}c[25792>>2]=m;c[o>>2]=c[o>>2]&-2;c[e+(4-j)>>2]=m|1;c[f>>2]=m;i=d;return}o=j>>>3;if(j>>>0<256){r=c[e+(8-j)>>2]|0;s=c[e+(12-j)>>2]|0;t=25824+(o<<1<<2)|0;do{if((r|0)!=(t|0)){if(r>>>0<n>>>0){wc()}if((c[r+12>>2]|0)==(l|0)){break}wc()}}while(0);if((s|0)==(r|0)){c[6446]=c[6446]&~(1<<o);p=l;q=m;break}do{if((s|0)==(t|0)){u=s+8|0}else{if(s>>>0<n>>>0){wc()}v=s+8|0;if((c[v>>2]|0)==(l|0)){u=v;break}wc()}}while(0);c[r+12>>2]=s;c[u>>2]=r;p=l;q=m;break}t=k;o=c[e+(24-j)>>2]|0;v=c[e+(12-j)>>2]|0;do{if((v|0)==(t|0)){w=16-j|0;x=e+(w+4)|0;y=c[x>>2]|0;if((y|0)==0){z=e+w|0;w=c[z>>2]|0;if((w|0)==0){A=0;break}else{B=w;C=z}}else{B=y;C=x}while(1){x=B+20|0;y=c[x>>2]|0;if((y|0)!=0){C=x;B=y;continue}y=B+16|0;x=c[y>>2]|0;if((x|0)==0){break}else{B=x;C=y}}if(C>>>0<n>>>0){wc()}else{c[C>>2]=0;A=B;break}}else{y=c[e+(8-j)>>2]|0;if(y>>>0<n>>>0){wc()}x=y+12|0;if((c[x>>2]|0)!=(t|0)){wc()}z=v+8|0;if((c[z>>2]|0)==(t|0)){c[x>>2]=v;c[z>>2]=y;A=v;break}else{wc()}}}while(0);if((o|0)==0){p=l;q=m;break}v=c[e+(28-j)>>2]|0;n=26088+(v<<2)|0;do{if((t|0)==(c[n>>2]|0)){c[n>>2]=A;if((A|0)!=0){break}c[25788>>2]=c[25788>>2]&~(1<<v);p=l;q=m;break a}else{if(o>>>0<(c[25800>>2]|0)>>>0){wc()}k=o+16|0;if((c[k>>2]|0)==(t|0)){c[k>>2]=A}else{c[o+20>>2]=A}if((A|0)==0){p=l;q=m;break a}}}while(0);if(A>>>0<(c[25800>>2]|0)>>>0){wc()}c[A+24>>2]=o;t=16-j|0;v=c[e+t>>2]|0;do{if((v|0)!=0){if(v>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[A+16>>2]=v;c[v+24>>2]=A;break}}}while(0);v=c[e+(t+4)>>2]|0;if((v|0)==0){p=l;q=m;break}if(v>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[A+20>>2]=v;c[v+24>>2]=A;p=l;q=m;break}}else{p=a;q=b}}while(0);a=c[25800>>2]|0;if(f>>>0<a>>>0){wc()}A=e+(b+4)|0;B=c[A>>2]|0;do{if((B&2|0)==0){if((g|0)==(c[25808>>2]|0)){C=(c[25796>>2]|0)+q|0;c[25796>>2]=C;c[25808>>2]=p;c[p+4>>2]=C|1;if((p|0)!=(c[25804>>2]|0)){i=d;return}c[25804>>2]=0;c[25792>>2]=0;i=d;return}if((g|0)==(c[25804>>2]|0)){C=(c[25792>>2]|0)+q|0;c[25792>>2]=C;c[25804>>2]=p;c[p+4>>2]=C|1;c[p+C>>2]=C;i=d;return}C=(B&-8)+q|0;u=B>>>3;b:do{if(B>>>0<256){h=c[e+(b+8)>>2]|0;v=c[e+(b+12)>>2]|0;j=25824+(u<<1<<2)|0;do{if((h|0)!=(j|0)){if(h>>>0<a>>>0){wc()}if((c[h+12>>2]|0)==(g|0)){break}wc()}}while(0);if((v|0)==(h|0)){c[6446]=c[6446]&~(1<<u);break}do{if((v|0)==(j|0)){D=v+8|0}else{if(v>>>0<a>>>0){wc()}o=v+8|0;if((c[o>>2]|0)==(g|0)){D=o;break}wc()}}while(0);c[h+12>>2]=v;c[D>>2]=h}else{j=f;o=c[e+(b+24)>>2]|0;n=c[e+(b+12)>>2]|0;do{if((n|0)==(j|0)){k=e+(b+20)|0;r=c[k>>2]|0;if((r|0)==0){s=e+(b+16)|0;y=c[s>>2]|0;if((y|0)==0){E=0;break}else{F=y;G=s}}else{F=r;G=k}while(1){k=F+20|0;r=c[k>>2]|0;if((r|0)!=0){G=k;F=r;continue}r=F+16|0;k=c[r>>2]|0;if((k|0)==0){break}else{F=k;G=r}}if(G>>>0<a>>>0){wc()}else{c[G>>2]=0;E=F;break}}else{r=c[e+(b+8)>>2]|0;if(r>>>0<a>>>0){wc()}k=r+12|0;if((c[k>>2]|0)!=(j|0)){wc()}s=n+8|0;if((c[s>>2]|0)==(j|0)){c[k>>2]=n;c[s>>2]=r;E=n;break}else{wc()}}}while(0);if((o|0)==0){break}n=c[e+(b+28)>>2]|0;h=26088+(n<<2)|0;do{if((j|0)==(c[h>>2]|0)){c[h>>2]=E;if((E|0)!=0){break}c[25788>>2]=c[25788>>2]&~(1<<n);break b}else{if(o>>>0<(c[25800>>2]|0)>>>0){wc()}v=o+16|0;if((c[v>>2]|0)==(j|0)){c[v>>2]=E}else{c[o+20>>2]=E}if((E|0)==0){break b}}}while(0);if(E>>>0<(c[25800>>2]|0)>>>0){wc()}c[E+24>>2]=o;j=c[e+(b+16)>>2]|0;do{if((j|0)!=0){if(j>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[E+16>>2]=j;c[j+24>>2]=E;break}}}while(0);j=c[e+(b+20)>>2]|0;if((j|0)==0){break}if(j>>>0<(c[25800>>2]|0)>>>0){wc()}else{c[E+20>>2]=j;c[j+24>>2]=E;break}}}while(0);c[p+4>>2]=C|1;c[p+C>>2]=C;if((p|0)!=(c[25804>>2]|0)){H=C;break}c[25792>>2]=C;i=d;return}else{c[A>>2]=B&-2;c[p+4>>2]=q|1;c[p+q>>2]=q;H=q}}while(0);q=H>>>3;if(H>>>0<256){B=q<<1;A=25824+(B<<2)|0;E=c[6446]|0;b=1<<q;do{if((E&b|0)==0){c[6446]=E|b;I=25824+(B+2<<2)|0;J=A}else{q=25824+(B+2<<2)|0;e=c[q>>2]|0;if(!(e>>>0<(c[25800>>2]|0)>>>0)){I=q;J=e;break}wc()}}while(0);c[I>>2]=p;c[J+12>>2]=p;c[p+8>>2]=J;c[p+12>>2]=A;i=d;return}A=p;J=H>>>8;do{if((J|0)==0){K=0}else{if(H>>>0>16777215){K=31;break}I=(J+1048320|0)>>>16&8;B=J<<I;b=(B+520192|0)>>>16&4;E=B<<b;B=(E+245760|0)>>>16&2;e=14-(b|I|B)+(E<<B>>>15)|0;K=H>>>(e+7|0)&1|e<<1}}while(0);J=26088+(K<<2)|0;c[p+28>>2]=K;c[p+20>>2]=0;c[p+16>>2]=0;e=c[25788>>2]|0;B=1<<K;if((e&B|0)==0){c[25788>>2]=e|B;c[J>>2]=A;c[p+24>>2]=J;c[p+12>>2]=p;c[p+8>>2]=p;i=d;return}B=c[J>>2]|0;if((K|0)==31){L=0}else{L=25-(K>>>1)|0}c:do{if((c[B+4>>2]&-8|0)==(H|0)){M=B}else{K=H<<L;J=B;while(1){N=J+(K>>>31<<2)+16|0;e=c[N>>2]|0;if((e|0)==0){break}if((c[e+4>>2]&-8|0)==(H|0)){M=e;break c}else{K=K<<1;J=e}}if(N>>>0<(c[25800>>2]|0)>>>0){wc()}c[N>>2]=A;c[p+24>>2]=J;c[p+12>>2]=p;c[p+8>>2]=p;i=d;return}}while(0);N=M+8|0;H=c[N>>2]|0;B=c[25800>>2]|0;if(M>>>0<B>>>0){wc()}if(H>>>0<B>>>0){wc()}c[H+12>>2]=A;c[N>>2]=A;c[p+8>>2]=H;c[p+12>>2]=M;c[p+24>>2]=0;i=d;return}function kp(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;d=(a|0)==0?1:a;while(1){e=fp(d)|0;if((e|0)!=0){f=6;break}a=c[6570]|0;c[6570]=a+0;if((a|0)==0){f=5;break}xd[a&3]()}if((f|0)==5){d=bc(4)|0;c[d>>2]=26296;gd(d|0,26344,109)}else if((f|0)==6){i=b;return e|0}return 0}function lp(a){a=a|0;var b=0,c=0;b=i;c=kp(a)|0;i=b;return c|0}function mp(a){a=a|0;var b=0;b=i;if((a|0)!=0){gp(a)}i=b;return}function np(a){a=a|0;var b=0;b=i;mp(a);i=b;return}function op(a){a=a|0;var b=0;b=i;hb(a|0);mp(a);i=b;return}function pp(a){a=a|0;var b=0;b=i;hb(a|0);i=b;return}function qp(a){a=a|0;i=i;return 26312}function rp(){var a=0;a=bc(4)|0;c[a>>2]=26296;gd(a|0,26344,109)}function sp(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0.0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0.0,P=0,Q=0.0,R=0,S=0,T=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0.0,ea=0,ga=0.0,ha=0,ia=0.0,ja=0,ka=0.0,la=0.0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0.0,ua=0,va=0.0,wa=0,xa=0,ya=0,za=0,Aa=0.0,Ba=0,Ca=0.0,Da=0.0,Ea=0,Fa=0.0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0,tc=0,uc=0.0,vc=0,wc=0,xc=0.0,yc=0.0,Ac=0.0,Bc=0.0,Cc=0.0,Dc=0.0,Ec=0,Fc=0,Gc=0.0,Hc=0,Ic=0.0,Jc=0,Kc=0,Lc=0,Mc=0,Nc=0;g=i;i=i+512|0;h=g;if((e|0)==0){j=24;k=-149}else if((e|0)==2){j=53;k=-1074}else if((e|0)==1){j=53;k=-1074}else{l=0.0;i=g;return+l}e=b+4|0;m=b+100|0;do{n=c[e>>2]|0;if(n>>>0<(c[m>>2]|0)>>>0){c[e>>2]=n+1;o=d[n]|0}else{o=vp(b)|0}}while((zc(o|0)|0)!=0);do{if((o|0)==43|(o|0)==45){n=1-(((o|0)==45)<<1)|0;p=c[e>>2]|0;if(p>>>0<(c[m>>2]|0)>>>0){c[e>>2]=p+1;q=d[p]|0;r=n;break}else{q=vp(b)|0;r=n;break}}else{q=o;r=1}}while(0);o=q;q=0;while(1){if((o|32|0)!=(a[26360+q|0]|0)){s=o;t=q;break}do{if(q>>>0<7){n=c[e>>2]|0;if(n>>>0<(c[m>>2]|0)>>>0){c[e>>2]=n+1;u=d[n]|0;break}else{u=vp(b)|0;break}}else{u=o}}while(0);n=q+1|0;if(n>>>0<8){o=u;q=n}else{s=u;t=n;break}}do{if((t|0)==3){v=23}else if((t|0)!=8){u=(f|0)==0;if(!(t>>>0<4|u)){if((t|0)==8){break}else{v=23;break}}a:do{if((t|0)==0){q=s;o=0;while(1){if((q|32|0)!=(a[26376+o|0]|0)){w=q;x=o;break a}do{if(o>>>0<2){n=c[e>>2]|0;if(n>>>0<(c[m>>2]|0)>>>0){c[e>>2]=n+1;A=d[n]|0;break}else{A=vp(b)|0;break}}else{A=q}}while(0);n=o+1|0;if(n>>>0<3){q=A;o=n}else{w=A;x=n;break}}}else{w=s;x=t}}while(0);if((x|0)==0){do{if((w|0)==48){o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;B=d[o]|0}else{B=vp(b)|0}if((B|32|0)!=120){if((c[m>>2]|0)==0){C=48;break}c[e>>2]=(c[e>>2]|0)+ -1;C=48;break}o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;D=d[o]|0;E=0}else{D=vp(b)|0;E=0}while(1){if((D|0)==46){v=70;break}else if((D|0)!=48){F=0;G=0;H=0;I=0;K=D;L=E;M=0;N=0;O=1.0;P=0;Q=0.0;break}o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;D=d[o]|0;E=1;continue}else{D=vp(b)|0;E=1;continue}}b:do{if((v|0)==70){o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;R=d[o]|0}else{R=vp(b)|0}if((R|0)==48){S=-1;T=-1}else{F=0;G=0;H=0;I=0;K=R;L=E;M=1;N=0;O=1.0;P=0;Q=0.0;break}while(1){o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;V=d[o]|0}else{V=vp(b)|0}if((V|0)!=48){F=S;G=T;H=0;I=0;K=V;L=1;M=1;N=0;O=1.0;P=0;Q=0.0;break b}o=Jp(S|0,T|0,-1,-1)|0;S=o;T=J}}}while(0);c:while(1){o=K+ -48|0;do{if(o>>>0<10){W=o;v=84}else{q=K|32;n=(K|0)==46;if(!((q+ -97|0)>>>0<6|n)){X=K;break c}if(n){if((M|0)==0){Y=H;Z=I;_=H;$=I;aa=L;ba=1;ca=N;da=O;ea=P;ga=Q;break}else{X=46;break c}}else{W=(K|0)>57?q+ -87|0:o;v=84;break}}}while(0);if((v|0)==84){v=0;do{if((I|0)<0|(I|0)==0&H>>>0<8){ha=N;ia=O;ja=W+(P<<4)|0;ka=Q}else{if((I|0)<0|(I|0)==0&H>>>0<14){la=O*.0625;ha=N;ia=la;ja=P;ka=Q+la*+(W|0);break}if(!((W|0)!=0&(N|0)==0)){ha=N;ia=O;ja=P;ka=Q;break}ha=1;ia=O;ja=P;ka=Q+O*.5}}while(0);o=Jp(H|0,I|0,1,0)|0;Y=F;Z=G;_=o;$=J;aa=1;ba=M;ca=ha;da=ia;ea=ja;ga=ka}o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;F=Y;G=Z;H=_;I=$;K=d[o]|0;L=aa;M=ba;N=ca;O=da;P=ea;Q=ga;continue}else{F=Y;G=Z;H=_;I=$;K=vp(b)|0;L=aa;M=ba;N=ca;O=da;P=ea;Q=ga;continue}}if((L|0)==0){o=(c[m>>2]|0)==0;if(!o){c[e>>2]=(c[e>>2]|0)+ -1}do{if(u){up(b,0)}else{if(o){break}q=c[e>>2]|0;c[e>>2]=q+ -1;if((M|0)==0){break}c[e>>2]=q+ -2}}while(0);l=+(r|0)*0.0;i=g;return+l}o=(M|0)==0;q=o?H:F;n=o?I:G;if((I|0)<0|(I|0)==0&H>>>0<8){o=H;p=I;ma=P;while(1){na=ma<<4;oa=Jp(o|0,p|0,1,0)|0;pa=J;if((pa|0)<0|(pa|0)==0&oa>>>0<8){ma=na;p=pa;o=oa}else{qa=na;break}}}else{qa=P}do{if((X|32|0)==112){o=tp(b,f)|0;p=J;if(!((o|0)==0&(p|0)==-2147483648)){ra=o;sa=p;break}if(u){up(b,0);l=0.0;i=g;return+l}else{if((c[m>>2]|0)==0){ra=0;sa=0;break}c[e>>2]=(c[e>>2]|0)+ -1;ra=0;sa=0;break}}else{if((c[m>>2]|0)==0){ra=0;sa=0;break}c[e>>2]=(c[e>>2]|0)+ -1;ra=0;sa=0}}while(0);p=Kp(q|0,n|0,2)|0;o=Jp(p|0,J|0,-32,-1)|0;p=Jp(o|0,J|0,ra|0,sa|0)|0;o=J;if((qa|0)==0){l=+(r|0)*0.0;i=g;return+l}if((o|0)>0|(o|0)==0&p>>>0>(0-k|0)>>>0){c[(ic()|0)>>2]=34;l=+(r|0)*1.7976931348623157e+308*1.7976931348623157e+308;i=g;return+l}ma=k+ -106|0;na=((ma|0)<0)<<31>>31;if((o|0)<(na|0)|(o|0)==(na|0)&p>>>0<ma>>>0){c[(ic()|0)>>2]=34;l=+(r|0)*2.2250738585072014e-308*2.2250738585072014e-308;i=g;return+l}if((qa|0)>-1){ma=p;na=o;oa=qa;la=Q;while(1){pa=oa<<1;if(!(la>=.5)){ta=la;ua=pa}else{ta=la+-1.0;ua=pa|1}va=la+ta;pa=Jp(ma|0,na|0,-1,-1)|0;wa=J;if((ua|0)>-1){ma=pa;na=wa;oa=ua;la=va}else{xa=pa;ya=wa;za=ua;Aa=va;break}}}else{xa=p;ya=o;za=qa;Aa=Q}oa=Ip(32,0,k|0,((k|0)<0)<<31>>31|0)|0;na=Jp(xa|0,ya|0,oa|0,J|0)|0;oa=J;if(0>(oa|0)|0==(oa|0)&j>>>0>na>>>0){Ba=(na|0)<0?0:na}else{Ba=j}do{if((Ba|0)<53){la=+(r|0);va=+ed(+(+wp(1.0,84-Ba|0)),+la);if(!((Ba|0)<32&Aa!=0.0)){Ca=la;Da=va;Ea=za;Fa=Aa;break}na=za&1;Ca=la;Da=va;Ea=(na^1)+za|0;Fa=(na|0)==0?0.0:Aa}else{Ca=+(r|0);Da=0.0;Ea=za;Fa=Aa}}while(0);va=Ca*Fa+(Da+Ca*+(Ea>>>0))-Da;if(!(va!=0.0)){c[(ic()|0)>>2]=34}l=+xp(va,xa);i=g;return+l}else{C=w}}while(0);o=k+j|0;p=0-o|0;na=C;oa=0;while(1){if((na|0)==46){v=139;break}else if((na|0)!=48){Ga=na;Ha=0;Ia=0;Ja=oa;Ka=0;break}ma=c[e>>2]|0;if(ma>>>0<(c[m>>2]|0)>>>0){c[e>>2]=ma+1;na=d[ma]|0;oa=1;continue}else{na=vp(b)|0;oa=1;continue}}d:do{if((v|0)==139){na=c[e>>2]|0;if(na>>>0<(c[m>>2]|0)>>>0){c[e>>2]=na+1;La=d[na]|0}else{La=vp(b)|0}if((La|0)==48){Ma=-1;Na=-1}else{Ga=La;Ha=0;Ia=0;Ja=oa;Ka=1;break}while(1){na=c[e>>2]|0;if(na>>>0<(c[m>>2]|0)>>>0){c[e>>2]=na+1;Oa=d[na]|0}else{Oa=vp(b)|0}if((Oa|0)!=48){Ga=Oa;Ha=Ma;Ia=Na;Ja=1;Ka=1;break d}na=Jp(Ma|0,Na|0,-1,-1)|0;Ma=na;Na=J}}}while(0);oa=h;c[oa>>2]=0;na=Ga+ -48|0;ma=(Ga|0)==46;e:do{if(na>>>0<10|ma){n=h+496|0;q=Ga;wa=ma;pa=na;Pa=0;Qa=0;Ra=Ha;Sa=Ia;Ta=Ja;Ua=Ka;Va=0;Wa=0;Xa=0;while(1){do{if(wa){if((Ua|0)==0){Ya=Pa;Za=Qa;_a=Pa;$a=Qa;ab=Ta;bb=1;cb=Va;db=Wa;eb=Xa}else{fb=q;gb=Pa;hb=Qa;ib=Ra;jb=Sa;kb=Ta;lb=Va;mb=Wa;nb=Xa;break e}}else{ob=Jp(Pa|0,Qa|0,1,0)|0;pb=J;qb=(q|0)!=48;if((Wa|0)>=125){if(!qb){Ya=Ra;Za=Sa;_a=ob;$a=pb;ab=Ta;bb=Ua;cb=Va;db=Wa;eb=Xa;break}c[n>>2]=c[n>>2]|1;Ya=Ra;Za=Sa;_a=ob;$a=pb;ab=Ta;bb=Ua;cb=Va;db=Wa;eb=Xa;break}rb=h+(Wa<<2)|0;if((Va|0)==0){sb=pa}else{sb=q+ -48+((c[rb>>2]|0)*10|0)|0}c[rb>>2]=sb;rb=Va+1|0;tb=(rb|0)==9;Ya=Ra;Za=Sa;_a=ob;$a=pb;ab=1;bb=Ua;cb=tb?0:rb;db=(tb&1)+Wa|0;eb=qb?ob:Xa}}while(0);ob=c[e>>2]|0;if(ob>>>0<(c[m>>2]|0)>>>0){c[e>>2]=ob+1;ub=d[ob]|0}else{ub=vp(b)|0}ob=ub+ -48|0;qb=(ub|0)==46;if(ob>>>0<10|qb){q=ub;wa=qb;pa=ob;Pa=_a;Qa=$a;Ra=Ya;Sa=Za;Ta=ab;Ua=bb;Va=cb;Wa=db;Xa=eb}else{vb=ub;wb=_a;xb=$a;yb=Ya;zb=Za;Ab=ab;Bb=bb;Cb=cb;Db=db;Eb=eb;v=162;break}}}else{vb=Ga;wb=0;xb=0;yb=Ha;zb=Ia;Ab=Ja;Bb=Ka;Cb=0;Db=0;Eb=0;v=162}}while(0);if((v|0)==162){na=(Bb|0)==0;fb=vb;gb=wb;hb=xb;ib=na?wb:yb;jb=na?xb:zb;kb=Ab;lb=Cb;mb=Db;nb=Eb}na=(kb|0)!=0;do{if(na){if((fb|32|0)!=101){v=171;break}ma=tp(b,f)|0;Xa=J;do{if((ma|0)==0&(Xa|0)==-2147483648){if(u){up(b,0);l=0.0;i=g;return+l}else{if((c[m>>2]|0)==0){Fb=0;Gb=0;break}c[e>>2]=(c[e>>2]|0)+ -1;Fb=0;Gb=0;break}}else{Fb=ma;Gb=Xa}}while(0);Xa=Jp(Fb|0,Gb|0,ib|0,jb|0)|0;Hb=Xa;Ib=J}else{v=171}}while(0);do{if((v|0)==171){if(!((fb|0)>-1)){Hb=ib;Ib=jb;break}if((c[m>>2]|0)==0){Hb=ib;Ib=jb;break}c[e>>2]=(c[e>>2]|0)+ -1;Hb=ib;Ib=jb}}while(0);if(!na){c[(ic()|0)>>2]=22;up(b,0);l=0.0;i=g;return+l}Xa=c[oa>>2]|0;if((Xa|0)==0){l=+(r|0)*0.0;i=g;return+l}do{if((Hb|0)==(gb|0)&(Ib|0)==(hb|0)&((hb|0)<0|(hb|0)==0&gb>>>0<10)){if(!(j>>>0>30)){if((Xa>>>j|0)!=0){break}}l=+(r|0)*+(Xa>>>0);i=g;return+l}}while(0);Xa=(k|0)/-2|0;na=((Xa|0)<0)<<31>>31;if((Ib|0)>(na|0)|(Ib|0)==(na|0)&Hb>>>0>Xa>>>0){c[(ic()|0)>>2]=34;l=+(r|0)*1.7976931348623157e+308*1.7976931348623157e+308;i=g;return+l}Xa=k+ -106|0;na=((Xa|0)<0)<<31>>31;if((Ib|0)<(na|0)|(Ib|0)==(na|0)&Hb>>>0<Xa>>>0){c[(ic()|0)>>2]=34;l=+(r|0)*2.2250738585072014e-308*2.2250738585072014e-308;i=g;return+l}if((lb|0)==0){Jb=mb}else{if((lb|0)<9){Xa=h+(mb<<2)|0;na=c[Xa>>2]|0;ma=lb;do{na=na*10|0;ma=ma+1|0;}while((ma|0)!=9);c[Xa>>2]=na}Jb=mb+1|0}do{if((nb|0)<9){if(!((nb|0)<=(Hb|0)&(Hb|0)<18)){break}if((Hb|0)==9){l=+(r|0)*+((c[oa>>2]|0)>>>0);i=g;return+l}if((Hb|0)<9){l=+(r|0)*+((c[oa>>2]|0)>>>0)/+(c[26392+(8-Hb<<2)>>2]|0);i=g;return+l}ma=j+27+(fa(Hb,-3)|0)|0;Wa=c[oa>>2]|0;if((ma|0)<=30){if((Wa>>>ma|0)!=0){break}}l=+(r|0)*+(Wa>>>0)*+(c[26392+(Hb+ -10<<2)>>2]|0);i=g;return+l}}while(0);oa=(Hb|0)%9|0;if((oa|0)==0){Kb=0;Lb=0;Mb=Hb;Nb=Jb}else{na=(Hb|0)>-1?oa:oa+9|0;oa=c[26392+(8-na<<2)>>2]|0;do{if((Jb|0)==0){Ob=0;Pb=Hb;Qb=0}else{Xa=1e9/(oa|0)|0;Wa=0;ma=0;Va=0;Ua=Hb;while(1){Ta=h+(Va<<2)|0;Sa=c[Ta>>2]|0;Ra=((Sa>>>0)/(oa>>>0)|0)+ma|0;c[Ta>>2]=Ra;Rb=fa((Sa>>>0)%(oa>>>0)|0,Xa)|0;Sa=Va+1|0;if((Va|0)==(Wa|0)&(Ra|0)==0){Sb=Sa&127;Tb=Ua+ -9|0}else{Sb=Wa;Tb=Ua}if((Sa|0)==(Jb|0)){break}else{Wa=Sb;Ua=Tb;Va=Sa;ma=Rb}}if((Rb|0)==0){Ob=Sb;Pb=Tb;Qb=Jb;break}c[h+(Jb<<2)>>2]=Rb;Ob=Sb;Pb=Tb;Qb=Jb+1|0}}while(0);Kb=Ob;Lb=0;Mb=9-na+Pb|0;Nb=Qb}f:while(1){oa=h+(Kb<<2)|0;if((Mb|0)<18){ma=Lb;Va=Nb;while(1){Ua=0;Wa=Va+127|0;Xa=Va;while(1){Sa=Wa&127;Ra=h+(Sa<<2)|0;Ta=Kp(c[Ra>>2]|0,0,29)|0;Qa=Jp(Ta|0,J|0,Ua|0,0)|0;Ta=J;if(Ta>>>0>0|(Ta|0)==0&Qa>>>0>1e9){Pa=Tp(Qa|0,Ta|0,1e9,0)|0;pa=Up(Qa|0,Ta|0,1e9,0)|0;Ub=pa;Vb=Pa}else{Ub=Qa;Vb=0}c[Ra>>2]=Ub;Ra=(Sa|0)==(Kb|0);if((Sa|0)!=(Xa+127&127|0)|Ra){Wb=Xa}else{Wb=(Ub|0)==0?Sa:Xa}if(Ra){break}else{Ua=Vb;Wa=Sa+ -1|0;Xa=Wb}}Xa=ma+ -29|0;if((Vb|0)==0){ma=Xa;Va=Wb}else{Xb=Xa;Yb=Vb;Zb=Wb;break}}}else{if((Mb|0)==18){$b=Lb;ac=Nb}else{bc=Kb;cc=Lb;dc=Mb;ec=Nb;break}while(1){if(!((c[oa>>2]|0)>>>0<9007199)){bc=Kb;cc=$b;dc=18;ec=ac;break f}Va=0;ma=ac+127|0;Xa=ac;while(1){Wa=ma&127;Ua=h+(Wa<<2)|0;Sa=Kp(c[Ua>>2]|0,0,29)|0;Ra=Jp(Sa|0,J|0,Va|0,0)|0;Sa=J;if(Sa>>>0>0|(Sa|0)==0&Ra>>>0>1e9){Qa=Tp(Ra|0,Sa|0,1e9,0)|0;Pa=Up(Ra|0,Sa|0,1e9,0)|0;fc=Pa;gc=Qa}else{fc=Ra;gc=0}c[Ua>>2]=fc;Ua=(Wa|0)==(Kb|0);if((Wa|0)!=(Xa+127&127|0)|Ua){hc=Xa}else{hc=(fc|0)==0?Wa:Xa}if(Ua){break}else{Va=gc;ma=Wa+ -1|0;Xa=hc}}Xa=$b+ -29|0;if((gc|0)==0){$b=Xa;ac=hc}else{Xb=Xa;Yb=gc;Zb=hc;break}}}oa=Kb+127&127;if((oa|0)==(Zb|0)){Xa=Zb+127&127;ma=h+((Zb+126&127)<<2)|0;c[ma>>2]=c[ma>>2]|c[h+(Xa<<2)>>2];jc=Xa}else{jc=Zb}c[h+(oa<<2)>>2]=Yb;Kb=oa;Lb=Xb;Mb=Mb+9|0;Nb=jc}g:while(1){kc=ec+1&127;na=h+((ec+127&127)<<2)|0;oa=bc;Xa=cc;ma=dc;while(1){Va=(ma|0)==18;Wa=(ma|0)>27?9:1;lc=oa;mc=Xa;while(1){Ua=0;while(1){Ra=Ua+lc&127;if((Ra|0)==(ec|0)){nc=2;break}Qa=c[h+(Ra<<2)>>2]|0;Ra=c[26384+(Ua<<2)>>2]|0;if(Qa>>>0<Ra>>>0){nc=2;break}Pa=Ua+1|0;if(Qa>>>0>Ra>>>0){nc=Ua;break}if((Pa|0)<2){Ua=Pa}else{nc=Pa;break}}if((nc|0)==2&Va){break g}oc=Wa+mc|0;if((lc|0)==(ec|0)){lc=ec;mc=oc}else{break}}Va=(1<<Wa)+ -1|0;Ua=1e9>>>Wa;pc=lc;qc=0;Pa=lc;rc=ma;do{Ra=h+(Pa<<2)|0;Qa=c[Ra>>2]|0;Sa=(Qa>>>Wa)+qc|0;c[Ra>>2]=Sa;qc=fa(Qa&Va,Ua)|0;Qa=(Pa|0)==(pc|0)&(Sa|0)==0;Pa=Pa+1&127;rc=Qa?rc+ -9|0:rc;pc=Qa?Pa:pc;}while((Pa|0)!=(ec|0));if((qc|0)==0){oa=pc;Xa=oc;ma=rc;continue}if((kc|0)!=(pc|0)){break}c[na>>2]=c[na>>2]|1;oa=pc;Xa=oc;ma=rc}c[h+(ec<<2)>>2]=qc;bc=pc;cc=oc;dc=rc;ec=kc}ma=lc&127;if((ma|0)==(ec|0)){c[h+(kc+ -1<<2)>>2]=0;sc=kc}else{sc=ec}va=+((c[h+(ma<<2)>>2]|0)>>>0);ma=lc+1&127;if((ma|0)==(sc|0)){Xa=sc+1&127;c[h+(Xa+ -1<<2)>>2]=0;tc=Xa}else{tc=sc}la=+(r|0);uc=la*(va*1.0e9+ +((c[h+(ma<<2)>>2]|0)>>>0));ma=mc+53|0;Xa=ma-k|0;if((Xa|0)<(j|0)){vc=(Xa|0)<0?0:Xa;wc=1}else{vc=j;wc=0}if((vc|0)<53){va=+ed(+(+wp(1.0,105-vc|0)),+uc);xc=+_b(+uc,+(+wp(1.0,53-vc|0)));yc=va;Ac=xc;Bc=va+(uc-xc)}else{yc=0.0;Ac=0.0;Bc=uc}oa=lc+2&127;do{if((oa|0)==(tc|0)){Cc=Ac}else{na=c[h+(oa<<2)>>2]|0;do{if(na>>>0<5e8){if((na|0)==0){if((lc+3&127|0)==(tc|0)){Dc=Ac;break}}Dc=la*.25+Ac}else{if(na>>>0>5e8){Dc=la*.75+Ac;break}if((lc+3&127|0)==(tc|0)){Dc=la*.5+Ac;break}else{Dc=la*.75+Ac;break}}}while(0);if((53-vc|0)<=1){Cc=Dc;break}if(+_b(+Dc,1.0)!=0.0){Cc=Dc;break}Cc=Dc+1.0}}while(0);la=Bc+Cc-yc;do{if((ma&2147483647|0)>(-2-o|0)){if(!(+U(+la)>=9007199254740992.0)){Ec=wc;Fc=mc;Gc=la}else{Ec=(wc|0)!=0&(vc|0)==(Xa|0)?0:wc;Fc=mc+1|0;Gc=la*.5}if((Fc+50|0)<=(p|0)){if(!((Ec|0)!=0&Cc!=0.0)){Hc=Fc;Ic=Gc;break}}c[(ic()|0)>>2]=34;Hc=Fc;Ic=Gc}else{Hc=mc;Ic=la}}while(0);l=+xp(Ic,Hc);i=g;return+l}else if((x|0)==3){p=c[e>>2]|0;if(p>>>0<(c[m>>2]|0)>>>0){c[e>>2]=p+1;Jc=d[p]|0}else{Jc=vp(b)|0}if((Jc|0)==40){Kc=1}else{if((c[m>>2]|0)==0){l=y;i=g;return+l}c[e>>2]=(c[e>>2]|0)+ -1;l=y;i=g;return+l}while(1){p=c[e>>2]|0;if(p>>>0<(c[m>>2]|0)>>>0){c[e>>2]=p+1;Lc=d[p]|0}else{Lc=vp(b)|0}if(!((Lc+ -48|0)>>>0<10|(Lc+ -65|0)>>>0<26)){if(!((Lc+ -97|0)>>>0<26|(Lc|0)==95)){break}}Kc=Kc+1|0}if((Lc|0)==41){l=y;i=g;return+l}p=(c[m>>2]|0)==0;if(!p){c[e>>2]=(c[e>>2]|0)+ -1}if(u){c[(ic()|0)>>2]=22;up(b,0);l=0.0;i=g;return+l}if((Kc|0)==0|p){l=y;i=g;return+l}else{Mc=Kc}while(1){p=Mc+ -1|0;c[e>>2]=(c[e>>2]|0)+ -1;if((p|0)==0){l=y;break}else{Mc=p}}i=g;return+l}else{if((c[m>>2]|0)!=0){c[e>>2]=(c[e>>2]|0)+ -1}c[(ic()|0)>>2]=22;up(b,0);l=0.0;i=g;return+l}}}while(0);do{if((v|0)==23){b=(c[m>>2]|0)==0;if(!b){c[e>>2]=(c[e>>2]|0)+ -1}if(t>>>0<4|(f|0)==0|b){break}else{Nc=t}do{c[e>>2]=(c[e>>2]|0)+ -1;Nc=Nc+ -1|0;}while(Nc>>>0>3)}}while(0);l=+(r|0)*z;i=g;return+l}function tp(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;e=i;f=a+4|0;g=c[f>>2]|0;h=a+100|0;if(g>>>0<(c[h>>2]|0)>>>0){c[f>>2]=g+1;j=d[g]|0}else{j=vp(a)|0}do{if((j|0)==43|(j|0)==45){g=(j|0)==45|0;k=c[f>>2]|0;if(k>>>0<(c[h>>2]|0)>>>0){c[f>>2]=k+1;l=d[k]|0}else{l=vp(a)|0}if((l+ -48|0)>>>0<10|(b|0)==0){m=l;n=g;break}if((c[h>>2]|0)==0){m=l;n=g;break}c[f>>2]=(c[f>>2]|0)+ -1;m=l;n=g}else{m=j;n=0}}while(0);if((m+ -48|0)>>>0>9){if((c[h>>2]|0)==0){o=0;p=-2147483648;J=p;i=e;return o|0}c[f>>2]=(c[f>>2]|0)+ -1;o=0;p=-2147483648;J=p;i=e;return o|0}else{q=m;r=0}while(1){s=q+ -48+r|0;m=c[f>>2]|0;if(m>>>0<(c[h>>2]|0)>>>0){c[f>>2]=m+1;t=d[m]|0}else{t=vp(a)|0}if(!((t+ -48|0)>>>0<10&(s|0)<214748364)){break}q=t;r=s*10|0}r=((s|0)<0)<<31>>31;if((t+ -48|0)>>>0<10){q=s;m=r;j=t;while(1){l=Sp(q|0,m|0,10,0)|0;b=J;g=Jp(j|0,((j|0)<0)<<31>>31|0,-48,-1)|0;k=Jp(g|0,J|0,l|0,b|0)|0;b=J;l=c[f>>2]|0;if(l>>>0<(c[h>>2]|0)>>>0){c[f>>2]=l+1;u=d[l]|0}else{u=vp(a)|0}if((u+ -48|0)>>>0<10&((b|0)<21474836|(b|0)==21474836&k>>>0<2061584302)){j=u;m=b;q=k}else{v=k;w=b;x=u;break}}}else{v=s;w=r;x=t}if((x+ -48|0)>>>0<10){do{x=c[f>>2]|0;if(x>>>0<(c[h>>2]|0)>>>0){c[f>>2]=x+1;y=d[x]|0}else{y=vp(a)|0}}while((y+ -48|0)>>>0<10)}if((c[h>>2]|0)!=0){c[f>>2]=(c[f>>2]|0)+ -1}f=(n|0)!=0;n=Ip(0,0,v|0,w|0)|0;o=f?n:v;p=f?J:w;J=p;i=e;return o|0}function up(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;c[a+104>>2]=b;e=c[a+8>>2]|0;f=c[a+4>>2]|0;g=e-f|0;c[a+108>>2]=g;if((b|0)!=0&(g|0)>(b|0)){c[a+100>>2]=f+b;i=d;return}else{c[a+100>>2]=e;i=d;return}}function vp(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;f=b+104|0;g=c[f>>2]|0;if((g|0)==0){h=3}else{if((c[b+108>>2]|0)<(g|0)){h=3}}do{if((h|0)==3){g=zp(b)|0;if((g|0)<0){break}j=c[f>>2]|0;k=c[b+8>>2]|0;do{if((j|0)==0){h=8}else{l=c[b+4>>2]|0;m=j-(c[b+108>>2]|0)+ -1|0;if((k-l|0)<=(m|0)){h=8;break}c[b+100>>2]=l+m}}while(0);if((h|0)==8){c[b+100>>2]=k}j=c[b+4>>2]|0;if((k|0)!=0){m=b+108|0;c[m>>2]=k+1-j+(c[m>>2]|0)}m=j+ -1|0;if((d[m]|0|0)==(g|0)){n=g;i=e;return n|0}a[m]=g;n=g;i=e;return n|0}}while(0);c[b+100>>2]=0;n=-1;i=e;return n|0}function wp(a,b){a=+a;b=b|0;var d=0,e=0.0,f=0,g=0,j=0.0;d=i;do{if((b|0)>1023){e=a*8.98846567431158e+307;f=b+ -1023|0;if((f|0)<=1023){g=f;j=e;break}f=b+ -2046|0;g=(f|0)>1023?1023:f;j=e*8.98846567431158e+307}else{if(!((b|0)<-1022)){g=b;j=a;break}e=a*2.2250738585072014e-308;f=b+1022|0;if(!((f|0)<-1022)){g=f;j=e;break}f=b+2044|0;g=(f|0)<-1022?-1022:f;j=e*2.2250738585072014e-308}}while(0);b=Kp(g+1023|0,0,52)|0;g=J;c[k>>2]=b;c[k+4>>2]=g;a=j*+h[k>>3];i=d;return+a}function xp(a,b){a=+a;b=b|0;var c=0,d=0.0;c=i;d=+wp(a,b);i=c;return+d}function yp(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0;d=i;e=b+74|0;f=a[e]|0;a[e]=f+255|f;f=b+20|0;e=b+44|0;if((c[f>>2]|0)>>>0>(c[e>>2]|0)>>>0){nd[c[b+36>>2]&31](b,0,0)|0}c[b+16>>2]=0;c[b+28>>2]=0;c[f>>2]=0;f=b;g=c[f>>2]|0;if((g&20|0)==0){h=c[e>>2]|0;c[b+8>>2]=h;c[b+4>>2]=h;j=0;i=d;return j|0}if((g&4|0)==0){j=-1;i=d;return j|0}c[f>>2]=g|32;j=-1;i=d;return j|0}function zp(a){a=a|0;var b=0,e=0,f=0,g=0;b=i;i=i+8|0;e=b;if((c[a+8>>2]|0)==0){if((yp(a)|0)==0){f=3}else{g=-1}}else{f=3}do{if((f|0)==3){if((nd[c[a+32>>2]&31](a,e,1)|0)!=1){g=-1;break}g=d[e]|0}}while(0);i=b;return g|0}function Ap(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0.0,j=0,k=0;d=i;i=i+112|0;e=d;f=e+0|0;g=f+112|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));f=e+4|0;c[f>>2]=a;g=e+8|0;c[g>>2]=-1;c[e+44>>2]=a;c[e+76>>2]=-1;up(e,0);h=+sp(e,2,1);j=(c[f>>2]|0)-(c[g>>2]|0)+(c[e+108>>2]|0)|0;if((b|0)==0){i=d;return+h}if((j|0)==0){k=a}else{k=a+j|0}c[b>>2]=k;i=d;return+h}function Bp(){c[3594]=p;c[3620]=p;c[6358]=p;c[6588]=p}function Cp(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((e|0)>=4096)return ad(b|0,d|0,e|0)|0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function Dp(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if((c|0)<(b|0)&(b|0)<(c+d|0)){e=b;c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b]=a[c]|0}b=e}else{Cp(b,c,d)|0}return b|0}function Ep(b){b=b|0;var c=0;c=b;while(a[c]|0){c=c+1|0}return c-b|0}function Fp(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;g=b&3;h=d|d<<8|d<<16|d<<24;i=f&~3;if(g){g=b+4-g|0;while((b|0)<(g|0)){a[b]=d;b=b+1|0}}while((b|0)<(i|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}return b-e|0}function Gp(a){a=a|0;var b=0;b=(fa(c[a>>2]|0,31010991)|0)+1735287159&2147483647;c[a>>2]=b;return b|0}function Hp(){return Gp(o)|0}function Ip(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=b-d>>>0;e=b-d-(c>>>0>a>>>0|0)>>>0;return(J=e,a-c>>>0|0)|0}function Jp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a+c>>>0;return(J=b+d+(e>>>0<a>>>0|0)>>>0,e|0)|0}function Kp(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){J=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}J=a<<c-32;return 0}function Lp(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){J=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}J=0;return b>>>c-32|0}function Mp(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){J=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}J=(b|0)<0?-1:0;return b>>c-32|0}function Np(b){b=b|0;var c=0;c=a[n+(b>>>24)|0]|0;if((c|0)<8)return c|0;c=a[n+(b>>16&255)|0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>8&255)|0]|0;if((c|0)<8)return c+16|0;return(a[n+(b&255)|0]|0)+24|0}function Op(b){b=b|0;var c=0;c=a[m+(b&255)|0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)|0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)|0]|0;if((c|0)<8)return c+16|0;return(a[m+(b>>>24)|0]|0)+24|0}function Pp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=a&65535;d=b&65535;e=fa(d,c)|0;f=a>>>16;a=(e>>>16)+(fa(d,f)|0)|0;d=b>>>16;b=fa(d,c)|0;return(J=(a>>>16)+(fa(d,f)|0)+(((a&65535)+b|0)>>>16)|0,a+b<<16|e&65535|0)|0}function Qp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=b>>31|((b|0)<0?-1:0)<<1;f=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;g=d>>31|((d|0)<0?-1:0)<<1;h=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;i=Ip(e^a,f^b,e,f)|0;b=J;a=g^e;e=h^f;f=Ip((Vp(i,b,Ip(g^c,h^d,g,h)|0,J,0)|0)^a,J^e,a,e)|0;return(J=J,f)|0}function Rp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+8|0;g=f|0;h=b>>31|((b|0)<0?-1:0)<<1;j=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;k=e>>31|((e|0)<0?-1:0)<<1;l=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;m=Ip(h^a,j^b,h,j)|0;b=J;Vp(m,b,Ip(k^d,l^e,k,l)|0,J,g)|0;l=Ip(c[g>>2]^h,c[g+4>>2]^j,h,j)|0;j=J;i=f;return(J=j,l)|0}function Sp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;a=c;c=Pp(e,a)|0;f=J;return(J=(fa(b,a)|0)+(fa(d,e)|0)+f|f&0,c|0|0)|0}function Tp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=Vp(a,b,c,d,0)|0;return(J=J,e)|0}function Up(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+8|0;g=f|0;Vp(a,b,d,e,g)|0;i=f;return(J=c[g+4>>2]|0,c[g>>2]|0)|0}function Vp(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0;g=a;h=b;i=h;j=d;k=e;l=k;if((i|0)==0){m=(f|0)!=0;if((l|0)==0){if(m){c[f>>2]=(g>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(g>>>0)/(j>>>0)>>>0;return(J=n,o)|0}else{if(!m){n=0;o=0;return(J=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;o=0;return(J=n,o)|0}}m=(l|0)==0;do{if((j|0)==0){if(m){if((f|0)!=0){c[f>>2]=(i>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(i>>>0)/(j>>>0)>>>0;return(J=n,o)|0}if((g|0)==0){if((f|0)!=0){c[f>>2]=0;c[f+4>>2]=(i>>>0)%(l>>>0)}n=0;o=(i>>>0)/(l>>>0)>>>0;return(J=n,o)|0}p=l-1|0;if((p&l|0)==0){if((f|0)!=0){c[f>>2]=a|0;c[f+4>>2]=p&i|b&0}n=0;o=i>>>((Op(l|0)|0)>>>0);return(J=n,o)|0}p=(Np(l|0)|0)-(Np(i|0)|0)|0;if(p>>>0<=30){q=p+1|0;r=31-p|0;s=q;t=i<<r|g>>>(q>>>0);u=i>>>(q>>>0);v=0;w=g<<r;break}if((f|0)==0){n=0;o=0;return(J=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(J=n,o)|0}else{if(!m){r=(Np(l|0)|0)-(Np(i|0)|0)|0;if(r>>>0<=31){q=r+1|0;p=31-r|0;x=r-31>>31;s=q;t=g>>>(q>>>0)&x|i<<p;u=i>>>(q>>>0)&x;v=0;w=g<<p;break}if((f|0)==0){n=0;o=0;return(J=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(J=n,o)|0}p=j-1|0;if((p&j|0)!=0){x=(Np(j|0)|0)+33-(Np(i|0)|0)|0;q=64-x|0;r=32-x|0;y=r>>31;z=x-32|0;A=z>>31;s=x;t=r-1>>31&i>>>(z>>>0)|(i<<r|g>>>(x>>>0))&A;u=A&i>>>(x>>>0);v=g<<q&y;w=(i<<q|g>>>(z>>>0))&y|g<<r&x-33>>31;break}if((f|0)!=0){c[f>>2]=p&g;c[f+4>>2]=0}if((j|0)==1){n=h|b&0;o=a|0|0;return(J=n,o)|0}else{p=Op(j|0)|0;n=i>>>(p>>>0)|0;o=i<<32-p|g>>>(p>>>0)|0;return(J=n,o)|0}}}while(0);if((s|0)==0){B=w;C=v;D=u;E=t;F=0;G=0}else{g=d|0|0;d=k|e&0;e=Jp(g,d,-1,-1)|0;k=J;i=w;w=v;v=u;u=t;t=s;s=0;while(1){H=w>>>31|i<<1;I=s|w<<1;j=u<<1|i>>>31|0;a=u>>>31|v<<1|0;Ip(e,k,j,a)|0;b=J;h=b>>31|((b|0)<0?-1:0)<<1;K=h&1;L=Ip(j,a,h&g,(((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1)&d)|0;M=J;b=t-1|0;if((b|0)==0){break}else{i=H;w=I;v=M;u=L;t=b;s=K}}B=H;C=I;D=M;E=L;F=0;G=K}K=C;C=0;if((f|0)!=0){c[f>>2]=E;c[f+4>>2]=D}n=(K|0)>>>31|(B|C)<<1|(C<<1|K>>>31)&0|F;o=(K<<1|0>>>31)&-2|G;return(J=n,o)|0}function Wp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return nd[a&31](b|0,c|0,d|0)|0}function Xp(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;od[a&63](b|0,c|0,d|0,e|0,f|0,g|0,h|0)}function Yp(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;pd[a&3](b|0,c|0,d|0,e|0,f|0)}function Zp(a,b){a=a|0;b=b|0;qd[a&127](b|0)}function _p(a,b,c){a=a|0;b=b|0;c=c|0;rd[a&63](b|0,c|0)}function $p(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;sd[a&3](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0)}function aq(a,b){a=a|0;b=b|0;return td[a&63](b|0)|0}function bq(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=+h;ud[a&3](b|0,c|0,d|0,e|0,f|0,g|0,+h)}function cq(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;vd[a&3](b|0,c|0,d|0)}function dq(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;wd[a&7](b|0,c|0,d|0,e|0,f|0,+g)}function eq(a){a=a|0;xd[a&3]()}function fq(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;return yd[a&15](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)|0}function gq(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return zd[a&7](b|0,c|0,d|0,e|0)|0}function hq(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;Ad[a&7](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)}function iq(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;Bd[a&15](b|0,c|0,d|0,e|0,f|0,g|0)}function jq(a,b,c){a=a|0;b=b|0;c=c|0;return Cd[a&15](b|0,c|0)|0}function kq(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Dd[a&15](b|0,c|0,d|0,e|0,f|0)|0}function lq(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Ed[a&7](b|0,c|0,d|0,e|0)}function mq(a,b,c){a=a|0;b=b|0;c=c|0;ga(0);return 0}function nq(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;ga(1)}function oq(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ga(2)}function pq(a){a=a|0;ga(3)}function qq(a,b){a=a|0;b=b|0;ga(4)}function rq(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;ga(5)}function sq(a){a=a|0;ga(6);return 0}function tq(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;ga(7)}function uq(a,b,c){a=a|0;b=b|0;c=c|0;ga(8)}function vq(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=+f;ga(9)}function wq(){ga(10)}function xq(){bf()}function yq(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;ga(11);return 0}function zq(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ga(12);return 0}function Aq(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;ga(13)}function Bq(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;ga(14)}function Cq(a,b){a=a|0;b=b|0;ga(15);return 0}function Dq(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ga(16);return 0}function Eq(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ga(17)}




// EMSCRIPTEN_END_FUNCS
var nd=[mq,Fh,Kh,Wf,Oh,rh,wh,ig,Ah,Ig,Jg,ui,zi,bm,gm,Nm,Pm,Sm,ym,Dm,Fm,Im,Wo,ce,mq,mq,mq,mq,mq,mq,mq,mq];var od=[nq,Ci,Ei,Gi,Ii,Ki,Mi,Oi,Qi,Si,Ui,Wi,$i,bj,dj,fj,hj,jj,lj,nj,pj,rj,tj,Ij,Kj,Wj,Yj,fk,gk,hk,ik,jk,sk,tk,uk,vk,wk,Ul,_l,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq,nq];var pd=[oq,bp,ap,$o];var qd=[pq,Sf,Tf,Zf,_f,eg,fg,lg,mg,yg,xg,Dg,Cg,Fg,Og,Ng,ph,oh,Dh,Ch,Rh,Qh,Th,Sh,Wh,Vh,Yh,Xh,$h,_h,bi,ai,ei,di,gi,fi,mi,li,lh,ni,ki,oi,qi,pi,vm,wi,vi,Bi,Ai,_i,Zi,Cj,Bj,Rj,Qj,dk,ck,qk,pk,Ck,Bk,Fk,Ek,Jk,Ik,Uk,Tk,dl,cl,ol,nl,zl,yl,Jl,Il,Ql,Pl,Wl,Vl,am,$l,fm,em,om,nm,Lm,Km,jm,an,In,Hn,Kn,Jn,ri,um,xm,Um,jn,un,Fn,Gn,Oo,No,Qo,To,Ro,So,Uo,Vo,pp,op,af,Rf,wm,ro,Bl,gp,yo,xo,wo,vo,uo,to,Ug,dh,pq,pq,pq];var rd=[qq,Uf,$f,gg,ng,qh,Eh,Mk,Nk,Ok,Pk,Rk,Sk,Xk,Yk,Zk,_k,al,bl,gl,hl,il,jl,ll,ml,rl,sl,tl,ul,wl,xl,dm,im,Pn,Rn,Tn,Qn,Sn,Un,de,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq,qq];var sd=[rq,kk,xk,rq];var td=[sq,Vf,Jh,Lh,Mh,Ih,ag,bg,hg,vh,xh,yh,uh,og,pg,zg,Eg,ii,ek,Vn,Xn,Zn,eo,go,$n,bo,rk,Wn,Yn,_n,fo,ho,ao,co,Kk,Lk,Qk,Vk,Wk,$k,el,fl,kl,pl,ql,vl,en,fn,hn,Ln,Nn,Mn,On,Ym,Zm,$m,pn,qn,tn,An,Bn,En,Po,qp];var ud=[tq,Rl,Xl,tq];var vd=[uq,Hg,ji,uq];var wd=[vq,Lj,Oj,Zj,$j,vq,vq,vq];var xd=[wq,xq,Of,wq];var yd=[yq,bn,cn,Vm,Wm,kn,mn,vn,xn,yq,yq,yq,yq,yq,yq,yq];var zd=[zq,Rm,zm,Am,Bm,Hm,zq,zq];var Ad=[Aq,Dk,Gk,Al,El,Kl,Ml,Aq];var Bd=[Bq,Gh,sh,Dj,Ej,Jj,Pj,Sj,Tj,Xj,ak,cm,hm,ep,dp,cp];var Cd=[Cq,Nh,Xf,cg,Ph,zh,jg,qg,Bh,Mm,Om,Qm,Cm,Em,Gm,Cq];var Dd=[Dq,si,xi,Tm,dn,gn,Jm,Xm,_m,on,rn,zn,Cn,Dq,Dq,Dq];var Ed=[Eq,Hh,th,ti,yi,Xo,Yo,Zo];return{_strlen:Ep,_free:gp,_main:$e,_rand_r:Gp,_realloc:hp,_i64Add:Jp,_memmove:Dp,_memset:Fp,_malloc:fp,_memcpy:Cp,_rand:Hp,_i64Subtract:Ip,_bitshift64Shl:Kp,__GLOBAL__I_a:sg,runPostSets:Bp,stackAlloc:Fd,stackSave:Gd,stackRestore:Hd,setThrew:Id,setTempRet0:Ld,setTempRet1:Md,setTempRet2:Nd,setTempRet3:Od,setTempRet4:Pd,setTempRet5:Qd,setTempRet6:Rd,setTempRet7:Sd,setTempRet8:Td,setTempRet9:Ud,dynCall_iiii:Wp,dynCall_viiiiiii:Xp,dynCall_viiiii:Yp,dynCall_vi:Zp,dynCall_vii:_p,dynCall_viiiiiiiii:$p,dynCall_ii:aq,dynCall_viiiiiid:bq,dynCall_viii:cq,dynCall_viiiiid:dq,dynCall_v:eq,dynCall_iiiiiiiii:fq,dynCall_iiiii:gq,dynCall_viiiiiiii:hq,dynCall_viiiiii:iq,dynCall_iii:jq,dynCall_iiiiii:kq,dynCall_viiii:lq}})


// EMSCRIPTEN_END_ASM
({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "invoke_iiii": invoke_iiii, "invoke_viiiiiii": invoke_viiiiiii, "invoke_viiiii": invoke_viiiii, "invoke_vi": invoke_vi, "invoke_vii": invoke_vii, "invoke_viiiiiiiii": invoke_viiiiiiiii, "invoke_ii": invoke_ii, "invoke_viiiiiid": invoke_viiiiiid, "invoke_viii": invoke_viii, "invoke_viiiiid": invoke_viiiiid, "invoke_v": invoke_v, "invoke_iiiiiiiii": invoke_iiiiiiiii, "invoke_iiiii": invoke_iiiii, "invoke_viiiiiiii": invoke_viiiiiiii, "invoke_viiiiii": invoke_viiiiii, "invoke_iii": invoke_iii, "invoke_iiiiii": invoke_iiiiii, "invoke_viiii": invoke_viiii, "_glUseProgram": _glUseProgram, "_fabs": _fabs, "_sqrtf": _sqrtf, "_vsscanf": _vsscanf, "__ZSt9terminatev": __ZSt9terminatev, "_glUniformMatrix4fv": _glUniformMatrix4fv, "___cxa_guard_acquire": ___cxa_guard_acquire, "_SDL_CreateWindow": _SDL_CreateWindow, "_SDL_RWFromFile": _SDL_RWFromFile, "_glDeleteProgram": _glDeleteProgram, "_sscanf": _sscanf, "__ZSt18uncaught_exceptionv": __ZSt18uncaught_exceptionv, "___ctype_toupper_loc": ___ctype_toupper_loc, "_glBindBuffer": _glBindBuffer, "_glGetShaderInfoLog": _glGetShaderInfoLog, "__addDays": __addDays, "_glGetUniformLocation": _glGetUniformLocation, "_sbrk": _sbrk, "_glBlendFunc": _glBlendFunc, "_glGetAttribLocation": _glGetAttribLocation, "_glDisableVertexAttribArray": _glDisableVertexAttribArray, "___cxa_begin_catch": ___cxa_begin_catch, "_sinf": _sinf, "_sysconf": _sysconf, "_fileno": _fileno, "_fread": _fread, "_puts": _puts, "_SDL_GetWindowSize": _SDL_GetWindowSize, "_write": _write, "__isLeapYear": __isLeapYear, "_glGenBuffers": _glGenBuffers, "_glShaderSource": _glShaderSource, "__ZNSt9exceptionD2Ev": __ZNSt9exceptionD2Ev, "___cxa_does_inherit": ___cxa_does_inherit, "_strtoll_l": _strtoll_l, "_catclose": _catclose, "_llvm_lifetime_end": _llvm_lifetime_end, "_glEnableVertexAttribArray": _glEnableVertexAttribArray, "_glVertexAttribPointer": _glVertexAttribPointer, "__reallyNegative": __reallyNegative, "_send": _send, "_SDL_GL_SetAttribute": _SDL_GL_SetAttribute, "_glGetProgramInfoLog": _glGetProgramInfoLog, "___cxa_is_number_type": ___cxa_is_number_type, "_atan2f": _atan2f, "___cxa_find_matching_catch": ___cxa_find_matching_catch, "_isxdigit_l": _isxdigit_l, "_glDrawElements": _glDrawElements, "___cxa_guard_release": ___cxa_guard_release, "_SDL_ReadLE32": _SDL_ReadLE32, "_strerror_r": _strerror_r, "_glViewport": _glViewport, "_sin": _sin, "___setErrNo": ___setErrNo, "_llvm_pow_f32": _llvm_pow_f32, "_newlocale": _newlocale, "_isdigit_l": _isdigit_l, "___resumeException": ___resumeException, "_freelocale": _freelocale, "_glTexImage2D": _glTexImage2D, "_glEnable": _glEnable, "_glGenTextures": _glGenTextures, "_sprintf": _sprintf, "_vasprintf": _vasprintf, "_llvm_bswap_i32": _llvm_bswap_i32, "_glAttachShader": _glAttachShader, "_vsnprintf": _vsnprintf, "_glCreateProgram": _glCreateProgram, "_strtoull_l": _strtoull_l, "_read": _read, "_fwrite": _fwrite, "_time": _time, "_pthread_mutex_lock": _pthread_mutex_lock, "_catopen": _catopen, "_exit": _exit, "_llvm_pow_f64": _llvm_pow_f64, "___ctype_b_loc": ___ctype_b_loc, "_fmod": _fmod, "_llvm_lifetime_start": _llvm_lifetime_start, "_SDL_GL_CreateContext": _SDL_GL_CreateContext, "___cxa_allocate_exception": ___cxa_allocate_exception, "_strtoll": _strtoll, "_pwrite": _pwrite, "_glBindTexture": _glBindTexture, "_uselocale": _uselocale, "_SDL_Init": _SDL_Init, "_snprintf": _snprintf, "___errno_location": ___errno_location, "_SDL_Quit": _SDL_Quit, "_strtoull": _strtoull, "_strftime": _strftime, "_glCreateShader": _glCreateShader, "_isxdigit": _isxdigit, "_log": _log, "_glActiveTexture": _glActiveTexture, "_pthread_cond_broadcast": _pthread_cond_broadcast, "_recv": _recv, "_fgetc": _fgetc, "_glCompileShader": _glCompileShader, "__parseInt64": __parseInt64, "__getFloat": __getFloat, "_abort": _abort, "_glDeleteBuffers": _glDeleteBuffers, "_glBufferData": _glBufferData, "_isspace": _isspace, "_pthread_cond_wait": _pthread_cond_wait, "_glDeleteShader": _glDeleteShader, "_SDL_GetTicks": _SDL_GetTicks, "_cosf": _cosf, "_glGetProgramiv": _glGetProgramiv, "_SDL_CloseAudio": _SDL_CloseAudio, "_ungetc": _ungetc, "_Mix_PlayChannel": _Mix_PlayChannel, "_glLinkProgram": _glLinkProgram, "_strftime_l": _strftime_l, "_SDL_PauseAudio": _SDL_PauseAudio, "_SDL_PollEvent": _SDL_PollEvent, "_catgets": _catgets, "_glTexParameteri": _glTexParameteri, "_glClear": _glClear, "_asprintf": _asprintf, "_SDL_GL_SwapWindow": _SDL_GL_SwapWindow, "_Mix_LoadWAV_RW": _Mix_LoadWAV_RW, "__exit": __exit, "_Mix_OpenAudio": _Mix_OpenAudio, "__arraySum": __arraySum, "_glGetShaderiv": _glGetShaderiv, "___ctype_tolower_loc": ___ctype_tolower_loc, "_fputs": _fputs, "_pthread_mutex_unlock": _pthread_mutex_unlock, "_pread": _pread, "_mkport": _mkport, "_fflush": _fflush, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_emscripten_set_main_loop": _emscripten_set_main_loop, "__scanString": __scanString, "_glBufferSubData": _glBufferSubData, "_copysign": _copysign, "_fputc": _fputc, "___cxa_throw": ___cxa_throw, "_isdigit": _isdigit, "_strerror": _strerror, "__formatString": __formatString, "_atexit": _atexit, "_SDL_RWFromConstMem": _SDL_RWFromConstMem, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "ctlz_i8": ctlz_i8, "___rand_seed": ___rand_seed, "NaN": NaN, "Infinity": Infinity, "__ZTISt9exception": __ZTISt9exception, "___dso_handle": ___dso_handle, "_stderr": _stderr, "_stdin": _stdin, "_stdout": _stdout }, buffer);
var _strlen = Module["_strlen"] = asm["_strlen"];
var _free = Module["_free"] = asm["_free"];
var _main = Module["_main"] = asm["_main"];
var _rand_r = Module["_rand_r"] = asm["_rand_r"];
var _realloc = Module["_realloc"] = asm["_realloc"];
var _i64Add = Module["_i64Add"] = asm["_i64Add"];
var _memmove = Module["_memmove"] = asm["_memmove"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _rand = Module["_rand"] = asm["_rand"];
var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];
var __GLOBAL__I_a = Module["__GLOBAL__I_a"] = asm["__GLOBAL__I_a"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
var dynCall_viiiiiii = Module["dynCall_viiiiiii"] = asm["dynCall_viiiiiii"];
var dynCall_viiiii = Module["dynCall_viiiii"] = asm["dynCall_viiiii"];
var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = asm["dynCall_viiiiiiiii"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_viiiiiid = Module["dynCall_viiiiiid"] = asm["dynCall_viiiiiid"];
var dynCall_viii = Module["dynCall_viii"] = asm["dynCall_viii"];
var dynCall_viiiiid = Module["dynCall_viiiiid"] = asm["dynCall_viiiiid"];
var dynCall_v = Module["dynCall_v"] = asm["dynCall_v"];
var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = asm["dynCall_iiiiiiiii"];
var dynCall_iiiii = Module["dynCall_iiiii"] = asm["dynCall_iiiii"];
var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = asm["dynCall_viiiiiiii"];
var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm["dynCall_viiiiii"];
var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
var dynCall_iiiiii = Module["dynCall_iiiiii"] = asm["dynCall_iiiiii"];
var dynCall_viiii = Module["dynCall_viiii"] = asm["dynCall_viiii"];

Runtime.stackAlloc = function(size) { return asm['stackAlloc'](size) };
Runtime.stackSave = function() { return asm['stackSave']() };
Runtime.stackRestore = function(top) { asm['stackRestore'](top) };


// TODO: strip out parts of this we do not need

//======= begin closure i64 code =======

// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "long". This
 * implementation is derived from LongLib in GWT.
 *
 */

var i64Math = (function() { // Emscripten wrapper
  var goog = { math: {} };


  /**
   * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
   * values as *signed* integers.  See the from* functions below for more
   * convenient ways of constructing Longs.
   *
   * The internal representation of a long is the two given signed, 32-bit values.
   * We use 32-bit pieces because these are the size of integers on which
   * Javascript performs bit-operations.  For operations like addition and
   * multiplication, we split each number into 16-bit pieces, which can easily be
   * multiplied within Javascript's floating-point representation without overflow
   * or change in sign.
   *
   * In the algorithms below, we frequently reduce the negative case to the
   * positive case by negating the input(s) and then post-processing the result.
   * Note that we must ALWAYS check specially whether those values are MIN_VALUE
   * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
   * a positive number, it overflows back into a negative).  Not handling this
   * case would often result in infinite recursion.
   *
   * @param {number} low  The low (signed) 32 bits of the long.
   * @param {number} high  The high (signed) 32 bits of the long.
   * @constructor
   */
  goog.math.Long = function(low, high) {
    /**
     * @type {number}
     * @private
     */
    this.low_ = low | 0;  // force into 32 signed bits.

    /**
     * @type {number}
     * @private
     */
    this.high_ = high | 0;  // force into 32 signed bits.
  };


  // NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
  // from* methods on which they depend.


  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @private
   */
  goog.math.Long.IntCache_ = {};


  /**
   * Returns a Long representing the given (32-bit) integer value.
   * @param {number} value The 32-bit integer in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
      var cachedObj = goog.math.Long.IntCache_[value];
      if (cachedObj) {
        return cachedObj;
      }
    }

    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
      goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
  };


  /**
   * Returns a Long representing the given value, provided that it is a finite
   * number.  Otherwise, zero is returned.
   * @param {number} value The number in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
      return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
      return goog.math.Long.fromNumber(-value).negate();
    } else {
      return new goog.math.Long(
          (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
          (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
    }
  };


  /**
   * Returns a Long representing the 64-bit integer that comes by concatenating
   * the given high and low bits.  Each is assumed to use 32 bits.
   * @param {number} lowBits The low 32-bits.
   * @param {number} highBits The high 32-bits.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
  };


  /**
   * Returns a Long representation of the given string, written using the given
   * radix.
   * @param {string} str The textual representation of the Long.
   * @param {number=} opt_radix The radix in which the text is written.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
      throw Error('number format error: empty string');
    }

    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (str.charAt(0) == '-') {
      return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf('-') >= 0) {
      throw Error('number format error: interior "-" character: ' + str);
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));

    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i);
      var value = parseInt(str.substring(i, i + size), radix);
      if (size < 8) {
        var power = goog.math.Long.fromNumber(Math.pow(radix, size));
        result = result.multiply(power).add(goog.math.Long.fromNumber(value));
      } else {
        result = result.multiply(radixToPower);
        result = result.add(goog.math.Long.fromNumber(value));
      }
    }
    return result;
  };


  // NOTE: the compiler should inline these constant values below and then remove
  // these variables, so there should be no runtime penalty for these.


  /**
   * Number used repeated below in calculations.  This must appear before the
   * first call to any from* function below.
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_32_DBL_ =
      goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_31_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ / 2;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_48_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_64_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_63_DBL_ =
      goog.math.Long.TWO_PWR_64_DBL_ / 2;


  /** @type {!goog.math.Long} */
  goog.math.Long.ZERO = goog.math.Long.fromInt(0);


  /** @type {!goog.math.Long} */
  goog.math.Long.ONE = goog.math.Long.fromInt(1);


  /** @type {!goog.math.Long} */
  goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);


  /** @type {!goog.math.Long} */
  goog.math.Long.MAX_VALUE =
      goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);


  /** @type {!goog.math.Long} */
  goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);


  /**
   * @type {!goog.math.Long}
   * @private
   */
  goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);


  /** @return {number} The value, assuming it is a 32-bit integer. */
  goog.math.Long.prototype.toInt = function() {
    return this.low_;
  };


  /** @return {number} The closest floating-point representation to this value. */
  goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
           this.getLowBitsUnsigned();
  };


  /**
   * @param {number=} opt_radix The radix in which the text should be written.
   * @return {string} The textual representation of this value.
   */
  goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (this.isZero()) {
      return '0';
    }

    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = goog.math.Long.fromNumber(radix);
        var div = this.div(radixLong);
        var rem = div.multiply(radixLong).subtract(this);
        return div.toString(radix) + rem.toInt().toString(radix);
      } else {
        return '-' + this.negate().toString(radix);
      }
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));

    var rem = this;
    var result = '';
    while (true) {
      var remDiv = rem.div(radixToPower);
      var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
      var digits = intval.toString(radix);

      rem = remDiv;
      if (rem.isZero()) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = '' + digits + result;
      }
    }
  };


  /** @return {number} The high 32-bits as a signed value. */
  goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
  };


  /** @return {number} The low 32-bits as a signed value. */
  goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
  };


  /** @return {number} The low 32-bits as an unsigned value. */
  goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return (this.low_ >= 0) ?
        this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  };


  /**
   * @return {number} Returns the number of bits needed to represent the absolute
   *     value of this Long.
   */
  goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        return 64;
      } else {
        return this.negate().getNumBitsAbs();
      }
    } else {
      var val = this.high_ != 0 ? this.high_ : this.low_;
      for (var bit = 31; bit > 0; bit--) {
        if ((val & (1 << bit)) != 0) {
          break;
        }
      }
      return this.high_ != 0 ? bit + 33 : bit + 1;
    }
  };


  /** @return {boolean} Whether this value is zero. */
  goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
  };


  /** @return {boolean} Whether this value is negative. */
  goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
  };


  /** @return {boolean} Whether this value is odd. */
  goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long equals the other.
   */
  goog.math.Long.prototype.equals = function(other) {
    return (this.high_ == other.high_) && (this.low_ == other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long does not equal the other.
   */
  goog.math.Long.prototype.notEquals = function(other) {
    return (this.high_ != other.high_) || (this.low_ != other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than the other.
   */
  goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than or equal to the other.
   */
  goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than the other.
   */
  goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than or equal to the other.
   */
  goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
  };


  /**
   * Compares this Long with the given one.
   * @param {goog.math.Long} other Long to compare against.
   * @return {number} 0 if they are the same, 1 if the this is greater, and -1
   *     if the given one is greater.
   */
  goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
      return 0;
    }

    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
      return -1;
    }
    if (!thisNeg && otherNeg) {
      return 1;
    }

    // at this point, the signs are the same, so subtraction will not overflow
    if (this.subtract(other).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  };


  /** @return {!goog.math.Long} The negation of this value. */
  goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.MIN_VALUE;
    } else {
      return this.not().add(goog.math.Long.ONE);
    }
  };


  /**
   * Returns the sum of this and the given Long.
   * @param {goog.math.Long} other Long to add to this one.
   * @return {!goog.math.Long} The sum of this and the given Long.
   */
  goog.math.Long.prototype.add = function(other) {
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns the difference of this and the given Long.
   * @param {goog.math.Long} other Long to subtract from this.
   * @return {!goog.math.Long} The difference of this and the given Long.
   */
  goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
  };


  /**
   * Returns the product of this and the given long.
   * @param {goog.math.Long} other Long to multiply with this.
   * @return {!goog.math.Long} The product of this and the other.
   */
  goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
      return goog.math.Long.ZERO;
    } else if (other.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().multiply(other.negate());
      } else {
        return this.negate().multiply(other).negate();
      }
    } else if (other.isNegative()) {
      return this.multiply(other.negate()).negate();
    }

    // If both longs are small, use float multiplication
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
        other.lessThan(goog.math.Long.TWO_PWR_24_)) {
      return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns this Long divided by the given one.
   * @param {goog.math.Long} other Long by which to divide.
   * @return {!goog.math.Long} This Long divided by the given one.
   */
  goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
      throw Error('division by zero');
    } else if (this.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (other.equals(goog.math.Long.ONE) ||
          other.equals(goog.math.Long.NEG_ONE)) {
        return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
      } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ONE;
      } else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shiftRight(1);
        var approx = halfThis.div(other).shiftLeft(1);
        if (approx.equals(goog.math.Long.ZERO)) {
          return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        } else {
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
      }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().div(other.negate());
      } else {
        return this.negate().div(other).negate();
      }
    } else if (other.isNegative()) {
      return this.div(other.negate()).negate();
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

      // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.
      var log2 = Math.ceil(Math.log(approx) / Math.LN2);
      var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);

      // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      var approxRes = goog.math.Long.fromNumber(approx);
      var approxRem = approxRes.multiply(other);
      while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
        approx -= delta;
        approxRes = goog.math.Long.fromNumber(approx);
        approxRem = approxRes.multiply(other);
      }

      // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.
      if (approxRes.isZero()) {
        approxRes = goog.math.Long.ONE;
      }

      res = res.add(approxRes);
      rem = rem.subtract(approxRem);
    }
    return res;
  };


  /**
   * Returns this Long modulo the given one.
   * @param {goog.math.Long} other Long by which to mod.
   * @return {!goog.math.Long} This Long modulo the given one.
   */
  goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
  };


  /** @return {!goog.math.Long} The bitwise-NOT of this value. */
  goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  };


  /**
   * Returns the bitwise-AND of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to AND.
   * @return {!goog.math.Long} The bitwise-AND of this and the other.
   */
  goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_,
                                   this.high_ & other.high_);
  };


  /**
   * Returns the bitwise-OR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to OR.
   * @return {!goog.math.Long} The bitwise-OR of this and the other.
   */
  goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_,
                                   this.high_ | other.high_);
  };


  /**
   * Returns the bitwise-XOR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to XOR.
   * @return {!goog.math.Long} The bitwise-XOR of this and the other.
   */
  goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_,
                                   this.high_ ^ other.high_);
  };


  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the left by the given amount.
   */
  goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var low = this.low_;
      if (numBits < 32) {
        var high = this.high_;
        return goog.math.Long.fromBits(
            low << numBits,
            (high << numBits) | (low >>> (32 - numBits)));
      } else {
        return goog.math.Long.fromBits(0, low << (numBits - 32));
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount.
   */
  goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >> numBits);
      } else {
        return goog.math.Long.fromBits(
            high >> (numBits - 32),
            high >= 0 ? 0 : -1);
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount, with
   * the new top bits matching the current sign bit.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount, with
   *     zeros placed into the new leading bits.
   */
  goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >>> numBits);
      } else if (numBits == 32) {
        return goog.math.Long.fromBits(high, 0);
      } else {
        return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
      }
    }
  };

  //======= begin jsbn =======

  var navigator = { appName: 'Modern Browser' }; // polyfill a little

  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // http://www-cs-students.stanford.edu/~tjw/jsbn/

  /*
   * Copyright (c) 2003-2005  Tom Wu
   * All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
   * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
   * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
   *
   * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
   * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
   * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
   * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
   * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * In addition, the following condition applies:
   *
   * All redistributions must retain an intact copy of this copyright notice
   * and disclaimer.
   */

  // Basic JavaScript BN library - subset useful for RSA encryption.

  // Bits per digit
  var dbits;

  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);

  // (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }

  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }

  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.

  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);

  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;

  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }

  // (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }

  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+DV;
    else this.t = 0;
  }

  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

  // (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }

  // (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }

  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

  // (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }

  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }

  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }

  // (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }

  // (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }

  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }

  // (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }

  // (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }

  // (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }

  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }

  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }

  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }

  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }

  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;

  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }

  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }

  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }

  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }

  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }

  // r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  // r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;

  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }

  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }

  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;

  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;

  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  // jsbn2 stuff

  // (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }

  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }

  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }

  // (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }

  // (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }

  // (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }

  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.addTo = bnpAddTo;

  //======= end jsbn =======

  // Emscripten wrapper
  var Wrapper = {
    abs: function(l, h) {
      var x = new goog.math.Long(l, h);
      var ret;
      if (x.isNegative()) {
        ret = x.negate();
      } else {
        ret = x;
      }
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
    },
    ensureTemps: function() {
      if (Wrapper.ensuredTemps) return;
      Wrapper.ensuredTemps = true;
      Wrapper.two32 = new BigInteger();
      Wrapper.two32.fromString('4294967296', 10);
      Wrapper.two64 = new BigInteger();
      Wrapper.two64.fromString('18446744073709551616', 10);
      Wrapper.temp1 = new BigInteger();
      Wrapper.temp2 = new BigInteger();
    },
    lh2bignum: function(l, h) {
      var a = new BigInteger();
      a.fromString(h.toString(), 10);
      var b = new BigInteger();
      a.multiplyTo(Wrapper.two32, b);
      var c = new BigInteger();
      c.fromString(l.toString(), 10);
      var d = new BigInteger();
      c.addTo(b, d);
      return d;
    },
    stringify: function(l, h, unsigned) {
      var ret = new goog.math.Long(l, h).toString();
      if (unsigned && ret[0] == '-') {
        // unsign slowly using jsbn bignums
        Wrapper.ensureTemps();
        var bignum = new BigInteger();
        bignum.fromString(ret, 10);
        ret = new BigInteger();
        Wrapper.two64.addTo(bignum, ret);
        ret = ret.toString(10);
      }
      return ret;
    },
    fromString: function(str, base, min, max, unsigned) {
      Wrapper.ensureTemps();
      var bignum = new BigInteger();
      bignum.fromString(str, base);
      var bigmin = new BigInteger();
      bigmin.fromString(min, 10);
      var bigmax = new BigInteger();
      bigmax.fromString(max, 10);
      if (unsigned && bignum.compareTo(BigInteger.ZERO) < 0) {
        var temp = new BigInteger();
        bignum.addTo(Wrapper.two64, temp);
        bignum = temp;
      }
      var error = false;
      if (bignum.compareTo(bigmin) < 0) {
        bignum = bigmin;
        error = true;
      } else if (bignum.compareTo(bigmax) > 0) {
        bignum = bigmax;
        error = true;
      }
      var ret = goog.math.Long.fromString(bignum.toString()); // min-max checks should have clamped this to a range goog.math.Long can handle well
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
      if (error) throw 'range error';
    }
  };
  return Wrapper;
})();

//======= end closure i64 code =======



// === Auto-generated postamble setup entry stuff ===

if (memoryInitializer) {
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    var data = Module['readBinary'](memoryInitializer);
    HEAPU8.set(data, STATIC_BASE);
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      HEAPU8.set(data, STATIC_BASE);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}

function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
    Module.printErr('preload time: ' + (Date.now() - preloadStartTime) + ' ms');
  }

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);

  initialStackTop = STACKTOP;

  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    if (!Module['noExitRuntime']) {
      exit(ret);
    }
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}




function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    ensureInitRuntime();

    preMain();

    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      if (!ABORT) doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;

function exit(status) {
  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;

  // exit the runtime
  exitRuntime();

  // TODO We should handle this differently based on environment.
  // In the browser, the best we can do is throw an exception
  // to halt execution, but in node we could process.exit and
  // I'd imagine SM shell would have something equivalent.
  // This would let us set a proper exit status (which
  // would be great for checking test exit statuses).
  // https://github.com/kripken/emscripten/issues/1371

  // throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;

function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }

  ABORT = true;
  EXITSTATUS = 1;

  var extra = '\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.';

  throw 'abort() at ' + stackTrace() + extra;
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}


run();

// {{POST_RUN_ADDITIONS}}






// {{MODULE_ADDITIONS}}






