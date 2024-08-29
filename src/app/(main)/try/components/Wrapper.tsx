"use client";

import React from "react";
import { useToast } from "@/components/ui/use-toast";

import Loading from "@/components/Loading";

export default function Wrapper() {
	const { toast } = useToast();
	return (
		<div className="aspect-video bg-gray-200 p-2">
			<p>Demo</p>
			<button
				onClick={() => {
					toast({
						title: "Scheduled: Catch up",
						description: "Friday, February 10, 2023 at 5:57 PM",
					});
				}}
			>
				Show Toast
			</button>
			<Loading />
		</div>
	);
}
