import React from "react";
import { graphql } from "gatsby";

const PageTemplate = ({ data: { datoCmsPage: { title, text}} }) => {
	return (
		<div>
			<h1>{title}</h1>

            <p>{text}</p>
		</div>
	);
};

export const query = graphql`
	query ($id: String!) {
		datoCmsPage(id: { eq: $id }) {
			id
			title
			text
		}
	}
`;

export default PageTemplate;
