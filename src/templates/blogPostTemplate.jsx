import React from "react";

const BlogPostTemplate = ({ data: { text, title } }) => {
	return (
		<div>
			<h1>{title}</h1>

			<p>{text}</p>
		</div>
	);
};

export default BlogPostTemplate;
