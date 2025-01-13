from utils.jwt import decode_access_token
token = {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiY3VzdG9tZXIiLCJleHAiOjE3MzcwMzA0MTd9.spyYOHGA15c-F-yEKAojLTFUz3HpfkjTfN8KBZ6p_tw","token_type":"bearer"}
print(decode_access_token(token))