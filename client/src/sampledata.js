const sampledata = {"name":"Me","context":"twitter","word_count":70579,"user_id":0,"traits":[{"trait_id":"facet_adventurousness","name":"Adventurousness","category":"personality","percentile":0.9037395069022328},{"trait_id":"facet_artistic_interests","name":"Artistic interests","category":"personality","percentile":0.6205062638629305},{"trait_id":"facet_emotionality","name":"Emotionality","category":"personality","percentile":0.4723329915374732},{"trait_id":"facet_imagination","name":"Imagination","category":"personality","percentile":0.8010691516775699},{"trait_id":"facet_intellect","name":"Intellect","category":"personality","percentile":0.9367793513247026},{"trait_id":"facet_liberalism","name":"Authority-challenging","category":"personality","percentile":0.999776237659666},{"trait_id":"big5_openness","name":"Openness","category":"personality","percentile":0.9967142476049433},{"trait_id":"facet_achievement_striving","name":"Achievement striving","category":"personality","percentile":0.9911250273229886},{"trait_id":"facet_cautiousness","name":"Cautiousness","category":"personality","percentile":0.11424653511391758},{"trait_id":"facet_dutifulness","name":"Dutifulness","category":"personality","percentile":0.9654794613571962},{"trait_id":"facet_orderliness","name":"Orderliness","category":"personality","percentile":0.924180587721715},{"trait_id":"facet_self_discipline","name":"Self-discipline","category":"personality","percentile":0.9999986692620955},{"trait_id":"facet_self_efficacy","name":"Self-efficacy","category":"personality","percentile":0.9989748710101649},{"trait_id":"big5_conscientiousness","name":"Conscientiousness","category":"personality","percentile":0.800226014635765},{"trait_id":"facet_activity_level","name":"Activity level","category":"personality","percentile":0.9800579414990858},{"trait_id":"facet_assertiveness","name":"Assertiveness","category":"personality","percentile":0.8708864781208485},{"trait_id":"facet_cheerfulness","name":"Cheerfulness","category":"personality","percentile":0.9999661195506149},{"trait_id":"facet_excitement_seeking","name":"Excitement-seeking","category":"personality","percentile":0.7193721256279233},{"trait_id":"facet_friendliness","name":"Outgoing","category":"personality","percentile":0.9974160144881665},{"trait_id":"facet_gregariousness","name":"Gregariousness","category":"personality","percentile":0.14312262675671722},{"trait_id":"big5_extraversion","name":"Extraversion","category":"personality","percentile":0.8687805022677546},{"trait_id":"facet_altruism","name":"Altruism","category":"personality","percentile":0.9740855370427379},{"trait_id":"facet_cooperation","name":"Cooperation","category":"personality","percentile":0.9261448876433107},{"trait_id":"facet_modesty","name":"Modesty","category":"personality","percentile":0.03656582541856468},{"trait_id":"facet_morality","name":"Uncompromising","category":"personality","percentile":0.972704165767362},{"trait_id":"facet_sympathy","name":"Sympathy","category":"personality","percentile":0.9943242815791982},{"trait_id":"facet_trust","name":"Trust","category":"personality","percentile":0.9886295814539946},{"trait_id":"big5_agreeableness","name":"Agreeableness","category":"personality","percentile":0.7207174830367982},{"trait_id":"facet_anger","name":"Fiery","category":"personality","percentile":0.035619060868778585},{"trait_id":"facet_anxiety","name":"Prone to worry","category":"personality","percentile":0.011754711234350068},{"trait_id":"facet_depression","name":"Melancholy","category":"personality","percentile":0.00037727107754875755},{"trait_id":"facet_immoderation","name":"Immoderation","category":"personality","percentile":0.05057276243845138},{"trait_id":"facet_self_consciousness","name":"Self-consciousness","category":"personality","percentile":0.0001554927008197149},{"trait_id":"facet_vulnerability","name":"Susceptible to stress","category":"personality","percentile":0.0014640046911069682},{"trait_id":"big5_neuroticism","name":"Emotional range","category":"personality","percentile":0.17545265410348582},{"trait_id":"need_challenge","name":"Challenge","category":"needs","percentile":0.16775728821817515},{"trait_id":"need_closeness","name":"Closeness","category":"needs","percentile":0.2720892844800976},{"trait_id":"need_curiosity","name":"Curiosity","category":"needs","percentile":0.7765089339973477},{"trait_id":"need_excitement","name":"Excitement","category":"needs","percentile":0.49766745192799483},{"trait_id":"need_harmony","name":"Harmony","category":"needs","percentile":0.0003247412315824372},{"trait_id":"need_ideal","name":"Ideal","category":"needs","percentile":0.7401027907269764},{"trait_id":"need_liberty","name":"Liberty","category":"needs","percentile":0.5119168830613983},{"trait_id":"need_love","name":"Love","category":"needs","percentile":0.1693232937193887},{"trait_id":"need_practicality","name":"Practicality","category":"needs","percentile":0.08291086228722955},{"trait_id":"need_self_expression","name":"Self-expression","category":"needs","percentile":0.12911117028023583},{"trait_id":"need_stability","name":"Stability","category":"needs","percentile":0.6626032905647137},{"trait_id":"need_structure","name":"Structure","category":"needs","percentile":0.36004430616619554},{"trait_id":"value_conservation","name":"Conservation","category":"values","percentile":0.11911922856537493},{"trait_id":"value_openness_to_change","name":"Openness to change","category":"values","percentile":0.9632453512516206},{"trait_id":"value_hedonism","name":"Hedonism","category":"values","percentile":0.030872372305521534},{"trait_id":"value_self_enhancement","name":"Self-enhancement","category":"values","percentile":0.19170154156247754},{"trait_id":"value_self_transcendence","name":"Self-transcendence","category":"values","percentile":0.3743747688381239}]};


const explanations =  {
    'Openness': 'Openness to experience. Higher: Intellectually curious, emotionally-aware, sensitive to beauty and willing to try new things.\nLower: Preferring the plain, straightforward, and obvious over the complex, ambiguous, and subtle.',
    'Conscientiousness': 'Higher: More self-disciplined, dutiful, or aiming for achievement against measures or outside expectations.\nLower: More likely to prefer the spontaneous over the planned.',
    'Extraversion': 'Higher: More energetic and pronounced engagement with the external world. Likes high group visibility, talking, and asserting themselves.\nLower: Needs less stimulation and are more independent of their social world. It does not mean they are shy, un-friendly, or antisocial.',
    'Agreeableness': 'Higher: Value getting along with others. They have a more optimistic view of human nature.\nLower: Value self interests over others. They are more skeptical of others\' motives.',
    'Emotional range': '**This demo cannot diagnose a mental illness.** Higher: More likely to have negative emotions or get upset. It could mean they are going through a tough time.\nLower: More calm and less likely to get upset. It does not mean they are positive, or happy people.',
    'Adventurousness': 'Eagerness to trying new activities and experiencing new things.',
    'Artistic interests': 'Appreciation for art and beauty, both man-made and in nature.',
    'Emotionality': 'Emotional availability; awareness of own feelings.',
    'Imagination': 'Openness to creating an inner world of fantasy.',
    'Intellect': 'Intellectual curiosity; openness to new ideas.',
    'Authority-challenging': 'Openness to re-examine own values and traditions; readiness to challenge authority.',
    'Achievement striving': 'The need for personal achievement and sense of direction.',
    'Cautiousness': 'Tendency to think things through before acting or speaking.',
    'Dutifulness': 'Sense of duty; amount of emphasis placed on fulfilling obligations.',
    'Orderliness': 'Personal organization, tidiness, neatness.',
    'Self-discipline': 'Will-power; the capacity to begin tasks and follow through to completion in spite of boredom or distractions.',
    'Self-efficacy': 'Belief in one\'s own competence.',
    'Activity level': 'Pace of living; level of busyness.',
    'Assertiveness': 'Forcefulness of expression; pursuit of leadership and social ascendancy; desire to direct the activities of others.',
    'Cheerfulness': 'Tendency to experience or express positive emotions.',
    'Excitement-seeking': 'A need for environmental stimulation.',
    'Warmth': 'Interest in and friendliness towards others; socially confident.',
    'Gregariousness': 'Fondness for the company of others; sociability.',
    'Altruism': 'Active and genuine concern for the welfare of others.',
    'Cooperation': 'Dislike of confrontations. Responding to interpersonal conflict with a willingness to compromise.',
    'Modesty': 'Tendency to be unassuming and play down own achievements; humility.',
    'Straightforwardness': 'Frank and genuine in expression; candid, blunt.',
    'Sympathy': 'Attitude of compassion for others; kindness.',
    'Trust': 'Level of belief in the sincerity and good intentions of others.',
    'Fiery': 'Tendency to experience–but not necessarily express–anger or frustration.',
    'Prone to worry': 'Tendency to dwell on difficulty or troubles; easily experience unease or concern.',
    'Melancholy': 'Normal tendency to experience feelings of guilt, sadness, hopelessness, or loneliness.',
    'Impulsiveness': 'Tendency to act on cravings and urges rather over resisting them or delaying gratification.',
    'Self-consciousness': 'Concern with rejection, embarrassment; shyness.',
    'Susceptible to stress': 'Difficulty in coping with stress or pressure in difficult situations.'
  ,
    'Structure': 'A need for organization, planning, and things that have a clear purpose.',
    'Stability': 'A need for the sensible, tried and tested, with a good track record and a known history.',
    'Self-expression': 'A desire to discover and assert one\'s identity.',
    'Practicality': 'A desire for getting the job done, skill, and efficiency.',
    'Love': 'Social contact, whether one-to-one or one-to-many.',
    'Liberty': 'A need to escape, a desire for new experiences, new things.',
    'Ideal': 'A desire to satisfy one\'s idea of perfection in a lifestyle or experience, oftentimes seen as pursuing a sense of community.',
    'Harmony': 'A need to appreciate or please other people, their viewpoints, and feelings.',
    'Excitement': 'A need to pursue experiences or lead a lifestyle that arouses enthusiasm and eagerness.',
    'Curiosity': 'A need to pursue experiences that foster learning, exploration, and growth.',
    'Closeness': 'A need to nurture or be nurtured; a feeling of belonging.',
    'Challenge': 'A desire to achieve, succeed, compete, or pursue experiences that test one\'s abilities.',
    'Tradition': 'Respect, commitment, and acceptance of the customs and ideas that one\'s culture and/or religion provides.',
    'Stimulation': 'Excitement, novelty, and challenge in life.',
    'Hedonism': 'Pleasure or sensuous gratification for oneself.',
    'Achievement': 'Personal success through demonstrating competence according to social standards.',
    'Helping others': 'Preserving and enhancing the welfare of those with whom one is in frequent personal contact.'
  }


export  {sampledata, explanations}

  