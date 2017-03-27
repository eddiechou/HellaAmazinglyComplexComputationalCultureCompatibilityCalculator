import React from 'react';
import ReactDOM from 'react-dom';

class About extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        <div>
          <p className="lead">
            datashrink is a way for you to analyze a block of text or a Twitter account using&nbsp;
            <a href="https://www.ibm.com/watson/">IBM's Watson</a>
            &nbsp;to gauge personality features ranging from intellect to hedonism.
          </p>
        </div>
        <hr />
        <div>
          <h3>
            what are we doing here?
          </h3>
          <p>
            Watson is a natural language process engine designed by IBM. Watson leverages&nbsp;
            <a href="https://www.ibm.com/watson/developercloud/doc/personality-insights/references.shtml">research</a>
            &nbsp;that found that variations in word usage in writings such as blogs, essays, and tweets can predict aspects of personality.
            For example, high uses of pronouns (she, he, we) predicts extraversion while self-referencing words (me, myself, I) 
            reflects an inward-looking tendency, and therefore introversion.
          </p>
          <p>
            Datashrink creates portraits of individuals that reflect their personality characteristics based on their writing. Compare yourself 
            to celebrity Twitter accounts, famous speeches, movie characters, and more.
          </p>
          <h3>
            want to create your own?
          </h3>
          <p>
            What do you want to analyze? Datashrink can look at tweets or any sample of regular text or speech you might want to use, but
            Watson can only provide a proper analysis when your input is 1200 words or greater, so make sure there's enough there for us to look at.
          </p>
          <p>
            If you have any Twitter security settings enabled, you can give datashrink access to analyze your tweets by logging in to your 
            Twitter account ("my Twitter" option).
          </p>
          <p>
            Click "new analysis" from the menu to get started.
          </p>
          <h3>
            how do I compare myself to someone else?
          </h3>
          <p>
            Analyze your own tweets, create a new text analysis or navigate to any public or saved one. From there, choose or create another 
            analysis from your options in under the "compare to" header. Your results will be displayed side-by-side.
          </p>
          <h3>
            can I save my analyses?
          </h3>
          <p>
            Sign up for an account to store every analysis you create to your personal saved analyses.
          </p>
          <p>
            Alternatively, copy the url from the address bar to refer to your analysis later without signing up. Any analysis you create is 
            automatically saved and can be viewed at a later date.
          </p>
          <h3>
            what does each trait mean?
          </h3>
          <p>
            Hover over the bubbles on the second chart for a deeper explanation, or go to the&nbsp;
            <a href="https://www.ibm.com/watson/developercloud/doc/personality-insights/models.shtml">source</a>.
          </p>
        </div>
      </div>
    )
  }
}

export default About