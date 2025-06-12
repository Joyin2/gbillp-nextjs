"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var path_1 = require("path");
var fs_1 = require("fs");
var path_2 = require("path");
var supabase_js_1 = require("@supabase/supabase-js");
var dotenv_1 = require("dotenv");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = (0, path_1.dirname)(__filename);
dotenv_1.default.config({ path: '.env.local' });
var supabase = (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
var IMAGES_DIR = path_2.default.join(process.cwd(), 'src', 'images');
function uploadDirectory(dirPath, bucket) {
    return __awaiter(this, void 0, void 0, function () {
        var files, _i, files_1, file, filePath, stat, relativePath, fileContent, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = fs_1.default.readdirSync(dirPath);
                    _i = 0, files_1 = files;
                    _a.label = 1;
                case 1:
                    if (!(_i < files_1.length)) return [3 /*break*/, 6];
                    file = files_1[_i];
                    filePath = path_2.default.join(dirPath, file);
                    stat = fs_1.default.statSync(filePath);
                    if (!stat.isDirectory()) return [3 /*break*/, 3];
                    // Recursively upload files in subdirectories
                    return [4 /*yield*/, uploadDirectory(filePath, bucket)];
                case 2:
                    // Recursively upload files in subdirectories
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!(stat.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(file))) return [3 /*break*/, 5];
                    relativePath = path_2.default.relative(IMAGES_DIR, filePath);
                    fileContent = fs_1.default.readFileSync(filePath);
                    console.log("Uploading ".concat(relativePath, " to ").concat(bucket, "..."));
                    return [4 /*yield*/, supabase.storage
                            .from(bucket)
                            .upload(relativePath, fileContent, {
                            contentType: "image/".concat(path_2.default.extname(file).slice(1)),
                            upsert: true
                        })];
                case 4:
                    error = (_a.sent()).error;
                    if (error) {
                        console.error("Error uploading ".concat(relativePath, ":"), error);
                    }
                    else {
                        console.log("Successfully uploaded ".concat(relativePath));
                    }
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var buckets, _i, buckets_1, bucket, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buckets = ['products', 'team', 'about', 'logos'];
                    _i = 0, buckets_1 = buckets;
                    _a.label = 1;
                case 1:
                    if (!(_i < buckets_1.length)) return [3 /*break*/, 4];
                    bucket = buckets_1[_i];
                    return [4 /*yield*/, supabase.storage.createBucket(bucket, {
                            public: true,
                            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
                            fileSizeLimit: 5242880 // 5MB
                        })];
                case 2:
                    error = (_a.sent()).error;
                    if (error && error.message !== 'Bucket already exists') {
                        console.error("Error creating bucket ".concat(bucket, ":"), error);
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: 
                // Upload images from each directory
                return [4 /*yield*/, uploadDirectory(path_2.default.join(IMAGES_DIR, 'products'), 'products')];
                case 5:
                    // Upload images from each directory
                    _a.sent();
                    return [4 /*yield*/, uploadDirectory(path_2.default.join(IMAGES_DIR, 'team member'), 'team')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, uploadDirectory(path_2.default.join(IMAGES_DIR, 'about'), 'about')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, uploadDirectory(path_2.default.join(IMAGES_DIR, 'authorised'), 'logos')];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
