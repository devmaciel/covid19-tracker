import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
	return (
		<div className="infoBox">
			<Card>
				<CardContent>
					{/* Title */}
					<Typography className="infobox__title" color="textSecondary">{title}</Typography>
					{/* Number of cases */}
					<h2 className="infobox__cases">{cases}</h2>
					{/* Total cases */}
          <Typography className="infobox__total" color="textSecondary">{total} Total</Typography>
				</CardContent>
			</Card>
		</div>
	);
}

export default InfoBox;
