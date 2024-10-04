import { HfInference } from '@huggingface/inference';

const inference = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function analyzeContent(text: string) {
  const prompt = `
  Analyze the following content and classify it with an age restriction based on the guidelines provided below: G (General Audiences): No violence, offensive language, or complex themes. PG (Parental Guidance): Mild implied violence or language, simple themes. T (Teen): Moderate violence, romantic relationships, family conflict, or bullying. M (Mature): Intense violence, drug use, sexual themes, or strong language. A (Adults Only): Graphic violence, explicit sexual content, drug abuse, or heavy profanity. After the classification, summarize the content in numbered points, ensuring to capture all arguments raised clearly and objectively. Trigger Warnings: If applicable, provide up to three trigger warnings, and if they're present, trigger warnings for violence and sexual content should be mentioned first. After these, please list any other trigger warnings relevant to the content. Logical Fallacies Check: Evaluate the logical validity of the content by identifying up to five fallacies. If cases of Ad Hominem, Circular Reasoning or Slippery Slope are present, mention them first, If these are absent in the content, do not mention them. If other fallacies are present, mention them based on their relevance.
  Content to analyze: "${text}"

Your analysis:
`;

  try {
    const response = await inference.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.3',
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.7,
      },
    });

    const analysisStart = response.generated_text.indexOf("Your analysis:");
    const analysisText = analysisStart !== -1 ? response.generated_text.substring(analysisStart + "Your analysis:".length).trim() : response.generated_text;

    return analysisText;
  } catch (error) {
    console.error('Error during content analysis:', error);
    throw new Error('Failed to analyze content');
  }
}
