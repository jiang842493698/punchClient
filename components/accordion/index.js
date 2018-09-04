Component({
    externalClasses: ['wux-class'],
    relations: {
        '../accordion-group/index': {
            type: 'parent',
        },
    },
    properties: {
        key: {
            type: String,
            value: '',
        },
        thumb: {
            type: String,
            value: '',
        },
        title: {
            type: String,
            value: '',
        },
        content: {
            type: String,
            value: '',
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        onDetail: {
            type: String,
            value: '',
        },
        offDetail: {
            type: String,
            value: '', 
        }
    },
    data: {
        current: false,
        index: '0',
    },
    options: {
        multipleSlots: true
    },
    methods: {
        changeCurrent(current, index) {
            this.setData({
                current,
                index,
            })
        },
        onTap() {
            console.info("gggggggggg")
            const { index, disabled } = this.data
            console.info(index)
            const parent = this.getRelationNodes('../accordion-group/index')[0]

            if (disabled || !parent) {
                return false
            }

            parent.onClickItem(index)
        },
    },
})