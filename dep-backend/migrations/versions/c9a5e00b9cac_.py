"""empty message

Revision ID: c9a5e00b9cac
Revises: 96fd414dab88
Create Date: 2024-04-12 17:23:54.917231

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9a5e00b9cac'
down_revision = '96fd414dab88'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ltc_infos', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rejectedBy', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ltc_infos', schema=None) as batch_op:
        batch_op.drop_column('rejectedBy')

    # ### end Alembic commands ###
