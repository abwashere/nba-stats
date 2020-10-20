import React, { useContext } from "react";
import { PlayersContext } from "./../../contexts/PlayersContext";
import { TeamContext } from "./../../contexts/TeamContext";

import "./../../styles/stats.css";

const PtsPlayersList = () => {
	const { teamMembers } = useContext(TeamContext);
	const { stats, statsAreLoading } = useContext(PlayersContext);

	let statsPts = [...stats].sort((a, b) => b.pts - a.pts);
	//console.log("pts stats :", statsPts);

	let playersPtsRank = [];
	for (let i = 0; i < 5; i++) {
		playersPtsRank[i] = teamMembers.filter(
			(player) => player.id === statsPts[i].player_id
		)[0];
		playersPtsRank[i].pts_stats = statsPts[i].pts.toFixed(2);
	}

	//------------------------

	if (statsAreLoading)
		return <div className="loading-message">Loading stats...</div>;

	return (
		<div className="PtsPlayersList StatsList">
			{playersPtsRank.map((player) => (
				<div key={player.id} className="d-flex justify-content-between rank">
					<p>
						{player.first_name} {player.last_name}
					</p>
					<p className="rank-numbers">{player.pts_stats}</p>
				</div>
			))}
		</div>
	);
};

export default PtsPlayersList;
