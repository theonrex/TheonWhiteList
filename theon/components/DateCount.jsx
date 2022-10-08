import React from 'react'
import { useState, useEffect } from "react";




const DateCount = () => {

    const [expiryTime, setExpiryTime] = useState("5 feb 2024 15:30:25");
		const [countdownTime, setCountdownTime] = useState({
			countdownDays: "",
			countdownHours: "",
			countdownlMinutes: "",
			countdownSeconds: "",
		});

		const countdownTimer = () => {
			const timeInterval = setInterval(() => {
				const countdownDateTime = new Date(expiryTime).getTime();
				const currentTime = new Date().getTime();
				const remainingDayTime = countdownDateTime - currentTime;
				const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
				const totalHours = Math.floor(
					(remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const totalMinutes = Math.floor(
					(remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
				);
				const totalSeconds = Math.floor(
					(remainingDayTime % (1000 * 60)) / 1000
				);

				const runningCountdownTime = {
					countdownDays: totalDays,
					countdownHours: totalHours,
					countdownMinutes: totalMinutes,
					countdownSeconds: totalSeconds,
				};

				setCountdownTime(runningCountdownTime);

				if (remainingDayTime < 0) {
					clearInterval(timeInterval);
					setExpiryTime(false);
				}
			}, 1000);
		};

		useEffect(() => {
			countdownTimer();
		});
    
  return (
		<div>
			{" "}
			<div className="">
				<h4 className="Presale_text ">Presale Starts in</h4>
				<div className="rowx ">
					{expiryTime !== false ? (
						<div className=" ">
							<section className="date_container btn_time_header">
								<h4 className="btn_timer col25">
									{countdownTime.countdownDays} <br /> <span>Days</span>
								</h4>

								<h4 className="btn_timer col25">
									{countdownTime.countdownHours} <br /> <span>Hours</span>
								</h4>

								<h4 className="btn_timer col25">
									{countdownTime.countdownMinutes} <br /> <span>Minutes</span>
								</h4>

								<h4 className="btn_timer col25">
									{countdownTime.countdownSeconds} <br /> <span>Seconds</span>
								</h4>
							</section>
						</div>
					) : (
						<p> Presale Started</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default DateCount