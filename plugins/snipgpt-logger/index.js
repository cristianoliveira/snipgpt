let verbose = false;
export default {
  onStart: () => {
    verbose = !!process.argv.find((a) => a === "--verbose");
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
