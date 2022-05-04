import express from 'express';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback0use-case';
import { prisma } from "./prisma";
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';

export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6ff6447169c08d",
      pass: "46289bd89d2edb"
    }
  });

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const PrismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        PrismaFeedbacksRepository
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })

    const feedback = 

    await transport.sendMail({
        from: 'Equipe Feedget <contato@feedget.com>',
        to: 'Rafael Albano <rafaelb.albano@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`,
        ].join('\n')
    });

    return res.status(201).send()
});