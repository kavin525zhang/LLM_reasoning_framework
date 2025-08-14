# PIKE-RAG: Responsible AI FAQ

## What is PIKE-RAG?

PIKE-RAG, or sPecIalized KnowledgE and Rationale Augmentation Generation, represents an advanced evolution in AI-assisted content interpretation, tailored for industrial applications requiring specialized knowledge and domain-specific rationale. Unlike conventional Retrieval-Augmented Generation (RAG) systems which primarily rely on retrieval to inform large language models (LLMs), PIKE-RAG introduces a methodology that integrates domain-specific knowledge extraction with the generation of a coherent rationale. This technique enables the LLMs to progressively navigate towards more accurate and contextually relevant responses. By parsing data to create detailed knowledge structures akin to a heterogeneous knowledge graph, and guiding LLMs to construct coherent rationale in a knowledge-aware manner, PIKE-RAG surpasses traditional models by extracting, understanding, linking and applying specialized knowledge that is not readily accessible through standard retrieval processes.

## What can PIKE-RAG do?

The strength of PIKE-RAG lies in its sophisticated ability to link disparate pieces of information across extensive data sets, thereby facilitating the answering of complex queries that are beyond the reach of typical keyword and vector-based search methods. By constructing a heterogeneous knowledge graph from a user-provided domain-specific dataset, PIKE-RAG can adeptly navigate through a sea of information to locate and synthesize content that addresses user questions, even when the answers are scattered across multiple documents. Moreover, PIKE-RAG's advanced functionality enables it to tackle thematic inquiries, such as identifying prevailing motifs or patterns within a dataset. This capacity to handle both specific, cross-referenced questions and broader, thematic ones makes PIKE-RAG a powerful tool for extracting actionable insights from large volumes of data.

## What is/are PIKE-RAG's intended use(s)?

PIKE-RAG is an advanced system crafted to revolutionize how large language models assist in complex industrial tasks. Here are the its intended uses:

- PIKE-RAG is specifically engineered to enhance large language models in sectors where the need for deep, domain-specific knowledge is paramount, and where conventional retrieval-augmented systems fall short. Its intended use is in complex industrial applications where the extraction and application of specialized knowledge are critical for achieving accurate and insightful outcomes. By incorporating specialized knowledge and constructing coherent rationales, PIKE-RAG is adept at guiding LLMs to provide precise responses tailored to intricate queries.

- Aimed at addressing the multifaceted challenges encountered in industrial environments, PIKE-RAG is poised for deployment in scenarios requiring a high level of logical reasoning and the ability to navigate through specialized corpora. It is ideal for use cases that demand not just information retrieval but also a deep understanding of that information and its application in a logical, reasoned manner. This makes PIKE-RAG particularly valuable for tasks where decision-making is heavily reliant on exclusive, industry-specific insights.

- With a focus on the incremental improvement of RAG systems, PIKE-RAG's deployment strategy is designed to systematically tackle tasks based on their knowledge complexity. This approach ensures that as industrial demands evolve, PIKE-RAG can develop alongside, continuously enhancing the decision-making capabilities of LLMs and maintaining relevance and accuracy in the context of the industry's specific needs.

- PIKE-RAG is structured to operate within the framework of existing industry protocols, but users must ensure that it is used in conjunction with responsible analytic practices. The system is designed to augment, not replace, human expertise, and therefore it is essential for domain experts to critically evaluate and interpret PIKE-RAG's outputs, verifying their validity and applicability to the specific context.

- While PIKE-RAG does not independently collect user data, it functions within the larger ecosystem of data processing and management. Users are advised to be mindful of data privacy concerns and are encouraged to review the privacy policies associated with the large language models and data storage solutions interfacing with PIKE-RAG. It is the responsibility of the user to ensure that the use of PIKE-RAG complies with all relevant data protection regulations and organizational guidelines.

## How was PIKE-RAG evaluated? What metrics are used to measure performance?

PIKE-RAG's performance and utility were rigorously assessed through a comprehensive evaluation strategy that employed multiple metrics to measure different aspects of its capabilities. Here's how PIKE-RAG was evaluated and the metrics used to gauge its performance:

- Accuracy Metrics: One fundamental way PIKE-RAG was evaluated is by its performance on public datasets. Metrics such as Exact Match (EM), F1 score, Precision, Recall, and an automatically LLM-powered Accuracy metric were utilized for datasets that have ground-truth labels. These metrics are critical as they offer an objective measure of PIKE-RAG's ability to provide correct answers. Manual checking over random samples from these testing data underscores the reliability of these metrics.

- Transparency and Rationale Assessment: To evaluate the transparency and reliability of the responses generated by PIKE-RAG, the system's outputs were closely examined in conjunction with the reference corpus they were derived from. This evaluation focused on the coherence and relevance of the rationale embedded within the responses, ensuring that the system's logic is traceable and grounded in the source material.

- Hallucination Rate Measurement: The credibility of the rationales provided in PIKE-RAG's responses was subjected to a meticulous manual review, where each sentence was evaluated to ascertain whether the underlying logic could be sourced to any part of the reference corpus.

- Resilience Testing: PIKE-RAG's robustness against various forms of adversarial attacks was tested, including prompt and data corpus injection attacks. These tests, which encompassed both manual and semi-automated techniques, aimed to probe the system's defenses against user prompt injection attacks ("jailbreaks") and cross prompt injection attacks ("data attacks").

## What are the limitations of PIKE-RAG? How can users minimize the impact of PIKE-RAG’s limitations when using the system?

PIKE-RAG, like any advanced system, comes with certain limitations that users should be aware of in order to effectively utilize the system within its operational boundaries. The open-source version of PIKE-RAG is crafted with a general-purpose approach in mind. As a result, while it outperforms other untrained and unadjusted methods across the datasets being tested, it may not deliver the optimal performance possible within a specific domain. This is because it is not fine-tuned to the unique nuances and specialized requirements that certain domains may present. In other words, please note that PIKE-RAG was developed for research purposes and is not intended for real-world industrial applications without further testing and development.

Users can mitigate the limitations posed by PIKE-RAG's generalist nature by introducing domain-specific customizations. For instance, when deploying PIKE-RAG in a particular domain, users can enhance performance by tailoring the corpus pre-processing steps to better reflect the domain's specificities, thereby ensuring that the knowledge base PIKE-RAG draws from is highly relevant and fine-tuned. Additionally, during the rationale generation phase, users can incorporate domain-specific demonstrations or templates that guide the system to construct rationales that are more aligned with domain expertise and practices. This bespoke approach can significantly improve the relevance and accuracy of the system's outputs, making them more actionable and trustworthy for domain-specific applications.

Another limitation is that, PIKE-RAG was mainly evaluated in English. If you want to apply PIKE-RAG in other languages, you may need to do some prompt engineering works-to update the prompts in the language you want to use. In the meanwhile, adequate testing works are necessary.

Please keep in mind that to apply PIKE-RAG for real-world industrial applications, domain experts are acquired to customize the whole pipeline. By understanding and addressing these limitations through targeted domain-specific adjustments, users can effectively harness the power of PIKE-RAG and reduce the impact of its constraints, thus maximizing the system's utility and performance in specialized contexts.

## What operational factors and settings allow for effective and responsible use of PIKE-RAG?

To ensure effective and responsible use of PIKE-RAG, it is important to consider the following operational factors and settings:

- User Expertise: The system is intended for use by trusted individuals who possess the necessary domain sophistication. These users are expected to have experience in handling intricate information tasks, which is crucial for the proper interpretation and analysis of PIKE-RAG's outputs.

- Human Analysis and Provenance Tracking: While PIKE-RAG is generally robust against injection attacks and is capable of identifying conflicting information sources, it is imperative that human analysts perform a thorough review of the system's responses. Reliable insights are generated when users critically evaluate the provenance of the information and ensure that the inferences made by PIKE-RAG during answer generation align with human judgment and domain-specific knowledge.

- Resilience and Safety Considerations: Although PIKE-RAG has undergone rigorous testing for its resilience to various types of adversarial attacks, there is still the possibility that the LLM configured with PIKE-RAG might produce content that is inappropriate or offensive. This is especially relevant when deploying the system in sensitive contexts. To mitigate such risks, developers must carefully assess the outputs within the context of their specific use case. Implementing additional safeguards is crucial, and these may include using safety classifiers, model-specific safety features, and services like [Azure AI Content Safety](https://azure.microsoft.com/en-us/products/ai-services/ai-content-safety), or developing bespoke solutions that are tailored to the unique requirements of the application.

By acknowledging these operational factors and incorporating the appropriate settings and checks, users can leverage PIKE-RAG in a manner that is both effective and aligned with ethical and responsible AI practices. This careful approach ensures that the system's capabilities are harnessed to their full potential while minimizing the risk of misuse or the propagation of harmful content.
