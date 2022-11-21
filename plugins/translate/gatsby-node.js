const fs = require("fs");
const pify = require("pify");
const { render } = require("datocms-structured-text-to-plain-text");

const writeFile = pify(fs.writeFile);

let pluginOptions = {};

exports.onPreBootstrap = async function (some, opts) {
	pluginOptions = opts;
};

// eslint-disable-next-line arrow-body-style
exports.createPages = async ({ graphql }) => {
	const fetchTranslations = (locale) =>
		graphql(`{
    allDatoCmsTemplateText(
      locale: "${locale}") {
      nodes {
        text {
          variable: textTemplateVariable
          plainText
          structuredText {
            value
            links {
              ... on DatoCmsPage {
                id: originalId
                urlPath
              }
            }
            blocks
          }
        }
      }
    }
  }`);

	let fileContent = "const translation = {\n";

	for (const locale of pluginOptions.locale) {
		const res = await fetchTranslations(locale);
		const translations = res.data.allDatoCmsTemplateText.nodes;
		translations.forEach((node) => {
			node.text.forEach((text) => {
				const struc = render(text.structuredText);
				if (text.plainText || !struc) {
					fileContent += `'${text.variable}-${locale}': '${(
						text.plainText || ""
					).replace(/'/g, "\\'")}',\n`;
				} else {
					fileContent += `'${text.variable}-${locale}': ${JSON.stringify(
						text.structuredText
					)},\n`;
				}
			});
		});
	}

	fileContent += "};\n\nexport default translation";

	return writeFile("./translation.js", fileContent);
};
