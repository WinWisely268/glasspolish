import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import UserAvatar, {UserAvatarProps} from "./UserAvatar"

export default {
    title: 'UserAvatar',
    component: UserAvatar,
} as Meta

const Template: Story<UserAvatarProps> = (args) => <UserAvatar {...args} />

export const EmptyAvatar = Template.bind({})
EmptyAvatar.args = {}