const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Price IDs — owner must create these in Stripe dashboard
const PRICES = {
  profile: process.env.STRIPE_PRICE_PROFILE || 'price_profile_499',
  compare: process.env.STRIPE_PRICE_COMPARE || 'price_compare_299',
  letter: process.env.STRIPE_PRICE_LETTER || 'price_letter_199'
};

const PRODUCT_NAMES = {
  profile: 'Future Me, Age 20 Profile',
  compare: 'Compare with a Friend',
  letter: 'Letter from Your Future 20-Year-Old'
};

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { priceId, childName, product } = JSON.parse(event.body);

    if (!product || !PRICES[product]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid product type' })
      };
    }

    const siteUrl = process.env.URL || 'http://localhost:8888';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: PRICES[product],
          quantity: 1
        }
      ],
      metadata: {
        childName: childName || 'Unknown',
        product: product
      },
      success_url: `${siteUrl}/?session_id={CHECKOUT_SESSION_ID}&product=${product}&child=${encodeURIComponent(childName || '')}`,
      cancel_url: `${siteUrl}/?canceled=true`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id, url: session.url })
    };
  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};