import Course from '../models/course.model'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import dbErrorHanlder from '../helpers/dbErrorHanlder'
import defaultImage from './../../client/assets/default.jpg'
import extend from 'lodash/extend'
const create = (req, res) => {
    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: `Image could not be uploaded ${err}`
            })
        }
        console.log('fields', fields)
        console.log('files', files)
        if (Array.isArray(fields.name)) fields.name = fields.name[0]
        if (Array.isArray(fields.category)) fields.category = fields.category[0]
        if (Array.isArray(fields.description)) fields.description = fields.description[0]
        if (Array.isArray(files.image)) files.image = files.image[0]

        let course = new Course(fields)
        course.instructor = req.profile

        if (files.image) {
            course.image.data = fs.readFileSync(files.image.filepath)
            course.image.contentType = files.image.mimetype
        }
        try {
            let result = await course.save()
            res.json(result)
        } catch (err) {
            console.log('error', err)
            return res.status(400).json({
                error: dbErrorHanlder.getErrorMessage(err)
            })
        }
    })
}
const update = async (req, res) => {
    let form = new IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {

        if (err) {
            return res.status(400).json({
                error: "Photo could not be upload"
            })
        }
        let course = req.course
        console.log('files', files)

        if (Array.isArray(fields.name)) fields.name = fields.name[0]
        if (Array.isArray(fields.category)) fields.category = fields.category[0]
        if (Array.isArray(fields.description)) fields.description = fields.description[0]
        if (Array.isArray(files.image)) files.image = files.image[0]
        if (Array.isArray(fields.published)) fields.published = fields.published[0]
        course = extend(course, fields)
        if (fields.lessons) {
            console.log('lessonform', fields.lessons)
            course.lessons = JSON.parse(fields.lessons)
        }
        course.updated = Date.now()
        if (fields.image) {
            course.image.data = fs.readFileSync(files.image.filepath)
            course.image.contentType = files.image.mimetype
        }
        try {
            await course.save()
            res.json(course)
        } catch (err) {
            return res.status(400).json({
                error: dbErrorHanlder.getErrorMessage(err)
            })
        }
    })
}
const listByInstructor = async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.profile._id })
            .populate('instructor', '_id name')
        res.json(courses)
    } catch (err) {
        console.log('eshi man')
        return res.status(400).json({
            error: err
        })
    }
}

const courseByID = async (req, res, next) => {
    try {
        let course = await Course.findById({ _id: req.params.courseId })
            .populate('instructor', '_id name')
        if (!course) {
            return res.status(400).json({
                error: 'course not found'
            })
        }

        req.course = course
        next()
    } catch (err) {
        return res.status(400).json({
            error: 'under the course by id'
        })
    }
}

const read = async (req, res) => {

    req.course.image = undefined
    return res.json(req.course)
}
const getCourse = async (req, res, next) => {
    try {
       
        let course = await Course.findOne({ _id: req.query.courseId })
        if (!course) {
            console.log('courseId',req.query.courseId)
            return res.status(400).json({
                error: 'course not found bro'
            })
        }
        req.image = course

        next()

    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

const photo = (req, res, next) => {
    const course = req.image ?? ''
    if (course) {
        res.set('contentType', req.image.image.contentType)
        return res.send(req.image.image.data)
    }
    next()
}

const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + defaultImage)
}
const newLesson = async (req, res) => {
    try {
        let lesson = req.body; // Directly access req.body
        console.log('Received body:', req.body); // Debugging log

        // Add the lesson to the course
        let result = await Course.findByIdAndUpdate(
            req.course._id,
            { $push: { lessons: lesson } }, // Push the lesson into the course's lessons array
            { new: true }
        )
            .populate('instructor', '_id name')
            .exec();

        res.json(result);
    } catch (err) {
        console.error('Error in newLesson:', err);
        return res.status(400).json({
            error: err.message || 'An error occurred while adding the lesson.',
        });
    }
};

const isInstructor = (req, res, next) => {
    const isInstructor = req.auth && req.course && req.course.instructor._id == req.auth._id
    console.log('instructor')
    if (!isInstructor) {

        return res.status(403).json({
            error: "instructor not authorized"
        })
    }

    next()
}
const remove = async (req, res) => {
    try {
        let course = req.course
        let deleteCourse = await course.remove()
        res.json(deleteCourse)

    } catch (err) {
        return res.status(400).json({
            error: dbErrorHanlder.getErrorMessage(err)
        })
    }
}
const listPublished = async (req, res) => {
    try {
        let courses = await Course.find({ published: true })
            .populate('instructor', '_id name')
            .exec()
        res.json(courses)
    } catch (err) {
         return res.status(400).json({
            error:err+'i think there '
         })
    }
}
export default { listPublished, remove, isInstructor, newLesson, read, courseByID, photo, defaultPhoto, getCourse, update, listByInstructor, create }