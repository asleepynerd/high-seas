'use client'

import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../../../components/ui/button'
import Icon from '@hackclub/icons'
import Modal from '../../../components/ui/modal'
import { handleEmailSubmission } from '../marketing-utils'
import { sendInviteJob } from '../invite-job'
import { usePlausible } from 'next-plausible'

export default function EmailSubmissionForm() {
  const [email, setEmail] = useState<string>()
  const [errorText, setErrorText] = useState<string>()
  const [t, sT] = useState<Timer>()
  const formRef = useRef<HTMLFormElement>(null)
  const plausible = usePlausible()

  const handleForm = async (formData: FormData) => {
    setErrorText('High Seas has ended! Sign-ups are disabled.')
    return
    /*
    const emailStr = (formData.get('email') as string).trim().toLowerCase()

    if (t) {
      clearTimeout(t)
      sT(undefined)
    }

    if (!emailStr) {
      setErrorText('You need to enter an email.')
      sT(
        setTimeout(() => {
          setErrorText(undefined)
          formRef.current?.reset()
        }, 2_500),
      )
      return
    }
    if (!validEmail(emailStr)) {
      setErrorText('You need to enter a valid email.')
      sT(
        setTimeout(() => {
          setErrorText(undefined)
          formRef.current?.reset()
        }, 2_500),
      )
      return
    }

    const ua = navigator?.userAgent
    const mobile = !!ua?.toLowerCase().includes('mobile')
    const urlParams = window?.location?.search || ''

    await Promise.all([
      handleEmailSubmission(emailStr, mobile, ua, urlParams),
      sendInviteJob({ email: emailStr, userAgent: ua }),
    ])
    setEmail(emailStr)
    plausible('sign-up')
    */
  }

  let origin = ''
  if (typeof window !== 'undefined') {
    origin = encodeURIComponent(window.location.origin)
  }
  const slackAuthUrl = `https://hackclub.slack.com/oauth/v2/authorize?scope=&user_scope=openid%2Cprofile%2Cemail&redirect_uri=${origin}/api/slack_redirect&client_id=2210535565.7780087007589`

  return (
    <>
      <div className="flex flex-col">
        <div className="px-6 py-4 rounded-lg text-md border-2 border-[#3852CD] bg-[#FA4C3599] text-white">
          High Seas has ended! Sign-ups are disabled.
        </div>
        {/*
        <form
          ref={formRef}
          action={handleForm}
          className="flex flex-wrap text-xl md:text-xl justify-center items-center rounded-xl gap-2"
        >
          <input
            type="text"
            name="email"
            placeholder="name@email.com"
            className="px-6 py-2 rounded-lg text-md border-2 border-[#3852CD]"
          />
          <Button
            // disabled={buttonDisabled}
            className="px-6 py-2 text-2xl h-full disabled:opacity-50 bg-blues rounded-md text-white pop"
          >
            Get started <Icon glyph="enter" />
          </Button>
        </form>

        {errorText ? (
          <div className="mt-2 border-2 border-[#3852CD] bg-blues px-4 py-2 rounded-md text-white">
            {errorText}
          </div>
        ) : (
          <div className="mt-2 border-2 opacity-0 border-[#3852CD] bg-blues px-4 py-2 rounded-md text-white">
            You need to enter an Email
          </div>
        )}
        */}
      </div>

      <Modal isOpen={!!email} close={() => setEmail(undefined)}>
        <div
          className="flex flex-col gap-12"
          style={{ maxHeight: '75vh', overflowY: 'auto' }}
        >
          <div>
            <p className="text-3xl mb-4">Your journey begins 🏴‍☠️</p>
            <p className="mb-4">
              We've sent you an invite to Slack! It should arrive in your inbox
              in under a minute
            </p>

            <p className="text-xl mb-4">Starting High Seas has 3 steps:</p>
            <ol className="ml-4">
              <li className="flex items-center text-bold">
                1. Join Slack{' '}
                <span className="italic text-sm ml-2">← you are here</span>
              </li>
              <li>2. Do the Tutorial</li>
              <li>3. Install Hackatime</li>
            </ol>
          </div>
          <img
            src="/party-orpheus.svg"
            className="w-1/3 mx-auto"
            alt="Party Orpheus"
          />

          <p className="text-sm italic">
            If you already have a Hack Club Slack account,{' '}
            <a className="underline" href={slackAuthUrl}>
              click here instead
            </a>
          </p>
          <Button onClick={() => setEmail(undefined)}>
            Aye aye - I'll check my email!
          </Button>
        </div>
      </Modal>
    </>
  )
}

export const validEmail = (email: string): boolean =>
  !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
