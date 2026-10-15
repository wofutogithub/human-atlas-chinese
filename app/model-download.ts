/** 将模型目录中的路径解析为兼容 GitHub Pages 子路径的资源地址。 */
export function resolveModelAssetUrl(url:string):string{
 if(/^https?:\/\//i.test(url))return url;
 return `${import.meta.env.BASE_URL}${url.replace(/^\/+/,'')}`;
}

/** 静态托管服务可能将 .gz 作为压缩响应或 gzip 文件提供。
 * fetch API 已经会解码 Content-Encoding，因此先检查载荷，避免重复解码。
 */
export async function decodeModelResponse(response:Response,expectedBytes:number,compressed:boolean):Promise<ArrayBuffer>{
 if(!response.ok)throw new Error('无法加载解剖模型文件。');
 const payload=await response.arrayBuffer(),signature=new Uint8Array(payload,0,Math.min(2,payload.byteLength));
 const gzip=compressed&&signature[0]===0x1f&&signature[1]===0x8b;
 const buffer=gzip?await new Response(new Blob([payload]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer():payload;
 if(buffer.byteLength!==expectedBytes)throw new Error('解剖模型文件不完整。请重新加载查看器。');
 return buffer;
}
