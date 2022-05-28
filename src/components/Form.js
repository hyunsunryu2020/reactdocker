import React from "react";
import { Configuration, OpenAIApi } from "openai";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    const configuration = new Configuration({
      apiKey: "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",
      // apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = openai.createCompletion("text-curie-001", {
      prompt: this.state.value + "\nSummarize the above text:",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(response);
    response.item.map((data) => {
      console.log(data.choices[0].text);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div class="container mx-auto">
        <div class="p-5 my-10 mx-auto max-w-4xl bg-white rounded-md shadow-sm">
          <div class="text-center">
            <p class="text-gray-400">
              Enter your text or upload a file to summarize
            </p>
          </div>
          <div>
            <form onSubmit={this.handleSubmit} method="POST">
              <div class="mb-6">
                <label for="message" class="block mb-2 text-sm text-gray-600">
                  Text to summarize
                </label>

                <textarea
                  rows="5"
                  name="message"
                  placeholder="Lorum Ipsum"
                  value={this.state.value}
                  onChange={this.handleChange}
                  class="py-2 px-3 w-full placeholder-gray-300 rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-100 focus:outline-none"
                  required
                ></textarea>
              </div>

              <div class="mb-6">
                <label
                  for="file"
                  type="file"
                  class="block mb-2 text-sm text-gray-600"
                >
                  Choose file
                </label>
                <input type="file" name="file" />
              </div>

              <div class="mb-6">
                <button
                  type="submit"
                  class="py-4 px-2 w-full text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
