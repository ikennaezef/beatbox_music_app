import React from "react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
	return (
		<div className="mb-6 pb-4 border-b border-b-zinc-600">
			<div className="flex items-center border border-zinc-700 rounded p-1 pr-4">
				<input
					type="text"
					placeholder="Search..."
					className="w-full outline-none p-2 bg-transparent"
				/>
				<BsSearch className="text-zinc-500" />
			</div>
		</div>
	);
};

export default Search;
