<template lang="pug">
span
	.loading(v-if="loading")
		i.loadbar

	.container
		h6.section-merchant.major--title_light.ta-center-firm دسته‌بندی پذیرندگان
		hr.fancy

	.column__mobile-16.column__tablet-8.column__desktop-4.merchant-cell(v-for="(cat, index) in catList")
		.merchant
			figure.car-figure(v-if="show" transition="expand" v-bind:style="{ 'border-color': colors[index] }")

				.base
					svg.svg--icon(width="24" height="24" viewBox="0 0 30 33")
						use(v-bind:href="'#' + cat.category.slug" v-bind:fill="colors[index]")
					span {{ cat.category.title }}

				ul(v-for="item in cat.subCats")
					li(v-bind:id="item.slug")
						a(v-bind:href="'#/cat/'+item.publicId + '/page/1'") {{ item.title }}
</template>

<script>
export default {
	name: 'CatList',
	data() {
		return {
			loading: true,
			show: true,
			colors: ['#F17105', '#3BCCFF', '#FF4C3A', '#5CA4A9', '#462255', '#94C9A9', '#7F6B7C', '#E5A532', '#1A8FE3', '#FF85C2', '#F876FF', '#FF4D63', '#3090D1', '#419D78', '#FF6B43', '#8DC63F', '#15D2AF', '#39A9DB', '#D63230', '#0fde32'],
			catList: [],
		}
	},

	methods: {
		fetchData() {
			this.$http.get(`https://www.zarinpal.com/panel/frontPage/webServicesCat.json/`).then(res => {
				this.$set(this, 'catList', res.data);
				// this.$set('merchantItems', res.data.list);
				this.$set(this, 'loading', false);
			});
		}
	},

    mounted() {
        // Get Merchant Items data
		this.fetchData();
	},

	route: {
		data ({ to }) {
			// document.title = `${this.catInfo.title} • پذیرندگان | زرین‌پال، کیف‌پول الکترونیک`;

			this.$set('loading', true);
			// this.$set('merchantItems', '');
			this.fetchData();
		}
	}
}
</script>

<style lang="sass">
	@import '../../../sass/plugins/functions';
	@import '../../../sass/plugins/variables';
	@import '../../../sass/plugins/mixins';
	@import '../../../sass/plugins/typography';

	.merchants{
		.merchant {
			display: block;
			padding: 2rem;
			@extend %letter-spacing;
			.base {
				display: block;
				text-align: center;
				margin-bottom: 1em;
				border-bottom: 1px solid rgba(black, 0.1);
				.svg--icon {
					display: block;
					margin: 0 auto 0.25em;
					height: 3rem;
					width: 2rem;
				}
				span{
					font-size: 16px;
					font-weight: 300;
					color: lighten(palette(dark, accent), 15);
				}
			}
		}
	}
	.car-figure{
		position: relative;
		padding: 1rem;
		// min-height: 25rem;
		text-align: right;
		background: rgba(white, .8);
		border: 1px solid #FF85C2;
		box-shadow: 0 4px 6px rgba(black, 0.1);
		// box-shadow: 0 26px 40px -30px rgba(#10A0AD, 0.3);
		border-radius: $base-radius;
		will-change: transform;
		user-select: none;
		&:hover{
			border-color: darken(#FF85C2, 20);
			background: #FFFFFF;
			box-shadow: 0 20px 32px rgba(black, 0.1);
			transform: translateY(-3px);
		}
		ul {
			margin: 0 1em 0 0;
			font-weight: 200;
			font-size: .85em;
			a {
				color: palette(dark, gray);
				&:hover, &:active {
					color: palette(dark, base);
					// outline: 1px dotted;
				}
			}
		}
	}
</style>
