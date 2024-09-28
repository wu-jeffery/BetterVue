/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebarLight': '#f9f9f9',
        'sidebarDark': '#1f2020',
        'textLight': '#000000',
        'textDark': '#FFFFFF',
        'bgLight': '#FFFFFF',
        'bgDark': '#000000',
        'header': '#14283A',
        'textareaLight': '#F4F4F4',
        'textareaDark': '#212121'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      translate: {
        '1/12': '8.3333%',
        '2/12': '16.6666%',
        '3/12': '25%',
        '4/12': '33.3333%',
        '5/12': '41.6666%',
        '6/12': '50%',
        '7/12': '58.3333%',
        '8/12': '66.6666%',
        '9/12': '75%',
        '10/12': '83.3333%',
        '11/12': '91.6666%',
        '12/12': '100%',
        '1/5': '20%'
      },
      spacing: {
        '1/96': '1.04222%',
        '1/48': '2.08444%',
        '1/12': '8.3333%',
        '1/8': '12.5%',
        '2/12': '16.6666%',
        '1/5': '20%',
        '3/12': '25%',
        '3.5/12': '29.1667%',
        '4/12': '33.3333%',
        '4.5/12': '37.5%',
        '5/12': '41.6666%',
        '6/12': '50%',
        '7/12': '58.3333%',
        '3/5': '60%',
        '8/12': '66.6666%',
        '8.5/12': '70.8333%',
        '9/12': '75%',
        '9.5/12': '79.1667%',
        '10/12': '83.3333%',
        '11/12': '91.6666%',
        '12/12': '100%',
        '1/50': '2%',
        '61/75': '81.3333%',
        '119/150': '79.3333%',
        '1/14': '7.1429%',
        '2/14': '14.2857%',
        '3/14': '21.4286%',
        '4/14': '28.5714%',
        '5/14': '35.7143%',
        '6/14': '42.4286%',
        '7/14': '50%',
        '8/14': '57.1427%',
        '9/14': '64.2857%',
        '10/14': '71.4286%',
        '11/14': '78.5714%',
        '12/14': '85.7143%',
        '12.5/14': '89.2857%',
        '13/14': '92.8571%'
      },
      borderWidth: {
        '1/12': '8.3333%',
        '1/8': '12.5%',
        '2/12': '16.6666%',
        '3/12': '25%',
        '4/12': '33.3333%',
        '5/12': '41.6666%',
        '6/12': '50%',
        '7/12': '58.3333%',
        '8/12': '66.6666%',
        '9/12': '75%',
        '10/12': '83.3333%',
        '11/12': '91.6666%',
        '12/12': '100%',
        '1/50': '2%',
        '61/75': '81.3333%'
      }
    },
  },
  plugins: [],
};