import { LocalIndex } from "vectra";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { FileLoader } from "@/utils/fileLoader.util";
import AIConfig from "@/config/ai.config";
import path from "path";

async function runIngestion() {
  console.log("🚀 Starting One-Time Ingestion...");

  // 1. File Load
  const rawText = await FileLoader.loadContext("instructions.txt");
  if (!rawText) {
    console.error("❌ File instructions.txt nahi mili!");
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

  // 3. Vectra index create karo (fresh)
  const directory = path.join(process.cwd(), "vector_store_index");
  const index = new LocalIndex(directory);
  if (await index.isIndexCreated()) {
    await index.deleteIndex();
  }
  await index.createIndex();

  console.log("⏳ Creating Vector Store (Please wait)...");

  // 4. Embeddings generate kar ke index mein save karo
  const texts = docs.map((doc) => doc.pageContent);
  const vectors = await AIConfig.embeddingModel.embedDocuments(texts);

  for (let i = 0; i < texts.length; i++) {
    await index.insertItem({
      vector: vectors[i]!,
      metadata: { text: texts[i]! },
    });
  }

  console.log(`🎉 Success! ${texts.length} items saved to '${directory}'.`);
}

runIngestion();
