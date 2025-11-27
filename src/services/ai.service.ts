// import AIConfig from "@/config/ai.config";
// import logger from "@/config/logger.config";
// import { StringOutputParser } from "@langchain/core/output_parsers";
// import { ChatPromptTemplate } from "@langchain/core/prompts";

// class AIService {
//   static async generateAnswer(question: string, contextData: string = "") {
//     try {
//       const prompt = ChatPromptTemplate.fromMessages([
//         [
//           "system",
//           `You are a helpful assistant for a dashboard.
//            Answer the user's question based on the following context only:
//            {context}

//            If the answer is not in the context, say "I don't have information about that."`,
//         ],
//         ["user", "{question}"],
//       ]);

//       const chain = prompt.pipe(AIConfig.model).pipe(new StringOutputParser());

//       const response = await chain.invoke({
//         context: contextData || "No context provided yet.",
//         question: question,
//       });

//       return response;
//     } catch (error) {
//       logger.error("AI Service Error:", error);
//       throw new Error("Failed to generate AI response");
//     }
//   }
// }

// export default AIService;

import AIConfig from "@/config/ai.config";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import path from "path";

class AIService {
  static async generateAnswer(question: string) {
    const directory = path.join(process.cwd(), "vector_store_index");
    const vectorStore = await HNSWLib.load(directory, AIConfig.embeddingModel);
    const results = await vectorStore.similaritySearch(question, 4);
    const contextData = results.map((res) => res.pageContent).join("\n\n");

    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are the specialized AI Assistant for **ORIO OMS (Order Management System)**.
     Your job is to help users navigate and understand the ORIO Dashboard based strictly on the provided context.
     
     Context:
     {context}

     **Rules:**
     1. Answer only using the context provided.
     2. If the answer is not in the context, DO NOT make up an answer.
     3. Instead, reply exactly with: "I am the ORIO OMS Assistant. My knowledge is limited to the ORIO Dashboard and its features, so I cannot answer this specific question."
     4. Keep answers concise and professional.`,
      ],
      ["user", "{question}"],
    ]);

    const chain = promptTemplate
      .pipe(AIConfig.chatModel)
      .pipe(new StringOutputParser());
    // try {
    //   const prompt = ChatPromptTemplate.fromMessages([
    //     [
    //       "system",
    //       `You are a helpful assistant for a dashboard.
    //        Answer the user's question based on the following context only:
    //        {context}

    //        If the answer is not in the context, say "I don't have information about that."`,
    //     ],
    //     ["user", "{question}"],
    //   ]);

    //   const chain = prompt.pipe(AIConfig.model).pipe(new StringOutputParser());

    //   const response = await chain.invoke({
    //     context: contextData || "No context provided yet.",
    //     question: question,
    //   });

    //   return response;
    // } catch (error) {
    //   logger.error("AI Service Error:", error);
    //   throw new Error("Failed to generate AI response");
    // }
    return chain.invoke({
      context: contextData || "No context provided yet.",
      question: question,
    });
  }
}

export default AIService;
