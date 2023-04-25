class AIBlock {
    getInfo() {
        //Metadata for block
        return {
            "id": "AI",
            "name": "AI",
            "blocks": [{
                "opcode": "completePrompt",
                "blockType": "reporter",
                "text": "complete prompt [string]",
                "arguments": {
                    "string": {
                        "type": "string",
                        "defaultValue": "Explain quantum computing in simple terms"
                    }
                }
            }],
            //don't worry about it
            "menus": {}
        };
    }

    async completePrompt({ string }) {
        //Remove trailing spaces, required for model to work properly
        const text = string.trim();
        //Request text completion using Davinci3
        const url = `https://api.openai.com/v1/engines/tex...`;
      const API_KEY = `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`;
        const options = {
            //Has to be post for some reason
            method: "POST",
            //Input prompt and a decent length
            body: JSON.stringify({
                prompt: text,
                max_tokens: 300,
            }),
            //API key, and JSON content type
            headers: {
                Authorization: "Bearer " + API_KEY,
                "Content-type": "application/json; charset=UTF-8"
            },
        };

        console.log("REQUEST:" + url);

        //Fetch and await promise.
        const response = await fetch(url, options);
        //Get JSON data
        const jsonData = await response.json();

        //The ai response will be the first (and only) choices text
        const output = jsonData.choices[0].text;
        return output;
    }

}

//Register block with Scratch
Scratch.extensions.register(new AIBlock());
