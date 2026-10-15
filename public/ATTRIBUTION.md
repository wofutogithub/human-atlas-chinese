# 解剖数据归属与致谢

BodyParts3D，© The Database Center for Life Science，依据 CC Attribution 4.0 International 许可发布。

- 许可证：https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html（更新于 2025-02-27）
- 数据集：https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- 许可证条款：https://creativecommons.org/licenses/by/4.0/
- 源几何数据：`isa_BP3D_4.0_obj_99.zip`，BodyParts3D 4.0。
- 英文名称与关系：来自同一存档中的 IS-A 与 PART-OF 概念表、元素表和包含关系表。
- 论文：Mitsuhashi 等（2009），BodyParts3D：面向解剖学概念的三维结构数据库。https://doi.org/10.1093/nar/gkn613

适配处理：将坐标轴和单位从毫米/Z-up 转换为米/Y-up；将模型平移至展台静置；使用 meshoptimizer 简化几何体，每个结构的相对误差上限为 0.2%；将法线量化为有符号 16 位整数；打包为二进制分块；并为本界面整理显示系统分组和配色。源数据包含 2,234 个独立 OBJ 网格，全部保留并得到呈现。合并后的层级结构包含 3,432 个带名称的 FMA 概念，这些概念可能对应多个网格。清单文件保留了源数据身份信息。

源 OBJ 注释提到较早的 CC BY-SA 2.1 Japan 许可证。上方链接所指向的官方现行数据库许可证取代了该历史文本，并明确允许依据 CC BY 4.0 进行再发布和改编。

BodyParts3D 以 TARO MRI 和解剖学插图修订为基础，呈现成年男性参考解剖结构。它并不涵盖所有可能的人体解剖结构或个体差异。本界面仅供教育用途，不是临床工具。

## 历史资源（当前版本未包含）

仓库的早期版本曾包含女性参考解剖数据：Kristen Browne 和 Heidi Schlehlein，Human Reference Atlas / HuBMAP，*3D Reference Organ Set for Female v1.5*（2023）。CC BY 4.0。几何数据已针对本查看器进行适配。

- 源 DOI：https://doi.org/10.48539/HBM352.BTSQ.586
- 数据集：https://lod.humanatlas.io/ref-organ/united-female/v1.5
- 原始 GLB：https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.5/assets/3d-vh-f-united.glb
- 许可证：https://creativecommons.org/licenses/by/4.0/

适配处理：将原生米/Y-up 坐标映射到展台；焊接重合顶点并对源法线取平均；按每个结构 0.2% 的相对误差上限简化几何体；并量化法线。本界面的配色和显示系统经过整理。全部 888 个源网格均得到呈现，1,073 个源节点可作为单独概念或复合概念进行选择。

这是一个包含全身表面和部分器官（包括女性生殖系统）的参考组合模型。其骨骼与肌肉覆盖并不完整，不代表每个人体结构，也不是某一位个体的扫描结果。其中 8 个胎盘/脐带结构归入“妊娠参考”系统，默认隐藏。
