<script lang="ts">
	export let avatar: string;
	export let fname: string;
	export let lname: string;
	export let createdAt: Date;
	export let text: string;
</script>

<div class="border rounded-lg p-2 w-full">
	<div class="flex gap-2">
		<div class="h-10 w-10 overflow-hidden rounded-full mb-2">
			<img src={avatar} alt="avatar" class="h-full w-full" />
		</div>
		<div class="flex items-baseline gap-2">
			<h2>{fname} {lname}</h2>
			<p class="text-xs">@{fname}</p>
			<p class="text-xs">{createdAt.toLocaleDateString()}</p>
		</div>
	</div>
	<div>
		<p>{text}</p>
	</div>
</div>
