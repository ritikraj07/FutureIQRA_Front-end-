import { createSlice, current } from '@reduxjs/toolkit';

const Course = {
    name: '',
    instructor: '',
    price: '',
    description: '',
    videos: [],
    discount: 0,
    intro: '',
    coursetype:''
}


const CourseSlice = createSlice({
    name: Course,
    initialState: Course,
    reducers: {
        setCourse: (state, action) => {
            let {coursetype, name, instructor, price, description, videos, intro, duration } = action.payload
            state.name = name,
                state.instructor = instructor,
                state.price = price,
                state.videos = videos,
                state.coursetype = coursetype,
                state.description = description,
                state.intro = intro,
                state.duration = duration            
            // console.log('current state',current(state))
        },

        
       
    }
})


export const { setCourse } = CourseSlice.actions

export default CourseSlice.reducer