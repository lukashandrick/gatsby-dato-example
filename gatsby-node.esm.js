import path from "path";

const locale = "en";

exports.createPages = async ({ graphql, actions }) => {
	return Promise.resolve()
		.then(() => graphql(mainWebsiteQuery(locale)))
		.then((result) => {
			if (result.errors) {
				throw new Error("Error while fetching data!");
			}

			const {
				data: {
					allDatoCmsPage: { nodes: pages },
					allDatoCmsBlogPost: { nodes: blogPosts },
				},
			} = result;

			for (let index = 0; index < 60; index++) {
				pages.forEach(({ id, urlPath }) => {
					if (!urlPath) {
						return;
					}

					actions.createPage({
						path: `${urlPath}-${index}`,
						component: path.resolve("./src/templates/pageTemplate.jsx"),
						context: {
							id,
						},
					});
				});
			}

			for (let index = 0; index < 1; index++) {
				blogPosts.forEach(({ id, urlPath }) => {
					if (!urlPath) {
						return;
					}

					actions.createPage({
						path: `${urlPath}-${index}`,
						component: path.resolve("./src/templates/blogPostTemplate.jsx"),
						context: {
							id,
						},
					});
				});
			}
		});
};

const mainWebsiteQuery = (locale) => `
    query {
        allDatoCmsPage(
            locale: "${locale}"
            filter: {
                meta: {
                    isValid: { eq: true }
                }
            }
        ) {
            nodes {
                id
                urlPath
            }
        }
        allDatoCmsBlogPost(
            locale: "${locale}"
            filter: {
                meta: {
                    isValid: { eq: true }
                }
            }
        ) {
            nodes {
                id
                urlPath
            }
        }
    }
`;
