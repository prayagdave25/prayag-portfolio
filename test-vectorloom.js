// Test VectorLoom Connection
// Run with: node test-vectorloom.js

const BACKEND_URL = 'https://vectorloom-production.up.railway.app';
const CREDENTIALS = {
  deployment: 'Custom',
  url: 'https://ee23c28f-528b-4e26-a535-7948d5663707.europe-west3-0.gcp.cloud.qdrant.io:6333',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.4y9PPxBEoLun_d7S6g8OXzX5CrVqr7l9oiXg4-WGIVU',
  db_type: 'qdrant'
};

async function testConnection() {
  console.log('Testing VectorLoom connection...\n');
  
  // Test 1: Health check
  try {
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${BACKEND_URL}/api/health`);
    const health = await healthResponse.json();
    console.log('✅ Health check:', health);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }
  
  // Test 2: Connect to Qdrant
  try {
    console.log('\n2. Testing Qdrant connection...');
    const connectResponse = await fetch(`${BACKEND_URL}/api/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credentials: CREDENTIALS })
    });
    const connectResult = await connectResponse.json();
    console.log('✅ Qdrant connection:', connectResult);
  } catch (error) {
    console.log('❌ Qdrant connection failed:', error.message);
  }
  
  // Test 3: List documents
  try {
    console.log('\n3. Testing document listing...');
    const docsResponse = await fetch(`${BACKEND_URL}/api/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credentials: CREDENTIALS })
    });
    const docs = await docsResponse.json();
    console.log('✅ Documents:', docs);
    
    if (docs.documents && docs.documents.length === 0) {
      console.log('\n⚠️  WARNING: No documents found! You need to upload your resume first.');
    }
  } catch (error) {
    console.log('❌ Document listing failed:', error.message);
  }
  
  // Test 4: Query test
  try {
    console.log('\n4. Testing query endpoint...');
    const queryResponse = await fetch(`${BACKEND_URL}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'What are your skills?',
        credentials: CREDENTIALS,
        RAG: {
          Embedder: { 
            selected: 'Cohere',
            components: {}
          },
          Generator: { 
            selected: 'Groq',
            components: {}
          },
          Retriever: { 
            selected: 'HybridRetriever',
            components: {}
          }
        },
        cohere_api_key: 'PAHixuwSLfB9SVD66FKwJdm5NOQ3rteWTNOWzR3O',
        labels: [],
        documentFilter: []
      })
    });
    
    console.log('Response status:', queryResponse.status);
    const queryResult = await queryResponse.json();
    console.log('Query result:', JSON.stringify(queryResult, null, 2));
    
    if (queryResponse.status === 422) {
      console.log('\n❌ 422 Error - Request validation failed');
      console.log('This usually means:');
      console.log('  - Wrong credentials format');
      console.log('  - Missing required fields');
      console.log('  - No documents uploaded');
    }
  } catch (error) {
    console.log('❌ Query test failed:', error.message);
  }
}

testConnection();
