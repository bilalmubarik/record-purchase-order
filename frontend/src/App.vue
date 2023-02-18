<template>
	<div class="container">
		<div class="form-box">
			<form @submit.prevent="submitForm">
				<h2>Add purchase orders</h2>
				<div>
					<label for="name">Vendor Name <span class="form-required"> *</span></label>
					<input type="text" id="name" v-model="name" required/>
				</div>
				<div>
					<label for="date">Date</label>
					<input type="date" id="date" v-model="date" />
				</div>
				<div>
					<label for="csv">CSV <span class="form-required"> *</span></label>
					<input type="file" id="csv" @change="handleFileChange" accept=".csv" required>
				</div>
				<div v-if="errorMessage">
					<p class="error-text">{{ errorMessage }}</p>
				</div>
				<div v-if="successMessage">
					<p class="success-text">{{ successMessage }}</p>
				</div>
				<button type="submit">Upload</button>
			</form>
		</div>
</div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
	setup() {
		const name = ref('')
		const date = ref('')
		const file = ref(null)
		const errorMessage = ref('')
		const successMessage = ref('')

		const handleFileChange = (event) => {
			const selectedFile = event.target.files[0]
			if (selectedFile) {
				file.value = selectedFile
			}
		}

		const submitForm = async () => {
			try {
				const formData = new FormData()
				formData.append('name', name.value)
				formData.append('date', date.value)
				formData.append('csv', file.value)
				const response = await axios.post('https://record-purchase-order-app.herokuapp.com/v1/vendor', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})

				if(response.data.error) {
					successMessage.value = '';
					errorMessage.value = response.data.message;
				} else {
					errorMessage.value = '';
					successMessage.value = response.data.message;
				}
			} catch (error) {
				successMessage.value = '';
				errorMessage.value = error.response.data.message;
				console.error(error.response.data.message)
			}
		}

		return { name, date, file, errorMessage, successMessage, handleFileChange, submitForm }
	}
}
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}

body {
	height: 100%;
	margin: 0;
	padding: 0;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
	background-color: #e6e6e6;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 100%;
	height: 100vh;
	min-height: 600px;
	padding: 20px;

	.form-box {
		width: 100%;
		max-width: 400px;
		padding: 30px 15px;
		border-radius: 4px;
		background-color: #fff;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;

		h2 {
			text-align: center;
		}

		div {
			margin-bottom: 10px;

			.form-required {
				color: #b0092d;
			}

			label {
				display: inline-block;
				margin: .5rem 0;
				color: #3d3935;
				letter-spacing: .2px;
				font-size: 1rem;
			}

			input {
				width: 100%;
				padding: 15px 10px;
				border: 1px solid #e6e6e6;
				border-radius: 4px;
				background-color: #fff;
				color: #3d3935;
				outline: 0;
			}

			.error-text {
				color: red;
			}

			.success-text {
				color: #3e8e41;
			}
		}

		button {
			width: 100%;
			margin-top: 10px;
			padding: 15px;
			border: none;
			border-radius: 4px;
			background-color: #3d3935;
			color: #fff;
			font-size: 1.125rem;
			letter-spacing: 2px;
			text-align: center;
			outline: none;
			cursor: pointer;
		}

		button:hover {
			background-color: #3e8e41;
		}
	}
}
</style>
