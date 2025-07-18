from openai import OpenAI

client = OpenAI(
	base_url="http://172.17.124.33:9528/v1",
	# base_url="http://172.17.124.12:8024/v1",
	api_key = "EMPTY"
)
last_id = None
while True:
	user_input = input("\n> ")
	if user_input.lower() in ["exit", "quit"]:
		break
	if last_id:
		response = client.responses.create(
			model = "/mnt/disk2/yr/Qwen2.5-72B-Instruct", 
			#model = "/mnt/nas_infinith/gyj/models/qwen2.5/Qwen2.5-72B-Instruct",
			input = user_input, 
			previous_response_id = last_id
		)
	else:
		response = client.responses.create(
			model = "/mnt/disk2/yr/Qwen2.5-72B-Instruct", 
			#model = "/mnt/nas_infinith/gyj/models/qwen2.5/Qwen2.5-72B-Instruct",
			input = user_input
		)
	last_id = response.id
	print("\n" + response.output_text)
	

# 世界上人口最多的国家是哪个？