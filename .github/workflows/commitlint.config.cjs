module.exports = {
	parserPreset: {
	  parserOpts: {
		headerPattern: new RegExp(
		  /^\((#\d+(?:(?:, ){1}#\d+)*)+\)\s(.+)$/
		),
		headerCorrespondence: ["references", "subject"],
		referenceActions: null,
	  }
	},
	plugins: [
	  {
		rules: {
		  "header-match-team-pattern": (parsed) => {
			const { references, subject } = parsed;
			//console.log(references)
			//console.log(subject)
			if (references === null || subject === null) {
			  return [
				false,
				"Commit header must be in format '(#issue) subject. You may use (#issue, #issue) if you must.'"
			  ];
			}
			return [true, ""];
		  },
		  "header-beware-commas": (parsed) => {
			const { references, subject } = parsed;
			if(references.find(el => el.raw.indexOf(",") > -1)) {
			  return [
				false,
				"We prefer a single issue per commit if possible."
			  ];
			}
			return [true, ""];
		  },
		  "message-close-tickets": (message) => {
			const validPattern = /^(Closes|Fixes|Resolves|Touches)\s#\d+(\n|$)+/gm;
			// we could use a {1} quantifier above to force a single ticket number but that wouldn't catch instances with two lines, one of which had multiple ticket numbers
			const invalidPattern = /^(Closes|Fixes|Resolves|Touches)\s#\d+((,|\s|,\s)+\s#\d+)+(\n|$)+/gm;
			if (validPattern.test(message.footer) && !invalidPattern.test(message.footer)) {
			  return [true];
			}
	  
			return [
			  false,
			  `Message body must include at least one line with the word "Closes" or "Touches" followed by a single ticket number. For example: "Closes #123".`,
			];
		  }
		},
	  },
	],
	rules: {
	  "references-empty": [2, "never"],
	  "header-match-team-pattern": [2, "always"],
	  "header-beware-commas": [1, "always"],
	  "message-close-tickets": [2, "always"],
	  "header-min-length": [2, "always", 20],
	  "header-max-length": [2, "always", 72],
	  "body-leading-blank": [2, "always"],
	}
  };
  