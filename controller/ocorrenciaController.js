const { PrismaClient } = require('@prisma/client');
const {success, error} = require('../utils/response')
const prisma = new PrismaClient();

exports.createOcorrencia = async (req, res) => {
    let { tipo, local, descricao, prioridade, status, dataHora, responsavel } = req.body;

    const campos = { tipo, local, descricao, prioridade, status, dataHora };
    const camposFaltando = Object.entries(campos)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

    if (camposFaltando.length > 0) {
        return error(res, "Todos os campos são obrigatorios", 400, `Campos faltando: ${camposFaltando.join(", ")}`)
    }

    prioridade = prioridade.toUpperCase();
    status = status.toUpperCase();

    try {
        const ocorrencia = await prisma.ocorrencia.create({
            data: {
                tipo, local, descricao, prioridade, status, dataHora, responsavel: {
                    connect: { id: req.user.id }
                }
            }

        })
        console.log(ocorrencia)
        success(res, "Ocorrência criada com sucesso.", ocorrencia)
    } catch (err) {
        error(res, "Erro na criação", 500, err)
        
    }

}

exports.getOcorrencias = async (req, res) => {
    try {
        let { status, prioridade, responsavelId } = req.query;
        const filtros = {}

        if (status) filtros.status = status.toUpperCase();
        if (prioridade) filtros.prioridade = prioridade.toUpperCase();
        if (responsavelId) filtros.responsavelId = parseInt(responsavelId);

        const ocorrencias = await prisma.ocorrencia.findMany({
            where: filtros,
            take: 10,
            orderBy: { dataHora: 'desc' },
            include: {
                responsavel: {
                    select: {
                        nome: true,
                        email: true
                    }
                }
            }
        })
        success(res, "Busca bem sucedida", ocorrencias)
    } catch (err) {
        console.error(err);
        error(res, "Erro ao buscar ocorrências", 500, err)
    }


}

exports.getOcorrenciaById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (!id) {
            return error(res, "ID da ocorrencia é obrigatorio")
        };

        const ocorrencia = await prisma.ocorrencia.findUnique({
            where: {id}, 
            include: {
                responsavel: {
                    select: {
                        nome: true,
                        email: true
                    }
                }
            }
        });

        if (!ocorrencia){
            return error(res, "Ocorrencia nao encontrada", 404)
        }
        success(res, "Ocorrencia encotrada", ocorrencia)

    } catch (err) {
        error(res, "Erro ao buscar ocorrencia", 500, err)
    }
}

exports.updateOcorrencia = async (req, res) => {
    try{
        const id = parseInt(req.params.id)

        if (!id){
            return error(res, "Id da ocorrência é orbigatório")
        }

        let { tipo, local, descricao, prioridade, status, dataHora } = req.body;
        
        prioridade = prioridade.toUpperCase();
        status = status.toUpperCase();

        const ocorrenciaAtualizada = await prisma.ocorrencia.update({
            where: {id},
            data: {
                tipo,
                local,
                descricao,
                prioridade,
                status,
                dataHora
            }
        })
        success(res, "Ocoreencia Atualizada com sucesso", ocorrenciaAtualizada)
    }catch(err){
        if (err.code === "P2025") {
            return error(res, "Ocorrência não encontrada", 404);
        }
        console.error(err);
        error(res, "Não foi possivel editar a ocorrencia", 500, err)
    }
}

exports.deleteOcorrencia = async (req, res)=>{
    try{
        const id = parseInt(req.params.id)
        if (!id){
            return error(res, "Id da ocorrência é orbigatório")
        }
        const ocorrencia = await prisma.ocorrencia.delete({
            where:{id}
        })
        success(res, "Ocorencia deletada", ocorrencia)
    }catch(err){

        if (err.code === "P2025") {
            return error(res, "Ocorrência não encontrada", 404);
        }
        error(res, "Não foi possivel deletar a ocorrencia", 500, err)
    }
}