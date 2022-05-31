import React from "react";
import { Configuration, OpenAIApi } from "openai";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "", output: "", number: 50 , language: ""};
    this.languageChange = this.languageChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.inputFileChange = this.inputFileChange.bind(this);
    this.numberChange = this.numberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  numberChange(event) {
    this.setState({ number: event.target.value });
  }

  inputChange(event) {
    this.setState({ input: event.target.value });
  }

  languageChange(event){
    this.setState({ language: event.target.value });
    this.state.language = event.target.value;
  }

  inputFileChange(event){
    event.preventDefault();
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        //console.log(text);
        this.setState({input: text});
        
      };
      reader.readAsText(event.target.files[0]);
      //this.setState({input: reader.readAsText(event.target.files[0])});
  }

  handleSubmit(event) {
    // console.log(process.env.REACT_APP_API_KEY);
    console.log(this.state.language);
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    // console.log(this.state);
    (async () => {
      try {
        const response = await openai.createCompletion("text-curie-001", {
          prompt:
            this.state.input +
            "Summarize above text in" + this.state.number + 
            " words or less " + "and translate into" + this.state.language,
          temperature: 0.7,
          max_tokens: this.state.number * 5,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        var summarized = response.data.choices[0].text;
        while (summarized[0] === "\n") {
          summarized = summarized.substring(1);
        }
        this.setState({ output: summarized });
   
      
      } catch (e) {
        e.value = e.message;
        console.log(e.value);
      }
    })();

    event.preventDefault();
  }


  render() {
    return (
      <div class="container mx-auto">
        <div class="p-5 my-10 mx-auto max-w-4xl bg-white rounded-md shadow-sm">
          <div class="text-center">
            <p class="text-gray-400">
              Enter text below or upload a file to summarize
            </p>
          </div>
          <div>
            <form onSubmit={this.handleSubmit} method="POST">
              <div class="mb-6">
                <label for="message" class="block mb-2 text-sm text-gray-600">
                  Text to summarize:
                </label>

                <textarea
                  rows="5"
                  name="input"
                  placeholder="Lorum Ipsum"
                  value={this.state.input}
                  onChange={this.inputChange}
                  class="py-2 px-3 w-full placeholder-gray-300 rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-100 focus:outline-none"
      
                ></textarea>
              </div>

              <div class="float-left mb-6">
                <label
                  for="language"
                  type="select"
                  class="block mb-2 text-sm text-gray-600"
                >
                  Language
                </label>
                <select type="language" value={this.state.language} onChange={this.languageChange}>
                  <option value="English">
                    English
                  </option>
                  <option value="Mandarin">Mandarin</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>

              <div class="float-left px-16 mb-6">
                <label for="number" class="block mb-2 text-sm text-gray-600">
                  Max Words:
                </label>
                <input
                  type="number"
                  value={this.state.number}
                  onChange={this.numberChange}
                />
              </div>

              <div class="float-right px-10 mb-6">
                <label
                  for="file"
                  type="file"
                  class="block mb-2 text-sm text-gray-600"
                >
                  Choose file
                </label>
                <input type="file" name="file"
                onChange={this.inputFileChange}/>
                
              </div>

              <div class="mb-6">
                <button
                  type="submit"
                  class="py-4 px-2 w-full text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Summarize
                </button>
              </div>

              <div class="mb-6">
                <label for="message" class="block mb-2 text-sm text-gray-600">
                  Summarized Text:
                </label>

                <textarea
                  rows="5"
                  name="output"
                  placeholder="Summarized text"
                  value={this.state.output}
                  readOnly
                  class="py-2 px-3 w-full placeholder-gray-300 rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-100 focus:outline-none"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
