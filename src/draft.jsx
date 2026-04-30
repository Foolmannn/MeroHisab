const processIntentWithAI = async (voiceText) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // We send the current date so the AI can calculate 7 days from "today"
    const today = new Date().toISOString().split('T')[0];

    const prompt = `
      You are a finance assistant for "Mero Hisab". 
      Convert this sentence into JSON: "${voiceText}"
      Current Date: ${today}

      JSON Structure & Rules:
      1. amount: (Number) Required.
      2. type: (String) ["income", "expense", "lend", "borrow"].
      3. person: (String) Required. If no name found, use "Unknown".
      4. category: (String) Required. If not mentioned, use "other".
      5. notes: (String) Default to null. Only fill if user provides extra detail.
      
      Date Logic for 'lend' and 'borrow':
      - due_date: Set exactly 7 days from ${today}.
      - return_date: Set exactly 7 days from ${today}.
      - For 'income' or 'expense', these should be null.

      Return ONLY raw JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = JSON.parse(response.text().replace(/```json|```/g, "").trim());

    console.log("Structured Transaction:", data);
    // handleSave(data);
  } catch (error) {
    console.error("Processing failed:", error);
  }
};