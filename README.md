# Future Me, Age 20

A delightfully weird, shareable quiz for moms of toddlers.

## Overview
Answer 10 quick, playful questions about your kid's wildest habits and instantly get a **Future Me, Age 20 Profile** — a hilarious and surprisingly insightful prediction of their future job, hobby, and hidden talent.

## Features
- **Personality Quiz:** 10 questions tailored to toddler behaviors.
- **Archetype Scoring:** Predicts one of five archetypes: Negotiator, Strategist, Performer, Engineer, or Wildcard.
- **Social Sharing:** Instagram-ready profile cards.
- **Compare with Friends:** Side-by-side profile comparisons.
- **Digital Keepsake:** Personalized "Letter from Your Future 20-Year-Old."

## Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript.
- **Backend:** Netlify Functions (Node.js).
- **Payments:** Stripe Checkout.
- **Deployment:** Netlify (recommended) or any static host with serverless support.

## Deployment & Stripe Setup
1. **Stripe Keys:** Get your API keys from the Stripe Dashboard.
2. **Create Products:** Create three products in Stripe for:
   - Profile ($4.99)
   - Keepsake Letter ($1.99)
   - Comparison ($2.99)
3. **Environment Variables:** Set the following in your Netlify site settings:
   - `STRIPE_SECRET_KEY`: Your Stripe Secret Key (sk_test_...).
   - `STRIPE_PRICE_PROFILE`: The Price ID for the profile.
   - `STRIPE_PRICE_LETTER`: The Price ID for the letter.
   - `STRIPE_PRICE_COMPARE`: The Price ID for the comparison.
4. **Deploy:** Connect your repo to Netlify. The `netlify.toml` handles the build settings.
