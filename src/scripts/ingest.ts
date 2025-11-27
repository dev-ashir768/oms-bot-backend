import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { FileLoader } from "@/utils/fileLoader.util";
import AIConfig from "@/config/ai.config";

async function runIngestion() {
  console.log("🚀 Starting One-Time Ingestion...");

  // 1. File Load
  const rawText = await FileLoader.loadContext("dashboard-info.txt");
  if (!rawText) {
    console.error("❌ File dashboard-info.txt nahi mili!");
    return;
  }
  console.log(`📄 File read length: ${rawText.length}`);

  // 2. Chunks mein todo (10k lines ko chhote parts mein)
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await splitter.createDocuments([rawText]);
  console.log(`✅ Text split into ${docs.length} chunks.`);

  // 3. Embeddings Generate karo
  const embeddings = AIConfig.embeddingModel;

  console.log("⏳ Creating Vector Store (Thoda wait karein)...");

  // 4. Save to Folder 'vector_store_index'
  const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);
  const directory = "./vector_store_index";
  await vectorStore.save(directory);

  console.log(`🎉 Success! Data saved to '${directory}' folder.`);
}

runIngestion();
