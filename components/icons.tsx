import { LucideProps, User } from 'lucide-react';

export const Icons = {
  user: User,
  logo: (props: LucideProps) => (
    <svg
      {...props}
      data-testid='geist-icon'
      height={24}
      shapeRendering='geometricPrecision'
      stroke='#0ea4e9r'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      width={24}
    >
      <path
        fill='#0ea4e9'
        d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'
      />
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='705.6'
      height={24}
      viewBox='0 0 186.69 190.5'
    >
      <g transform='translate(1184.583 765.171)'>
        <path
          clipPath='none'
          mask='none'
          d='M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z'
          fill='#4285f4'
        />
        <path
          clipPath='none'
          mask='none'
          d='M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z'
          fill='#34a853'
        />
        <path
          clipPath='none'
          mask='none'
          d='M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z'
          fill='#fbbc05'
        />
        <path
          d='M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z'
          fill='#ea4335'
          clipPath='none'
          mask='none'
        />
      </g>
    </svg>
  ),
  heart: (props: LucideProps) => (
    <svg
      {...props}
      data-testid='geist-icon'
      height={20}
      shapeRendering='geometricPrecision'
      stroke='#64748b'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      width={20}
    >
      <path
        d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
        fill='var(--geist-fill)'
      />
    </svg>
  ),
  verified: (props: LucideProps) => (
    <svg
      {...props}
      viewBox='0 0 22 22'
      aria-label='Verified account'
      role='img'
      data-testid='icon-verified'
      height={20}
      width={20}
      fill='#1d9cf0'
    >
      <g>
        <path d='M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z'></path>
      </g>
    </svg>
  ),
};
