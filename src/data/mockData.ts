
import type { ModuleData } from '@/types/courseTypes';

export const mockApiData: ModuleData = {
  "module_id": "M1",
  "title": "Dynamic Digital Outreach & Engagement",
  "rationale": "This module explores the core principles of reaching and engaging your target audience in the ever-evolving digital landscape. We'll cover understanding user behavior, crafting compelling content, and leveraging various platforms effectively. Your AI companion will guide you through practical examples and challenges.",
  "est_minutes": 75,
  "toc_items": [
    { 
      "id": "toc1_understanding_audience", 
      "title": "Understanding Your Audience in the Digital Age (API)", 
      "est_minutes": 20,
      "content": "<h2>Understanding Your Audience in the Digital Age</h2><p>The first step to any successful marketing campaign is <strong>deeply understanding your target audience</strong>. In the digital age, this means more than just demographics. It involves comprehending their online behaviors, preferred platforms, pain points, and motivations.</p><p>Consider the following aspects:</p><ul><li>What social media platforms do they frequent?</li><li>What kind of content do they engage with? (Videos, articles, podcasts)</li><li>What are their primary challenges that your product/service can solve?</li><li>Who are their influencers and trusted sources of information?</li></ul><p>By creating detailed buyer personas, you can tailor your messaging and outreach strategies for maximum impact. This isn't just about selling; it's about building a relationship and providing value.</p><blockquote><p>\"The aim of marketing is to know and understand the customer so well the product or service fits him and sells itself.\" - Peter Drucker</p></blockquote>"
    },
    { 
      "id": "toc2_compelling_content", 
      "title": "Crafting Compelling Content (API)", 
      "est_minutes": 25,
      "content": "<h2>Crafting Compelling Content</h2><p>Once you understand your audience, the next step is to create content that resonates. This content should be valuable, engaging, and tailored to the platform where it's shared.</p><h3>Types of Content to Consider:</h3><ul><li><strong>Blog Posts & Articles:</strong> For in-depth information and SEO.</li><li><strong>Videos:</strong> Highly engaging for tutorials, testimonials, and storytelling.</li><li><strong>Infographics:</strong> For presenting data and complex information visually.</li><li><strong>Podcasts:</strong> For building authority and reaching audiences on the go.</li><li><strong>Social Media Updates:</strong> For quick engagement and community building.</li></ul><p>Remember the <code>AIDA</code> model: Attention, Interest, Desire, Action. Your content should guide the user through this journey.</p><pre><code class='language-javascript'>// Example: Simple AIDA reminder\nfunction checkAIDA(content) {\n    if (!content.grabsAttention) return \"Needs more hook!\";\n    if (!content.sparksInterest) return \"Make it more relevant!\";\n    if (!content.buildsDesire) return \"Highlight benefits!\";\n    if (!content.callsToAction) return \"What's next?\";\n    return \"Content looks promising!\";\n}</code></pre>"
    }
  ],
  "engagement_cards": [
    { 
      "id": "eng1_quiz_audience", 
      "type": "quiz", 
      "title": "Knowledge Check: Digital Audience", 
      "content": {
        "question_text": "Which of the following is most crucial for understanding a digital audience for marketing purposes?",
        "options": [
          {"id": "q1opt1", "text": "Their favorite color"},
          {"id": "q1opt2", "text": "Their online behaviors and preferred platforms"},
          {"id": "q1opt3", "text": "The brand of their first car"},
          {"id": "q1opt4", "text": "Their astrological sign"}
        ],
        "correct_answer_value": "q1opt2"
      } 
    },
    {
      "id": "eng2_scenario_ecommerce",
      "type": "scenario",
      "title": "Scenario Challenge: E-commerce Engagement",
      "content": {
        "scenario_text": "A small e-commerce business selling handmade jewelry has seen a decline in social media engagement over the past quarter. Their current strategy involves posting product photos twice a day on Instagram and Facebook. They have a limited budget for marketing.",
        "prompt_question": "What is one key recommendation you would give them to improve engagement, and why?"
      }
    },
    {
      "id": "eng3_simulation_campaign",
      "type": "simulation",
      "title": "Interactive Strategy Simulation (API)",
      "content": {
        "description": "Step into the role of a campaign manager. Your AI will guide you through building and optimizing a digital ad campaign in real-time based on various scenarios."
      }
    }
  ],
  "resource_cards": [
    {
      "id": "res1_image_persona",
      "type": "image_illustration",
      "title": "Visualizing Your Audience (API)",
      "content": {
        "image_url": "https://placehold.co/800x400/BFDBFE/1E3A8A?text=Dynamic+Persona+Map&font=inter",
        "alt_text": "Dynamic Persona Map Illustration",
        "caption": "This dynamically loaded illustration showcases key elements of a well-defined buyer persona, essential for targeted marketing."
      }
    },
    {
      "id": "res2_video_marketing",
      "type": "youtube_video",
      "title": "Deep Dive: Video Marketing Mastery (API)",
      "content": {
        "video_id": "dQw4w9WgXcQ", 
        "thumbnail_url": "https://placehold.co/800x450/1F2937/9CA3AF?text=API+Video+Module&font=inter",
        "video_title_api": "Advanced Video Marketing Strategies", 
        "description": "Unlock advanced video marketing strategies. This API-loaded module covers production workflows, AI-driven analytics, and next-gen distribution channels.",
        "source_info": "Curated by Your AI | Source: Marketing Gurus Network (API)"
      }
    }
  ]
};
