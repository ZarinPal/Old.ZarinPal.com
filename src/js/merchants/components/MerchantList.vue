<template lang="pug">
span
	.loading(v-if="loading")
		i.loadbar

	.container
		h6.section-merchant.major--title.ta-center-firm {{ catInfo.parent.title }} » {{ catInfo.child.title }}
		hr.fancy
	//- h6.breadcrumb(v-if="catInfo") {{ catInfo.parent.title }} » {{ catInfo.child.title }}

	.column__mobile-16.column__tablet-8.column__desktop-4.merchant-cell(v-for="(merchant, index) in merchantItems")
		a.merchant(:href="'http://' + merchant.domain + '?utm_campaign=ZarinPalMerchant&utm_medium=banner&utm_source=ZarinPal'" target="_blank")
			figure.merch-figure(v-if="show" transition="expand" v-bind:style="{ 'border-color': colors[index] }")

				.category
					svg.svg--icon(width="24" height="24" viewBox="0 0 30 33")
						use(v-bind:xlink:href="'#'+catInfo.parent.slug" v-bind::fill="colors[index]")
					span {{ catInfo.child.title }}
						small {{ catInfo.parent.title }}
				.row
					img.picto(v-bind:src="merchant.logo" v-bind::alt="merchant.siteName" v-bind:style="{ 'background-color': colors[index] }")
					h2.titly {{ merchant.siteName | truncString }}
				p.decly {{ merchant.siteContent | truncString }}
				p.dately {{ merchant.createdAt | persian }}
				p.urly {{ merchant.domain }}

	nav.pagination
		router-link.page-link(v-if="pageInfo.currentPage - 1 > 0" tag="li" v-bind:to="{ name: 'MerchantList', params: { page: pageInfo.currentPage - 1 }}") &laquo; صفحه قبل
		router-link.page-link(v-for="n in pageInfo.lastPage" v-if="(n < pageInfo.currentPage + 6 && n > pageInfo.currentPage - 6) && pageInfo.lastPage > pageInfo.currentPage - 1 " v-bind:class="{ 'current': pageInfo.currentPage === n }" v-bind:to="{ name: 'MerchantList', params: { page: n }}") {{ n | persian }}
		router-link.page-link(v-if="pageInfo.lastPage > pageInfo.currentPage" v-bind:to="{ name: 'MerchantList', params: { page: pageInfo.currentPage + 1 }}") صفحه بعد &raquo;



</template>

<script>
export default {
	name: 'MerchantList',
	data() {
		return {
			loading: true,
			show: true,
			colors: ['#F17105', '#3BCCFF', '#FF4C3A', '#5CA4A9', '#462255', '#94C9A9', '#7F6B7C', '#E5A532', '#1A8FE3', '#FF85C2', '#F876FF', '#FF4D63', '#3090D1', '#419D78', '#FF6B43', '#8DC63F', '#15D2AF', '#39A9DB', '#D63230', '#0fde32'],
			catInfo: null,
			merchantItems: [],
			pageInfo: [],
			catId: '',
		}
	},

	methods: {
		fetchData(cat, pageNum) {
			this.$http.get(`https://www.zarinpal.com/panel/frontPage/webServicesList.json/${cat}?page=${pageNum}`).then(res => {
				this.$set(this, 'catInfo', res.data.catInfo);
				this.$set(this, 'merchantItems', res.data.list);
				this.$set(this, 'pageInfo', res.data.pageInfo);
				this.$set(this, 'loading', false);
				this.$set(this, 'catId', cat);

				const nTitle = `${res.data.catInfo.parent.title} » ${res.data.catInfo.child.title}`;

				document.title = `${nTitle} • پذیرندگان | زرین‌پال، کیف‌پول الکترونیک`;

				// this.totalPages();
			});
		},
	},

    mounted() {
		// Get Merchant Items data
		this.fetchData(this.$route.params.cat, this.$route.params.page);
	},
    watch: {
        '$route' (to, from) {
            const page = to.params.page;
			const cat = to.params.cat;

			this.$set(this, 'loading', true);
			this.$set(this, 'merchantItems', '');
			this.fetchData(cat, page);
        }
    },

	filters: {
		persian(str) {
			let value = str.toString();
			const englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
			const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];

			for (let i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
				value = value.replace(new RegExp(englishNumbers[i], 'g'), persianNumbers[i]);
			}
			return value;
		},
		truncString(str) {
			const delimiter = "...";
			const overflow = false;
			let ret = str;
			const maxLength = 60;
			if (ret.length > maxLength) {
				let breakpoint = overflow ? maxLength + ret.substr(maxLength).indexOf(" ") : ret.substr(0, maxLength).lastIndexOf(" ");
				ret = ret.substr(0, breakpoint) + delimiter;
			}
			return ret;
			// const max = 50;
			// const add = '...';
			// return (str.length > max ? str.substring(0, max) + add : str);
		}
	}
}
</script>

<style lang="sass">
	@import '../../../sass/plugins/functions.scss';
	@import '../../../sass/plugins/variables.scss';
	@import '../../../sass/plugins/mixins.scss';
	@import '../../../sass/plugins/typography.scss';
	@import '../../../sass/plugins/modules.scss';
	.loading{
		position: fixed;
		overflow: hidden;
		bottom: exponent(3, 1.618) * 1px;
		left: 50%;
		transform: translateX(-50%);
		cursor: wait;
		width: 6rem;
		height: 6rem;
		text-align: center;
		background-color: rgba(white, .95);
		// background-color: white;
		box-shadow: 0 1px 12px rgba(black, 0.1),
					0 2px 15px rgba(black, 0.1);
		border-radius: 100%;
		@extend .center-of-center;
		user-select: none;
		z-index: 9;
		.loadbar{
			display: block;
			margin: 1.25rem auto;
			width: 3.5rem;
			height: 3.5rem;
			border: 1px solid;
			// border-top-color: #29d;
			// border-right-color: #29d;
			// border-left-color: #FDC644;
			border-radius: 100%;
			animation: loader 0.64s linear infinite;
			border-color: palette(blue, light);
			border-left-color: palette(dark, base);
		}
	}

	.breadcrumb {
		padding: 0 2rem;
		user-select: none;
		&:before {
			content: '';
			width: 6px;
			height: 6px;
			border-radius: 100%;
			display: inline-block;
			vertical-align: middle;
			margin-left: 10px;
			background-color: currentColor;
		}
	}
	.merchants{
		padding: $base-max-space / 2 0;
		// background: lighten(#CCDAE7, 12);
		@include gradient-vertical(#fff, lighten(#CCDAE7, 12));
		.merchant-cell {
			@media screen and (max-width: #{$tablet}) {
				.merchant {
					padding: 2rem 3rem;
				}
			}
		}
		.merchant {
			display: block;
			padding: 2rem;
			@extend %letter-spacing;
			.category {
				margin-bottom: 5px;
				text-align: right;
				display: table;
				width: 100%;
				margin-bottom: 20px;
				.svg--icon {
					margin-right: 0;
					margin-left: 10px;
					width: 2rem;
					height: 2rem;
					float: right;
				}
				span{
					overflow: hidden;
					display: block;
					font-size: 14px;
					font-weight: 300;
					color: lighten(palette(dark, accent), 15);
					small {
						display: block;
						font-size: .75em;
					}
				}
			}
			p{
				margin: 0 auto;
				font-size: 0.85rem;
			}
			.decly {
				margin-top: 1em;
				font-size: 0.8rem;
			}
			.urly {
				position: absolute;
				left: 1rem;
				bottom: 1rem;
				font-size: .775em;
				color: lighten(palette(dark, accent), 20);
				direction: ltr;
				text-align: left;
			}
			.titly {
				display: block;
				overflow: hidden;
				font-size: 1rem;
				font-weight: 300;
				padding-top: 3px;
				margin-bottom: 0;
				color: lighten(palette(dark, accent), 1);
			}
			.picto {
				// display: inline-block;
				// vertical-align: middle;
				float: right;
				background: #FDCF41;
				width: 2rem;
				height: 2rem;
				margin-left: 6px;
				border-radius: 100%;
				box-shadow: bottom-shadow(2);
			}
			.dately {
				margin-top: 6px;
				color: #7D7D7D;
			}
		}

	}
	.merch-figure{
		position: relative;
		padding: 1rem;
		height: 15em;
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
	}

	.section-merchant{
		font-size: 2.124rem;
		padding-top: 0;
		padding: 0 2rem;
		margin-top: 0;
	}
	.row-merch{
		margin: 0 -2.5rem !important;
	}
	/* always present */
	.expand-transition {
		transition: 0.2s ease-in-out;
		transform: translateY(0);
		opacity: 1;
	}

	/* .expand-enter defines the starting state for entering */
	/* .expand-leave defines the ending state for leaving */
	.expand-enter, .expand-leave {
		transform: translateY(-3rem);
		opacity: 0;
	}
</style>
