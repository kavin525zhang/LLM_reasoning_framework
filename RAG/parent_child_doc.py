__import__('pysqlite3')
import sys

sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')

from langchain_classic.retrievers import ParentDocumentRetriever  # retrievers 在langchainv1.0以后就移出了
from langchain_classic.storage import InMemoryStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
# from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction

from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document

# 1. 定义分割器：父块大，子块小
parent_splitter = RecursiveCharacterTextSplitter(chunk_size=2000)
child_splitter = RecursiveCharacterTextSplitter(chunk_size=400)

embeddings = OpenAIEmbeddings(
    openai_api_key="EMPTY",
    openai_api_base="http://172.18.140.12:9528/v1",
    model="bge-m3"
)

# 2. 初始化存储
vectorstore = Chroma(
    collection_name="parent_demo", 
    embedding_function=embeddings
    # persist_directory="./chroma_db"  # 指定本地存储路径
)
store = InMemoryStore()  # LocalFileStore  Redis  MongoDB

# 3. 创建检索器
retriever = ParentDocumentRetriever(
    vectorstore=vectorstore,
    docstore=store,
    child_splitter=child_splitter,
    parent_splitter=parent_splitter,
)

# 4. 添加文档并检索
docs = ['''全市公路交通安全“春季守护行动”方案
为全面贯彻党的二十大精神，深入推进事故预防“减量控大”工作和全市公安机关“雷火 2023”专项行动，
主动应对春季交通安全风险，全力维护交通安全形势持续平稳，按照上级部署要求，市局决定自 3 月 1 日
起至 5 月 31 日，在全市开展公路交通安全“春季守护行动”（以下简称“春季守护行动”）。特制定方
案如下：
一、行动目标
研判分析春季交通安全特点，聚焦公路客货运输突出风险和农村地区管理薄弱环节，线上与线下相结合，
路面与源头齐发力，从严查处一批易肇事易肇祸交通违法，有效治理一批人、车、路、企突出隐患，全
力稳定交通安全形势。力争通过“春季守护行动”，实现“一个下降、两个不发生”的工作目标，即道
路交通事故死亡人数同比下降，不发生较大及以上事故，不发生因执勤执法不当引发的负面舆情。
二、组织领导
市公安局成立局党委委员、交警大队长皮敬锋任组长，交警大队党总支书记欧文杰任副组长，各农村派
出所负责人及大队班子为成员的全市“春季守护行动”领导小组，办公室设在大队秩序科，副大队长余
晓峰兼任办公室主任，具体负责统筹、协调、推进、督办等相关工作。
三、整治重点
（一）重点时段：全国两会期间，全市实行一级加强勤务；按大队统一部署，开展隐患突出重点车辆精
准查缉集中统一行动；每月“逢五”“逢十”、清明、五一假期开展全市集中统一行动。
（二）重点区域：普通国省道、城市、农村地区事故易发、违法多发、隐患突出点段。
（三）重点车辆：公路客运、旅游客运、“营转非”大客车、校车、危险化学品运输车、“绿通车”、
渣土运输车、重型货车、 6 座以上小客车（面包车、商务车）。
（四）重点违法：“三超一疲劳”、农村“两违”、酒驾醉驾、无证驾驶、假牌假证、非法营运、不按
规定使用安全带、骑乘摩托车不戴安全头盔、违规运输危险化学品等易肇事肇祸的违法行为。
四、主要措施
（一）精准分析研判风险变化。今年以来，全市虽未发生一次死亡 2 人以上事故，但事故亡人数同比上
升。主要呈现夜间重点时段事故集中、不避让行人、不按规定让行、无证驾驶、超速行驶等交通违法肇
事突出、客货交织混行事故多发三个特点。随着国家稳经济一揽子政策持续出台，各地迅速掀起抢开工、
抓建设、促消费高潮，复工复产加快推进，春耕备耕陆续展开，旅游市场加速回暖，线下教学全面恢复，
公路客货运输进入繁忙期，务农务工出行、学生上下学出行、旅游踏青出行增多，各类易肇事肇祸违法
行为持续呈现高发态势，道路交通安全面临多重考验。主要存在四大风险：一是大流量应对风险。疫情
转段后，群众踏青游、周末自驾游增多，清明、五一假期扫墓、旅游、探亲流叠加，极可能出现疫情以
来最高峰值，交通拥堵、事故风险随之上升。二是险路险段安全风险。今年公路基建规模空前、投资力
度空前，交通运输部门要求抢抓一季度有效施工期，各地新改扩建道路工程和公路养护项目迎来高峰，
施工路段安全隐患突出。三是货车肇事肇祸风险。近期 , 国省道货车流量大幅上升，事故风险提升。四是
农村地区管理薄弱风险。近年来，农村地区春季事故呈总体上升态势，各单位要结合本地出行规律、事
故特征、违法特点、天气状况，深入研判面临的交通安全风险隐患和执勤执法工作中的短板不足，针对
性部署开展工作。
（二）深入开展风险隐患治理。对近 3 年春季发生的亡人事故和涉及“两客一危”典型事故逐一复盘，
深入分析事前事中事后全过程、各环节存在的工作漏洞和管理盲区，按照“发生一起事故，歼灭一类
（批）隐患，完善一类（批）制度”要求，针对性强化源头治理和风险防控措施，严防类似事故重复发
生。要结合公路安全设施和交通秩序管理精细化提升行动，扎实开展普通公路安全隐患突出点段治理项
目，深入排查发生迎面相撞事故以及急弯陡坡、临水临崖等道路隐患点段，系统增设和完善标志标线、
警示提示和安全防护设施；总结推广 G240 交通安全示范带经验，推动其它国省道示范公路建设。要针
对本地重点公路项目复工开工，抢抓有效施工期实际，严格施工路段隐患排查和监督管理，督促相关部
门和施工企业落实施工路段交通组织和安全警示防护措施。要针对春季踏青旅游增多特点，联合交通运
输、文化旅游等部门完善景点周边道路安防设施，打通干线支线“微循环”，增设停车场地，防止节假
日拥堵。要深入开展恶劣天气高影响路段优化提升重点攻坚项目，加大团雾多发、降雨积水等路段监测
预警力度，科学规范、动态调整限速，采取警车引导、间断放行等措施，确保车辆低速缓行、安全通过。
要切实进一步加强学校周边道路和校车、接送学生车辆安全管理，扎实做好上下学时段“五位一体”护
学岗工作，严禁学生乘坐超员、非法营运车辆以及轻型货车、拖拉机、三轮车等非载客车辆上下学。要
会同卫健、应急管理等部门做好道路交通事故救援处置，最大限度降低事故致死致残率。
''']
retriever.add_documents([Document(page_content=content) for content in docs])
results = retriever.invoke("整治重点是什么？")

if results:
    print(results[0].page_content)
    child_ids = results[0].metadata.get('child_ids', []) # 这个返回是空， 父文档和子文档是单向联系，如果想实现这个功能，得手动绑定
    print("包含的子文档 IDs:", child_ids)
    # retriever.docstore.mget(child_ids)
