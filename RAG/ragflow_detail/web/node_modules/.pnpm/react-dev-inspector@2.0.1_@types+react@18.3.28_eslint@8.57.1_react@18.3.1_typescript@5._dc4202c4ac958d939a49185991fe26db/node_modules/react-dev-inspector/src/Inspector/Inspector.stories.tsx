import { useState, useRef } from 'react'
import type { Meta } from '@storybook/react'
import {
  type Subscription,
  interval,
  tap,
  take,
} from 'rxjs'
import { Card } from '../.stories/Card'
import {
  Switch,
  Label,
  Card as CardContainer,
  CardHeader,
  CardContent,
  CardFooter,
} from '../.stories/components'
import {
  Inspector,
  defaultHotkeys,
} from './Inspector'

// https://storybook.js.org/docs/react/writing-stories/introduction#component-story-format
export default {
  title: 'Inspector',
} satisfies Meta

// storybook render component
export const CommonHotkeys = () => {
  return (
    <Inspector>
      <Card
        title='React Dev Inspector'
        description={`hotkeys: \`${defaultHotkeys().join(' + ')}\``}
      />
    </Inspector>
  )
}


export const CustomHotkeys = () => {
  return (
    <Inspector
      keys={['ctrl', 'shift', 'x']}
    >
      <Card
        title='React Dev Inspector'
        description='hotkeys: `Control + Shift + X`'
      />
    </Inspector>
  )
}


export const ControlState = () => {
  const [active, setActive] = useState(false)

  return (
    <Inspector
      active={active}
      onActiveChange={setActive}
    >
      <Card
        title='React Dev Inspector'
        description='control by both Hotkeys and Buttons ↓'
        cancelText='Deactivate'
        onCancel={() => setActive(false)}
        confirmText='Activate'
        onConfirm={() => setActive(true)}
      />
    </Inspector>
  )
}


export const DisableHotkeys = () => {
  const [active, _setActive] = useState(false)
  const [timeRemaining, setRemaining] = useState(0)
  const remainRef = useRef<Subscription>()
  const waitSeconds = 3

  const setActive = (active: boolean) => {
    if (active) {
      _setActive(true)
      setRemaining(waitSeconds)
      remainRef.current = interval(1000)
        .pipe(
          take(waitSeconds),
          tap(seconds => setRemaining(waitSeconds - (seconds + 1))),
        )
        .subscribe({
          complete: () => setActive(false),
        })
    }
    else if (!active && remainRef.current) {
      remainRef.current.unsubscribe()
      _setActive(false)
    }
  }

  return (
    <Inspector
      keys={null}
      active={active}
      onActiveChange={setActive}
    >
      <CardContainer className='w-96'>
        <CardHeader
          title='React Dev Inspector'
          description='Hotkeys disabled, only control by Switch ↓'
        />
        <CardContent />
        <CardFooter className='flex justify-start'>
          <div className='flex items-center space-x-2'>
            <Switch
              id='inspector-switch'
              checked={active}
              onCheckedChange={setActive}
            />
            <Label htmlFor='inspector-switch'>
              {
                !active
                  ? 'Activate'
                  : `Will auto deactivate after ${timeRemaining}s.`
              }
            </Label>
          </div>
        </CardFooter>
      </CardContainer>
    </Inspector>
  )
}


export const Disabled = () => {
  const [available, setAvailable] = useState(true)
  const [active, setActive] = useState(false)

  return (
    <Inspector
      active={active}
      onActiveChange={setActive}
      disable={!available}
    >
      <Card
        title='React Dev Inspector'
        description='disable for both Hotkeys and Buttons ↓'
        cancelText='Deactivate'
        onCancel={() => setActive(false)}
        confirmText='Activate'
        onConfirm={() => setActive(true)}
      >
        <div className='flex justify-start items-center space-x-2'>
          <Switch
            id='inspector-switch'
            checked={available}
            onCheckedChange={available => {
              setAvailable(available)
              setActive(false)
            }}
          />
          <Label htmlFor='inspector-switch'>
            {!available ? `Disabled` : `Enabled`}
          </Label>
        </div>
      </Card>
    </Inspector>
  )
}

