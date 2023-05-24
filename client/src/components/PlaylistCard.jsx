import React from "react";

const PlaylistCard = ({ playlist }) => {
	return (
		<div className="rounded bg-zinc-900 min-w-[10rem] max-w-[12rem] p-2 pb-4 animate-fade-up">
			<img
				src="https://firebasestorage.googleapis.com/v0/b/socialstream-ba300.appspot.com/o/music_app_files%2Fplaylist_cover.jpg?alt=media&token=546adcad-e9c3-402f-8a57-b7ba252100ec"
				alt="Playlist"
				className="w-full object-cover rounded mb-4"
				loading="lazy"
				width={200}
				height={220}
			/>
			<div>
				<h5 className="font-medium">Sample Playlist</h5>
				<p className="text-sm text-zinc-400">Sample user</p>
			</div>
		</div>
	);
};

export default PlaylistCard;
