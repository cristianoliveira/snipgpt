let verbose = process.env.SNIPGPT_VERBOSE;
export default {
  onStart: async () => {
    verbose = verbose || !!process.argv.find((a) => a === "--verbose");
    if (verbose) {
      console.log("onStart");
    }
  },

  onSnippetRequest: async (request) => {
    if (verbose) {
      console.log("onSnippetRequest", request);
    }
  },

  onCreateCompletionPrepare: async (args) => {
    if (verbose) {
      console.log("onCreateCompletionPrepare", args);
    }
  },

  onCreateCompletionResponse: async (args) => {
    if (verbose) {
      console.log("onCreateCompletionResponse", args);
    }
  },

  onSnippetRequestResponse: async (args) => {
    if (verbose) {
      console.log("onSnippetRequestResponse", args);
    }
  },

  onClose: async () => {
    if (verbose) {
      console.log("onClose");
    }
  },
};
