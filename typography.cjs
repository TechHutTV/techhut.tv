module.exports = ({ theme }) => ({
  DEFAULT: {
    css: {
      '--tw-prose-body': theme('colors.zinc.700'),
      '--tw-prose-headings': theme('colors.zinc.900'),
      '--tw-prose-links': theme('colors.primary.500'),
      '--tw-prose-links-hover': theme('colors.primary.600'),
      '--tw-prose-links-underline': theme('colors.primary.500 / 0.3'),
      '--tw-prose-bold': theme('colors.zinc.900'),
      '--tw-prose-counters': theme('colors.zinc.500'),
      '--tw-prose-bullets': theme('colors.zinc.300'),
      '--tw-prose-hr': theme('colors.zinc.900 / 0.05'),
      '--tw-prose-quotes': theme('colors.zinc.900'),
      '--tw-prose-quote-borders': theme('colors.zinc.200'),
      '--tw-prose-captions': theme('colors.zinc.500'),
      '--tw-prose-code': theme('colors.zinc.900'),
      '--tw-prose-code-bg': theme('colors.zinc.100'),
      '--tw-prose-code-ring': theme('colors.zinc.300'),
      '--tw-prose-pre-code': theme('colors.zinc.700'),
      '--tw-prose-pre-bg': theme('colors.zinc.50'),
      '--tw-prose-th-borders': theme('colors.zinc.300'),
      '--tw-prose-td-borders': theme('colors.zinc.200'),
      '--tw-prose-th-bg': theme('colors.zinc.100'),
      '--tw-prose-td-bg': theme('colors.zinc.50 / 0.5'),

      '--tw-prose-invert-body': theme('colors.zinc.400'),
      '--tw-prose-invert-headings': theme('colors.white'),
      '--tw-prose-invert-links': theme('colors.primary.400'),
      '--tw-prose-invert-links-hover': theme('colors.primary.500'),
      '--tw-prose-invert-links-underline': theme('colors.primary.500 / 0.3'),
      '--tw-prose-invert-bold': theme('colors.white'),
      '--tw-prose-invert-counters': theme('colors.zinc.400'),
      '--tw-prose-invert-bullets': theme('colors.zinc.600'),
      '--tw-prose-invert-hr': theme('colors.white / 0.05'),
      '--tw-prose-invert-quotes': theme('colors.zinc.100'),
      '--tw-prose-invert-quote-borders': theme('colors.zinc.700'),
      '--tw-prose-invert-captions': theme('colors.zinc.400'),
      '--tw-prose-invert-code': theme('colors.white'),
      '--tw-prose-invert-code-bg': theme('colors.zinc.700 / 0.15'),
      '--tw-prose-invert-code-ring': theme('colors.white / 0.1'),
      '--tw-prose-invert-pre-code': theme('colors.zinc.200'),
      '--tw-prose-invert-pre-bg': theme('colors.zinc.700'),
      '--tw-prose-invert-th-borders': theme('colors.zinc.600'),
      '--tw-prose-invert-td-borders': theme('colors.zinc.700'),
      '--tw-prose-invert-th-bg': theme('colors.zinc.800 / 0.5'),
      '--tw-prose-invert-td-bg': theme('colors.zinc.800 / 0.2'),

      // Base
      color: 'var(--tw-prose-body)',
      fontSize: theme('fontSize.sm')[0],
      lineHeight: theme('lineHeight.7'),

      // Layout
      maxWidth: '65ch',
      '> *': {
        maxWidth: 'none',
      },

      // Text
      fontSize: theme('fontSize.base')[0],
      lineHeight: theme('lineHeight.7'),
      p: {
        marginTop: '1.25em',
        marginBottom: '1.25em',
      },
      '[class~="lead"]': {
        fontSize: theme('fontSize.base')[0],
        ...theme('fontSize.base')[1],
      },

      // Lists
      ol: {
        listStyleType: 'decimal',
        marginTop: '1.25em',
        marginBottom: '1.25em',
        paddingLeft: '1.625em',
      },
      'ol[type="A"]': {
        listStyleType: 'upper-alpha',
      },
      'ol[type="a"]': {
        listStyleType: 'lower-alpha',
      },
      'ol[type="A" s]': {
        listStyleType: 'upper-alpha',
      },
      'ol[type="a" s]': {
        listStyleType: 'lower-alpha',
      },
      'ol[type="I"]': {
        listStyleType: 'upper-roman',
      },
      'ol[type="i"]': {
        listStyleType: 'lower-roman',
      },
      'ol[type="I" s]': {
        listStyleType: 'upper-roman',
      },
      'ol[type="i" s]': {
        listStyleType: 'lower-roman',
      },
      'ol[type="1"]': {
        listStyleType: 'decimal',
      },
      ul: {
        listStyleType: 'disc',
        marginTop: '1.25em',
        marginBottom: '1.25em',
        paddingLeft: '1.625em',
      },
      li: {
        marginTop: '0.5em',
        marginBottom: '0.5em',
      },
      ':is(ol, ul) > li': {
        paddingLeft: '0.375em',
      },
      'ol > li::marker': {
        fontWeight: '400',
        color: 'var(--tw-prose-counters)',
      },
      'ul > li::marker': {
        color: 'var(--tw-prose-bullets)',
      },
      '> ul > li p': {
        marginTop: theme('spacing.3'),
        marginBottom: theme('spacing.3'),
      },
      '> ul > li > *:first-child': {
        marginTop: theme('spacing.5'),
      },
      '> ul > li > *:last-child': {
        marginBottom: theme('spacing.5'),
      },
      '> ol > li > *:first-child': {
        marginTop: theme('spacing.5'),
      },
      '> ol > li > *:last-child': {
        marginBottom: theme('spacing.5'),
      },
      'ul ul, ul ol, ol ul, ol ol': {
        marginTop: theme('spacing.4'),
        marginBottom: theme('spacing.4'),
      },

      // Horizontal rules
      hr: {
        borderColor: 'var(--tw-prose-hr)',
        borderTopWidth: 1,
        marginTop: theme('spacing.16'),
        marginBottom: theme('spacing.16'),
        maxWidth: 'none',
        marginLeft: `calc(-1 * ${theme('spacing.4')})`,
        marginRight: `calc(-1 * ${theme('spacing.4')})`,
        '@screen sm': {
          marginLeft: `calc(-1 * ${theme('spacing.6')})`,
          marginRight: `calc(-1 * ${theme('spacing.6')})`,
        },
        '@screen lg': {
          marginLeft: `calc(-1 * ${theme('spacing.8')})`,
          marginRight: `calc(-1 * ${theme('spacing.8')})`,
        },
      },

      // Quotes
      blockquote: {
        fontWeight: '500',
        fontStyle: 'italic',
        color: 'var(--tw-prose-quotes)',
        borderLeftWidth: '0.25rem',
        borderLeftColor: 'var(--tw-prose-quote-borders)',
        quotes: '"\\201C""\\201D""\\2018""\\2019"',
        marginTop: '1.6em',
        marginBottom: '1.6em',
        paddingLeft: '1em',
      },
      'blockquote p:first-of-type::before': {
        content: 'open-quote',
      },
      'blockquote p:last-of-type::after': {
        content: 'close-quote',
      },

      // Headings
      h1: {
        color: 'var(--tw-prose-headings)',
        fontWeight: '800',
        fontSize: '2.25em',
        marginTop: '0',
        marginBottom: '0.8888889em',
        lineHeight: '1.1111111',
      },
      'h1 strong': {
        fontWeight: '900',
        color: 'inherit',
      },
      h2: {
        color: 'var(--tw-prose-headings)',
        fontWeight: '700',
        fontSize: '1.5em',
        marginTop: '2em',
        marginBottom: '1em',
        lineHeight: '1.3333333',
      },
      'h2 strong': {
        fontWeight: '800',
        color: 'inherit',
      },
      h3: {
        color: 'var(--tw-prose-headings)',
        fontWeight: '600',
        fontSize: '1.25em',
        marginTop: '1.6em',
        marginBottom: '0.6em',
        lineHeight: '1.6',
      },
      'h3 strong': {
        fontWeight: '700',
        color: 'inherit',
      },
      h4: {
        color: 'var(--tw-prose-headings)',
        fontWeight: '600',
        marginTop: '1.5em',
        marginBottom: '0.5em',
        lineHeight: '1.5',
      },
      'h4 strong': {
        fontWeight: '700',
        color: 'inherit',
      },
      h5: {
        color: 'var(--tw-prose-headings)',
        fontSize: theme('fontSize.sm')[0],
        ...theme('fontSize.sm')[1],
        fontWeight: '600',
        marginTop: theme('spacing.6'),
        marginBottom: theme('spacing.3'),
      },
      h6: {
        color: 'var(--tw-prose-headings)',
        fontSize: theme('fontSize.sm')[0],
        ...theme('fontSize.sm')[1],
        fontWeight: '600',
        marginTop: theme('spacing.6'),
        marginBottom: theme('spacing.3'),
      },

      // Media
      img: {
        marginTop: '2em',
        marginBottom: '2em',
      },
      picture: {
        display: 'block',
        marginTop: '2em',
        marginBottom: '2em',
      },
      video: {
        marginTop: '2em',
        marginBottom: '2em',
      },
      'figure > *': {
        marginTop: '0',
        marginBottom: '0',
      },
      figcaption: {
        color: 'var(--tw-prose-captions)',
        fontSize: theme('fontSize.xs')[0],
        ...theme('fontSize.xs')[1],
        marginTop: theme('spacing.2'),
      },

      // Tables
      table: {
        width: '100%',
        tableLayout: 'auto',
        textAlign: 'left',
        marginTop: theme('spacing.8'),
        marginBottom: theme('spacing.8'),
        lineHeight: theme('lineHeight.6'),
        borderRadius: theme('borderRadius.lg'),
        borderWidth: '1px',
        borderColor: 'var(--tw-prose-th-borders)',
        boxShadow: theme('boxShadow.sm'),
      },
      thead: {
        backgroundColor: 'var(--tw-prose-th-bg)',
        borderBottomWidth: '2px',
        borderBottomColor: 'var(--tw-prose-th-borders)',
      },
      'thead th': {
        color: 'var(--tw-prose-headings)',
        fontWeight: '600',
        verticalAlign: 'bottom',
        paddingTop: theme('spacing.4'),
        paddingRight: theme('spacing.4'),
        paddingBottom: theme('spacing.4'),
        paddingLeft: theme('spacing.4'),
        fontSize: theme('fontSize.sm')[0],
        textTransform: 'uppercase',
        letterSpacing: theme('letterSpacing.wide'),
      },
      'thead th:first-child': {
        paddingLeft: theme('spacing.4'),
      },
      'thead th:last-child': {
        paddingRight: theme('spacing.4'),
      },
      'tbody tr': {
        borderBottomWidth: '1px',
        borderBottomColor: 'var(--tw-prose-td-borders)',
        transitionProperty: 'background-color',
        transitionDuration: theme('transitionDuration.DEFAULT'),
        transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
        '&:hover': {
          backgroundColor: 'var(--tw-prose-td-bg)',
        },
        '&:nth-child(even)': {
          backgroundColor: 'var(--tw-prose-td-bg)',
        },
      },
      'tbody tr:last-child': {
        borderBottomWidth: '0',
      },
      'tbody td': {
        verticalAlign: 'middle',
      },
      tfoot: {
        borderTopWidth: '2px',
        borderTopColor: 'var(--tw-prose-th-borders)',
        backgroundColor: 'var(--tw-prose-td-bg)',
      },
      'tfoot td': {
        verticalAlign: 'top',
      },
      ':is(tbody, tfoot) td': {
        paddingTop: theme('spacing.4'),
        paddingRight: theme('spacing.4'),
        paddingBottom: theme('spacing.4'),
        paddingLeft: theme('spacing.4'),
      },
      ':is(tbody, tfoot) td:first-child': {
        paddingLeft: theme('spacing.4'),
      },
      ':is(tbody, tfoot) td:last-child': {
        paddingRight: theme('spacing.4'),
      },

      // Inline elements
      a: {
        color: 'var(--tw-prose-links)',
        textDecoration: 'underline transparent',
        fontWeight: '500',
        transitionProperty: 'color, text-decoration-color',
        transitionDuration: theme('transitionDuration.DEFAULT'),
        transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
        '&:hover': {
          color: 'var(--tw-prose-links-hover)',
          textDecorationColor: 'var(--tw-prose-links-underline)',
        },
      },
      ':is(h1, h2, h3) a': {
        fontWeight: 'inherit',
      },
      strong: {
        color: 'var(--tw-prose-bold)',
        fontWeight: '600',
      },
      ':is(a, blockquote, thead th) strong': {
        color: 'inherit',
      },
      code: {
        color: 'var(--tw-prose-code)',
        fontWeight: '600',
        fontSize: '0.875em',
        paddingTop: '3px',
        paddingBottom: '3px',
        paddingLeft: '5px',
        paddingRight: '5px',
        borderRadius: '0.25rem',
      },
      'code::before': {
        content: '"`"',
        display: 'none',
      },
      'code::after': {
        content: '"`"',
        display: 'none',
      },
      ':is(a, h1, h2, h3, blockquote, thead th) code': {
        color: 'inherit',
      },
      'h1 code': {
        color: 'inherit',
      },
      'h2 code': {
        color: 'inherit',
        fontSize: '0.875em',
      },
      'h3 code': {
        color: 'inherit',
        fontSize: '0.9em',
      },
      'h4 code': {
        color: 'inherit',
      },
      'blockquote code': {
        color: 'inherit',
      },
      'thead th code': {
        color: 'inherit',
      },
      pre: {
        color: 'var(--tw-prose-pre-code)',
        backgroundColor: 'var(--tw-prose-pre-bg)',
        overflowX: 'auto',
        fontWeight: '400',
        fontSize: '0.875em',
        lineHeight: '1.7142857',
        marginTop: '1.7142857em',
        marginBottom: '1.7142857em',
        borderRadius: '0.375rem',
        paddingTop: '0.8571429em',
        paddingRight: '1.1428571em',
        paddingBottom: '0.8571429em',
        paddingLeft: '1.1428571em',
      },
      'pre code': {
        backgroundColor: 'transparent',
        borderWidth: '0',
        borderRadius: '0',
        padding: '0',
        fontWeight: 'inherit',
        color: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        lineHeight: 'inherit',
      },
      'pre code::before': {
        content: 'none',
      },
      'pre code::after': {
        content: 'none',
      },
      pre: {
        color: 'var(--tw-prose-pre-code)',
        backgroundColor: 'var(--tw-prose-pre-bg)',
        overflowX: 'auto',
        fontWeight: '400',
        fontSize: '0.875em',
        lineHeight: '1.7142857',
        marginTop: '1.7142857em',
        marginBottom: '1.7142857em',
        borderRadius: '0.375rem',
        paddingTop: '0.8571429em',
        paddingRight: '1.1428571em',
        paddingBottom: '0.8571429em',
        paddingLeft: '1.1428571em',
      },
      'pre code': {
        backgroundColor: 'transparent',
        borderWidth: '0',
        borderRadius: '0',
        padding: '0',
        fontWeight: 'inherit',
        color: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        lineHeight: 'inherit',
      },
      'pre code::before': {
        content: 'none',
      },
      'pre code::after': {
        content: 'none',
      },

      // Overrides
      ':is(h1, h2, h3) + *': {
        marginTop: '0',
      },
      '> :first-child': {
        marginTop: '0 !important',
      },
      '> :last-child': {
        marginBottom: '0 !important',
      },
    },
  },
  invert: {
    css: {
      '--tw-prose-body': 'var(--tw-prose-invert-body)',
      '--tw-prose-headings': 'var(--tw-prose-invert-headings)',
      '--tw-prose-links': 'var(--tw-prose-invert-links)',
      '--tw-prose-links-hover': 'var(--tw-prose-invert-links-hover)',
      '--tw-prose-links-underline': 'var(--tw-prose-invert-links-underline)',
      '--tw-prose-bold': 'var(--tw-prose-invert-bold)',
      '--tw-prose-counters': 'var(--tw-prose-invert-counters)',
      '--tw-prose-bullets': 'var(--tw-prose-invert-bullets)',
      '--tw-prose-hr': 'var(--tw-prose-invert-hr)',
      '--tw-prose-quotes': 'var(--tw-prose-invert-quotes)',
      '--tw-prose-quote-borders': 'var(--tw-prose-invert-quote-borders)',
      '--tw-prose-captions': 'var(--tw-prose-invert-captions)',
      '--tw-prose-code': 'var(--tw-prose-invert-code)',
      '--tw-prose-code-bg': 'var(--tw-prose-invert-code-bg)',
      '--tw-prose-code-ring': 'var(--tw-prose-invert-code-ring)',
      '--tw-prose-pre-code': 'var(--tw-prose-invert-pre-code)',
      '--tw-prose-pre-bg': 'var(--tw-prose-invert-pre-bg)',
      '--tw-prose-th-borders': 'var(--tw-prose-invert-th-borders)',
      '--tw-prose-td-borders': 'var(--tw-prose-invert-td-borders)',
      '--tw-prose-th-bg': 'var(--tw-prose-invert-th-bg)',
      '--tw-prose-td-bg': 'var(--tw-prose-invert-td-bg)',
      blockquote: {
        borderLeftColor: theme('colors.primary.400'),
        backgroundColor: theme('colors.primary.900 / 0.2'),
      },
    },
  },
})
