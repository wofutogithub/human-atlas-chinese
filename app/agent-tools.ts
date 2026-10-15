import {SEARCH_ALIASES,type Atlas,type Concept} from './anatomy';
type Tool={name:string;description:string;inputSchema:object;annotations:{readOnlyHint:boolean};execute:(input:unknown)=>unknown};
function record(input:unknown):Record<string,unknown>{if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('输入必须是对象。');return input as Record<string,unknown>;}
export function atlasTools(atlas:Atlas,inspect:(concept:Concept)=>void):Tool[]{return [
 {name:'find_anatomy',description:'按名称或源图谱标识符，在当前图谱中查找解剖结构。',inputSchema:{type:'object',properties:{query:{type:'string',minLength:1}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:true},execute(input){const data=record(input);if(typeof data.query!=='string'||!data.query.trim())throw new Error('请输入非空的搜索内容。');const raw=data.query.toLowerCase().trim(),q=SEARCH_ALIASES[raw]??raw;return atlas.concepts.filter(c=>c.name.toLowerCase().includes(q)||c.id.toLowerCase().includes(raw)).slice(0,30).map(c=>({id:c.id,name:c.name,pieces:c.elements.length}));}},
 {name:'inspect_anatomical_structure',description:'在三维人体解剖模型中选中一个图谱概念，并打开其详情面板。',inputSchema:{type:'object',properties:{id:{type:'string'}},required:['id'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){const data=record(input);if(typeof data.id!=='string')throw new Error('请输入图谱标识符。');const concept=atlas.concepts.find(c=>c.id===data.id);if(!concept)throw new Error('当前图谱中不存在该解剖结构。');inspect(concept);return {id:concept.id,name:concept.name,selectedPieces:concept.elements.length};}}
 ];}
export function registerAtlasTools(atlas:Atlas,inspect:(concept:Concept)=>void){
 const context=(document as Document&{modelContext?:{registerTool:(tool:Tool,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
 if(!context?.registerTool)return;const lifecycle=new AbortController();
 for(const tool of atlasTools(atlas,inspect)){try{void Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{/* 可选的浏览器能力；可见界面仍可正常使用。 */}}
 return()=>lifecycle.abort();
}
